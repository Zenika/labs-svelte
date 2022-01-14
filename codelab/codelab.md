summary: Devenir svelte avec Svelte
id: build
authors: Patrice de Saint Steban & Anthony Le Goas
Feedback Link: https://zenika.com
analytics account:

# Devenir svelte avec Svelte

<!-- ------------------------ -->

## Overview

Duration: 10

### Ce que vous allez apprendre

- Installation du framework
- Création de composants
- Passage de paramètres
- Utilisation de la réactivité
- Templating
- Events et binding
- Cycle de vie des composants
- Stores et contexte
- Animations

### Présentation de Svelte

_Svelte_ est un compilateur plus qu'un framework, il ajoute du sucre syntaxique à du code javascript pour développer des applications.
Il va ainsi pouvoir instrumentaliser le code pour ajouter des instructions pour mettre à jour l'affichage lors de changement des données.

Sur le site de [Svelte](https://svelte.dev/), un REPL (Read Eval Print Loop) permet de tester en direct du code _Svelte_ et voir le code généré.
De même un [tutoriel](https://svelte.dev/tutorial/basics) permet d'apprendre les bases du framework pas à pas.

Un fichier _Svelte_ (fichier avec une extension .svelte) ressemble à un fichier html qui va contenir les balises html de notre template,
une balise `&lt;script>` contenant le code javascript, ainsi qu une balise `&lt;style>` contenant le style CSS.

Par exemple :

```sveltehtml
<script>
	const name = 'world';
</script>

<style>
	h1 {
		color: red;
	}
</style>

<h1>Hello {name}!</h1>
```

### Créer un projet Svelte

Comme _Svelte_ est un compilateur, il est nécessaire de le lancer pour pouvoir transformer les fichiers .svelte en fichier javascript et css.

_Svelte_ est capable de s'intégrer avec tous les packages bundler existant comme _Webpack_ ou _Rollup_.

Ils fournissent des templates pour créer le squelette d'une application, et propose d'utiliser `degit` un utilitaire qui télécharge les fichiers d'un repos git sans l'historique.

Pour créer un projet avec _Rollup_ il suffit alors de saisir les lignes de commandes suivantes :

```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
```

Vous aurez alors un projet de base avec les outils permettant de lancer l'application en développement ou construire l'application à deployer.

<aside>
Vous pouvez utiliser Typescript en executant la commande : <code>node scripts/setupTypeScript.js</code>
</aside>

### Le projet pour ce codelab

Après cette rapide introduction à _Svelte_, nous allons créer pour ce codelab un projet permettant de calculer son IMC (Indice de Masse Corporelle).

<aside class="positive">
L'indice de masse corporelle ou IMC (en anglais, body mass index ou BMI) est une grandeur qui permet d'estimer la corpulence d’une personne.
Inventé au milieu du XIXe siècle par Adolphe Quetelet, mathématicien belge et l'un des fondateurs de la statistique moderne, cet indice est appelé aussi l'indice de Quetelet.
</aside>

La formule pour calculer l'IMC est le poids divisé par la taille au carré.

[Voir l'application finale](https://become-svelte.netlify.app/)

<!-- ------------------------ -->

## Créez votre première application

Duration: 10

### Initialiser le projet

Comme vu lors de la première étape, nous allons initialiser notre application en partant d'un template.
Nous avons créé un template pour le codelab qui va contenir des éléments qui seront utilisés directement par votre application.
Ce template contient déjà la structure pour utiliser sveltekit pour la suite du codelab.

```bash
npx degit zenika/labs-svelte/template labs-svelte
cd labs-svelte
npm install
```

### Découvrir ce qui a été généré

Vous vous retrouvez avec une application sveltekit. Voici les différents fichiers que l'on peut retrouver :

- **package.json** : Contient les dépendances, ainsi que les scripts `dev` (pour lancer le projet en développement) ou `build` (pour construire l'application finale).
- **svelte.config.js** : Configuration pour _SvelteKit_.
- **static** : Les ressources statiques du projet.
- **src**: Les fichiers sources de l'application où seront ajoutés les différents composants.
  - **lib** : Les composants commun de l'application, c'est dans ce répertoire que l'on va travailler pour tous le début du codelab
  - **routes** : Les différentes pages de votre application, que l'on verra plus tard dans le codelab
  - **app.html** : Page HTML de l'application où se chargera votre application.
  - **global.d.ts** : Permet d'ajouter les définitions de type pour utiliser l'autocomplexion sur le projet.

### Lancer le projet

Maintenant, lançons le projet :

```bash
npm run dev
```

En ouvrant le navigateur à l'url http://localhost:3000/ vous verrez la page de notre application :

![Capture step 1](./assets/capture-step1.png)

### Modifier et voir le résultat

Maintenant entrons dans le vif du sujet, ouvrez le fichier **ImcCalculator.svelte** puis modifiez la variable `name` pour y mettre votre nom :

```javascript
const name = "Votre nom";
```

Une fois les modifications sauvegardées, l'application sera automatiquement rafraîchie avec les changements, et vous devriez avoir le texte "Bonjour Votre nom" qui s'affiche à l'écran.

Passons maintenant à l'étape suivante pour créer notre premier composant.

<!-- ------------------------ -->

## Créer un composant

Duration: 5

Nous allons maintenant créer notre premier composant, pour cela créez un nouveau fichier **Imc.svelte** dans le répertoire `src/lib`.

Dans ce fichier, mettez du code html pour afficher un simple texte :

```sveltehtml
<p>Votre IMC est de 20</p>
```

Dans le fichier **ImcCalculator.svelte**, ajoutez simplement l'import de notre composant Imc :

```javascript
import Imc from "./Imc.svelte";
```

<aside class="positive">
Placer ce code javascript entre les balise html <em>&lt;script>&lt;/script></em>
</aside>

Nous pouvons maintenant utiliser notre composant Imc directement dans notre contenu html :

```sveltehtml
<Imc />
```

Nous nous retrouvons à présent avec une page qui affiche le texte "Votre IMC est de 20".

Maintenant, il faudrait que ce texte soit plus dynamique et qu'il puisse être configuré en fonction du poids et de la taille.

<!-- ------------------------ -->

## Afficher des variables dans un template

Duration: 10

Dans notre fichier **Imc.svelte**, nous allons ajouter deux variables pour définir le poids et la taille, et afficher ensuite le calcul de l'IMC à la place de notre texte html statique.

Pour cela, dans **Imc.svelte**, ajoutons une balise script, contenant deux déclarations de variable :

```sveltehtml
<script>
  let poids = 80;
  let taille = 1.80;
</script>
```

Nous pouvons maintenant afficher ces variables dans le html en utilisant la syntaxe `{variable ou expression}`

```sveltehtml
<p>Votre IMC ({poids}/{taille}<sup>2</sup>) est de {(poids / taille ** 2).toFixed(2)}</p>
```

<aside class="positive">
La formule de l'IMC est le poids en kilo divisé par la taille en mètre au carré.
</aside>

Analysons le code ci-dessus :
`{poids}` et `{taille}` seront remplacés respectivement par le contenu des variables `poids` et `taille`.
`{(poids / taille ** 2).toFixed(2)}` réalise plusieurs actions :

- `(poids / taille ** 2)` : Calcule l'IMC (l'opérateur \*\* permet de faire une puissance en javascript).
- `.toFixed(2)` : Convertit le nombre en chaine de caractère en ne gardant que deux chiffres après la virgule.
- `{}`: Syntaxe permettant à _Svelte_ d'afficher le contenu dans le html.

Vous pouvez maintenant faire évoluer la valeur des variables `poids` ou `taille` puis voir le résultat du calcul de l'IMC en rafraichissant la page.

Ce composant, même s'il permet de faire le calcul n'est pas utilisable dans une application car il utilise des variables locales à celui-ci.
Voyons maintenant comment paramétrer ces variables pour permettre de recevoir ces valeurs en entrée du composant.

<!-- ------------------------ -->

## Attributs d'un composant

Duration: 10

Pour définir les paramètres d'un composant _Svelte_, dont les valeurs seront transmisent via des attributs html, il faut définir une variable et la préfixer par le mot clé `export`. (Ex: `export let monParametre;`)

<aside class="positive">
En javascript, le mot clé <code>export</code> permet d'indiquer que la variable ou la fonction est accessible à l'extérieur du fichier (du module).
<i>Svelte</i> l'utilise pour définir les entrées des composants.
</aside>

Une fois ce mot clé ajouté :

```sveltehtml
<script>
  export let poids = 80;
  export let taille = 1.80;
</script>
```

Nous pouvons maintenant passer des valeurs par des attributs html à notre composant :

```sveltehtml
<Imc poids=100 taille=1.9 />
```

Il est bien sûr possible de faire en sorte que cet attribut soit dynamique :

```sveltehtml
<Imc poids={monPoids} {taille} />
```

Ici :

- `poids={monPoids}` : le contenu de la variable `monPoids` est passé dans l'attribut `poids`
- `{taille}` : écriture simplifiée de `taille={taille}`

<!-- ------------------------ -->

## Conditions d'affichage

Duration: 10

Ajoutons maintenant un message qui précise notre état de corpulence en fonction de l'IMC.

<aside class="positive">
Un IMC compris entre 18 et 25 correspond à une corpulence "normale". Au delà, on parle de surpoids, et en dessous, de maigreur.
</aside>

Nous voulons donc ajouter un message en fonction de notre IMC. _Svelte_ permet d'ajouter des conditions dans un template avec la syntaxe `{#if condition}{:else if condition}{:else}{/if}`

Commençons par créer une variable contenant notre IMC. Cette valeur sera utilisée dans notre condition :

```javascript
const imc = (poids / taille ** 2).toFixed(2);
```

Nous pouvons ensuite ajouter dans le code html, un ensemble de conditions pour afficher un message.
Pour cela nous utilisons une syntaxe propre à _Svelte_ en utilisant les instructions `{#if}`, `{:else if}` et `{/if}`.

```sveltehtml
<p>Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}</p>
{#if imc < 18}
  <p>Vous êtes maigre</p>
{:else if imc > 25}
  <p>Vous êtes en surpoids</p>
{:else}
  <p>Vous êtes svelte !</p>
{/if}
```

_Svelte_ donne accès à d'autres éléments de syntaxe de ce genre pour aider la création de templates, tel que `{#each}{/each}` pour effectuer une boucle.

Les éléments de template _Svelte_ sont encapsulés dans 2 accolades `{}`.
Afin de pouvoir imbriquer les balises, on différencie les balises ouvrantes ou fermantes, respectivement avec les caractères `#` et `/`.
Les balises `else` sont elles précédées de `:`.
Il est possible de les utiliser en association avec une balise `if` mais aussi avec `each`.
Dans le second cas, cela permet d'afficher une alternative au cas où le tableau serait vide.

<!-- ------------------------ -->

## Ajouter du style

Duration: 10

Nous aimerions maintenant différencier les messages que nous affichons dans différentes couleurs :

- _orange_: pour un IMC inférieur à 18
- _rouge_: pour un IMC supérieur à 25
- _vert_: pour un IMC compris entre 18 et 25

Pour cela, nous allons créer 3 classes CSS.
Deux solutions s'offrent à nous :

- Option 1 : ajouter ces classes dans le fichier `global.css` qui se trouve dans le répertoire `public`. Les classes seront alors disponibles pour toute l'application.
- Option 2 : ajouter ces classes dans le fichier de notre composant **Imc.svelte**, en insérant une balise `&lt;style>&lt;/style>`. Les classes seront alors scopées à notre composant (non disponibles en dehors du composant).

```css
.normal {
  color: green;
}

.surpoids {
  color: red;
}

.souspoids {
  color: orange;
}
```

Nous allons choisir l'option 2. Ajoutons les classes CSS dans le code de notre composant :

```sveltehtml
<p>Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}</p>
{#if imc < 18}
  <p class="souspoids">Vous êtes maigre</p>
{:else if imc > 25}
  <p class="surpoids">Vous êtes en surpoids</p>
{:else}
  <p class="normal">Vous êtes svelte !</p>
{/if}
<style>
  .normal {
    color: green;
  }
  .surpoids {
    color: red;
  }
  .souspoids {
    color: orange;
  }
</style>
```

_Svelte_ va automatiquement ajouter une classe générée sur chaque composant, et le CSS sera automatiquement scopé grâce cette classe.
Si un autre composant déclare aussi une classe CSS `.normal`, il n'y aura ainsi aucune collision.

Pour aller plus loin dans la manipulation du style, voyons comment nous pouvons utiliser des classes CSS de façon conditionnelle.

Pour cela, jouons sur l'affichage du texte dans la balise `p` de l'IMC, avec deux nouvelles classes CSS (`thin` et `bold`) :

```sveltehtml
<p class:thin={imc < 18} class:bold={imc > 25}>
    Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}
</p>
```

puis on ajoute les classes dans la balise style de notre composant :

```sveltehtml
<style>
  .normal {
    color: green;
  }
  .surpoids {
    color: red;
  }
  .souspoids {
    color: orange;
  }
  .thin {
    font-weight: 200;
    font-size: .875rem;
  }
  .bold {
    font-weight: 600;
    font-size: 1.125rem;
  }
</style>
```

C'est plutôt pratique, mais avec cette façon de faire nous utilisons les même conditions à 2 endroits différents, ce qui n'est pas idéal en terme de maintenabilité.
Pour remédier à ce "problème", _Svelte_ dispose met à disposition un sucre syntaxique extrémement pratique.
Si la classe et la variable qui conditionne son affichage portent le même nom, alors nous pouvons simplement écrire `class:condition`.

Dans notre cas, commençons donc par ajouter nos conditions dans 2 nouvelles variables :

```sveltehtml
<script>
  const imc = (poids / taille ** 2).toFixed(2)
  const thin = imc < 18
  const bold = imc > 25
</script>
```

Puis, modifions notre code html pour utiliser ces nouvelles variables :

```sveltehtml
<p class:thin class:bold>
    Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}
</p>
{#if thin}
  <p class="souspoids">Vous êtes maigre</p>
{:else if bold}
  <p class="surpoids">Vous êtes en surpoids</p>
{:else}
  <p class="normal">Vous êtes svelte !</p>
{/if}
```

Le code complet de notre composant ressemble au final à ceci :

```sveltehtml
<script>
  const imc = (poids / taille ** 2).toFixed(2)
  const thin = imc < 18
  const bold = imc > 35
</script>

<p class:thin class:bold>
    Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}
</p>
{#if thin}
  <p class="souspoids">Vous êtes maigre</p>
{:else if bold}
  <p class="surpoids">Vous êtes en surpoids</p>
{:else}
  <p class="normal">Vous êtes svelte !</p>
{/if}

<style>
  .normal {
    color: green;
  }
  .surpoids {
    color: red;
  }
  .souspoids {
    color: orange;
  }
  .thin {
    font-weight: 200;
    font-size: .875rem;
  }
  .bold {
    font-weight: 600;
    font-size: 1.125rem;
  }
</style>
```

<!-- ------------------------ -->

## Créer un formulaire

Duration: 10

Pour l'instant, le poids et la taille sont définis comme des attributs du composant `Imc`. Nous voulons à présent rendre ces attributs éditables par l'utilisateur au travers de l'interface.
Nous allons alors créer un formulaire pour pouvoir saisir notre poids et notre taille et ainsi pouvoir calculer notre IMC.

### Nouveau composant

Commençons par créer un nouveau composant que nous nommerons `Form.svelte` dans le répertoire `src/lib`.

Ce composant contiendra un formulaire simple avec deux sliders permettant de définir son poids et sa taille :

```sveltehtml
<script>
  let poids = 0;
  let taille = 0;
</script>

<form>
  <label> Poids ({poids} kg) :
    <input name="poids" type="range" min="10" max="200" step="5" value={poids} />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
    <input name="taille" type="range" min="0.5" max="2.5" step="0.01" value={taille} />
  </label>
</form>
```

Regardons en détail ce que fait ce composant:

- `let poids = 0; let taille = 0;`: Création de variables pour le poids et la taille, initialisés à `0`.
- `Poids ({poids} kg)` `Taille ({taille.toFixed(2)} m)`: Affichage de la valeur de chaque variable dans les labels, avec la syntaxe `{}` vu précédemment.
- `&lt;input name="poids" type="range" min="10" max="200" step="5" value={poids} />` `&lt;input name="taille" type="range" min="0.5" max="2.5" step="0.01" value={taille} />`: Ajout de 2 inputs de type `range` pour régler le poids et la taille, initialisés avec les valeurs de nos variables.

Ajoutons maintenant ce formulaire dans notre composant principale **ImcCalculator.svelte**. Pour cela, commençons par l'importer :

```javascript
import Form from "./Form.svelte";
```

Puis, nous pouvons l'utiliser au dessus du composant `&lt;Imc />` :

```sveltehtml
<Form />
<Imc poids=100 taille=1.9 />
```

### Événéments natifs

En l'état actuel des choses, nous ne récupérons pas les valeurs saisies via les sliders. Nous allons remédier à ceci en commençant par jouer avec les événements natifs des composants html.

En _Svelte_, pour s'abonner aux évènements d'un composant nous pouvons utiliser le prefix `on:` sur le nom de l'évènement auquel on souhaite réagir.
Exemple `on:click={clickHandler}`

- `on:` Indique que nous souhaitons nous abonner à un événénement.
- `click` Précise l'évènement auquel nous souhaitons nous abonner.
- `={clickHandler}` Précise la fonction à appeler lorsque l'événement va survenir. Il est également possible d'appeler une fonction lambda `{event => changeEvent(event.target.value)}`.

Autres exemples :

```sveltehtml
<input on:input={saveChange} />
<button on:click={submit} />
<div on:mousemove={event => handleMousemove(event.clientX, event.clientY)}></div>
```

Pour nos besoins, commençons par créer deux fonctions (nos handlers) permettant de mettre à jour nos variables, dans `Form.svelte` :

```sveltehtml
<script>
  let poids = 0;
  let taille = 0;

  function onPoidsChange(event) {
    poids = event.target.value
  }
  function onTailleChange(event) {
    taille = parseFloat(event.target.value)
  }
</script>
```

Ensuite, branchons ces nouvelles fonctions sur les events de nos inputs :

```sveltehtml
<input name="poids" type="range" min="10" max="200" step="5" on:input={onPoidsChange} />

<input name="taille" type="range" min="0.5" max="2.5" step="0.01" on:input={onTailleChange}/>
```

<!-- ------------------------ -->

## Double binding

Duration: 10

Maintenant que nous pouvons récupérer les valeur de nos inputs, il est nécessaire de faire passer ces valeurs du composant `Form` vers le composant `Imc`.

### Descendre une valeur d'un composant parent

Pour cela, il nous faut passer par le composant `App` pour faire passer les valeurs.

Ajoutons deux variables dans le fichier **ImcCalculator.svelte** à l'intérieur de la balise `&lt;script>&lt;/script>`

```
 let poids = 80;
 let taille = 1.8;
```

Pour faire passer les valeurs au composant `Imc`, rien de plus simple, il nous suffit d'utiliser la syntaxe permettant de passer des paramètres à un composant `taille={taille}` ou la syntaxe simplifiée `{taille}` (😍):

```sveltehtml
<Imc {taille} {poids} />
```

### Remonter une valeur au composant parent

Mais comment faire sortir les données du composant `Form` ?

Commençons par ajouter le mot clé `export` devant les deux variables dans le fichier **Form.svelte** pour en faire des propriétés du composant:

```javascript
export let poids = 80;
export let taille = 1.8;
```

et dans le fichier **ImcCalculator.svelte**

```sveltehtml
<Form {taille} {poids} />
```

Les valeurs de `taille` et `poids` du composant `App` sont désormais transmises dans les composants `Form` et `Imc`.
Nous pouvons également modifier ces valeurs au sein du composant `Form` via les inputs mais ces mises à jour ne modifient pas les valeurs dans le composant `Imc` car les modifications ne sont jamais remontées jusque dans `App`.

### Le Double Binding à la rescousse !

Jusqu'à présent nous ne transmettons les données que dans un seul sens : du parent vers l'enfant.
Nous voudrions maintenant que les modifications qui sont effectuées sur une propriété au sein de l'enfant soient également transmises au parent.
Pour cela _Svelte_ met à disposition une syntaxe de double binding, ou binding bi-directionnel, c'est à dire un binding qui est à la fois descendant et ascendant.

Pour ce faire, nous utilisons le mot clé `bind`.

Ajouter `bind:` devant une propriété permet de s'assurer que toutes les mises à jour de cette propriété dans l'enfant seront aussi transmises à la variable associée dans le parent.

Nous pouvons donc faire ceci sur le composant `Form` dans le composant `App` :

```sveltehtml
<Form bind:poids bind:taille />
```

Maintenant, les modifications dans `Form` mettent à jour les valeurs de poids et taille dans `Imc`.

⚠ Pour le moment, les valeurs de l'IMC et les styles ne sont pas modifiés lorsqu'on change les valeurs de poids et taille, ceci est l'objet du prochain chapitre.

### Double binding sur un élèment du DOM

La syntaxe `bind:` permet également de faire un double binding entre une variable et une propriété d'un élément du DOM pour, par exemple, les éléments du formulaire.

Nous pouvons donc remplacer la combinaison de `value:poids` et `on:input={onPoidsChange}` par `bind:value={poids}` dans le fichier **Form.svelte**.

```sveltehtml
<input name="poids" type="range" min="10" max="200" step="5" bind:value={poids} />
<input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
```

Les fonctions `onPoidsChange` et `onTailleChange` ne sont donc plus nécessaires et peuvent être supprimées. Ce qui nous donne le code suivant pour le composant `Form` :

```sveltehtml
<script>
  export let poids = 0;
  export let taille = 0;
</script>

<form>
  <label> Poids ({poids} kg) :
    <input name="poids" type="range" min="10" max="200" step="5" bind:value={poids} />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
    <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
  </label>
</form>

```

<!-- ------------------------ -->

## Réactivité

Duration: 5

Nous pouvons modifier les valeurs de `poids` et `taille` dans `Imc` depuis `Form`, mais cela ne vient pas mettre à jour la valeur d'`imc`, ni les styles car les valeurs de `imc`, `thin` et `bold` ne sont calculées qu'à la création du composant. Les évolutions de valeurs des propriétés ne sont pas prises en compte.

_Svelte_ propose donc une syntaxe pour rendre réactive une (ou plusieurs) ligne de code. Cela permet de re-éxécuter la ligne de code en question si une ou plusieurs variables contenues dans cette ligne sont modifiées.

Pour cela il faut ajouter `$:` au début de la ligne (si on veut plusieurs lignes, on peut utiliser les `{}` : `$:{ }`).

Utilisons cette syntaxe de réactivité dans pour le calcul de l'imc et des classes css `thin` et `bold`.

```javascript
$: imc = (poids / taille ** 2).toFixed(2);
$: thin = imc < 18;
$: bold = imc > 25;
```

L'IMC est maintenant bien recalculé lors de la modification du formulaire.

<aside class="positive">
Il n'est pas nécessaire de déclarer la variable avec <code>const</code> ou <code>let</code> lorsque nous utilisons cette syntaxe.
Si la variable n'est pas déjà déclarée avant alors <i>Svelte</i> se charge de le faire pour nous.
</aside>

Cette syntaxe peut également être pratique pour faire du log et suivre les changements de valeurs des variables :

```javascript
$: {
  console.log(poids);
  console.log(taille);
}
```

<aside class="negative">
Cette syntaxe $: n'est pas une invention de <i>Svelte</i>, c'est un détournement d'une syntaxe peu utilisée en javascript, les <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label">labeled statements</a>.
</aside>

Une autre méthode permet de s'abonner aux changements des paramètres d'un composant en utilisant les fonctions du cycle de vie d'un composant :

- `beforeUpdate` : la fonction passée en paramètre est appelée avant que les paramètres ne soient modifiés;
- `afterUpdate` : la fonction est appelée après que les paramètres aient été modifiés.

```javascript
import { beforeUpdate, afterUpdate } from "svelte";

beforeUpdate(() => {
  console.log("the component is about to update");
});

afterUpdate(() => {
  console.log("the component just updated");
  imc = (poids / taille ** 2).toFixed(2);
});
```

<!-- ------------------------ -->

## Évènement lors du click sur le bouton

Duration: 10

Pour le moment, dès qu'un changement est fait sur le formulaire, l'IMC est recalculé, ce qui, pour de gros formulaires, peut causer des soucis de performances et ne permet pas d'avoir une étape de validation.

Ajoutons alors un bouton "calculer" pour ne lancer le calcul de l'IMC que lors d'un click sur le bouton.
Pour cela, il faut s'abonner au click sur le bouton et ensuite envoyer un évènement personnalisé pour mettre à jour l'IMC :

```sveltehtml
<script>
  export let poids = 0;
  export let taille = 0;
</script>

<form>
  <label> Poids ({poids} kg) :
    <input name="poids" type="range" min="10" max="200" step="5" bind:value={poids} />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
    <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
  </label>

  <button type="submit">Calculer</button>
</form>

```

### Event dispatcher

Pour envoyer un évènement, nous allons commencer par utiliser le _dispatcher_ de _svelte_. Après la création d'un `eventDispatcher` avec le code suivant :

```javascript
import { createEventDispatcher } from "svelte";
const dispatch = createEventDispatcher();
```

Nous pouvons maintenant dispatcher des évènements personnalisés :

```javascript
dispatch("calculer", {
  poids,
  taille,
});
```

La fonction dispatch prends 2 arguments:

- Le nom de l'évènement.
- La valeur à transmettre dans l'évènement.

Le composant parent peut alors s'abonner à l'évènement, de la même façon qu'un évènement DOM natif, avec la syntaxe `on:calculer={fonction_a_appeler}`.

La fonction `fonction_a_appeler` du composant parent recevra alors un argument qui représente l'évènement.
Les valeurs passées dans cet évènement sont accessibles dans la propriété `detail` de cet argument :

```javascript
function fonction_a_appeler(event) {
  console.log("mes valeurs", event.detail);
}
```

### Évènement personnalisé

Appliquons ce que nous avons vu précédemment avec l'eventDispatcher à notre composant. Nous écoutons l'évènement `submit` du formulaire et envoyons et évènement personnaliser `calculer`. Nous obtenons le code suivant :

```sveltehtml
<script>
 import { createEventDispatcher } from 'svelte';

 const dispatch = createEventDispatcher();
 export let taille = 1.8;
 export let poids = 80;

 function handleSubmit() {
  dispatch('calculer', {
    poids,
    taille
  });
 }
</script>

<form on:submit={handleSubmit}>
  <label> Poids ({poids} kg) :
    <input name="poids" type="range" min="10" max="200" step="5" bind:value={poids} />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
    <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
  </label>

  <button type="submit">Calculer</button>
</form>
```

Et dans le fichier **ImcCalculator.svelte**, nous pouvons réagir à l'évènement de la sorte :

```sveltehtml
<script>
  let taille = 1.8;
  let poids = 80;

  function calculerEvent(event) {
    console.log(event)
    poids = event.detail.poids;
    taille = event.detail.taille;
  }
</script>

<Form {taille} {poids} on:calculer={calculerEvent}/>
<Imc {taille} {poids} />
```

### C'est pas un peu compliqué quand même ?

En effet, ça l'est ! Car après tout, nous voulons juste prévenir notre composant parent que le formulaire vient d'être soumis. Nous pouvons faire plus simple.

_Svelte_ met à notre disposition une petite astuce pour nous simplifier la vie dans ce genre de situation. Nous pouvons transmettre directement un event envoyé par un élément au sein de notre composant à son parent.

Et la syntaxe est elle aussi très simple : `on:submit`.

C'est tout, rien de plus. Avec cette syntaxe, l'event "onSubmit" sera propagé et peut donc être écouté directement sur le composant parent :

```sveltehtml
<script>
  export let poids = 0;
  export let taille = 0;
</script>

<form on:submit>
  <label> Poids ({poids} kg) :
    <input name="poids" type="range" min="10" max="200" step="5" bind:value={poids} />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
      <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
  </label>

  <button type="submit">Calculer</button>
</form>
```

Nous devons également mettre à jour `App`, pour écouter l'événement de soumission du formulaire :

```sveltehtml
<Form {poids} {taille} on:submit={calculerEvent} />
```

Puis la fonction `calculerEvent`, qui récupère maintenant directement l'event `submit` :

```javascript
function calculerEvent(event) {
  const formData = new FormData(event.target);
  poids = parseFloat(formData.get("poids"));
  taille = parseFloat(formData.get("taille"));
}
```

### Event modifier

Une fois ce code implémenté, vous devriez remarquer que le calcul de l'IMC se modifie mais que la page est rafraîchie, car le bouton envoie le formulaire.

Pour corriger cela, il est nécessaire en javascript d'appeler la fonction `preventDefault` sur l'objet `event` passé en paramètre de la fonction `calculerEvent`.
Mais _Svelte_ nous simplifie la vie en apportant une syntaxe pour ajouter des modifications à un évènement.

En ajoutant `|preventDefault` après le `on:submit`, _Svelte_ va automatiquement exécuter le code `event.preventDefault()` avant d'appeler votre fonction :

```sveltehtml
<form on:submit|preventDefault>
```

<aside>
<a href="https://svelte.dev/docs#on_element_event">D'autres modificateurs</a> sont disponibles :
<ul>
<li><code>stopPropagation</code> : Exécute le code <code>event.stopPropagation()</code> qui permet de ne pas propager l'évènement sur les noeuds html parents.</li>
<li><code>once</code>: Se désabonne après avoir reçu un évènement.</li>
<li><code>self</code>: L'évènement n'est actif que si envoyé par l'élément DOM où l'on ajoute l'évènement.</li>
</ul>
</aside>

<!-- ------------------------ -->

## Mise en place du store

Duration: 10

### Présentation

La communication entre plusieurs composants via les attributs et les évènements peut vite devenir complexe dans une grosse application.
Il est donc nécessaire de mettre en place un mécanisme pour partager des données entre les différents composants.
Un pattern est maintenant très utilisé pour cela dans les applications front, c'est le concept de "store".
L'idée est d'avoir un endroit où garder en mémoire à tout moment, l'état global de l'application.

_Svelte_ propose une implémentation de ce pattern en permettant d'écrire des stores. Il propose trois types de store :

- **writable** : Cas le plus courant, un store qui est modifiable.
- **readable** : L'application ne peut que lire des données du store, mais pas écrire (sert pour accéder à des données venant d'une autre source et non modifié par l'application : api du navigateur, push serveur, temps ...).
- **derived** : Ce store observe d'autres stores et se met à jour en fonction des modifications de ces derniers.

### Un store writable

Un store **writable** est donc un object qui contient une valeur initiale, que nous pouvons ensuite mettre à jour, et s'abonner sur ces mises à jours :

```javascript
import { writable } from "svelte/store";

const count = writable(0);

count.subscribe((value) => {
  console.log(value);
}); // logs '0'

count.set(1); // logs '1'

count.update((n) => n + 1); // logs '2'
```

### Créer un store pour stocker le poids et la taille

Pour cela, créons un fichier javascript (il ne contient que du code, et pas de template, donc pas nécessaire d'avoir un fichier _Svelte_) `stores.js` dans le répertoire `src/lib` qui va contenir la création de nos deux stores pour stocker le poids et la taille :

```javascript
import { writable } from "svelte/store";

export const poids = writable(80);
export const taille = writable(1.8);
```

Maintenant, nous pouvons modifier notre fichier **Form.svelte** pour utiliser notre store :

```javascript
import { poids, taille } from "./stores";

function onPoidsChange(event) {
  poids.set(event.target.value);
}
function onTailleChange(event) {
  taille.set(parseFloat(event.target.value));
}
```

Nous allons repasser dans le premier mode de fonctionnement en s'abonnant directement sur les évènements des champs `poids` et `taille` et supprimer le bouton calculer.

Voici donc le code html du formulaire :

```
   <form>
     <label> Poids :
        <input name="poids" type="range" min="10" max="200" step="5" on:input={onPoidsChange} />
     </label>

     <label> Taille :
        <input name="taille" type="range" min="0.5" max="2.5" step="0.01" on:input={onTailleChange} />
     </label>
   </form>
```

et à l'inverse dans le fichier **Imc.svelte** dans la balise `&lt;script>`

```javascript
import { poids as storePoid, taille as storeTaille } from "./stores";

let poids;
let taille;

storePoid.subscribe((value) => (poids = value));
storeTaille.subscribe((value) => (taille = value));

$: imc = (poids / taille ** 2).toFixed(2);
$: thin = imc < 18;
$: bold = imc > 25;
```

<aside class="negative">
Attention, le subscribe retourne une fonction qui permet de se désabonner.
Il faut donc stocker cette fonction dans une variable et utiliser le livecycle <code>onDetroy()</code> pour nettoyer les souscriptions et éviter les fuites mémoires.
La syntaxe simplifiée s'en occupe automatiquement.
</aside>

De même le code de la page _ImcCalculator.svelte_ est simplifié :

```sveltehtml
<script>
	import Imc from "./Imc.svelte";
	import Form from "./Form.svelte";

	const name = "world";
</script>

<main>
	<h1>Calculateur IMC</h1>
	<p>Bonjour {name} ! Calculez votre IMC (Indice de Masse Corporelle)</p>
	<Form />
	<Imc />
</main>
```

### Syntaxe simplifiée

La syntaxe avec les méthodes `set` et `subscribe` n'est pas très pratique et lisible pour les développeurs. _Svelte_ propose donc un mécanisme pour rendre ce code plus simple et lisible.
Pour cela, on va encore utiliser la syntaxe `$`. Toute variable, précédé par un `$` sera utilisable comme une variable de base et se mettra à jour automatiquement :

```javascript
import { writable } from "svelte/store";

const count = writable(0);

$: console.log($count);

$count = 1; // logs '1'
```

Cette syntaxe est également disponible dans le template :

```sveltehtml
<input type="number" bind:value={$count} />
<p>Count : {$count}</p>
```

<aside class="positive">
<i>Svelte</i> propose des fonctions pour créer facilement des stores,
mais tout object <code>Observable</code> (qui possède un subscribe, unsubscribe) est considéré par <i>Svelte</i> comme un store et peut utiliser la syntaxe réactive de <i>Svelte</i>.
</aside>

### Utiliser la syntaxe simplifiée dans notre application

Grâce à la syntaxe simplifiée, nous pouvons avoir un template très simple en utilisant <code>$poids</code> et <code>$taille</code> comme si elles étaient de simple variables.

Dans le fichier **Form.svelte** :

```sveltehtml
<script>
 import { poids, taille } from './stores'
</script>

<form>
  <label> Poids ({$poids} kg) :
    <input name="poids" type="range" min="10" max="200" step="5" bind:value={$poids} />
  </label>

  <label> Taille ({$taille.toFixed(2)} m) :
    <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={$taille} />
  </label>
</form>
```

Dans le fichier **Imc.svelte** :

```sveltehtml
<script>
 import { poids, taille } from './stores'
  $: imc = ($poids / $taille ** 2).toFixed(2)
  $: thin = imc < 18
  $: bold = imc > 25
</script>

<p class:thin class:bold>
  Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {imc}
</p>
```

Maintenant, il n'est plus nécessaire de faire passer les informations par le composant `App`. Nous pourrions également avoir d'autres composants qui utilisent ce store.

<!-- ------------------------ -->

## Store dérivée

Duration: 5

En plus des stores simples **writable**, _Svelte_ propose les stores **derived**, ce store se met à jour par la modification d'un ou plusieurs autres stores.
Ce qui est notre cas, ici, le calcule de l'IMC est un dérivé des valeurs du poids et de la taille.

Ajoutons dans le fichier `stores.js`, ce nouveau store dérivé :

```javascript
import { derived, writable } from "svelte/store";

export const poids = writable(80);
export const taille = writable(1.8);

export const imc = derived([poids, taille], ([$poids, $taille]) => {
  return ($poids / $taille ** 2).toFixed(2);
});
```

Nous pouvons maintenant supprimer dans le fichier **Imc.svelte** la ligne qui calcule l'IMC est utiliser à la place la syntaxe simplifiée du store dérivée `$imc` :

```sveltehtml
<script>
  import { poids, taille, imc } from './stores'

  $: thin = $imc < 18
  $: bold = $imc > 25
</script>

<p class:thin class:bold>
  Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {$imc}
</p>
```

<!-- ------------------------ -->

## Animation

Duration: 10

### Présentation

Maintenant que nous avons une application finalisée, ajoutons quelques animations.

_Svelte_ permet d'ajouter facilement des animations, en placant simplement des attributs aux baliss HTML pour, par exemple, ajouter une transition qui pourra s'exécuter à l'apparition ou la disparition d'un élément.
La syntaxe est simple, nous indiquons la transition que l'on veut utiliser, préfixée par `in:` ou `out:` en fonction
de si nous souhaitons jouer l'animation à l'apparition ou à la disparition de l'élément. Si la même transition est souhaitée à
l'apparition et la disparition, il suffit d'utiliser le préfixe `transition:` à la place de `in:` et `out:`.
Il existe 6 transitions proposées par défaut, mais il est possible de créer sa propre transition personnalisée.

- **fade** : Change l'opacité de l'élément.
- **blur** : Applique un filtre de flou et change l'opacité.
- **fly** : Déplace l'élément et change l'opacité.
- **slide** : Masque ou affiche l'élément par un effet de slide.
- **scale** : Affiche ou masque l'élément en changeant sa taille.
- **draw** : Intéressant pour un SVG pour avoir un effet de dessin par un crayon.

Il est bien sûr possible de passer des paramètres pour personnaliser les animations avec, par exemple, la durée de l'animation, ou la position initiale :

```sveltehtml
<div in:fly="{{ y: 200, duration: 2000 }}" out:fade>
```

### Le mettre en place

Ajoutons maintenant des animations sur les textes qui s'affichent en fonction de la valeur de l'IMC.

Les animations sont à importer depuis `'svelte/transition'`. Dans le fichier **Imc.svelte**, nous aurons :

```sveltehtml
<script>
  import { poids, taille, imc } from './stores'
  import { fly, fade } from 'svelte/transition';

  $: thin = $imc < 18
  $: bold = $imc > 35
</script>

<p class:thin class:bold>
  Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {$imc}
</p>
{#if thin}
  <p class="souspoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes maigre
  </p>
{:else if bold}
  <p class="surpoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes en surpoids
  </p>
{:else}
  <p class="normal" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes svelte !
  </p>
{/if}
```

<!-- ------------------------ -->

## Modifier le titre de la page

Duration: 10

_Svelte_ met à disposition une collection d'[éléments spéciaux](https://svelte.dev/docs#svelte_self) qui nous donnent accès à des éléments déjà existant dans le DOM tel que la balise `head` ou `body`. Mais également à l'objet `window` pour l'ajout d'events.

Nous pouvons manipuler cela en modifiant le composant `Imc` pour qu'il mette à jour le titre de la page avec la valeur calculée de l'IMC.

Pour cela, utilisons l'élément spécial `&lt;svelte:head>` :

```sveltehtml
<script>
  import { poids, taille, imc } from './stores'
  import { fly, fade } from 'svelte/transition';

  $: thin = $imc < 18
  $: bold = $imc > 35
</script>

<svelte:head>
  <title>Votre IMC : {$imc}</title>
</svelte:head>

<p class:thin class:bold>
  Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {$imc}
</p>
{#if thin}
  <p class="souspoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes maigre
  </p>
{:else if bold}
  <p class="surpoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes en surpoids
  </p>
{:else}
  <p class="normal" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes svelte !
  </p>
{/if}
```

L'ajout de ce code permet à _Svelte_ de venir modifier la balise `title` de notre page à chaque fois que le composant est inclus dans notre page.
L'inclusion de `{$imc}` dans le titre permet également la mise à jour du titre lorsque la valeur du store `imc` change.

## Sveltekit

Maintenant que nous avons bien découvert les fonctionnalités offertes par **Svelte**, passont maintenant à la vitesse supérieur en découvrant **SvelteKit**
## Fin

Bravo ! Vous êtes arrivés à la fin de ce lab !
Nous espérons que vous avez apprécié cette petite expérience avec Svelte !

Vous trouverez le code final de l'app [ici](https://github.com/Zenika/labs-svelte/tree/master/become-svelte).

<aside class="positive">
  Pour devenir <em>Svelte</em>, pratiquez régulièrement ...
</aside>
