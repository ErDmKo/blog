---
title: 'React как использовать useState для объектов'
cover: 'cover.jpg'
date: '2023-03-25T14:52:00.000Z'
tags: ['react', 'js', 'typescript']
---
Небольшой текст о том, как можно быстро и коротко манипулировать объектами в состоянии React хуков.
<!--more-->
Задача на самом деле очень популярная, так как React компоненты зачастую состоят из нескольких элементов, и манипулировать нужно не одним элементом, а несколькими. Создавать для каждого отдельного компонента отдельный хук состояния не хотелось бы.
Хук useState из "коробки" предоставляет возможность читать и изменять состояние примитивного кусочка, такого как строка, цифра, флаг.

```tsx
import React, { useState } from 'react';

const MyComponent = () => {
  const [counter, setCounter] = useState(1);

  return <h1 
    onClick={() => setCounter((prev) => prev+1)}>
    {counter}
    </h1>
}
```

В примере выше я создаю React компонент который отрисовывает цифру в h1 элементе. А так же тут есть и не большая динамика, при клике по этому заголовку счетчик увеличивается. Это и есть канонический пример использования этого хука в документации.
Далее рассмотрим более сложный пример:

```tsx
import React, { useState } from 'react';

const MyComponent = () => {
  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  return (
    <div>
      <div>
        <label>A</label>
        <input onChange={
          (e) => setA(e.target.value)
        } value={A} type="number" />
      </div>
      <div>
        <label>B</label>
        <input onChange={
          (e) => setB(e.target.value)
        } value={B} type="number" />
       </div>
      <div>Sum{A+B}</div>
    </div>
}
```

По задумке автора это бы "калькулятор". Компонент который считает сумму 2 чисел введенных в калькулятор. Но тут есть несколько проблем первая очевидная, если выпольнить этот код в браузере, то сумма 1 и 2 будет равна 12 вместо 3, потому что JS будет считать типы данных считанных с input строками несмотря на type="number". Чтобы решить эту проблему нужно использовать [valueAsNumber](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement) свойство input элемента вместо обычного value или же функцию parseInt/parseFloat для приобразования строк в числа.
Самое интересное на что я бы хотел обратить внимание тут что если у нас не 2 числа а множество, не один кусок состояния, а что если нам нужно как либо образом валидировать состояние осуществлять трансформации в стиле строка в число? Для ответа на эти вопросы рассмотрим следующий пример

```tsx
import React, { useReducer } from 'react';

const MyComponent = () => {
  const [state, setState] = useReducer(
    (prev, next) => {
      const newState = {
        ...prev,
        ...next,
      };
      const bNumber = parseInt(newState.B);
      const aNumber = parseInt(newState.A);
      newState.sum = bNumber + aNumber;

      return newState;
    },
    {
      A: 0,
      B: 0,
      sum: 0,
    }
  );
  return (
    <div className="App">
      <div>
        <label>A</label>
        <input
          onChange={(e) => setState({ A: e.target.value })}
          value={state.A}
          type="number"
        />
      </div>
      <div>
        <label>B</label>
        <input
          onChange={(e) => setState({ B: e.target.value })}
          value={state.B}
          type="number"
        />
      </div>
      <div>Sum "{state.sum}"</div>
    </div>
  );
```

В этом примере исправлены обе проблемы из предидущего примера и в тоже время теперь мы не создаем множество хуков а используем только один useReducer. Этот хук позволяет реагировать на изменения состояния составных объектов, при этом он знает о предидущем состоянии что позволяет менять состояние частично, вместо передачи всего состояния в случае useState:

```tsx
  ...
  const [state, setState] = useState({a: 0, b: 0});
  ...
  setState({...state, a: 1})
  ...
```

А так же внутри функции редюсера можно проводить трансформации и валидации нового состояния перед его изменением.

На этом все надеюсь этот трюк поможет вам в написании кода.

