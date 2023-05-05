---
title: "Функционатьльное программироввание"
date: 2023-04-20T16:15:53+02:00
draft: true
---

## Базовые блоки

Минимальный набор функций
Функция которая ничего не делает - полезна когда нужно ничего не делать.
```ts
const noop = () => {};
```

Простая функция принимает один аргумент и тут же его возвращает. Тут пригодиться чтобы вытаскивать значения из замыкания.
```ts
const idFn = (a) => a;
```

"Самая важная" функция принимает сначала аргумент, а потом функцию и выполняет эту функцию с аргументом.
```ts
const cont = (arg, fn) => fn(arg);
```

Один из возможных вариантов функции каррирования. Принимает функцию а затем последовательно два ее аргумента и выполняет функцию от двух аргументов.
```ts
const curry2 = (fn) => firstArg => secontArg => fn(firstArg, secontArg);
```

Каррируем "самую важную" функцию и получаем магическую спобность хранить первый аргумент в замыкании. Назавем эту функцию "задача".
```ts
const task = curry2(cont);
```

## Последовательное исполнение
```ts
const plusOne = (prevResult) => {
  return task(priviousResult + 1);
}

const result = task(1)(plusOne)(plusOne)(idFn)
```
На выходе будет 3!

Функция для последовательного выполнения других функций
```ts
const pipe = (...fnList) => {
  return (...args) => {
    let newArgs = fnList.shift()(...args);
    for (let i = 0; i < fnList.length; i++) {
      newArgs = fnList[i](newArgs);
    }
    return newArgs;
  }
}
```


## Инструменты для работы с синхронным кодом

```ts
const taskFork = (resolve, reject = noop) => fn => {
  try {
    return fn(resolve, reject);
  } catch (e) {
    return reject(e);
  }
};
```
Пример функции "может быть" (maybe) по сути это таже самая важная функция но теперь это два аргумента и функция. Так же тут есть немного смысла, в плане самих аргументов подразумеваетя что это функции одна из них будет выполнена если произошло исключение другая может выполнена внутри функции fn.
```ts
const taskOf = (fn) => (...args) => task((resolve) => resolve(fn(...args)))
```
Функция "трансформер", которая превращает обычную функцию в задачу.

```ts
const someDangerous = taskOf((num) => {
  if (num > 2) {
    throw new Error('hi')
  }
  return num + 2;
});
```
Пример использованя трансформер

```ts
someDangerous(2)(taskFork(idFn))

```
Пример использованя "может быть" функции. Где исключение будет скрыто 
```ts
const taskMap = curry2((mapFn, fn) => task((resolve, reject) =>
  fn((result) => resolve(mapFn(result)), reject)
))
```
Функция для создания цепочек синхронных модификаций результатов работы задач.
```ts
const getTwoTask = taskOf(idFn.bind(null, 2));
const multipyTwoTask = taskMap((priviousResult) => {
  return priviousResult * 2;
});
const throwTask = taskMap((priviousResult) => {
  throw new Error('Hello from throw task');
});
const resultTask = getTwoTask(multipyTwoTask)(multipyTwoTask);

const result = resultTask(taskFork(idFn, noop));
```
Чему буде равна переменая result?

## Инструменты для работы с асинхронным кодом

```ts
const taskChain = curry2((chainFn, fn) => 
  task((resolve, reject) => 
    fn((result) => chainFn(result)(taskFork(resolve, reject)), reject)
  )
);
```
Функция для создания цепочек ассинхронных модификаций результатов работы задач.
```ts
const delay500 = taskChain((priviousResult) => task((resolve, reject) => {
    setTimeout(() => {
      resolve(priviousResult)
    }, 500);
}));
const res = getTwoTask(delay500)(multipyTwoTask)(taskFork((result) => {
  console.log(result)
}))
```
Что будет в res что будет выведено через 500ms в консоль?

```ts
const asyncDangeruos = task((resolve, reject) => {
  const resolver = taskFork(resolve, reject);
  const timeoutFn = task(() => {
    throw 'hi';
  });
  setTimeout(timeoutFn.bind(resolver), 100);
});
```


