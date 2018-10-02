![alfred](alfred.jpg)

Redux Middleware to dispatch several actions at once, by [Victor Buzzegoli](https://twitter.com/victorbuzzegoli)

Lightweight, Powerfull, _MMMM_ compliant (check out : [Modern Modular Middleware Model](https://github.com/vbuzzegoli/4m))

## Installation

To install **Alfred** in your project, navigate to your project folder in your terminal and run :

    npm i --save redux-alfred

## Setup

To start using **Alfred**, you will first need to apply the middleware to your store, just like any redux middleware :

```javascript
    ...
    import alfred from "redux-alfred";
    ...
    export default createStore(rootReducer,applyMiddleware([alfred]));
```

## Usage

> Using ES6+ syntax

```javascript
    import * as actions from "../constants/action-types";

    export const someAction = () => {
        type: actions.DISPATCH_GROUP,
        payload: 0,
        alfred: {
            actions: [
            	{type: actions.ANOTHER_ACTION, payload: 0},
            	{type: actions.YET_ANOTHER_ACTION, payload: 0}
            ]
        }
    }
```

> `actions` must be an **array** of action to be dispatched

> Note that by default the _parent action_ DISPATCH_GROUP will not be forwarded to the next middleware / reducer. If this action needs to be dispatched as well, it can be added as an action in `alfred.actions`.

#### Behaviour

-   Use `onDispatch` and `onError` to override the default behaviour

> Note that these functions are called **reactions**, accordingly to the [Modern Modular Middleware Model](https://github.com/vbuzzegoli/4m). Therefore they contain a `next` argument that can be use to release an action to the reducer (or next middleware). They can be used like :

In `/reactions` :

```javascript
export const customReaction = (action, next, dispatch) => {
	console.log("Will be dispatched :", action);
	next(action);
};
```

In `/actions` :

```javascript
    import * as actions from "../constants/action-types";
    import { customReaction } from "../reactions/customReaction";

    export const someAction = () => {
        type: actions.DISPATCH_GROUP,
        payload: 0,
        alfred: {
            actions: [
            	{type: actions.ANOTHER_ACTION, payload: 0},
            	{type: actions.YET_ANOTHER_ACTION, payload: 0}
            ]
        }
    }
```

-   Use `log: true` to print the middleware logs in the console

Here is a overview of every options possible:

```javascript
    alfred: {
        actions: [
            {type: actions.ANOTHER_ACTION, payload: 0},
            {type: actions.YET_ANOTHER_ACTION, payload: 0},
            ...
        ],
        log: true,
        onDispatch: (action, next, dispatch) => {
            //...
        },
        onError: (prevAction, next, dispatch) => {
            //...
        }
    }
```

## Version

1.0.1

## License

**The MIT License**

Copyright 2018 - Victor Buzzegoli

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contact

[@victorbuzzegoli](https://twitter.com/victorbuzzegoli) on Twitter
