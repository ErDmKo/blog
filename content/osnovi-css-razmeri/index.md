---
title: 'Основы CSS - размеры'
date: '2018-07-06T22:00:00.000Z'
canonical: https://zen.yandex.ru/media/id/5a8ed6eddcaf8e23b97cf564/osnovy-css-razmery-5b1e6bd39b403c334853e6b3
cover: osnovi-css-razmeri1.jpeg
tags: ['css']
---
Тут поговорим о единицах измерения шрифтов и размеров, которые можно использовать в CSS.

<!--more-->
{{< imgresize "osnovi-css-razmeri1.jpeg" "Основы CSS - размеры" >}} 

Во многих задачах верстки часто приходится решать задачи относительных размеров. И зачастую гораздо проще задать абсолютные значения, тем самым решив задачу быстро и по макету. Кажется, что именно тут спрятаны причины очень многих проблем коммуникации и продуктов. Потому что человеку который занимается созданием HTML документов нельзя забывать, что HTML документы это в отличии от рисунков не статическая картинка, ни единое полотно которое всегда показывает один и тот же контент. В мире верстки очень сложно предсказать любые реальные физические размеры и цвета. Не нужно в этом плане быть перфекционистом.

## Размеры в WEB{#razmeri-v-web} 

Размер пикселя в современном вебе давно перестал иметь что то общее с разрешением экрана, само понятие размера элемента поставленно под вопрос возможностью и популярностью способов увеличения размера страниц на устройства. Цвета которые мы задаем отображаются очень по разному на различных типах дисплеях с различными настройками гаммы, подсветки дисплея. Они зависят от внешнего освещения.

Та статическая картинка которая зачастую имеется после работы дизайнера это больше похоже на картинку из фильма где видны основные персонажи.

И важно понимать, что в макетах самое ценное это скорее пропорции нежили непосредственно сами размеры.

## Абсолюты{#absolyuti} 

По этому в стандарте CSS существует множество способов указания размеров. Начнем с самых простых и привычных, для людей далеких от [HTML](/blog/osnovi-html) и веба. Это метрические единицы измерения.

**cm** - сантиметры, должны занимать примерно один реальный сантиметр на экране, но это конечно не так, из-за причин описанных выше. По факту они конвертируются в пиксели о которых чуть дальше.

**pt, mm, pc** - отнесем их сюда же это пункты, миллиметры, пики. Это все те единицы измерения которые есть в реальном физическом мире, но они не удобны и не нужны в цифровом. Кажется, что причина их отсутствия заключается в проблемах соблюдения физических размеров на разных экранах и в целом, не так много людей заинтересованны в том что бы решать эту проблему

**px** - одна из самых простых и понятных едениц измерения. В цифровом мире все изображения состоят и мельчайших точек - пикселей. Казалось бы можно указать размер в мельчайших точках и он будет самым точным, что вообще может быть. В принципе до какого то момента это было так. Но с появлением экранов с высокой плотностью px перестали быть мельчайшими точками на экране и в тоже время не появилось новых более меньших единиц измерения. По этому ситуация где размер задан долями пикселей сейчас считается нормальной. Но благодаря этому стало возможно "замыливать" пиксели и в тоже время не пришлось придумывать новый [CSS](/blog/osnovi-css-uroven-pravil) для экранов с высокой плотностью пикселей

Выше были описаны абсолютные способы задания размера. Но как было сказано в водной части размеры в вебе зачастую это не абсолютные значения это скорее относительные пропорции и притом динамические.

По настоящему качественная верстка подразумевает корректное отображение страницы при различных увеличениях и ширинах экрана. Если все размеры задавать только в пикселях то при масштабировании шрифты могут потерять читабельность. И с сайтом будет не удобно работать.

По этому в css существуют относительные единицы измерения. Они вычисляются относительно тех что действуют на на указанный [элемент](/blog/css-bloki-blochnie-elementi) сверху. Разберем их на примере процентов

## Относительные{#otnositelnie} 

**%** - Задают размеры в процентах от родительских значений. Но не всегда, есть несколько исключений.

Например, самое популярная ошибка думать, что line-height задает именно [высоту линии](/blog/css-bloki-inline) как указанно в названии свойства. Но на практике же выясняется что это правило целиком про высоту шрифта. По этому если задавать его в px это будет размер шрифта который туда вместится. И совсем не очевидно, что если задать его в %, то высота будет вычислена относительно текущего размера шрифта и по умолчанию как раз задана в процентах.

Так же есть нюансы при работе с относительными высотами и ширинами элементов чьи ширины вычисляются не по правилам position static. А с высотами все сложно, кода высота родителя зависит от его содержимого. В дальнейшем я постараюсь осветить эти темы но возможно уже сейчас будет полезно знать некоторые [особенности](https://learn.javascript.ru/height-percent).

**em** - Задает размеры относительно размеров шрифтов родителей данного блока в долях. У нее так же как у px есть несколько вариаций на тему относительно какой метрики шрифта нужно считать новый размер шрифта. Размер шрифта изначально определен абсолютной величиной, обычно это px. Но как можно догадаться высота разных букв отличается и по этому в CSS существует несколько способов указания относительного размера шрифта.

*em* - базовый размер включает в себя размер самой большой буквы и все отступы

*ex* - размер заглавных букв без оступов в среднем 70% от em

*ch* - размер обычных букв в среднем 48% от em

То есть в css есть возможность управлять шириной блока в зависимости от размера шрифта внутри него, тем самым можно сохранять те самые пропорции из макетов, при увеличениях или уменьшениях экрана, ради которых это все и было задумано.

Казалось бы этот способ задания размеров должен решить эту проблему. Но у него как у процентов есть большой недостаток.

Люди привыкли отчитывать размеры от какого то базового шрифта. Почти на любом макете есть какой то текст написанный основным размером и все остальные отсчитываются от него. Но при использовании % или em выходит так, что по мере вложенности тегов размеры раз за разом приходится переопределять что бы избежать эффекта [лесенки](https://codepen.io/ErDmKo/pen/mKNrKK) :

{{< imgresize "glubzhe-bolshe26.png" "Глубже больше" >}} 

Тут видно что каждый последующий вложенный span увеличивает размер предыдущего. Что слабо коррелирует с таким удобным понятием "относительно базового шрифта".

## Почти относительные{#pochti-otnositelnie} 

**rem** - Задает размеры относительно базового шрифта. Эта относительная единица измерения призвана решить недостатки, устанавливая размеры относительно корневого элемента html. R - буква в названии единицы измерения как раз из расшифровывается как root - корневой.

Так же идея почти относительных размеров получила продолжение в 3 стандарте CSS в котором появились размеры относительно размеров окна.

**vw** - 1% от ширины текущего окна. Эти единицы измерения очень полезны в мире мобильной разработки где сравнительно не большие экраны и на них хорошо бы выводить довольно крупные буквы. Но мир мобильных устройств очень богат на различные диагонали экранов и что бы обеспечить удобный шрифт под каждую диагональ были придуманны эти размеры.

Соответственно это целое семейство куда входят *vh* - 1% процент высоты экрана и не менее интересные **vmin** **vmax** - которые установят размер элемента в 1% от максимального или минимального измерения окна, это может быть и высота и ширина. Эти размеры опять таки удобны для установления размеров шрифтов когда устройство меняет ориентацию с вертикальной на горизонтальную.

Пример использования описанных выше единиц доступен в [песочнице](https://codepen.io/ErDmKo/pen/yEmJoq).

 [Далее](/blog/css-bloki-inline-block) поговорим о inline-block элементах.

