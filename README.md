gulp-rev-append-any
---
Plugin based on gulp-rev-append for prevent cache in wordpress theme's

how?
---
_gulpfile.js_
```
var rev = require('gulp-rev-append-any');

gulp.task('rev', function() {
  gulp.src('./index.html')
    .pipe(rev())
    .pipe(gulp.dest('.'));
});

```

_terminal_
```
$ gulp rev
```

what?
---
The plugins allows for appending a query-string file hash to dependencies declared in html files defined using the following regex: `(?:href=|src=|url\()['|"](.*)\?rev=([^\s>"']+?)['|"]`

That's fancy talk for any stylesheet or script declarations that are declared in an html file such as the following:

```
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url');?>/style/style-one.css?rev=@@hash">
    <script src="<?php bloginfo('template_url');?>/script/script-one.js?rev=@@hash"></script>
    <script src="<?php bloginfo('template_url');?>/script/script-two.js"></script>
  </head>
  <body>
    <div><p>hello, world!</p></div>
    <script src="<?php bloginfo('template_url');?>/script/script-three.js?rev=@@hash"></script>
  </body>
</html>
```

will turn into something similar as the following after running `gulp-rev-append-any`:
```
<!doctype html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url');?>/style/style-one.css?rev=efeb4be9cf">
    <script src="<?php bloginfo('template_url');?>/script/script-one.js?rev=57d7130d96"></script>
    <script src="<?php bloginfo('template_url');?>/script/script-two.js"></script>
  </head>
  <body>
    <div><p>hello, world!</p></div>
    <script src="<?php bloginfo('template_url');?>/script/script-three.js?rev=Pc3df4sfFb"></script>
  </body>
</html>
```

The only requirement is that the dependency to be appended with the hash be declared using `?rev=`. The `@@hash` is not required, and any value will be overriden as the dependency file contents change.


