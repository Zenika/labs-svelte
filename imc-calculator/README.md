# svelte app

To create a new Svelte project 

```bash
# create a new project in the current directory
npm init vite
# Pick JavaScript, or TypeScript: it's up to you!
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

```bash
npm run dev
```

Navigate to [localhost:5173](http://localhost:5173). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run preview`.

## Deploying to the web

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
