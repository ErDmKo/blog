import { remote } from 'webdriverio';
import prettier from 'prettier';
import fs from 'fs';
import { open, mkdir, rename, unlink, readFile } from 'fs/promises';
import https from 'https';
import { parse } from 'date-fns'
import mmm from 'mmmagic';
import CyrillicToTranslit from 'cyrillic-to-translit-js';

const LIMIT = 1;
const urlToTitle = {};

const iterateCards = async (browser, startIndex) => {
    const cards = await browser.$$('.card-wrapper');
    const result = [];
    if (startIndex >= cards.length - 1) {
      return result;
    }
    for (const card of cards.slice(startIndex)) {
      /*
      if (index >= LIMIT) {
        return result;
      }
      */
      await card.scrollIntoView();
      const title = card.$('h2.card-layer-content-header-view a');
      const href = await title.getAttribute('href');
      result.push(href);
      await new Promise((r) => setTimeout(r, 500));
    }
    const newResult = await iterateCards(browser, cards.length);
    return result.concat(newResult);
}
const uploadFile = (url, fileName) => {
  const fd = fs.createWriteStream(fileName);
  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      resp.pipe(fd);
    }).on('error', reject);
    fd.on('finish', () => fd.close(resolve));
    fd.on('error', reject);
  });
}

const formatCode = (text) => {
  let niceText = text;
  let format = '';
  for (format of ['typescript', 'css', 'html']) {
    try {
      niceText = prettier.format(text, {parser: format});
      return [niceText, format];
    } catch (e) {}
  }
  return [niceText, format];
}

