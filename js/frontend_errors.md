# Frontend Errors

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

- Now in the rest of the code `isError` or a type guarded function can be used to discriminate (and inform the type system) whether we are working with a ErrorResponse or SuccessResponse

## React Errors

React handles errors differently depending on whether they are in the main render flow vs a handler/callback/async operation. 

### Main Flow Errors
- The main render flow is the body of a functional component, as well as any hooks and their synchronous callbacks
- A main flow error will crash the app if not handled.
- Typically either allowed/purposely made to occur, or occurs from unforseeable problems or that couldn't be try/catched because it would break rules of react.

```tsx
export function Index() {
  throw new Error();
  return <></>;
}
```

```tsx
export function Index() {
  const err = () => throw new Error();
  err();
  return <></>;
}
```

```tsx
export function Index() {
  const err = () => throw new Error();
  useEffect(err, []);
  return <></>;
}
```

```tsx
export function Index() {
  const err = () => throw new Error();
  useEffect(() => err, []);
  return <></>;
}
```

- To handle these errors we use React ErrorBoundary's. These can be global, for a typical 500 page, or local for sub tree based error handling
- In development mode these errors will be caught by react dev tools and the error over lay displayed, in production it leads to a blank screen

### Secondary Errors
- All event handlers, and promise/async based operations are handled in their own context and errors will not propagate to main flow
- Secondary flow errors will not crash the app if not handled
- Secondary errors can be brought into the main flow using a function that rethrows the error in the main flow.

```tsx

function Index() {
  const rethrow = (error) => throw error;
  const onClick = () => {
    try {
      willError();
    } catch(e) {
      rethrow(e);
    }
  }
  return <div onClick={onClick}></div>;
}
```

- Bringing secondary errors into the main flow is typically used to either hit a global error statistics collector or to trigger an ErrorBoundary on a sub tree that will replace the comoponent when there's an error. For example, if a charts data source errors out, the chart could be replaced with a try again prompt.
- In development mode these errors will be caught by react dev tools and the error over lay displayed, in production the feature will not work, but probably not crash the app.

### Error Handling
- In a well architected, type checked react application we should (in theory) only be concerned with errors that result from REST calls.
- REST call errors should fall in one of several categories:
  1. Our request didn't reach the server, due to rare network related issues
  2. Our request reached the server, but timed out (self aborted request)
  3. Our request reached the server, but there was a problem (5xx)
  4. Our request reached the server, but we asked for the wrong thing (4xx)
- Handling these errors must be done on a case by case basis, and depends on the severity or overall impact of the failed request
- As stated previously, error types 3 and 4 will only occur when using fetch if we self throw
- This allows us to selectively handle type 3/4 errors either as success states or error states depending on the situation.
  - This approach has selective benefits in general react applications, for example 403 for auth issues, however when using a higher level framework like Next.js, authorization issues would typcally be handled during server side rendering, redirecting to an accessible page. For example attempting to access an admin dashboard could redirect to a denial page or login depending on current auth status.
- Type 1/2 errors could be handled with re-tries
- Type 2-4 errors could be handled with component replacement or someform of notificiation
- Type 1/3 errors are the biggest candidates for a 500 pages
- Type 4 errors can be handled with a 400 page
- With Nextjs and server side rendering we're most likely to have to handle type 1-3 errors
- With a PWA consideration changes again, type 1-3 errors have different handling scenarios depending on whether they are pull or push requests.
  - With a PWA we effectivelly never want to hit a 4xx/5xx page
  - Pull request errors should be handled with notification of dis-connectivity and queuing of background tasks, add request to background task queue and when the request successfully completes sometime in the future, notify the user. For this time certain features, or data items may not be accessible.
  - Push request errors should be handled much the same way, except consideration needs to be given to whether push'ed data should be accessible to the user for further interraction. For example, if a user adds a todo while connectivity is down, should that todo item show up in their todo list? Should they be able to make changes to the todo while it's in a uncertain state. Should other interactions be allowed to build upon the todo, for example by including it in a collection of other todos.

### Error Handling Examples
```tsx
// inline try/catch for synchronous errors will work but should be avoided
// there's very few if any valid reasons to call a synchronous function that may throw
// in the main body of your component
function Index() {
  try {
     mayThrow();
  catch(e) {
    // do something
  }
  return <></>;
}
```

```tsx
function Index() {
  const func = () => {
    try {
      mayThrow();
    } catch(e) {
      // do something
    }
  }
  return <></>;
}
```

```tsx
function Index() {
  const get = () => {
    fetch(url)
      .then(// do something)
      .catch(// do something);
  }
  return <></>;
}
```

```tsx
function Index() {
  useEffect(() => {
      try {
        mayThrow();
      } catch(e) {
        // do something
      }
    }
  }, []);
  return <></>;
}
```

```tsx
function Index(props) {
  const { data, error, isLoading } = useApi();
  if(isLoading) return <Spinner />;
  return <>
    {error ? error : data}
  </>;
}
```

```tsx
function Fallback() {
  return <div>There was an error</div>;
}

function Main(props) {
  const rethrow = (error) => throw error;
  const getData = async () => {
    try {
      mayThrow()
    } error(e) {
      rethrow(e);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return <></>;
}

// This can be done for any component, so can be used for global error catching or for sub component with retry
function Index() {
  return <ErrorBoundary fallback={Fallback}>
    <Main />
  </ErrorBoundary>
}
```

## Next.js Errors
- Next.js handles main and secondary errors the same as vanilla react, but with it's own error overlay
- Can potentially eliminate many type 1-4 errors from ever happening in client by managing error handling in ssr handler.
  - can handle many errors through either redirection or managing component error state with props
- All other errors are handled normally
