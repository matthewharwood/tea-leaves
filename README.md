# tealeaves-rudd

## Fetch dependencies
```
npm install
```

## Run Webpack
```
npm run build
```

## Start http-server
```
npm start
http://localhost:8080/
```
## Testing
```
npm run test
```

##Notes:
**Using fastdom for all dom manipulations.**
```
element.clientWidth; // throws
fastdom.mutate(function() { element.clientWidth; }); // throws
fastdom.measure(function() { element.clientWidth; }); // does not throw
```

**Using typescript for all js.**
```
element.clientWidth; // throws
fastdom.mutate(function() { element.clientWidth; }); // throws
fastdom.measure(function() { element.clientWidth; }); // does not throw
```


**Using PostCSS for all CSS.**
```
//TODO
```