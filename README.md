# Oak Response is Not Writable

## How to Run

```
./application.ts
```

This will start up the basic Oak server on port 8000. You must have Deno already installed.

## Broken Routes

- <http://localhost:8000/broken-view>
  - This route returns the response is not writable error
  - Sometimes the server does not respond at all

## Working Routes

- <http://localhost:8000/view>
  - This route usually works
  - Sometimes the server does not respond at all
- <http://localhost:8000/>
  - This route works
