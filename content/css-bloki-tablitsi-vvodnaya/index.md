---
title: 'CSS блоки - таблицы вводная'
date: '2018-05-26T22:00:00.000Z'
canonical: https://zen.yandex.ru/media/id/5a8ed6eddcaf8e23b97cf564/css-bloki-tablicy-vvodnaia-5b0a9b61c3321bd7bb35b626
cover: css-bloki-tablitsi-vvodnaya1.jpeg
---
Тут поговорим, о исторически первом способе организовывать содержимое на страницах. О CSS правилах для отображения таблиц и их составных частей.

<!--more-->
{{< imgresize "css-bloki-tablitsi-vvodnaya1.jpeg" "CSS блоки - таблицы вводная" >}} 

Таблицы в отличии от многих других [блоков](/blog/css-bloki-inline) это комплексная сущность, которая состоит не просто из одного тега, а сразу нескольких. Благодаря этому таблицы являются по сути универсальным средством управления расположением информации на странице.

Как минимум нужно понимать, что любая таблица в web сначала состоит из строк, а затем в них вложены колонки. Причем опционально структура таблицы может быть сложной, включать в себя слияние колонок по горизонтали и вертикали.

Для табличного тега <table> в css большинства большинства браузеров по умолчанию определено правило отображения как display: table. По мимо отображения существует еще ряд специфичных для таблиц правил:

```css
border-collapse 
```
Устанавливает правила поведения для ячеек таблиц

```css
border-spacing 
``` 
Устанавливает внутренние расстояния между ячейками если оно разрешено правилом border-collapse

Интересно, что далее внутри таблицы можно создать несколько типов сущностей. Практически все эти сущности имеют свое особое css правило отображения, которое не имеет смысла вне таблиц, поскольку все они являются частью таблицы.

Самая простая из них caption, которая призвана решить задачи заголовка таблицы. [Тег](/blog/osnovi-html) capition по умолчанию в браузерах имеет отображение display: table-caption. И должен отображать текст в середине таблицы не взирая на наличие строк в . таблице.

Далее внутри таблицы можно определять табличную группу строк thead, tbody, tfoot, которые в свою очередь имеют свои специальные правила отображения display: table-header-group, table-row-group, table-footer-group. Но важно заметить что **создавать эти группы не обязательно**. Они могут быть очень полезны при печати документов, когда то давно с помощью этих групп решалась задача залипания заголовков колонок к верху, для очень длинных таблиц, сегодня такие задачи решаются с помощью JavaScript.

Затем обычно идет объявление тегов строк обычно это tr c display: table-row на стороне css. Но кому то это может показаться не удобным, что таблицы сначала описываются строками а затем колонками.

Что бы хоть как то сгладить проблему строк существуют специальные теги colgroup и col, которые отвечают за стили колонок, а так же их атрибуты будут наследованы всеми ячейками ответственных колонок, к сожалению далеко не все свойства наследуются ячейками. Они имеют css отображение display: table-column-group table-column, соответственно.

Важно заметить, что таких групп может быть несколько. Приоритет в этом случае получает первая группа.

Ключевая информация таблицы записывается внутри ячеек обычно их обозначают тегами th для заголовков и td для обычных ячеек, с display: table-cell

[Далее](/blog/css-bloki-tablitsi-v-deistvii) рассмотрим поведение этих тегов в действии на примете верстки тестовой странички.
