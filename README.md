## About
`try/catch` but better. Typescript included.

## Why

The `async/await` API is great. But declaring mutable variables and reassigning them inside of `try/catch` blocks isn't.
Not to mention the verbosity of `try/catch`, AND handling the caught `unknown` error!

### Before
```ts
let result;

try {
    result = await someAsyncFunction();
} 
catch (err) {
    // depending on your tsconfig, `err` may be `any` or `unknown`
    console.log((err as Error).message);
    return;
}

// conclusion: EW!
```

### After
```ts
import { tri } from "try-v2";

const [err, result] = await tri<TypeError>(someAsyncFunction());

if (err) {
    console.log(err.message);
    // TypeError
    return;
}


// conclusion: YAY!
```

## Install
```shell
npm i try2
pnpm i try2
yarn add try2
```

## Examples

### Promises
```ts
// async by default
import { tri } from "try-v2";

// using a function that returns a resolved Promise<string>
const [err1, result1] = await tri(() => Promise.resolve("hello"));

typeof result1
// string | undefined

if (err1) {
    // handle error
    return;
}

typeof result1
// string

console.log(result1)
// "hello"

// using a rejected Promise<string>
const [err2, result2] = await tri(Promise.reject("error"));

typeof result2
// string | undefined

if (err2) {
    console.log(err2.message)
    // "error"
    return;
}

typeof result2
// string, but error branch is run instead 
```

### Sync
```ts
import { triSync } from "try-v2";

const [err1, result1] = await triSync(() => throw new Error("error"));

typeof result1
// string | undefined

if (err1) {
    console.log(err1.message)
    // "error"
    return;
}

typeof result1
// string, but error branch is run instead
```


## Documentation
Sorry, no docs. Read [Examples](#examples). Or the 17 lines of code.

