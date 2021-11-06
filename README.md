## npm-caret-checker

This package will check the "^" mark at the beginning of the version in some kind of dependencies in package.json and will give an error if it is present

install

```sh
$ npm install -g npm-caret-checker
```


if current directory exists package.json
```sh
$ npm-caret-checker
```

use **--path=<path to package.json></path>**
```sh
$ npm-caret-checker --path=~/path/to/package.json