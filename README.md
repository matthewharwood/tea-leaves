# tealeaves-rudd

## Fetch dependencies
```
npm run bootstrap
```



## Start localtouch gulpfile.js Development
```
npm start
http://localhost:8080/
```

## Make Production Bundle
```
npm run build
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

**Using Pug for all HTML templating.**
```
src/public/*.pug
```

**Using PostCSS for all CSS.**
```
//TODO
```