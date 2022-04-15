---
title: 'CSS блоки: inline-block'
date: '2018-10-06T22:00:00.000Z'
canonical: https://zen.yandex.ru/media/id/5a8ed6eddcaf8e23b97cf564/css-bloki-inlineblock-5b4c9d1b8719a600a90bc1cc
cover: cherno-serii-kot1.jpeg
---
Тут поговорим об одном из-самых популярных способов делать верстку в ie7 и выше.

<!--more-->
{{< imgresize "cherno-serii-kot1.jpeg" "Черно серый кот" >}} 

Ранее мы обсуждали поведение блочных и инлайновых элементах и у них есть свои недостатки. Для блочных элементов это текучесть текстов внутри них и не всегда ожидаемое поведение в плане обтекания внутренним содержимым других блоков. Для инлайновых элементов это проблемы связанные с высотой линии, которой не так то просто управлять не задевая при этом размеры шрифтов.

## Задача{#zadacha} 

Все эти проблемы не позволяют решить задачу вертикального позиционирования динамических элементов. Эта задача формулируется примерно так:

*Нужно позиционировать элемент, чья высота и ширина может меняться, таким образом чтобы он находился в середине экрана по высоте и ширине.*

Попробуем разобраться в поведении *inline-block* элементов на основе решения такой задачи. Как видно из названия блоков они унаследовали часть поведения от [блочных](/blog/css-bloki-blochnie-elementi), а также часть от [инлайновых](/blog/css-bloki-inline). Как и у блочных элементов у них **можно задавать высоту и ширину на прямую** через свойства width, height. Но в отличии от тех же блочных элементов их ширины по умолчанию **определяются содержимым блоков**, а не пытаются занять всю ширину, этим свойством эти блоки очень близки к inline. Еще одно сходство с inline заключается в том, что эти блоки так же как и текст **следуют друг за другом с учетом пробелов**.

## Строка из блоков{#stroka-iz-blokov} 

Важно понять здесь, что если эти блоки следуют друг за другом и ведут себя как текст, значит у нас появляется понятие **строки из** [блоков](https://codepen.io/ErDmKo/pen/ZqpPoX?editors=1100).

{{< imgresize "dve-sroki-ne-iz-slov,-a-iz-blokov9.png" "Две сроки не из слов, а из блоков" >}} 

Видно, что в отличии от блоков тут имеется множество не залитых свободных пространств. Попробуем объяснить откуда эти пространства возникают.

Изначально видно, что ширина блоков [задана на 30%](/blog/osnovi-css-razmeri) это значит, что каждый блок должен занимать чуть меньше трети экрана (если бы нужна была треть то эти значения бы стремились к 33,(3) % = 1/3).

## Пространства{#prostranstva} 

**1, 2** - Теперь если внимательно рассмотреть [СSS правила](/blog/osnovi-css-uroven-pravil), то можно понять что каждый из четырех блоков имеет свою уникальную высоту. И пространства 1 и 2 **возникают в связи с разницей высот**. [Зеленый](/blog/osnovi-css-tsveta) блок значительно меньше по высоте чем желтый. То же самое верно для красного и желтого блока.

**4** - Один из самых неочевидных и не приятных отступов в inline-block верстке. Это те самые пробелы которые перекочевали из [inline блоков](/blog/css-bloki-inline), соответственно и меры борьбы с ними те же. Еще тут важно заметить наличие отступа между блочными строками они появляются по той же самой причине **наследия свойств inline элементов**

**3** - Это пространство появилось потому что синему **блоку недостаточно места на первой строке**. По этому он был перенесен на следующую оставив за собой это пространство. Тут можно рассмотреть аналогию со словами в inline элементах.

**5** - Последнее пространство является **недописанной строкой.**

Итак теперь в целом должна быть понятна природа этих пространств. Но чем они лучше тех же блоковых и инлайновых элементов?

А лучше они тем, что существуют CSS правила, которым можно изменять поведение блоков и пространств между ними.

## Управление поведением пространств{#upravlenie-povedeniem-prostranstv} 

### vertical-align{#vertical-align} 

Начнем пожалуй с самого главного и уникального для *inline, inline-block* правила *vertical-align.* Во первых сразу важно отметить, что это правило применимо только в строках **последовательных элементов**, а не к блоком [оборачивающим эти элементы](/blog/osnovi-html). Это правило определяет как должны располагаться элементы внутри строки по высоте, то есть в нашем случае регулирует размеры пространств 1 и 2.

Правило может принимать множество значений. Из очевидных значений кажется должны быть **способы выровнять элемент посередине вверх и вниз**. Они существуют и называются соответствующими английскими словами - middle, top, bottom.

### text-align{#text-align} 

Теперь относительно пространств 3 и 5 ими тоже можно управлять с помощью правила *text-align*. Это правило очевидно, то же должно принимать как минимум 3 значения **лево, центр, право,** и эти значения существуют *left, center, right*. Но это правило в отличии от *vertical-align* напротив нужно применять к **элементу оборачивающему строку** из блоков

Итого в случае **iniline-block** элементов у нас есть полный **контроль** над относительным расположением элементов как по **высоте (** *vertical-align***) так и по ширине (** *text-align***)**. Воспользуемся этими знаниями чтобы решить искомую задачу с выравниванием блока по высоте и ширине экрана.

## Использование пространств{#ispolzovanie-prostranstv} 

Создадим блок размеры которого могут быть динамическими .a и задаются контентом например текстом

{{< imgresize "css-bloki-inline-block28.png" "CSS блоки: inline-block" >}} 

И положим его в другой блок с классом b.

Теперь с помощью CSS определим отображение*.a* *iniline-block* и выровняем его по середине по горизонтали с помощью его родителя*.b* указав у для него правило *text-align: center* экрана тем самым решив половину искомой задачи.

{{< imgresize "css-bloki-inline-block31.png" "CSS блоки: inline-block" >}} 

Связи с особенностями работы свойства vertical-align теперь нам нужно создать такой элемент, чтобы выравнивание относительно его высоты было выравнивание относительно экрана, а это значит нам нужен элемент который имеет высоту всего экрана.

Создадим такой элемент с классом*.c*. Поскольку высота элемента в процентах считается относительно родителя то нужно задать 100% высоту всем его родителям в разметке и сбросить все отступы. Затем укажем правило *vertical-align: middle* для строки из блоков*.c* и*.a*

{{< imgresize "css-bloki-inline-block34.png" "CSS блоки: inline-block" >}} 

В этом случае блок*.c* пустой и поэтому он не как не отображается и не влияет на ширину линии только лишь задает ее высоту. Готовое [решение](https://codepen.io/ErDmKo/pen/PooZGve)

Вы всегда можете попрактиковаться на сайтах [песочницах](/blog/osnovi-html) или на [GitHub](/blog/staticheskii-sait-dlya-proekta-na-github)


