summary: Devenir svelte avec Svelte
id: build
authors: Patrice de Saint Steban & Thomas Sauques
Feedback Link: https://zenika.com
analytics account:

# Devenir svelte avec Svelte
<!-- ------------------------ -->
## Overview
Duration: 10

### Ce que vous allez apprendre ?
- Installation du framework
- Création d'un premier composant
- Passer des paramètres
- Utilisation de la réactivité
- Templating
- Events et binding
- Cycle de vie des composants
- Stores et contexte
- Animations

### Présentation de Svelte

Svelte est un compilateur plus qu'un framework, il ajoute du sucre syntaxique a du code javascript pour développer des applications.
Il va ainsi pouvoir instrumentaliser le code pour ajouter des instructions pour mettre à jour le template lors de changement des données.

Sur le site de [svelte](https://svelte.dev/), un REPL (Read Eval Print Loop) permet de tester en direct du code svelte et voir le code généré.
De même un [tutoriel](https://svelte.dev/tutorial/basics) permet d'apprendre les base du framework pas à pas.

Un fichier svelte (fichier avec une extension .svelte) ressemble à un fichier html qui va contenir les balises html de notre template, une balise `<script>` contenant le code javascript, ainsi qu'une balise `<style>` contenant le style CSS.

Par exemple :
```html
<script>
	let name = 'world';
</script>

<style>
	h1 {
		color: red;
	}
</style>

<h1>Hello {name}!</h1>
```


### Créer un projet svelte

Comme Svelte est un compilateur, il est nécessaire de le lancer pour pouvoir transformer les fichiers .svelte en fichier javascript et css.

Svelte est capable de s'intégrer avec tous les package buddler existant comme webpack ou rollup.

Ils fournissent des templaces pour créer le squelette d'une application, et propose d'utiliser `degit` un utilitaire qui télécharge les fichiers d'un repos git sans l'historique.

Pour créer un projet avec rollup il suffit alors de saisir les lignes de commandes suivantes :
```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
```

Vous aurez alors un projet de base avec les outils pour lancer l'application en développement ou construire l'application à deployer.


### Le projet pour ce codelab

Après ce rapide introduction à Svelte, nous allons créer pour ce codelab un projet pour calculer son IMC (Indice de Masse Corporelle)

Positive
: L'indice de masse corporelle ou IMC (en anglais, body mass index ou BMI) est une grandeur qui permet d'estimer la corpulence d’une personne. Inventé au milieu du xixe siècle par Adolphe Quetelet, mathématicien belge et l'un des fondateurs de la statistique moderne, cet indice est appelé aussi l'indice de Quetelet.

La formule pour calculer l'IMC est le poid divisé par la taille au carré.

<!-- ------------------------ -->
## Créer votre première application
Duration: 10

### Initialiser le projet
Comme on l'a vu lors de la première étape, nous allons initialisé notre application en partant d'un template. Nous avons créer un template pour le codelab qui va contenir des éléments qui seront utilisé directement par votre application.

```bash
npx degit zenika/labs-svelte/template labs-svelte
cd labs-svelte
npm install
```

### Découvrir ce qui a été généré
Vous vous retrouvez avec une application simple, voici les différents fichiers que l'on peut retrouver :

- **package.json** : Contient les dépendances, ainsi que les script `dev` (pour lancer le projet en développement) ou `build` (pour construire l'application final)
- **rollup.config.js** : Configuration pour le packageur d'application configurer pour utiliser svelte
- **public** : Les resources statiques du projet, cela contiendra alors le fichier bundle.js et bundle.css avec votre application compilé
- **src**: Les fichiers sources de l'application où l'on ajoutera les différents composants
  - **main.js** : Fichier javascript qui initialise l'application
  - **App.svelete** : Premier composant svelte qui s'affiche sur notre application, c'est dans ce fichier que nous allons modifier le long de notre application.

### Lancer le projet

Maintenant lançons le projet :
```bash
npm run dev
```

En ouvrant le navigateur à l'url http://localhost:5000/ vous verrez la page de notre application  :

//TODO mettre une capture de l'application

### Modifier et voir le résultat

Maintenant entrons dans le vif du sujet et ouvrez le fichier **App.svelte**, et modifier la variable `name` pour y mettre votre nom :

```javascript
  let name = "Votre nom"
```

L'application sera automatiquement rafraichis avec les changements que vous avez fait et vous devriez avoir le texte "Bonjour Votre nom" qui s'affiche à l'écran.

Passons maintenant à l'étape suivante, pour créer notre premier composant.

<!-- ------------------------ -->
## Créer un composant
Duration: 5

Nous allons maintenant créer notre premier composant, pour cela créer un nouveau fichier **Imc.svelte** dans le répertoire `src`.

Dans ce fichier, mettre du code html pour afficher un simple texte :

```html
<div>Votre IMC est de 20</div>
```

Dans le fichier **App.svelte**, ajouter simplement l'import de notre composant Imc :

```javascript
import Imc from './Imc.svelte'
```

Positive
: Mettre ce code javascript entre les balise html `<script></script>`

On peut maintenant utiliser notre composant Imc directement dans notre contenu html :

```html
	<Imc />
```

On se retrouve maintenant avec une page qui contient affiche maintenant notre texte "Votre IMC est de 20".

Maintenant, il faudrait que ce texte soit plus dynamique et qu'il puisse être configurer en fonction du poid et de la taille.

<!-- ------------------------ -->
## Mettre des variables et afficher dans un template
Duration: 10

Dans notre fichier **Imc.svelte**, nous allons ajouter deux variables pour définir le poid et la taille, et afficher ensuite le calcul de l'IMC à la place de notre texte html statique.

Pour cela, ajoutons une balise script, contenant deux déclarations de variable :

```html
<script>
  let poid = 80;
  let taille = 1.80;
</script>
```

Nous pouvons maintenant afficher ces variables dans le html en utilisant la syntaxe `{variable ou expression}`

```html
<div>Votre IMC ({poid}/{taille}<sup>2</sup>) est de {(poid / taille ** 2).toFixed(2)}</div>
```

Positive
: La formule de l'IMC est le poid en kilo divisé par la taille en métre au carré.

Analysons le code ci-dessus :
`{poid}` ou `{taille}` sera remplacé par le contenu de la variable poid ou taille
`{(poid / taille ** 2).toFixed(2)}` Fait plusieurs actions :
 - `(poid / taille ** 2)` : Calcule de l'IMC (l'opérateur ** permet de faire une puissance en javascript)
 - `.toFixed(2)` : Convertis le nombre en chaine de caractère en ne gardant que deux chiffres après la virgule
 - `{}`: Affiche le résultat dans le html

Vous pouvez maintenant faire évoluer la valleur des variables poid ou taille et voir le résultat du calcul de l'IMC en rafraichissant la page.

Ce composant même si il permet de faire le calcule n'est pas utilisable dans une application, car il utilise des variables locales à celui-ci.
Voyont maintenant comment paramètrer ces variables pour permettre de recevoir ces valeurs en entrée du composant.

<!-- ------------------------ -->
## Attributs d'un composant
Duration: 10

Pour qu'un composant svelte reçoivent des entrée via des attributs html, il sufit simplement que ce composant possède des variables préfixé par le mot clé `export`.

Positive
: En javascript, le mot clé `export` permet d'indiquer que la variable ou la fonction est accéssible à l'exterrieur du fichier (du module). Svelte l'utilise pour définir les entrées des composants.

Une fois ajouté ce mot clé :
```html
<script>
  export let poid = 80;
  export let taille = 1.80;
</script>
```

On peut maintenant faire passer les valeurs par des attributs html à notre composant :
```html
<Imc poid=100 taille=1.9 />
```

Il est bien sûr possible que cet attribut devienne dynamique :
```html
<Imc poid={monPoid} {taille} />
```
Ici :
- `poid={monPoid}` : on passe le contenu de la variable `monPoid` dans l'attribut `poid`
- `{taille}` : écriture symplifié de `taille={taille}`


<!-- ------------------------ -->
## Conditions d'affichages
Duration: 10

Ajoutons maintenant un message qui précise notre état de corpulence en fonction de l'IMC.

Positive
: Le rapport taille sur le poid au carré qui est considéré comme une corpulence est compris entre 18 et 35. Au delà, on est en surpoid et inversement en sous-poid si l'on est en dessous.

On veut donc ajouter un message en fonction de notre IMC. Svelte permet d'ajouter des conditions dans un template avec la syntaxe `{#if condition}{:else if condition}{:else}{/if}`

Commençons par créer une variable pour calculer l'IMC et pouvoir réutiliser cette valeur dans notre condition :

```javascript
let imc = (poid / taille ** 2).toFixed(2)
```

On peut ensuite ajouter dans le code html, un ensemble de conditions pour afficher un message :

```html
<div>Votre IMC est de {imc}</div>
{#if imc < 18}
  <div>Vous êtes en sous poids</div>
{:else if imc > 35}
  <div>Vous êtes en sur poids</div>
{:else}
  <div>Quel corps svelte !</div>
{/if}
```

<!-- ------------------------ -->
## Ajouter du styles
Duration: 10

Maintenant que l'on affiche un petit message explicatif en fonction de l'IMC, on aimerais différencier ces messages via un système de couleur :
- *orange*: Si l'IMC est inférieur à 18
- *rouge*: Si l'IMC est suppérieur à 35
- *vert*: Si on est dans fourchette d'un IMC normal

Pour cela, on va se créer 3 classes CSS. On peut soit mettre ces classes dans le fichier `global.css` qui se trouve dans le répertoire public. Les classes seront alors disponible pour toute l'application. Mais si je veux ajouter du css directement dans notre composant, il suffit d'ajouter la balise `<style></style>` dans votre fichier `Imc.svelte` et d'y ajouter votre code CSS :

```css
  .normal {
    color: green
  }

  .surpoid {
    color: red;
  }

  .souspoid {
    color: orange;
  }
```

Il faut maintenant ajouter les classes CSS dans le code html ajouté précédement :

```html
<div>Votre IMC ({$poid}/{$taille}<sup>2</sup>) est de {$imc}</div>
{#if $imc < 18}
  <div class="souspoid">Vous êtes en sous poids</div>
{:else if $imc > 35}
  <div class="surpoid">Vous êtes en sur poids</div>
{:else}
  <div class="normal">Quel corps svelte !</div>
{/if}
<style>
  .normal {
    color: green
  }
  .surpoid {
    color: red;
  }
  .souspoid {
    color: orange;
  }
</style>
```

Svelte va automatiquement ajouter une classe généré sur chaque composant, et le css sera automatiquement scopé avec cette classe.
Si un autre composant déclare aussi une classe CSS `.normal` chaque composant n'auront pas le même style css et il n'y aura pas de collisition.

<!-- ------------------------ -->
## Créer un formulaire
Duration: 10

Pour l'instant, le poid et la taille sont définit comme des attributs du composant `Imc` mais ne sont pas éditable, ce qui n'est pas très pratique pour proposer à nos utilisateurs de calculer notre IMC.
Il est donc nécessaire de créer un formulaire pour pouvoir saisir notre poid et notre taille et ainsi pouvoir calculer notre IMC.

## Nouveau composant
Commençons par créer un nouveau composant que nous nomerons `Form.svelte`.

Ce composant contiendra un formulaire simple avec deux sliders pour définir notre poid et notre taille :

```html
<form>
  <label> Poid ({poid} kg) :
    <input type="range" min="10" max="200" step="5" />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
    <input type="range" min="0.5" max="2.5" step="0.01" />
  </label>

  <input type="submit" value="Calculer" />
</form>
```

Ajoutons maintenant ce formulaire dans notre composant principale `App.svelte`, en important notre composant :
```javascript
 import Form from './Form.svelte'
```

Puis au dessus du composant `<Imc />` notre composant `<Form />`

## Récupérer les valeurs

Mais pour l'instant, on ne récupère pas les valeurs du formulaire.
Svelte vous propose une syntaxe pour s'abonner aux évènements d'un composant, en utilisant le préfix `on:` sur le nom de l'évènement, ainsi que la fonction à appeler entre accollade `{submit}` ou une fonction lambda `{event => changeEvent(event.target.value)}`

```html
<input on:input={saveChange} />
<button on:click={submit}"/>
<div on:mousemove={event => handleMousemove(event.clientX, event.clientY)}></div>
```

Ajoutons donc des évènements pour récupérer les valeurs saisis pour la taille et le poid :

```javascript
 let poid = 0;
 let taille = 0;
 function onPoidChange(event) {
  poid = event.target.value
 }
 function onTailleChange(event) {
  taille = parseFloat(event.target.value)
 }
```

```html
    <input type="range" min="10" max="200" step="5" on:input={onPoidChange} />
    <input type="range" min="0.5" max="2.5" step="0.01" on:input={onTailleChange}/>
```

<!-- ------------------------ -->
## Double binding
Duration: 10

Maintenant que l'on peut récupérer la valeur de nos champs, il est nécessaire de faire passer la valeur de ntore composant `Form` vers le composant `Imc`.

### Déscendre une valeur d'un composant parent
Pour cela, il faut passer par le composant `App` pour faire passer les valeurs.

Ajoutons deux variables dans le fichier `App.svelte` à l'intérieur de la balise `<script></script>`

```
 let poid = 80;
 let taille = 1.8;
```

Pour faire passer les valeurs au composant `Imc`, rien de plus simple, il suffit d'utiliser la syntaxe permettant de passer des paramèetres à un composant `taille={taille}` ou la syntaxe simplifié `{taille}` :

```html
<Imc {taille} {poid} />
```

### Remonter une valeur au composant parent
Mais comment faire sortir les données du composant `Form` ? Svelte permet de le faire avec les paramètres d'un composant et en utilisant le préfixe `bind:` qui permet de mettre en place un double binding entre deux composants.

Ajoutons donc le mot clé `export` devant les deux variables dans le fichier `Form.svelte` :

```javascript
 export let poid;
 export let taille;
```

et dans le fichier `App.svelte`, relions les variables via la syntaxe `bind:poid={poid}` ou la syntaxe simplifié `{bind:poid}` :

```html
  <Form bind:poid bind:taille />
```

De cette façon si la variable poid est modifié dans le composant `Form`, la variable est mise à jour dans le composant `App` et inversement si on modifie la valeur d'une variable dans le composant `App`.

### Double binding sur un élèment du DOM

Mais la syntaxe `bind:` permet également de faire un double binding entre une variable et une propriété d'un élément du DOM pour par exemple les élèments du formulaire.

On peut donc remplacer les `on:input={onPoidChange}` par `bind:value={poid}` dans le fichier `Form.svelte`

```html
 <input type="range" min="10" max="200" step="5" bind:value={poid} />
 <input type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
 ```

<!-- ------------------------ -->
## Réactive statement
Duration: 5


<!-- ------------------------ -->
## Mise en place de store
Duration: 10


<!-- ------------------------ -->
## Store dérivée
Duration: 10


<!-- ------------------------ -->
## Ajouter du styles
Duration: 10


<!-- ------------------------ -->
## Animation
Duration: 10


<!-- ------------------------ -->
## Modifier le titre de la page
Duration: 10


<!-- ------------------------ -->
## Code Snippets
Duration: 20

To include code snippets you can do a few things.
- Inline highlighting can be done using the tiny tick mark on your keyboard: "`"
- Embedded code

### JavaScript

```javascript
{
  key1: "string",
  key2: integer,
  key3: "string"
}
```

### Java

```java
for (statement 1; statement 2; statement 3) {
  // code block to be executed
}
```

<!-- ------------------------ -->
## Hyperlinking and Embedded Images
Duration: 20

### Hyperlinking
[Youtube - Halsey Playlists](https://www.youtube.com/user/iamhalsey/playlists)

### Images
![alt-text-here](assets/svelte.png)

<!-- ------------------------ -->
## Other Stuff
Duration: 30

Checkout the official documentation here: [Codelab Formatting Guide](https://github.com/googlecodelabs/tools/blob/master/FORMAT-GUIDE.md)


## Todo :
- Avoir des couleurs differentes pour souspoid et surpoid
- Modifier la taille du texte en fonction du poids (thin, normal, bold)
- Ajouter l'affichage du poid et de la taille dans le composant IMC
- Ajouter un bouton calculer dans le formulaire
- Ajouter entre l'étape 6 et l'étape 7, un bouton de validation pour mettre à jour l'IMC, création d'un Event custom lorsque l'on clique sur le bouton, propagation de l'event de click.
