The codelab instructions are built with the [Google Codelab tool named claat](https://github.com/googlecodelabs/tools).

## Install

**Prerequisite:** Docker.

For use watch commande, install fswatch (https://github.com/emcrisostomo/fswatch)

Install the codelab generator tool image:
```
make install
```

## Usage

Now you can build the codelab static files:
```
make build
```

You can also serve the codelab on http://localhost:9090/ :
```
make serve
```

For use watch rebuild and serve :
```
make watch
```

## Codelab format guide

https://github.com/googlecodelabs/tools/blob/master/FORMAT-GUIDE.md