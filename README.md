## npm-caret-checker

This package will check the "^" mark at the beginning of the version in some kind of dependencies in package.json and will give an error if it is present

install

```sh
$ npm install -g caret-check
```


if current directory exists package.json
```sh
$ caret-check
```

use **--path=<path to package.json></path>**
```sh
$ caret-check --path=~/path/to/package.json