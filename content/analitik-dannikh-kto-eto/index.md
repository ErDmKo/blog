---
title: 'Аналитик данных кто это?'
date: '2021-08-21T22:00:00.000Z'
canonical: https://zen.yandex.ru/media/id/5a8ed6eddcaf8e23b97cf564/analitik-dannyh-kto-eto-61216d8b79caa304e0dcad49
cover: analitik-za-rabotoi1.gif
---
В целом аналитик данных это, конечно, человек, который работает с данными 🙂

<!--more-->
{{< imgresize "analitik-za-rabotoi1.gif" "Аналитик за работой" >}} 

Любые сервисы/приложения собирают и хранят много всякой информации о пользователе.

На основе нее можно принимать всякие разные решения - понимать, насколько популярен сервис, сколько и за счет кого он зарабатывает, находить узкие места, придумывать новые функции и многое др.

Аналитик умеет правильно обращаться с этими данными - посчитать какие-то показатели и интерпретировать результат

Можно выделить такие типы задач:

**1. а/б эксперименты**

Хотим сделать изменения в продукте (новый функционал, улучшение чего-то старого и пр.) или в маркетинге потестировать несколько видов рекламы. Чтобы убедится, что изменение сработало или выбрать лучший вариант из нескольких - запускаем эксперимент. И с помощью статистики оцениваем его результат. Аналитик обычно отвечает за дизайн эксперимента - какие группы отправить в эксперимент, какого размера, с помощью каких метрик правильнее оценить результат и всякие др. параметры.

Ну и аналитик делает отчет - считает статистики, описывает результаты, что-нибудь умное предлагает с этими результатами сделать

**2. Чистая аналитика**

наверное 2 подтипа:

**2.1 Адхоки:** что-то случилось или у менеджера подгорело и есть вопрос, ответить на который помогут данные. Тут бывает нужно провести что-то вроде расследования с помощью данных. Например, резко снизился важный показатель или пользователи как-то необычно себя ведут - не пользуются чем-то, чем мы планировали, активно жалуются в службу поддержки, абьюзят наш сервис и пр. Тогда выбираешь нужную группу пользователей, смотришь по ним подробно разные показатели - что именно они делали, а что делали раньше, а что делают другие и т.д. Пытаешься найти проблему или узкое место, изучая различные таблицы. чтобы объяснить аномалию. Ну или просто считаешь для менеджера какую-то конкретную цифру, которую попросили 😏

**2.2 Исследования:** тут ничего особенно не подгорает. Просто можно придумать - как бы сделать лучше. Заставить платить больше людей, сделать разным группам пользователей спец предложения, которые понравятся именно им, придумать, как привлечь больше людей или как их дольше удержать. Обычно такие задачи называют поиском точек роста или поиском инсатйтов, ну или исследованиями 🙄 Они объемные, абстрактные, но на перспективу. В таких задачах аналитик может творить - построить умную модельку, которая предсказывает поведение пользователей (в т.ч. machine learning). Разбить пользователей на осмысленные группы в зависимости от их поведения - сегментировать. Детальнее посмотреть на какие-то моменты в действиях пользователя - найти закономерности и взаимосвязи. Из всего этого сделать выводы и предложить менеджеру. Таких задач обычно мало

**3. Отчетность:**

Чтобы мониторить, что все по плану, без ошибок, во время заметить проблемы - аналитик помогает менеджеру выбрать различные показатели/метрики, за которыми нужно регулярно следить. И по этим метрикам создает отчеты. Обычно отчет представляет собой дашборд с графиками и таблицами, которые обновляются автоматически. Обеспечить автоматическое обновление дашборда часто тоже задача аналитика. То есть нужно придумать метрики, придумать как их визуализировать и реализовать это все. Бывает нужно написать немного кода или же воспользоваться спец инструментами для автоматизации (tableau, power bi и аналогичные)

**4. Менеджмент данных:**

Эта часть бывает не всегда, в разном объеме и с разным погружением, но тем не менее. Данные нужно собирать, хранить, обеспечивать к ним быстрый доступ. К тому же нужно следить, что старые данные не теряются, новые регулярно и без ошибок добавляются. Еще, когда создается какой-то новый функционал или даже новый продукт - нужно придумать, какие именно данные про него собирать, каким образом это лучше сделать и т.д. Во всех этих процессах может участвовать аналитик. Непосредственно сама реализация сбора данных задача скорее для разработчика, но и аналитику нужно все про это знать и немного контролировать процесс. Чтобы понимать - какие данные что означают, откуда брать правильные и пр.

## Что нужно освоить аналитику{#chto-nuzhno-osvoit-analitiku} 

**hard skills:** sql, python или r, что-нибудь для визуализации результатов - можно тот же python/r, может быть excel или аналог, статистика (проверка гипотез!), простые модельки вроде регрессий.

Опционально - excel, machine learning, tableau/power bi и подобные, что-нибудь про то, как хранятся данные, какие бывают базы данных, как собираются события

**soft skills:** аналитическое мышление и плохое зрение, наверное - чтобы критически подходить к задачам, правильно преобразовать словесную хотелку менеджера в запрос к данным.

Примерно такие скилы и спрашивают на собеседованиях

Разные компании немного на разном делают акценты - например яндекс, почти исключительно проверят умение программировать алгоритмы 😒

Но в целом - sql, python, статистика, тервер - подбрасывание монеток и теорема байеса, аналитический кейс «представьте ситуацию. к вам пришел менеджер(ка). хочет запустить [что-нибудь]. ваши действия ...»

Сейчас вообще какой-то небывалый спрос на аналитиков, так что удачный момент вливаться в профессию

Куча курсов, школы анализа данных и пр

Например:

 [https://gopractice.ru](https://gopractice.ru/)

Сам по себе блог неплох, но еще у этого чувака (Олег Якубенков) есть прям курс симулятор - на мой вкус классный с той точки зрения, что на реальных задачах и именно смыслово объясняет суть аналитики - много про софт скилз

**Ярдекс.практикум**

Тут в первую очередь техническая подготовка, ну и печать яндекса - хард скилы, но продуктовая составляющая (типо зачем мы это делаем, почему именно таким образом считаем) хромает - а она ценится вообще-то

 [https://karpov.courses](https://karpov.courses/)

Карпов крутой чувак - у него есть бесплатный курс на stepik про статистику - можно глянуть, чтобы оценить его подачу

Теперь есть и платный курс, чисто про аналитику (есть еще data science), насколько известно, курс норм, особенно для новичков, но дорогой

Существует и множество других курсов, их прям реально стало очень много, поэтому можно выбирать на свой вкус. Еще вот это исследование можно глянуть https://vc.ru/hr/82631-issledovanie-rynka-analitikov
