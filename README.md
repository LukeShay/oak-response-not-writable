# Oak Response is Not Writable

## How to Run

```
./application.ts
```

This will start up the basic Oak server on port 8000. You must have Deno already installed.

## Broken Routes

- <http://localhost:8000/broken-view>
  - This route returns teh response is not writable error
- <http://localhost:8000/redirect?code=thisisacode>
  - This route returns teh response is not writable error

## Working Routes

- <http://localhost:8000/view>
  - This route usually works
- <http://localhost:8000/>
  - This route works
