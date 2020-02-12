# Labs Svelte

## Démarrage

Installer les dépendances

```bash
npm install
```

...Ensuite démarrez [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Ouvrez le navigateur sur l'adresse [localhost:5000](http://localhost:5000). Vous devriez voir l'application lancée. Edit a component file in `src`, save it, and reload the page to see your changes.

## Construire et lancer l'application

Pour créer une version optimisé de l'application :

```bash
npm run build
```

Vous pouvez maintenant lancer l'application construite  avec `npm run start`.

## Deployer sur le web

### Avec [now](https://zeit.co/now)

Installez `now` si vous ne l'avez pas déjà :

```bash
npm install -g now
```

Ensuite, dans le répertoire de votre projet :

```bash
cd public
now deploy --name my-project
```

### Avec [surge](https://surge.sh/)

Installez `surge` si vous ne l'avez pas déjà :

```bash
npm install -g surge
```

Ensuite, dans le répertoire de votre projet :

```bash
npm run build
surge public my-project.surge.sh
```
