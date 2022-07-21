# Errors

## REST errors

### fetch

- fetch returns a promise, it will never throw an error outside of an async function with await
- A fetch() promise will reject with a TypeError when a network error is encountered or CORS is misconfigured on the server-side, although this usually means permission issues or similar — a 404 does not constitute a network error, for example. An accurate check for a successful fetch() would include checking that the promise resolved, then checking that the Response.ok property has a value of true.
- tl.dr: fetch is unlikely to reject a promise when properly configured and under normal conditions.
- Fetch will not automatically reject a promise on 4xx/5xx status codes like axios, `response.ok` or `response.status` must be checked and the promise manually rejected

```js
  const req = fetch(url).then((res) => {
    if (res.ok) {
      return res;
    }
    throw new Error('Error happened');
  });
```

- Proceeding promise chaining can add a catch and be able to intercept this error now.
- Note that chrome dev tools will report 4xx/5xx as errors in the console whether or not they've been thrown manually. This can be a source of confusion when the console reports the error, but they seemingly can't be caught.

### typescript

- Although typescript can allow (semi-)exhaustive typesafe(ish) error handling like kotlin/rust etc it can be onerous to set up
- Happy medium standardizes REST errors using tagged union (similar to tagged structs in c)

```ts
interface ErrorBody {
  errorCode: number;
  errorMessage: string;
}

interface Response<T> {
  status: number;
  isError: boolean;
  body: T;
}

interface ErrorResponse extends Response<ErrorBody> {
  isError: true;
}

interface SuccessResponse extends Response<Record<string, string>> {
  isError: false;
}

type RESTResponse = ErrorResponse | SuccessResponse;

const test1: ErrorResponse = {
  status: 400,
  isError: true,
  body: {
    errorCode: 132,
    errorMessage: 'awdawdawd',
  },
};

const test2: SuccessResponse = {
  status: 200,
  isError: false,
  body: {},
};

const test3: RESTResponse = test1;
const test4: RESTResponse = test2;

```

- Now in the rest of the code `isError` or a type gaurded function can be used to discriminate (and inform the type system) whether we are working with a ErrorResponse or SuccessResponse
