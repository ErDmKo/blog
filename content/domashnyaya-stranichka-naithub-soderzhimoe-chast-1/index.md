---
title: 'Домашняя страничка на GitHub: содержимое часть 1'
date: '2019-07-20T22:00:00.000Z'
canonical: https://zen.yandex.ru/media/id/5a8ed6eddcaf8e23b97cf564/domashniaia-stranichka-na-github-soderjimoe-chast-1-5d09d06205ad9900af505170
cover: kot-napolnil-kontetom-konteiner1.jpeg
---
 [Ранее](/blog/domashnyaya-stranichka-na-github-zagolovki) мы обсудили детали касающиеся разметки заголовков, и общую идею создания домашней странички, здесь же давайте сделаем самое главное добавим содержимое на страницу.

<!--more-->
{{< imgresize "kot-napolnil-kontetom-konteiner1.jpeg" "Кот наполнил контетом контейнер" >}} 

### Doctype{#doctype} 

Для содержимого страницы важен способ отображения разметки и настройки браузера по умолчанию.

Исторически существовало множество стандартов отображения [HTML](/blog/osnovi-html) разметки браузерами. Но нам повезло жить во времена где принят, более ли мение единый стандарт.

Для того что бы рассказать браузеру о том что вы хотите интерпретировать свою верстку как HTML пятой версии нужно написать об этом следующим образом:

```html
<!DOCTYPE html>
``` 

Эта декларация должна быть вставлена в первую строку HTML документа, то есть нашей странички.

Теперь когда мы определились со стандартом мы можем непосредственно приступить к разметке содержимого. Все содержимое страницы обычно располагается в теге body.

### Макет{#maket} 

Содержимое страницы на самом верхнем уровне определяется макетом страницы ингода так же эту сущность называют сеткой или разметкой.

Он необходим для управления расположением блоков на странице. Предположим что на страничке будет одна статья с **заголовком**, **фотографиией**, несколько блоков с **контактной** информацией и форма для **доната**.

Прежде чем прейти к описанию непосредственно самих блоков, нужно определиться как они должны выстраиваться при различных ширинах экрана.

Фотография и адреса могут находится **на одной линии**, но очевидно что для мобильных девайсов где нет большой ширины экрана **не нужно** пытаться размещать их на одной линии. В тоже время хотелось бы что бы **заголовок всегда занимал одну строку.**

Этого можно добится несколькими способами. Используя полученные знания из статей про [блоки](/blog/css-bloki-blochnie-elementi) можно догадаться, что *display: block* **поможет позиционировать** заголовок.

Далее фото и блоки с адресами, из-за их динамичности на мобильных устройствах нам понадобится другая техника позиционирования описанная ранее. Нужно сверстать эти блоки таким образом, что бы они шли как слова в тексте. Если есть достаточно места по ширине экрана они бы следовали друг за другом если места мало то следующие блоки переходили бы на новую строку, такое поведение было описано ранее в части про [inline-block](/blog/css-bloki-inline-block)*.*

Последний блок формы доната пусть тоже будет позиционирован всегда как блочный элемент и у него так же как и для заголовка не может быть соседей по линии.

Итого макет для широких экранов:

```html
Заголовок Фото - адреса Форма доната
``` 

Для узких

```html
Заголовок Фото Адреса Форма доната
``` 

Для разметки макета рекомендуется сразу использовать теги в названии которых есть смысл. Так например для блока статьи лучше использовать тег article. В итоге [HTML](/blog/osnovi-html) разметка макета будет выглядеть следующим образом

```html
<!-- тег статьи на странице -->
<article class="page"></article>
<!-- заголовок статьи-->
<header class="page__header header">....</header>
<!-- фото -->
<hr class="avatar" />
<!-- секция с адресами -->
<section class="address">.....</section>
<!-- секция с адресами закрывается-->
</section>
<!-- секция формы с донатом -->
<section></section>
<address class="donation-form">....</address>
<!-- секция формы с донатом закрывается -->
</section>
<!-- закрывается тег статьи на странице -->
</article>
``` 

Вы могли заметить в примере выше используются запись вида "<!-- .. -->". Такого рода синтаксис используется для описания комментариев в HTML разметке, то есть содержимое этих тегов **не будет отображено в браузере**, но они будут все так же видны при просмотре исходного кода страницы.

Общие стили для макета содержимого:

```css
body, html {
  margin: 0;
  font-family: 'Roboto', sans-serif; 
}
.page { 
  text-align: center; 
} 
.page__header {
  text-align: center;
  padding: 30px; 
}
``` 

Здесь используются [селекторы](/blog/osnovi-sss-selektori) по тегам body и html, а также и по классам. устанавливаются шрифты и отступы для базовых тегов и выравнивание текста для для блоков макета.

### Заголовок{#zagolovok} 

Первое что необходимо сделать на страничке визитке это представиться. И сделать это можно прямо в заголовке страницы. Для заголовков в стандарте HTML существуют целая группа заголовочных тегов для разного уровня вложенности. Эти теги называют заголовочными и обозначаются они буквой h и затем идет цифра уровня заголовка.

Например *H1* будет **заголовком первого уровня** и в интернетах принято, что это **самый важный заголовок** и он должен быть один на странице. Но стандарт HTML не ограничивает количество таких тегов на странице. Важно так же заметить что текст в заголовке *H1* часто используется поисковиками для определения заголовка страницы.

Так же не нужно забывать и про заголовки второго и далее уровня например в своей версии странички я использовал заголовок 3 уровня *h3*. По смыслу (семантически) это значит, что у страницы есть подзаголовок.

Итого получается разметка вида:

```html
<header class="page__header header">
  <h1 class="header__headline">...</h1>
  <h3 class="header__sub">...</h3>
</header>
``` 

Также чтобы заголовок не сливался с остальным содержимым страницы можно применить **инверсию цветов,** фон будет иметь черный цвет, а текст белый. По скольку в данном примере мы скорее изучаем техническую сторону задачи я не буду углублятся в дизайнерские тонкости оформления страницы.

Итого CSS для заголовочного блока:

```css
.header {
  font-family: 'Poiret One', cursive;
  color: #fff;
  background: #000; 
}
.header__headline {
  font-size: 90px;
  font-size: 11vw;
  margin: 20px 0; 
}
.header__sub { 
  font-size: 27px; 
  font-size: 3vw; 
}
``` 

Тут в основном определяются [цвета](/blog/osnovi-css-tsveta) фона, [размеры,](/blog/osnovi-css-razmeri) начертания шрифтов и отступы.

 [Далее](/blog/domashnyaya-stranichka-naithub-soderzhimoe-chast-2) разберем блоки с фотографией, адресами и формой для доната.

На платформе ZEN появились комментарии, а это значит вы можете оставлять отзывы и критиковать эту статью чтобы сделать ее лучше.
