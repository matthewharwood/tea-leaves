# tealeaves-rudd

## Fetch dependencies
```
npm run bootstrap
// if this fails:
// npm install gulp-cli gulp postcss-cli -g
// npm install
// npm start
// If that fails ping me or read the console errors prob missed a dependancy.:
```



## Start localtouch gulpfile.js Development
```
npm start
http://localhost:6969/

```

## Make Production Bundle
```
npm run build
```

##Notes:
**When adding a new file**
```
gulp html //for html
gulp css //for css
```
**When something just doesnt feel right restart server**
```
npm start
```

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