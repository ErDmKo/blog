---
title: 'Основы CSS - веса селекторов'
date: '2018-04-26T22:00:00.000Z'
canonical: https://zen.yandex.ru/media/id/5a8ed6eddcaf8e23b97cf564/osnovy-css-vesa-selektorov-5ad4e488830905f568348f74
cover: osnovi-css-vesa-selektorov2.jpeg
tags: ['css']
---
Тут мы поговорим о том как определить какое на самом деле значение CSS свойства будет применено на элементе.

Рассмотрим ситуации когда несколько селекторов определяют одно и тоже правило для одного и того же элемента

<!--more-->
{{< imgresize "osnovi-css-vesa-selektorov2.jpeg" "Основы CSS - веса селекторов" >}} 

Если у нас есть несколько способов сформулировать селектор на один и тот же элемент это значить что у нас возможны ситуации когда правила в одном селекторе противоречат правилам другого. Когда такое происходит браузеру необходимо принять решение о том как же отображать этот элемент. Браузер использует специальную систему весов для того чтобы понять какое правило имеет более высокий приоритет.

## Селекторы{#selektori} 

Рассмотрим случай, когда у нас есть несколько селекторов которые выделяют один и тот же элемент

```html
<style>
  span #b {
    color: red;
  }
  span {
    color: blue;
  }
  span[style] {
    color: green;
  }
</style>
<span id="a">1</span>
<span id="b" style="font-size: 10px !important">2</span
``` 

Какого же цвета в этом случае будет текст [тега](/blog/osnovi-html) span с id "b"? Можно попробовать вывести основные правила логически. В данном случае все селекторы выделяют этот тег. Первый селектор выделяет все теги span с id "b", второй выделяет все теги span, третий выделяет все теги span у которых есть атрибут "style", подробнее о том как читать селекторы, было описано [ранее](/blog/osnovi-sss-selektori). Очевидной кажется идея что побеждать должно правило которое более точно и узко описывает искомый элемент. Тег будет красного цвета, чтобы понять почему попробуем разобраться, что же значит более точно и узко заданный селектор как их сравнивать.

Для этого существует система весов которая четко регламентирует приоритет составных частей селекторов и комбинаторов. Она устанавливает что среди селекторов самым низким приоритетом обладает селектор "*" затем, по тегу, затем по классу или атрибуту и самый сильный селектор по id. Рассмотрим это на [примере](https://codepen.io/ErDmKo/pen/JvRZbx?editors=1100) :

{{< imgresize "osnovi-css-vesa-selektorov11.png" "Основы CSS - веса селекторов" >}} 

На примере видно, что все теги попадают под селектор "*" [правила](/blog/osnovi-css-uroven-pravil) которого красят текст внутри него в желтый цвет. Но по факту мы видим, что все цифры окрашены в разные цвета только лишь 5 окрашена в желтый цвет. Так происходит потому, что все остальные селекторы "сильнее". А цифра 5 обернута в тег отличный от span.

Следующий по силе селектор по тегу охватывает все все теги span и окрашивает их в красный цвет. Цифра 5 не окрашивается потому, что она не обернута тегом span. Рассмотрим цифру 3 видно, что она обернута в тег span у которого есть класс "с", но нет селекторов по классу для него по этому селектор по тегу конкурирует здесь только с "*", и побеждает его.

{{< imgresize "osnovi-css-vesa-selektorov14.png" "Основы CSS - веса селекторов" >}} 

Следующий селектор по силе селектор по атрибуту, для наглядности их несколько. Для того что бы определить влияет ли на вес форма записи этого селектора. Тут мы видим, что два селектора по атрибуту конкурируют между собой. Одно говорит, что текст, для тегов с атрибутом id равным "b" должен быть белым, а другое, что текст для тегов с атрибутом id должен быть черным. Казалось бы "белое" правило более специфичное, но на практике они имеют одинаковый приоритет и итоговый цвет будет определяться порядком этих правил то что ниже побеждает. Для цифры 2 будут применены следующие стили:

{{< imgresize "osnovi-css-vesa-selektorov16.png" "Основы CSS - веса селекторов" >}} 

Видно, что селекторы по тегу и "*" побеждены.

Далее селекторы по классу побеждающие глобальные селекторы тегам. Цифра 4 окрасилась в зеленый цвет потому что обернута в тег span у которого есть атрибут class внутри которого есть строка "d". Она то и дает совпадение с классом. Еще раз хотелось бы подчеркнуть, что элементов с одним и тем же классом может быть множество в нашем примере это span с id "a" и span с id "d" и в данном случае в зеленый цвет покрасился только один.

Так же хочется упомянуть что селекторы по атрибутам равны по силе селекторам по классам и если они конкурируют то побеждает тот который описан позже.

{{< imgresize "osnovi-css-vesa-selektorov20.png" "Основы CSS - веса селекторов" >}} 

Заключительный самый сильный из селекторов - селектор по id. Его особенность в том что он предполагает наличие только одного уникально значение этого атрибута для всех тегов на странице. **Не должно существовать тегов с одинаковым id - это ошибка**. В нашем примере только цифра 1 окрасилась в синий цвет вытеснив все остальные селекторы, в том числе и по классу.

{{< imgresize "osnovi-css-vesa-selektorov22.png" "Основы CSS - веса селекторов" >}} 

В итоге на уровне селекторов имеем id > class = attribute > tag > *. Далее попробуем разобрать эти же типы селекторы на уровне [комбинирования](/blog/osnovi-sss-kombinatori). Используя технику 4 ячеек. Смысл ее в том, что бы представить любой селектор в виде ряда чисел где первое число это количество селекторов по id второе количество селекторов по классу и так далее по убыванию приоритета селектора. В итоге для селектора "

id - 1, class/attribute - 1, tag - 0, * - 0 => 1101 это и будет его вес выраженный числом. Важно заметить, что **комбинаторы и их разновидности не влияют на суммарный вес**

В общем случае более высокий приоритет получит тот селектор у которого количественно больше приоритетных частей.

Разберем это утверждение на [примере](https://codepen.io/ErDmKo/pen/erBKbj?editors=1100) :

{{< imgresize "osnovi-css-vesa-selektorov27.png" "Основы CSS - веса селекторов" >}} 

Здесь представлено множество комбинаций селекторов которые выделяют один единственный тег. И в итоге цвет фона тега выставился в черный цвет. Почему победил селектор ".a

".a

".a span.a.b.c[class][id="a"] span" => id - 0, class - 4 / attribute - 2, tag - 2, * - 0 => 0620

Видно что 1110 > 0620 и сколько бы не было тут классов и атрибутов они не перевесят.

{{< imgresize "osnovi-css-vesa-selektorov32.png" "Основы CSS - веса селекторов" >}} 

 [Далее](/blog/osnovi-css-uroven-pravil) поговорим о CSS правилах.



