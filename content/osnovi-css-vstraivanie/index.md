---
title: 'Основы CSS - встраиваниe'
date: '2018-03-24T23:00:00.000Z'
canonical: https://zen.yandex.ru/media/id/5a8ed6eddcaf8e23b97cf564/osnovy-css-vstraivanie-5ab1255679885ec99c4162e1
cover: osnovi-css-vstraivanie1.jpeg
---
Тут объясняются общие термины и понятия которые необходимы для встраивания каскадных таблиц стилей в HTML документы.

<!--more-->
{{< imgresize "osnovi-css-vstraivanie1.jpeg" "Основы CSS - встраиваниe" >}} 

Хоть CSS и расшифровываются как таблицы стилей, в прямом смысле они не являются таблицами, скорее это перечень правил отображения [тегов](/blog/osnovi-html). Для простоты назовем множество это множество CSS правилами.

## Встраивание в HTML{#vstraivanie-v-html} 

В большинстве случаев это css файл, но важно понимать что множество CSS правил это не всегда фаил. Есть несколько способов вставить CSS правила в страницу. Каждый из них имеет свои преимущества и недостатки.

### Тег STYLE{#teg-style} 

Набор css правил можно вставить непосредственно в страницу с помощью тега style

```html
<style>
  a {
    color: red;
  }
</style>
``` 

Главным достоинством данного метода является скорость. Относительная быстрота достигается за счет того что CSS стили приходят вместе содержимым страницы и браузеру не нужно делать дополнительных запросов за данными. Это же свойство является недостатком. Синтаксис HTML разительно отличается от CSS и смешивать их в одном файле не считается хорошим тоном, и в принципе это не удобно использовать разные синтаксисы в одном файле. Существует как минимум два способа бороться с этим недостатком. Первый о котором здесь не будет деталей это использование "систем сборки", а второй мы разберем более подробно.

### Атрибут style{#atribut-style} 

Этот метод подразумевает описание правил без селектора непосредственно внутри атрибута тега. Эта возможность присутствует для всех тегов

### Тег LINK{#teg-link} 

CSS правила можно сохранить в отдельный файл. Например если у вас есть репозиторий из [статьи](/blog/staticheskii-sait-dlya-proekta-na-github), мы можем добавить туда новый файл:

{{< imgresize "osnovi-css-vstraivanie13.png" "Основы CSS - встраиваниe" >}} 

Для примера создадим пустой файл и назовем его style.css:

{{< imgresize "osnovi-css-vstraivanie15.png" "Основы CSS - встраиваниe" >}} 

Теперь изменим index.html таким образом что бы тот загружал данные стили из созданного файла:

{{< imgresize "osnovi-css-vstraivanie17.png" "Основы CSS - встраиваниe" >}} 

{{< imgresize "osnovi-css-vstraivanie18.png" "Основы CSS - встраиваниe" >}} 

Заполним этот файл минимальной HTML разметкой:

{{< imgresize "osnovi-css-vstraivanie20.png" "Основы CSS - встраиваниe" >}} 

Помимо минимального HTML на скриншоте можно заметить тег вида:

```html
<link rel="stylesheet" href="style.css" />
``` 

Это можно прочитать как короткий тег, который называется link с атрибутами rel и href значения которых stylesheet и style.css.

Тег link по смыслу означает ссылку на другой ресурс, которую необходимо использовать браузеру чтобы отобразить страницу. Интересно что в зависимости от значения атрибута rel браузер будет использовать разные способы обработки этого тега. Но на данном этапе нас интересует, как же браузер будет интерпретировать значение stylesheet.

Когда значение атрибута rel выставлено так как как это показано выше, то браузер будет пытаться выгрузить отдельным запросом ресурс указанный в атрибуте href. Значение атрибута href это практически всегда указатели на ресурс их синтаксис довольно простой, но в тоже время именно тут очень часто происходят ошибки. По этому заполнять указатели на ресурс нужно очень внимательно. В дальнейшем я постараюсь использовать общую терминологию и называть эти указатели URL. На данном этапе мы не будем глубоко погружаться в то как сформировать URL на всевозможные ресурсы. Тут важно понять, что URL это строка которая интерпретируется браузером особым способом и на основе данных из этой строки браузер определяет пути к данным.

На скриншоте выше видно что URL представляет из себя просто название того пустого файла стилей который мы создали на предыдущем шаге. Важно ресурс будет работать корректно загружен браузером только в том случае если файл index.html будет доступен на том же уровне что и style.css. Это можно проверить открыв в браузере следующие URL:

1. https://<имя пользователя>.github.io/<название проекта>/index.html (пример моего ресурса https://erdmko.github.io/c649160/index.html) убедится что HTML файл присутствует

2. https://<имя пользователя>.github.io/<название проекта>/style.css тут же должен быть просто белый экран по скольку это ссылка на пустой файл.

Как можно заметить эти два URL отличаются только последней частью в которой упоминается название файла и на данном этапе это достаточное условие чтобы быть уверенным, что эти файлы "доступны на том же уровне".

Теперь когда нам удалось удостоверится в коректности URL и в принципе работы тега link, можно понять, почему этот способ вставки CSS является самым популярным. Дело в том что имея разделенные файлы CSS и HTML с ними можно работать независимо друг от друга. Тем самым теперь возможно изменение стиля отображения элементов без изменения самого файла HTML.

Благодаря этому разделению на рынке труда появилось ещё больше узких специалистов которые работают в этих сферах.

Но использование URL приносит с собой дополнительные проблемы. Этот способ считается медленнее чем предыдущий из-за дополнительного запроса, ожидание ответа на который замедляет загрузку общей страницы.

### Правило @import{#pravilo-@import} 

Также существует еще один способ вставки CSS стилей. Он также использует URL, но в отличии от предыдущего он подразумевает импорт CSS файлов внутри самих файлов.

Основным достоинством тут является возможность разделять свои стили на множество мелких файлов и в итоге иметь удобную структуру папок и файлов.

Но это самый не популярный способ и я никому не советую его использовать, так как это самый медленный из всех возможных методов. Так как количество URL внутри css может значительно расти в зависимости от того сколько маленьких файлов нужно загрузить, чтобы отобразить страницу. Ситуация усугубляется тем что каждый такой файл внутри себя может иметь еще зависимости тем самым делая отрисовку страницы еще медленнее.

В тоже время этот способ является очень удобным с точки зрения узких специалистов, по этому его недостатки, как и со вставкой через тег решаются сегодня с помощью систем сборки которые собирают все зависимости в один файл.

[Далее](/blog/osnovi-sss-selektori) поговорим о css селекторах