;(async () => {
    const browser = await remote({
        logLevel: "silent",
        capabilities: {
            browserName: 'chrome',
            "goog:chromeOptions": {
              args: [
                //'--headless',
              ]
            }
        }
    })
    const sluger = new CyrillicToTranslit();
    const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
    const textToSlug = (text) => {
      const full = sluger.transform(text, '-')
        .toLowerCase()
        .replace(/[\:\"\?\.\(\)\s]+/gim, '')
        .replace('---', '-')
        .split('/')[0]
      if (full.length > 50) {
        const start = full.substring(0, 25);
        const end = full.substring(full.length - 25);
        return `${start}${end}`;
      }
      return full;
    }
    await browser.navigateTo('https://zen.yandex.ru/id/5a8ed6eddcaf8e23b97cf564');
    const urlsFile = './urls.json'
    let urls = [];
    try {
      urls = JSON.parse(await readFile(urlsFile));
    } catch (e) {
      console.error(e);
    }
    if (!urls.length) {
      urls = await iterateCards(browser);
      const writer = await open(urlsFile, 'w');
      await writer.write(JSON.stringify(urls));
      await writer?.close();
    }
    /*
    const urls = ['https://zen.yandex.ru/media/id/5a8ed6eddcaf8e23b97cf564/js-sneg-na-saite-61dc8b426865712f75fb2335?&']
    */
    for (const url of urls) {
      console.log(url);
      let preview = 0;
      await browser.navigateTo(url);
      const title = await browser.$('.article__title').getText();
      let dateString = await browser.$('[itemprop="datePublished"]').getText();
      dateString = dateString.replaceAll(' ', ' ');
      if (isNaN(parseInt(dateString[dateString.length - 1]))) {
        dateString += ` ${new Date().getFullYear()}`;
      }
      const fileName = textToSlug(title);
      const dir = `./content/${fileName}`
      console.log(`dir ${dir}`);
      await mkdir(dir, {recursive: true});
      let writer = null;
      try {
        writer = await open(`${dir}/index.md`, 'w');
        await writer.write(
`---
title: '${title}'
date: '${parse(dateString, 'd MMMM yyyy', new Date()).toISOString()}'
draft: true
canonical: ${url.split('?')[0]}
---\n`
        )
        const blocks = await browser.$$('.article-render__block');
        for (const [blockIndex, block] of blocks.entries()) {
          const classString = await block.getAttribute('class');
          const classList = classString
            .split(' ');
          const isHeader = classList
            .some((className) => className.includes('article-render__block_h'));
          const isImage = classList.includes('article-render__block_image')
          if (isImage) {
            if (!preview) {
              writer.write(`<!--more-->\n`);
              preview = 1;
            }
            const image = await block.$('img');
            const imageUrl = await image.getAttribute('src');
            const text = (await image.getAttribute('alt')).trim() || `${blockIndex}`;
            const fileName = `${textToSlug(text)}${blockIndex}`;
            console.log(`image ${fileName}`);
            if (fileName.includes('"') || !fileName) {
              throw new Error(`bad image "${text}", "${fileName}"`);
            }
            const relativePath = `${dir}/${fileName}`
            await uploadFile(imageUrl, relativePath);
            const info = await new Promise((resolve, reject) => {
               magic.detectFile(relativePath, (err, info) => {
                if (err) {
                  reject(err);
                }
                resolve(info);
               })
            })
            const [type, ext] = info.split('/');
            if (type === 'image') {
              await rename(relativePath, `${relativePath}.${ext}`);
              writer.write(`{{< imgresize "${fileName}.${ext}" "${text.replace(/\"/g, '')}" >}} \n\n`);
            } else {
              await unlink(relativePath);
            }
          } else if (isHeader) {
            if (!preview) {
              writer.write(`<!--more-->\n`);
              preview = 1;
            }
            const tagName = await block.getTagName();
            let headerNo = parseInt(tagName.substring(1), 10);
            let wrapper = '';
            const text = await block.getText();
            const slug = textToSlug(text);
            while (headerNo) {
              wrapper += "#";
              headerNo -= 1;
            }
            writer.write(`${wrapper} ${text.trim()}{#${slug}} \n\n`);
          } else if (classList.includes('article-render__block_quote')) {
            const text = await block.getText();
            const [niceText, format] = formatCode(text);
            writer.write(`\`\`\`${format}\n${niceText.trim()}\n\`\`\` \n\n`);
          } else if (classList.includes('article-render__block_unstyled')) {
            const textBlocks = await block.$$('span, a');
            let prevBlock = '';
            for (const [textIndex, textBlock] of textBlocks.entries()) {
              let text = (await textBlock.getText()).trim();
              if (!text) {
                continue;
              }
              const isBold = await textBlock.$$('b');
              const isItalic = await textBlock.$$('i');
              const tagName = await textBlock.getTagName();
              const isAncor = tagName === 'a';
              let wrapper = ''
              if (isAncor) {
                let link = await textBlock.getAttribute('href');
                if (link.includes('zen.yandex')) {
                  let titleSlug = urlToTitle[link];
                  if (!titleSlug) {
                    await browser.newWindow(link)
                    const titleBlock  = await browser.$('.article__title');
                    const titleText = await titleBlock.getText();
                    titleSlug = textToSlug(titleText);
                    urlToTitle[link] = titleSlug;
                    const handles = await browser.getWindowHandles()
                    await browser.switchToWindow(handles[1])
                    await browser.closeWindow()
                    await browser.switchToWindow(handles[0])
                  }
                  link = `/blog/${titleSlug}`;
                }
                text = `[${text}](${link})`;
              } else if (isItalic.length) {
                wrapper = '*';
              } else if (isBold.length) {
                wrapper = '**';
              }
              let space = ' ';
              if (['.', ',', ')'].includes(text[0]) || !textIndex) {
                space = '';
              }
              if (prevBlock[prevBlock.length - 1] === '(') {
                space = '';
              }
              const result =`${space}${wrapper}${text}${wrapper}`;
              writer.write(result);
              prevBlock = result; 
            }
            writer.write(`\n\n`);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        await writer?.close();
      }
    }
    //await browser.saveScreenshot('./screenshot.png')
    await browser.deleteSession()
})()