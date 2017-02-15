informer
======

> informer - [nodejs](http://nodejs.org) library

## Install

    $ npm install informer

## Usage

``` js
var informer = require("informer");
```

Set title (default is "[informer]")

``` js
informer.title("new title");
```

Set title color (default is "green")

``` js
informer.titleColor("cyan");
```

Output methods

``` js
informer.error("Some error text") // outputs red text
informer.info("Some info text") // outputs blue text
informer.loading("Some loading text") // outputs grey text
informer.success("Some success text") // outputs green text
informer.warning("Some warning text") // outputs yellow text
```

### Colors & Styles

Available colors and styles

- bold
- italic
- underline
- inverse
- yellow
- cyan
- white
- magenta
- green
- red
- grey
- blue
- rainbow
- zebra

## Development

### Install dependencies

    $ make install

### Run tests

    $ make test

## License

(The MIT License)
see LICENSE file for details...