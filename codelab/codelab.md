summary: Devenir svelte avec Svelte
id: build
authors: Patrice de Saint Steban & Anthony Le Goas
Feedback Link: https://zenika.com
analytics account:

# Devenir svelte avec Svelte

<!-- ------------------------ -->

## Overview
Duration: 0:10:00

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
- Sveltekit
- SSR
- Test
- Déploiement

### Présentation de Svelte

_Svelte_ est un compilateur plus qu'un framework, il ajoute du sucre syntaxique à du code javascript pour développer des applications.
Il va ainsi pouvoir instrumentaliser le code pour ajouter des instructions pour mettre à jour l'affichage lors de changement des données.

Sur le site de [Svelte](https://svelte.dev/), un REPL (Read Eval Print Loop) permet de tester en direct du code _Svelte_ et voir le code généré.
De même un [tutoriel](https://svelte.dev/tutorial/basics) permet d'apprendre les bases du framework pas à pas.

Un fichier _Svelte_ (fichier avec une extension .svelte) ressemble à un fichier html qui va contenir les balises html de notre template,
une balise `&lt;script>` contenant le code javascript, ainsi qu'une balise `&lt;style>` contenant le style CSS.

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

Comme _Svelte_ est un compilateur, il est nécessaire de le lancer pour pouvoir transformer les fichiers `.svelte` en fichier javascript et css.

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
Vous pouvez utiliser Typescript en éxecutant la commande : <code>node scripts/setupTypeScript.js</code>
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
Duration: 0:10:00

### Initialiser le projet

Comme vu lors de la première étape, nous allons initialiser notre application en partant d'un template.
Nous avons créé un template pour le codelab qui va contenir des éléments qui seront utilisés directement par votre application.
Ce template contient déjà la structure pour utiliser _SvelteKit_ pour la suite du codelab.

```bash
npx degit zenika/labs-svelte/template labs-svelte
cd labs-svelte
npm install
```

### Découvrir ce qui a été généré

Vous vous retrouvez avec une application _SvelteKit_  Voici les différents fichiers que l'on peut retrouver :

- **package.json** : Contient les dépendances, ainsi que les scripts `dev` (pour lancer le projet en développement) ou `build` (pour construire l'application finale).
- **svelte.config.js** : Configuration pour _SvelteKit_.
- **vite.config.js** : Configuration pour Vite.
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

En ouvrant le navigateur à l'url [http://localhost:5173/](http://localhost:5173/) vous verrez la page de notre application :

![Capture step 1](./assets/capture-step1.png)

### Modifier et voir le résultat

Maintenant entrons dans le vif du sujet, ouvrez le fichier **ImcCalculator.svelte** puis modifiez la variable `name` pour y mettre votre nom :

```javascript
const name = "Votre nom";
```

Une fois les modifications sauvegardées, l'application sera automatiquement rafraîchie avec les changements et vous devriez avoir le texte "Bonjour Votre nom" qui s'affiche à l'écran.

Passons maintenant à l'étape suivante pour créer notre premier composant.

<!-- ------------------------ -->

## Créer un composant
Duration: 0:05:00

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
Duration: 0:10:00

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
Duration: 0:10:00

Pour définir les paramètres d'un composant _Svelte_, dont les valeurs seront transmises via des attributs html, il faut définir une variable et la préfixer par le mot clé `export`. (Ex: `export let monParametre;`)

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
Duration: 0:10:00

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
Duration: 0:10:00

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
Pour remédier à ce "problème", _Svelte_ met à disposition un sucre syntaxique extrêmement pratique.
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
  const bold = imc > 25
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
Duration: 0:10:00

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

### Évènements natifs

En l'état actuel des choses, nous ne récupérons pas les valeurs saisies via les sliders. Nous allons remédier à ceci en commençant par jouer avec les évènements natifs des composants html.

En _Svelte_, pour s'abonner aux évènements d'un composant nous pouvons utiliser le prefix `on:` sur le nom de l'évènement auquel on souhaite réagir.
Exemple `on:click={clickHandler}`

- `on:` Indique que nous souhaitons nous abonner à un évènenement.
- `click` Précise l'évènement auquel nous souhaitons nous abonner.
- `={clickHandler}` Précise la fonction à appeler lorsque l'évènement va survenir. Il est également possible d'appeler une fonction lambda `{event => changeEvent(event.target.value)}`.

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
Duration: 0:10:00

Maintenant que nous pouvons récupérer les valeur de nos inputs, il est nécessaire de faire passer ces valeurs du composant `Form` vers le composant `Imc`.

### Descendre une valeur d'un composant parent

Pour cela, il nous faut passer par le composant ImcCalculator pour faire passer les valeurs.

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

Les valeurs de `taille` et `poids` du composant `ImcCalculator` sont désormais transmises dans les composants `Form` et `Imc`.
Nous pouvons également modifier ces valeurs au sein du composant `Form` via les inputs mais ces mises à jour ne modifient pas les valeurs dans le composant `Imc` car les modifications ne sont jamais remontées jusque dans `ImcCalculator`.

### Le Double Binding à la rescousse !

Jusqu'à présent nous ne transmettons les données que dans un seul sens : du parent vers l'enfant.
Nous voudrions maintenant que les modifications qui sont effectuées sur une propriété au sein de l'enfant soient également transmises au parent.
Pour cela _Svelte_ met à disposition une syntaxe de double binding, ou binding bi-directionnel, c'est à dire un binding qui est à la fois descendant et ascendant.

Pour ce faire, nous utilisons le mot clé `bind`.

Ajouter `bind:` devant une propriété permet de s'assurer que toutes les mises à jour de cette propriété dans l'enfant seront aussi transmises à la variable associée dans le parent.

Nous pouvons donc faire ceci sur le composant `Form` dans le composant `ImcCalculator` :

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
Duration: 0:05:00

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
Duration: 0:10:00

Ajoutons maintenant la possibilité de sauvegarder notre IMC. Pour cela il est nécessaire d'ajouter un bouton `Sauvegarder` dans notre formulaire.

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

  <button type="submit">Sauvegarder</button>
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
dispatch("sauvegarder", {
  date,
  imc,
});
```

La fonction dispatch prends 2 arguments:

- Le nom de l'évènement.
- La valeur à transmettre dans l'évènement.

Le composant parent peut alors s'abonner à l'évènement, de la même façon qu'un évènement DOM natif, avec la syntaxe `on:sauvegarder={fonction_a_appeler}`.

La fonction `fonction_a_appeler` du composant parent recevra alors un argument qui représente l'évènement.
Les valeurs passées dans cet évènement sont accessibles dans la propriété `detail` de cet argument :

```javascript
function fonction_a_appeler(event) {
  console.log("mes valeurs", event.detail);
}
```

### Évènement personnalisé

Appliquons ce que nous avons vu précédemment avec l'eventDispatcher à notre composant. Nous écoutons l'évènement `submit` du formulaire et envoyons un évènement personnalisé `sauvegarder`. Nous obtenons le code suivant :

```sveltehtml
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  export let taille = 1.8;
  export let poids = 80;

  function handleSubmit(event) {
    dispatch('sauvegarder', event.target.poids.value / (event.target.taille.value * event.target.taille.value));
  }
</script>

<form on:submit={handleSubmit}>
  <label> Poids ({poids} kg) :
    <input name="poids" type="range" min="10" max="200" step="5" bind:value={poids} />
  </label>

  <label> Taille ({taille.toFixed(2)} m) :
    <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
  </label>

  <button type="submit">Sauvegarder</button>
</form>
```

Et dans le fichier **ImcCalculator.svelte**, nous pouvons réagir à l'évènement de la sorte :

```sveltehtml
<script>
  let taille = 1.8;
  let poids = 80;

  function sauvegarderIMC(event) {
		console.log(event.detail)
	}
</script>

<Form bind:poids bind:taille on:sauvegarder={sauvegarderIMC}/>
<Imc {taille} {poids} />
```

_Svelte_ met à notre disposition une petite astuce pour nous simplifier la vie dans ce genre de situation. Nous pouvons transmettre directement un event envoyé par un élément au sein de notre composant à son parent.

Et la syntaxe est elle aussi très simple : `on:submit`.

C'est tout, rien de plus. Avec cette syntaxe, l'event "onSubmit" sera propagé et peut donc être écouté directement sur le composant parent `&lt;Form on:submit={sauvegarderIMC}/>`

Mais dans notre cas, cela n'est pas une bonne pratique, notre composant ne doit pas exposer directement l'évènement à son parent. Nous transformons l'événement natif en un nouvel évènement métier.

### Event modifier

Une fois ce code implémenté, vous devriez remarquer que la page est rafraîchie à chaque fois que l'on clique sur le bouton, car le bouton envoie le formulaire.

Pour corriger cela, il est nécessaire en javascript d'appeler la fonction `preventDefault` sur l'objet `event` passé en paramètre de la fonction `handleSubmit`.
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

### Afficher l'historique

Ajoutons maintenant un tableau qui va contenir l'historique avec la date et l'IMC.

```javascript
  const historique = [];
  function sauvegarderIMC(event) {
    historique.push(event.detail);
  }
```

Reste à ajouter le code pour afficher les résultats dans le html :

```sveltehtml
<h3>Evolution de l'IMC</h3>
<ul>
	{#each historique as item, index}
		<li>{index + 1}: {item.toFixed(2)}</li>
	{/each}
</ul>
```

<aside>
La balise #each, permet de boucler sur un tableau, pour ensuite afficher chaque élément du tableau.
</aside>

En testant notre code, vous remarquerez que l'historique ne s'affiche pas en cliquant sur le bouton. C'est parce que _Svelte_ utilise l'affectation d'une variable pour savoir quand une donnée est modifiée. Or lorsque l'on fait un push sur notre tableau, la variable n'est pas modifiée et donc _Svelte_ ne détecte pas la modification.
Utilisez alors la syntaxe de décomposition pour reconstruire un nouveau tableau :

```javascription
	function sauvegarderIMC(event) {
		historique = [...historique, event.detail];
	}
```


<!-- ------------------------ -->

## Mise en place du store
Duration: 0:10:00

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

export const storePoids = writable(80);
export const storeTaille = writable(1.8);
```

Maintenant, nous pouvons modifier notre fichier **Form.svelte** pour utiliser notre store :

```javascript
import { storePoids, storeTaille } from "./stores";

let poids = 0;
let taille = 0;

function handlerSubmit(event) {
  storePoids.set(poids);
  storeTaille.set(parseFloat(taille);
  dispatch("sauvegarder", (poids / taille ** 2).toFixed(2));
}
```

Voici donc le code html du formulaire :

```
   <form on:submit={handleSubmit}>
     <label> Poids ({poids} kg) :
        <input name="poids" type="range" min="10" max="200" step="5" bind:value={poids} />
     </label>

     <label> Taille ({taille} m) :
        <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
     </label>

    <button type="submit">Sauvegarder</button>
   </form>
```

Dans le fichier **Imc.svelte** dans la balise `&lt;script>`, ajoutons le code pour récupérer les valeurs du store :

```javascript
import { storePoids, storeTaille } from "./stores";

let poids;
let taille;

storePoids.subscribe((value) => (poids = value));
storeTaille.subscribe((value) => (taille = value));

$: imc = (poids / taille ** 2).toFixed(2);
$: thin = imc < 18;
$: bold = imc > 25;
```

<aside class="negative">
Attention, le subscribe retourne une fonction qui permet de se désabonner.
Il faut donc stocker cette fonction dans une variable et utiliser le livecycle <code>onDestroy()</code> pour nettoyer les souscriptions et éviter les fuites mémoires.
La syntaxe simplifiée s'en occupe automatiquement.
</aside>

De même le code de la page _ImcCalculator.svelte_ est simplifié :

```sveltehtml
<script>
	import Imc from "./Imc.svelte";
	import Form from "./Form.svelte";

	const name = "world";
  let historique = [];

	function sauvegarderIMC(event) {
		historique = [...historique, event.detail];
	}
</script>

<main>
	<h1>Calculateur IMC</h1>
	<p>Bonjour {name} ! Calculez votre IMC (Indice de Masse Corporelle)</p>
  <Form on:sauvegarder={sauvegarderIMC}/>
  <Imc />
  <h3>Evolution de l'IMC</h3>
  <!-- [...] -->
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

Grâce à la syntaxe simplifiée, nous pouvons avoir un template très simple en utilisant <code>$storePoids</code> et <code>$storeTaille</code> comme si elles étaient de simple variables.

Dans le fichier **Form.svelte** :

```sveltehtml
<script>
 import { storePoids, storeTaille } from './stores'
</script>

<form>
  <label> Poids ({$storePoids} kg) :
    <input name="poids" type="range" min="10" max="200" step="5" bind:value={$storePoids} />
  </label>

  <label> Taille ({$storeTaille.toFixed(2)} m) :
    <input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={$storeTaille} />
  </label>
</form>
```

Dans le fichier **Imc.svelte** :

```sveltehtml
<script>
 import { storePoids, storeTaille } from './stores'
  $: imc = ($storePoids / $storeTaille ** 2).toFixed(2)
  $: thin = imc < 18
  $: bold = imc > 25
</script>

<p class:thin class:bold>
  Votre IMC ({$storePoids}/{$storeTaille}<sup>2</sup>) est de {imc}
</p>
```

Maintenant, il n'est plus nécessaire de faire passer les informations par le composant `ImcCalculator`. Nous pourrions également avoir d'autres composants qui utilisent ce store.

<!-- ------------------------ -->

## Store dérivé
Duration: 0:05:00

En plus des stores simples **writable**, _Svelte_ propose les stores **derived**, ce store se met à jour par la modification d'un ou plusieurs autres stores.
Ce qui est notre cas, ici, le calcule de l'IMC est un dérivé des valeurs du poids et de la taille.

Ajoutons dans le fichier `stores.js`, ce nouveau store dérivé :

```javascript
import { derived, writable } from "svelte/store";

export const storePoids = writable(80);
export const storeTaille = writable(1.8);

export const storeImc = derived([storePoids, storeTaille], ([$poids, $taille]) => {
  return ($poids / $taille ** 2).toFixed(2);
});
```

Nous pouvons maintenant supprimer dans le fichier **Imc.svelte** la ligne qui calcule l'IMC et utiliser à la place la syntaxe simplifiée du store dérivé `$storeImc` :

```sveltehtml
<script>
  import { storePoids, storeTaille, storeImc } from './stores'

  $: thin = $storeImc < 18
  $: bold = $storeImc > 25
</script>

<p class:thin class:bold>
  Votre IMC ({$storePoids}/{$storeTaille}<sup>2</sup>) est de {$storeImc}
</p>
```

<!-- ------------------------ -->

## Animation
Duration: 0:10:00

### Présentation

Maintenant que nous avons une application finalisée, ajoutons quelques animations.

_Svelte_ permet d'ajouter facilement des animations, en plaçant simplement des attributs aux balises HTML pour, par exemple, ajouter une transition qui pourra s'exécuter à l'apparition ou la disparition d'un élément.
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
  import { storePoids, storeTaille, storeImc } from './stores'
  import { fly, fade } from 'svelte/transition';

  $: thin = $storeImc < 18
  $: bold = $storeImc > 25
</script>

<p class:thin class:bold>
  Votre IMC ({$storePoids}/{$storeTaille}<sup>2</sup>) est de {$storeImc}
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
Duration: 0:05:00

_Svelte_ met à disposition une collection d'[éléments spéciaux](https://svelte.dev/docs#svelte_self) qui nous donnent accès à des éléments déjà existant dans le DOM tel que la balise `head` ou `body`. Mais également à l'objet `window` pour l'ajout d'events.

Nous pouvons manipuler cela en modifiant le composant `Imc` pour qu'il mette à jour le titre de la page avec la valeur calculée de l'IMC.

Pour cela, utilisons l'élément spécial `&lt;svelte:head>` :

```sveltehtml
<script>
  import { storePoids, storeTaille, storeImc } from './stores'
  import { fly, fade } from 'svelte/transition';

  $: thin = $storeImc < 18
  $: bold = $storeImc > 25
</script>

<svelte:head>
  <title>Votre IMC : {$storeImc}</title>
</svelte:head>

<p class:thin class:bold>
  Votre IMC ({$storePoids}/{$storeTaille}<sup>2</sup>) est de {$storeImc}
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
L'inclusion de `{$storeImc}` dans le titre permet également la mise à jour du titre lorsque la valeur du store `imc` change.

## SvelteKit
Duration: 0:10:00

Maintenant que nous avons fait le tour des principales fonctionnalités offertes par _Svelte_, passons à la vitesse supérieure en découvrant _SvelteKit_.

SvelteKit est un framework, basé sur _Svelte_, permettant de construire des sites ultra performants en intégrant notamment les fonctionnalités suivantes :
- Un router
- Une api avec de nouvelles fonctionnalités
- De la génération de pages côté serveur
- Une optimisation au build

SvelteKit est le remplaçant du framework Sapper.

<aside class="negative">
<i>SvelteKit</i> n'est pas encore en version finale, mais son développement est suffisamment avancé pour s'y intéresser, et pourquoi pas l'utiliser en production (cependant, attention aux breaking changes !).
</aside>

SvelteKit utilise le bundler `vite` qui apporte la fonctionnalité de Hot Module Replacement (Recharge le code modifié sans même recharger la page).

La force de _SvelteKit_  c'est de profiter de la puissance du compilateur svelte qui va générer tout le code nécessaire (et seulement celui-ci) pour faire fonctionner votre site et d'y ajouter tout l'outillage nécessaire facilitant la construction d'applications web complexes.

### Créer un projet SvelteKit

<aside class="negative">
Votre code est déjà un projet sveltekit, il n'est pas nécessaire de recréer un projet pour continuer le projet.
</aside>

Même si vous avez déjà un projet _SvelteKit_ grâce au template de projet. La création d'un projet _Svelte_ est simplifiée par une CLI pour créer un projet qui va vous poser un certain nombre de questions pour choisir les options que vous voulez intégrer.

```sh
npm init svelte@next my-app
cd my-app
npm install
npm run dev
```

Voici la sortie de la console pour la création d'un projet : 
```
$ npm init svelte@next my-app
Need to install the following packages:
  create-svelte@next
Ok to proceed? (y) 

create-svelte version 2.0.0-next.98

Welcome to SvelteKit 

This is beta software; expect bugs and missing features.

Problems? Open an issue on https://github.com/sveltejs/kit/issues if none exists already.

✔ Which Svelte app template? › _SvelteKit_ demo app
✔ Use TypeScript? … No / Yes
✔ Add ESLint for code linting? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Your project is ready!

Install community-maintained integrations:
  https://github.com/svelte-add/svelte-adders

Next steps:
  1: cd my-app
  2: npm install (or pnpm install, etc)
  3: git init && git add -A && git commit -m "Initial commit" (optional)
  4: npm run dev -- --open

To close the dev server, hit Ctrl-C

Stuck? Visit us at https://svelte.dev/chat
```

### Un framework sans runtime

Si vous regardez dans votre package.json, vous n'aurez que des dépendances de dev et aucune dépendance runtime : 

```json
{
  "name": "become-svelte",
  "version": "0.0.1",
  "scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "next",
    "@sveltejs/kit": "next",
    "svelte": "^3.50.0",
    "vite": "^3.1.0"
  },
  "type": "module"
}
```

## Ajouter une nouvelle page
Duration: 0:05:00


Créons un répertoire `about` dans le répertoire `src/routes`.
La structure des répertoires dans `src/routes` va représenter la structure de notre site web.
Créons ensuite une fichier `+page.svelte` dans le répertoire `src/routes/about` qui va contenir le contenue de la page :

```sveltehtml
<p>
Ce site a été créé par xxx lors de Breizhcamp 2022
</p>
```

La page est maintenant automatiquement disponible sur l'url [http://localhost:5173/about](http://localhost:5173/about)

## Ajouter un layout
Duration: 0:05:00

Il est aussi possible d'avoir un layout commun à toutes les pages en créant un fichier `+layout.svelte` dans le répertoire `src/routes`.

```sveltehtml
<script>
</script>
<header>
	<h1>Devenir Svelte avec Svelte</h1>
	<nav>
		<a href="/">Accueil</a>
		<a href="/about">A propos</a>
	</nav>
</header>
<main>
	<slot></slot>
</main>
```

<aside>
La syntaxe <code>slot</code> permet d'indiquer à <i>Svelte</i> d'insérer à cet emplacement le contenu qui est ajouté entre les balises permettant d'utiliser le composant. Ici, les différentes pages seront affichées.
</aside>

## Ajouter une page de recette
Duration: 0:10:00

Il est possible d'avoir des sous-pages en créant une hiérarchie de répertoire dans le dossier `src/routes`.

Nous allons ajouter sur notre site une page listant des recettes de cuisine, permettant ensuite d'avoir le détail de la recette.

Créons un répertoire `recettes` dans `src/routes`.

Ensuite, en ajoutant une page `+page.svelte` dans ce répertoire, nous définissons la page qui s'affichera pour l'url `/recettes`.

### Liste des recettes

Pour la suite, nous avons besoin d'une liste de recettes de cuisine.
Dans un premier temps, nous allons créer cette liste de recettes dans une fichier json.
Ajoutons une page `recettes.json` dans le répertoire `src/route/recettes` avec les recettes suivantes :

```json
[
    {
        "name": "Tomates farcies au thon (recette légère)",
        "image": "https://assets.afcdn.com/recipe/20130616/20057_w1200h911c1cx256cy192.jpeg",
        "totalTime": 20,
        "budget": 1,
        "difficulty": 1,
        "tags": ["Entrée"],
        "people": 4,
        "ingredients": ["4 tomates", "1/2 cc de moutarde", "citron", "1 cc d'herbe de provence", "1 cs d'huile d'olive", "poivre", "sel", "2 boites de thon au naturel", "120g de crème fraiche allégée", "1 échalotte hachée", "basilique frais"],
        "steps": [
            "Découper un chapeau dans le haut de chaque tomate préalablement lavée.",
            "Evider les tomates à l'aide d'une cuillère, saler légèrement l'intérieur et les retourner sur une grille afin qu'elles s'égouttent.",
            "Mélanger la crème, la moutarde et le reste ingrédients avant d’y ajouter le thon égoutté en miettes.",
            "Bien mélanger le tout.",
            "Remplir chaque tomate de cette farce. Y ajouter les feuilles de basilic pour la présentation et le goût!",
            "A servir frais, disposés sur un lit de feuilles de salade.",
            "Bon appétit."
        ],
        "credit": "https://www.marmiton.org/recettes/recette_tomates-farcies-au-thon-recette-legere_81846.aspx"
    },
    {
        "name": "Dahl de lentilles corail",
        "image": "https://assets.afcdn.com/recipe/20200928/114451_w1200h1877c1cx540cy844cxb1080cyb1689.jpeg",
        "totalTime": 30,
        "budget": 1,
        "difficulty": 2,
        "people": 4,
        "tags": ["Plat"],
        "ingredients": ["30 cl de lentilles corail", "5 tomates", "4 carottes", "25cl de lait de coco", "1 gousse d'ail", "1 cs de concentré de tomates", "1 cc de curcuma", "1/2 cc de cumin", "1/2 cc de gemgembre", "1/2 cc d'huile de tournesol"],
        "steps":[
            "Laver les tomates et les découper en dés. Peler les carottes, et les découper en fines rondelles.",
            "Dans une casserole, verser les lentilles corail et couvrir d'eau. Porter à ébullition. Laisser cuire pendant 10 min environ, jusqu'à complète absorption de l'eau. Retire du feu et laisser reposer.",
            "Dans une sauteuse, verser l'huile et chauffer. Y ajouter l'ail qui dorera pendant une petite minute. Verser ensuite les légumes et saupoudrer avec les épices. Ajouter enfin le concentré de tomate.",
            "Verser le lait de coco et laisser mijoter environ 10 min. sans couvrir.",
            "Enfin, ajouter les lentilles et bien remuer le tout."
        ],
        "credit": "https://www.marmiton.org/recettes/recette_dahl-de-lentilles-corail_166862.aspx"
    },
    {
        "name": "Dessert léger aux fruits de la passion",
        "image": "https://assets.afcdn.com/recipe/20170204/34670_w1200h911c1cx331cy290.jpeg",
        "totalTime": 35,
        "budget": 1,
        "difficulty": 2,
        "people": 6,
        "tags": ["Dessert"],
        "ingredients": ["1/2 l de lait", "2 sachet de sucre vanille", "75g de sucre", "50g de farine", "1 mangue", "8 fruits de la passion", "4 oeufs"],
        "steps":[
            "Couper la mangue en petits morceaux, et vider les fruits de la passion.",
            "Mélanger délicatement les fruits ensemble, et les disposer dans le fond d'un plat assez creux (type grand saladier). Réserver.",
            "Préparer une crème patissière :",
            "faire bouillir 1/2 l de lait avec les 2 sachets de sucre vanillé.",
            "Pendant ce temps, mélanger 3 jaunes d oeufs avec le sucre. On doit obtenir un mélange lisse.",
            "Rajouter la farine, et remuer énergiquement (pâte onctueuse).",
            "Incorporer le lait et mélanger. Remettre le tout sur le feu (feux doux), et laisser epaissir la crème sans s'arrêter de tourner. Laisser refroidir.",
            "Une fois que la crème pâtissière a refroidi, la mettre sur les fruits dans le saladier.",
            "Battre 4 blancs en neige, et en recouvrir les fruits et la crème patissière.",
            "Mettre le saladier 3 min au grill, pour faire dorer les blancs en neige. Laisser refroidir, et conserver au frigo avant de servir."
        ],
        "credit": "https://www.marmiton.org/recettes/recette_dessert-leger-aux-fruits-de-la-passion_43479.aspx"
    }
]
```

### Afficher la liste des recettes

Pour afficher ces recettes, nous avons juste à importer dans notre page _Svelte_ le fichier json créé précédemment.

```sveltehtml
<script>
    import recettes from "./recettes.json";
</script>
```

Nous pouvons ensuite parcourir la liste pour afficher les différentes recettes :
```sveltehtml
<section class="recettes">
    {#each recettes as item, index (item.name)}
        <article>
            <div>
              <h2>{item.name}</h2>
              <p>⏱ {item.totalTime} min 👨‍🍳 {['', 'Très Facile', 'Facile', 'Moyenne', 'Difficile'][item.difficulty || 0]} € {['', 'Bon marché', 'Moyen', 'Assez cher'][item.budget||0]} 😋 {item.people} Personnes</p>
            </div>
            <img src={item.image} alt={item.name}>
        </article>
    {/each}
</section>
```

<aside>
La syntaxe <code>{#each recettes as item (item.name)}{/each}</code> permet d'itérer sur un tableau pour afficher une liste en créant une variable item pour réccupérer l'élément en cours lors de l'itération. Le <code>(item.name)</code> permet d'indiquer la clé de notre élément et ainsi permettre d'optimiser le rendu si l'élément DOM existe déjà.
</aside>

N'oublions pas d'ajouter le lien permettant d'accéder à cette nouvelle page dans le fichier de layout :

```html
	<nav>
		<a href="/">Accueil</a>
		<a href="/recettes">Recettes</a>
		<a href="/about">A propos</a>
	</nav>
```

## Afficher une page de détail
Duration: 0:10:00

Créons maintenant une répertoire `[id]` qui sera appelée par les url `/recettes/1` ou `recettes/2` par exemple. La variable `id` sera alors disponible directement dans la page avec la valeur passée en paramètre.

Pour récupérer les paramètres _SvelteKit_ fournit un **store** `page` depuis `$app/stores` qui permet de récupérer les paramètres et autres informations sur la page.

Ajoutons donc dans le fichier `+page.svelte` dans le répertoire `src/routes/recettes/[id]`, le code suivant :

```sveltehtml
<script>
import { page } from '$app/stores';
import recettes from "./recettes.json";

let recette = recettes[$page.params.id]
</script>
```

Maintenant affichons le détail d'une recette :

```svletehtml
<section class="recette">
    <img src={recette.image}>
    <h2>{recette.name}</h2>
    <h3>⏱ {recette.totalTime} min 👨‍🍳 {['', 'Très Facile', 'Facile', 'Moyenne', 'Difficile'][recette.difficulty || 0]} € {['', 'Bon marché', 'Moyen', 'Assez cher'][recette.budget||0]} 😋 {recette.people} Personnes</h3>
    
    <ul>
        {#each recette?.ingredients as ingredient}
            <li>{ingredient}</li>
        {/each}
    </ul>
    <dl>
        {#each recette?.steps as step, index}
            <dt>Etape {index+1}</dt>
            <dd>{step}</dd>
        {/each}
    </dl>
</section>
```

<aside>
La syntaxe <code>{#each recettes as item, index}{/each}</code> permet de récupérer l'index courant du tableau dans la variable `index`.
</aside>

### Ajoutons un lien

Sur la page de recette, il est maintenant nécessaire d'ajouter un lien vers la page de détail.

Pour cela récupérons l'index de la recette et ajoutons simplement une ligne vers `/recettes/{index}` comme ceci :

```sveltehtml
    {#each recettes as item, index (item.name)}
        <article>
            <div>
                <h2><a href="/recettes/{index}">{item.name}</a></h2>
```

_Svelte_ va automatiquement gérer la navigation de la page vers la page de détail sans rechargement.

<aside>
Par défaut, _Svelte_ va intercepter les clics sur les liens `a` pour ne pas recharger la page sur les urls internes. Si besoin, nous pouvons désactiver ce comportement en ajoutant l'attribut `rel="external"` sur le lien.
</aside>

### Changement de page dynamique

Ajoutons en bas de la page de détail, des liens pour naviguer automatiquement à la recette suivante ou précédente :

```sveltehtml
<nav class="recette-nav">
	{#if $page.params.id > 0}
	<a href="/recettes/{Number($page.params.id) - 1}">Précédent</a>
	{/if}
	{#if $page.params.id < 2}
	<a href="/recettes/{Number($page.params.id) + 1}">Suivant</a>
	{/if}
</nav>
```

Testons maintenant ce lien. Nous remarquons que le changement de page ne fonctionne pas, la page ne réagit pas.

La récupération du paramètre dans le store de la page est une notion dite "réactive". Le composant de la page n'est pas réinitialisé lorsque nous changeons simplement un paramètre de la page.

Pour que notre navigation fonctionne, il est donc nécessaire d'utiliser la syntaxe de réactivité de _Svelte_ pour récupérer la bonne recette :

```javascript
$: recette = recettes[$page.params.id]
```
## Accessibilité
Duration: 0:05:00

Peut-être l'avez vous remarqué, lors de la création de la page affichant une recette, _Svelte_ nous a indiqué via un warning dans le terminal, d'un problème d'accessibilité dans notre code. (Si vous utiliser un plugin dans l'IDE, l'erreur est également affichée).

```
17:47:21 [vite-plugin-svelte] become-svelte/src/routes/recettes/[id].svelte:9:4
A11y: <img> element should have an alt attribute
```

Ce warning nous indique que nous n'avons pas mis d'attribut `alt` à notre balise `img`. 

Pour corriger ceci, renseignons par exemple l'attribut `alt` comme ceci :

```sveltehtml
<img src={recette.image} alt="Photo de la recette {recette.name}">
```

Retrouvez dans la [documentation](https://svelte.dev/docs#accessibility-warnings), la liste des erreurs d'accessibilité prises en compte.


## Ajouter du code serveur
Duration: 0:10:00

L'import d'un fichier json dans notre page inclut directement ce fichier dans le code javascript et est donc chargé dès que l'on affiche notre site. Si la liste de recettes grossie, les performances de notre site seront impactées.

La force de _SvelteKit_  c'est aussi de permettre d'écrire du code front et back au même endroit, sans distinction.

Un fichier nommé `+page.svelte` sera affiché dans le front, alors qu'un fichier au format `+server.js` (ou `.ts` si nous utilisons TypeScript) sera alors exécuté côté serveur.

Lorsque nous ajoutons une extension dans le nom d'un répertoire, alors l'url prendra en compte cette dernière pour définir le type du fichier. Par exemple, le répertoire `recettes.json` sera alors accessible par l'url '/recettes.json'. Il est conseillé d'utiliser ce type d'extension si nos pages et notre API se trouvent exactement au même endroit. Sinon ,entre le fichier `recettes/+page.svelte` ou `recettes/+server.js`, _SvelteKit_ appellera l'un ou l'autre en fonction de la méthode HTTP ou du header `accept`.


### /recettes

Développons maintenant une API pour récupérer les recettes, et ne pas importer l'intégralité de notre fichier json dans nos pages html.

Pour ce faire, commençons par créer une page `+server.js` dans le répertoire `src/route/recettes/`

```javascript
import { json } from '@sveltejs/kit';
import recettes from "./recettes.json";

export function GET() {
	return json(recettes.map(({ ingredients, steps, url, ...rest }) => rest));
}
```

Pour écrire le code serveur, nous ajoutons et exportons une fonction du nom de la méthode http que nous voulons gérer (ici GET).

La fonction doit retourner un objet Response, qui dans le cas d'une API, peut utiliser la méthode utilitaire `json` pour retourner un objet json.

Nous avons maintenant une URL [/recettes](http://localhost:5173/recettes.json) qui retourne notre liste de recettes (auxquelles nous avons supprimé les propriétés ingredients et steps).

Pour la tester, il est nécessaire de mettre un header `accept` à `application/json` dans notre requête.

### /recettes/1

Ajoutons maintenant une API pour récupérer une recette selon son `id`. Pour cela créons un répertoire `[id]` dans le répertoire `src/route/recettes`.
Puis dans le fichier `+server.js` :

```javascript
import { json, error } from '@sveltejs/kit';
import recettes from "../recettes.json";

export function GET({ params }) {
	if (params.id < 0 || params.id >= recettes.length) {
		throw error(404, 'Not found');
	}
	return json(recettes[params.id]);
}
```

La fonction exportée, est appelée avec un argument qui contient les informations suivantes : 
- request : L'objet request de node avec toutes les informations qu'il contient (headers, queryParams, body, ...).
- url : L'url de la page.
- params : Une map avec les paramètres de la page (les paramètres entre [] dans le nom du fichier).

Nous avons maintenant une URL [/recettes/0](http://localhost:5173/recettes/0) qui retourne la première recette de notre liste.

La méthode `error(statusCode, texte)` permet de retourner une erreur avec un code et un texte.

## Utiliser notre API
Duration: 0:10:00

Il est maintenant nécessaire de modifier nos page svelte pour utiliser notre API.

Ce code doit être exécuté également côté serveur lors du server side rendering, il est donc nécessaire de créer du code dans une fichier nommé `+page.js`

Sveltekit permet d'écrire une fonction nommée `load` qui va s'exécuter lors du chargement de la page.
Cette fonction peut retourner un objet javascript qui contient les paramètres que l'on peut récupérer dans notre page via la propriété data (via `export let data;`).

### Page des recettes

Créons une page `+page.js` dans le répertoire `src/routes/recettes` le code suivant :

```
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ fetch }) {
	const url = `/recettes`;
	const res = await fetch(url);

	if (res.ok) {
		return {
			recettes: await res.json()
		};
	}

	throw error(500, `Could not load ${url}`);
}
```

Puis modifions le code dans la balise script dans le fichier `src/routes/recettes/+page.svelte` :

```javascript
	export let data;
	const recettes = data.recettes;
```

### Page détail d'une recette

Créons une page `+page.js` dans le répertoire `src/routes/recettes/[id]` le code suivant :
```javascript
import { error } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').PageLoad} */
export async function load({ params, fetch }) {
	const url = `/recettes/${params.id}`;
	const res = await fetch(url);

	if (res.ok) {
		return {
			recette: await res.json()
		};
	}

	throw error(500, `Could not load ${url}`);
}
```

La fonction `load`, permet de récupérer plusieurs éléments :
- url : Url de la page.
- params : Les paramètres de la page (paramètres entre [] dans le nom du fichier).
- fetch : Fonction pour faire des appels http, identique à fetch natif, sauf qu'il gère le fait d'être appelé côté serveur ou côté client (enregistre le retour de l'appel côté server pour le serialiser dans le code de la page et réutiliser la valeur côté client).
- session : Donnée de session qui est accessible côté serveur et côté client.
- stuff : Donnée que l'on réucupère depuis le layout.

La méthode retourne un objet qui sera récupéré dans la page via la propriété data (via `export let data;`).

Si la méthode veut retourner une erreur, il faut envoyer via un `throw` la méthode `error(statusCode, texte)`. :

```
import { error } from '@sveltejs/kit';

if (!admin)
  throw error(403, 'not admin');
```

Si nous voulons faire une redirection, il faut envoyer via un `throw` la méthode `redirect(url)`. :

```
import { redirect } from '@sveltejs/kit';

if (!user)
  throw redirect('/login');
```

Puis modifions le code dans la balise script dans le fichier `src/routes/recettes/[id]/+page.svelte` :

```javascript
	export let data;
	$: recette = data.recette;
```
## SSR
Duration: 0:05:00

Le serveur side rendering permet de générer le code html sur le serveur avant d'envoyer le résultat directement au navigateur.
L'intérêt est d'améliorer les performances de la page, car il suffit alors au navigateur d'afficher le résultat sans devoir construire toute la page.

Ce fonctionnement est automatique et disponible par défaut. _Svelte_ côté serveur va générer un état de la page qui sera alors utilisé par le code javascript côté front pour s'initialiser et ainsi pouvoir ajouter l'interaction automatiquement.

Si vous regarder le code source d'une page, vous y verrez alors la totalité du html qui est généré :

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="description" content="" />
		<link rel="icon" href="./favicon.png" />
		<link
			href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
			rel="stylesheet"
		/>
		<link rel="stylesheet" href="./global.css" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="/_app/assets/start-61d1577b.css">
		<link rel="modulepreload" href="/_app/start-53bce2a1.js">
		<link rel="modulepreload" href="/_app/chunks/vendor-fa2d59c6.js">
		<link rel="modulepreload" href="/_app/pages/__layout.svelte-d673c1f6.js">
		<link rel="modulepreload" href="/_app/pages/recettes/index.svelte-7cee68ff.js">
		<link rel="modulepreload" href="/_app/chunks/recette-6ce5406e.js">
		<script type="module">
			import { start } from "/_app/start-53bce2a1.js";
			start({
				target: document.querySelector("#svelte"),
				paths: {"base":"","assets":""},
				session: {},
				route: true,
				spa: false,
				trailing_slash: "never",
				hydrate: {
					status: 200,
					error: null,
					nodes: [
						import("/_app/pages/__layout.svelte-d673c1f6.js"),
						import("/_app/pages/recettes/index.svelte-7cee68ff.js")
					],
					url: new URL("https://become-svelte.patou.dev/recettes"),
					params: {}
				}
			});
		</script>
	</head>
	<body>
		<div id="svelte">
      <header><h1>Devenir Svelte avec Svelte</h1>
      <nav><a href="/">Accueil</a>
        <a href="/recettes">Recettes</a>
        <a href="/about">A propos</a></nav></header>
        <main><section class="recettes"><article><h2><a href="/recettes/0">Tomates farcies au thon (recette légère)</a></h2>
            <h3>⏱ 20 min 👨‍🍳 Très facile € Bon marché 😋 4 Personnes</h3>
            <img src="https://assets.afcdn.com/recipe/20130616/20057_w1200h911c1cx256cy192.jpeg" alt="Tomates farcies au thon (recette légère)">
        </article><article><h2><a href="/recettes/1">Dahl de lentilles corail</a></h2>
            <h3>⏱ 30 min 👨‍🍳 Facile € Bon marché 😋 4 Personnes</h3>
            <img src="https://assets.afcdn.com/recipe/20200928/114451_w1200h1877c1cx540cy844cxb1080cyb1689.jpeg" alt="Dahl de lentilles corail">
        </article><article><h2><a href="/recettes/2">Dessert léger aux fruits de la passion</a></h2>
            <h3>⏱ 35 min 👨‍🍳 Facile € Bon marché 😋 6 Personnes</h3>
            <img src="https://assets.afcdn.com/recipe/20170204/34670_w1200h911c1cx331cy290.jpeg" alt="Dessert léger aux fruits de la passion">
        </article></section></main>
    </div>
	</body>
</html>
```

De même, nous remarquons aussi du code javascript qui indique quel est l'état de la page pour que le javascript puisse se démarrer et se positionner dans l'état où la page a été créé.

Si nous regardons les appels http, et que nous ouvrons directement une page de recette :
[http://localhost:5173/recettes/0](http://localhost:5173/recettes/0), nous remarquons qu'aucun appel à l'url [http://localhost:5173/recettes/0](http://localhost:5173/recettes/0) n'est fait. Si nous cliquons sur le lien `Suivant`, l'url [http://localhost:5173/recettes/1](http://localhost:5173/recettes/1) est chargée.

### Prefetch

SvelteKit va essayer de précharger au maximum les pages et les ressources.
Si nous voulons permettre de précharger une page disponible derrière un lien (au survol de celui-ci), il suffit d'ajouter `data-sveltekit-prefetch` sur une balise html `&lt;a&gt;`.

Dans le fichier `+page.svelte` du répertoire `src/routes/recettes`, modifions le lien vers les pages de recettes :

```sveltehtml
<h2><a data-sveltekit-prefetch href="/recettes/{index}">{item.name}</a></h2>
```

Maintenant en regardant les requêtes http, nous pouvons voir que l'url `/recettes/x` sera préchargée au survol du lien, avant même de cliquer sur celui-ci. La page s'affichera ensuite immédiatement après un clic sur le lien.

## Testing
Duration: 0:10:00

À présent, penchons nous un peu sur la partie testing. Nous allons voir comment nous pouvons tester nos composants _Svelte_.

### Configuration

Pour écrire des tests dans notre application, nous allons utiliser [jest](https://jestjs.io/fr/) et la  [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro) .

#### jest, svelte-jester & babel

Commençons par installer [jest](https://jestjs.io/fr/), ainsi que [svelte-jester](https://github.com/svelteness/svelte-jester) qui va nous permettre de tester nos composants Svelte et [babel](https://babeljs.io/) pour pouvoir utiliser les modules es6.

```sh:
npm install --save-dev jest svelte-jester babel-jest @babel/preset-env jest-environment-jsdom
```

Ensuite, nous pouvons ajouter les scripts suivants dans le `package.json` pour pouvoir lancer les tests :

```json
  "test": "jest src",
  "test:watch": "npm run test -- --watch"
```

Toujours dans le fichier `package.json`, configurons jest en ajoutant les lignes suivantes :

```json
 "jest": {
   "testEnvironment": "jsdom",
    "transform": {
      "^.+\\.js$": "babel-jest",
      "^.+\\.svelte$": "svelte-jester"
    },
    "moduleFileExtensions": [
      "js",
      "svelte"
    ]
  }
```

Configurons à présent babel en ajoutant à la racine du projet un nouveau fichier `.babelrc` :

```json
{
    "presets": [["@babel/preset-env", {"targets": {"node": "current"}}]]
}
```

#### @testing-library/svelte

Nous allons maintenant installer [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro).

```shell
npm install --save-dev @testing-library/svelte @testing-library/jest-dom
```

La configuration des outils nécessaires aux tests est terminée.
Passons à la création des tests.

### Création des tests

Pour découvrir comment tester des composants _Svelte_, nous allons créer des tests sur le composant `Imc`.

#### Premier test

Commençons par créer notre fichier de test à côté du fichier `Imc.svelte` : `Imc.test.js`.

Pour le premier test, nous allons chercher à valider le fait que l'imc est bien calculé avec les valeurs par défaut de l'application.

Dans le fichier `Imc.svelte`, nous allons ajouter un identifiant de test `data-testid="imc"`sur la balise `<p>` affichant l'imc. Cela va nous permettre de sélectionner cette balise dans le DOM pour récupérer son contenu.

  
```html
<p class:thin class:bold data-testid="imc">
  Votre IMC ({$storePoids}/{$storeTaille}<sup>2</sup>) est de {$storeImc}
</p>
```

Ensuite, nous pouvons écrire notre test dans le fichier `Imc.test.js` :

```js
import '@testing-library/jest-dom'
import { render } from '@testing-library/svelte'
import Imc from './Imc'

describe('Imc', () => {
    it('should display default imc', () => {
      // Chargement du composant.
        const { getByTestId } = render(Imc)
        // Sélectionne le <p> affichant l'Imc et récupère le contenu textuel.
        const displayImc = getByTestId('imc').textContent;
        // Le texte attendu, avec l'imc calculé grâce aux valeurs par défaut.
        const expectedImc = 'Votre IMC (80/1.82) est de 24.69';
        // La vérification.
        expect(displayImc).toBe(expectedImc);
    });
});
```

Maintenant, nous pouvons lancer le test et vérifier que ce dernier passe correctement.

```sh
npm run test
```

#### Second test

Un second test que nous pouvons ajouter ici est la vérification de l'affichage de l'indicateur `Vous êtes svelte !` avec l'imc par défaut.

```js
    it('should display the right health indicator', () => {
        const { getByText } = render(Imc);
        expect(getByText('Vous êtes svelte !')).toBeInTheDocument();
    });
```

L'idée n'étant d'être exhaustif sur les tests du composant `Imc`, nous allons nous arrêter là pour la partie testing.
Si vous souhaitez aller un peu plus loin, vous pourrez ajouter d'autres tests pour tester les autres états du composant. Référez vous à la documentation de [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro) et de [jest](https://jestjs.io/fr/) pour vous aider.


## Déployer l'application
Duration: 0:10:00

Pour déployer l'application créée sur un serveur, il est nécessaire d'installer un "adapter". Cet adapter va transformer le code pour générer le code statique et le code dynamique et les configurer en fonction de la plateforme cible.

### Application node 

Installer l'adapter :
```shell
npm install -d @sveltejs/adapter-node@next
```

Puis dans le fichier svelte.config.js modifier l'import de l'adapter par :

```js
import adapter from '@sveltejs/adapter-node';
```

Il est aussi possible passer des paramètres à l'adapter :

```js
import adapter from '@sveltejs/adapter-node';

export default {
	kit: {
		adapter: adapter({ out: 'my-output-directory' })
	}
};

```

### Application static

Si votre application n'a pas de code coté serveur, il est possible d'avoir un adapter qui va générer un site statique (uniquement du html et du javascript).

Pour cela, il suffit d'installer l'adapter `@sveltejs/adapter-static`.

Le site peut alors être déployé sur n'importe quel serveur http.

### Déployer l'application sur netlify

Netlify permet d'avoir un site avec des fichiers statiques mais aussi des fonctions javascript permettant d'éxecuter votre application back ou le prérendu html de votre front.

Installer l'adapter :
```shell
npm install -d @sveltejs/adapter-netlify@next
```

Puis modifiez le fichier de configuration svelte.config.js :
```js
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			split: false
		}),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};

export default config;
```

Créer ensuite un fichier netlify.toml pour indiquer à netlify comment construire votre application et la publier
```properties
[build]
  command = "npm run build"
  publish = "build"
```

#### Déployer directement depuis git

Sauvegardez votre site sur un repos github, gitlab, ou bitbucket.

Allez directement sur https://app.netlify.com/start

Connectez vous avec votre compte github, gitlab ou bitbucket, et selectionnez votre projet. Netlify va automatiquement s'abonner à votre projet git et mettera alors automatiquement à jour votre site sur netlify

#### Déployer de manière manuel

Si vous voulez déployer sur netlify depuis votre CI, netlify fournit une ligne de commande qui permet de deployer quand vous voulez votre projet.

Documentation : [https://docs.netlify.com/cli/get-started/](https://docs.netlify.com/cli/get-started/)

## Ajouter une recherche de recette sur Marmiton (Bonus)
Duration: 0:15:00

Ajoutons maintenant un formulaire de recherche pour rechercher des recettes sur le site marmiton.org.

Une bibliothèque apporte une API pour faire une recherche sur le site marmiton.org : https://www.npmjs.com/package/marmiton-api

### Ajouter la lib

Ajoutons cette dépendance sur le projet : 

```shell
npm install marmiton-api
```

### API de recherche

Il faut maintenant créer une API sur notre projet qui récupère en POST la recherche qui est faite.Nous utilisons la lib nouvellement ajoutée et puis nous retournons le résultat.

Créons un nouveau répertoire `search` dans le répertoire `src/route/recettes` et un fichier `+server.js` :

```
import { json } from '@sveltejs/kit';
import { searchRecipes, MarmitonQueryBuilder } from 'marmiton-api'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {
    const body = await request.json()
    const qb = new MarmitonQueryBuilder();
    const query = qb
    .withTitleContaining(body.query)
    .build()
    const recipes = await searchRecipes(query, { limit: 6 })

    return json(recipes);
}
```

Nous avons maintenant une API pour faire une recherche sur marmiton sur l'url [http://localhost:5173/recettes/search](http://localhost:5173/recettes/search)

Vous pouvez la tester avec la requête suivante :

```shell
curl --location --request POST 'http://localhost:5173/recettes/search.json' \
--data-raw '{
    "query": "tomate"
}'
```

### Interface front

Dans le fichier `recettes/+page.svelte`, ajoutons le code pour le formulaire de recherche : 

```sveltehtml
<form on:submit|preventDefault={submitForm}>
	<label for="query">
	<span class="sr-only">Recherche sur marmiton.org</span>
	</label>
	<input
	    id="query"
	    aria-label="Recherche sur marmiton.org"
		type="search"
		name="query"
		placeholder="Recherche sur marmiton.org"
		required
		bind:value={query}
	/>
	<input type="submit" value="Rechercher" />
</form>
```

Implémentons maintenant la fonction qui fait la recherche :

Remplaçons le script qui défini la variable `recettes` par ce code :
```sveltehtml
<script>
	export let data;
	$: recettes = data.recettes;
	let query;

	async function submitForm() {
		const submit = await fetch('/recettes/search', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ query }),
		})
		const data = await submit.json()

		recettes = data
	}
</script>
```

Nous faisons ici un appel vers notre API POST que nous avons écrit juste avant et nous mettons le résultat dans la variable `recettes`.

Comme l'API de recherche ne nous permet pas de récupérer les infos d'une recette, et que nous n'avons pas l'image, il est nécessaire d'adapter un peu le code qui affiche les recettes : 
```sveltehtml
<section class="recettes">
    {#each recettes as item, index (item.name)}
        <article>
            <h2><a data-sveltekit-prefetch href="{item.url ?? `/recettes/${index}`}">{item.name}</a></h2>
            <h3>⏱ {item.totalTime} min 👨‍🍳 {['', 'Très Facile', 'Facile', 'Moyenne', 'Difficile'][item.difficulty || 0]} € {['', 'Bon marché', 'Moyen', 'Assez cher'][item.budget||0]} 😋 {item.people} Personnes</h3>
            {#if item.image}
               <img src={item.image} alt={item.name}>
            {/if}
        </article>
    {/each}
</section>
```
Nous ouvrons directement la page de marmiton, et nous masquons l'image si elle n'existe pas (la lib ne nous la retourne pas).

### Bonus

Améliorer cette recherche :
- Indicateur de chargement lorsque l'on fait la recherche.
- Message si pas de résultats.
- Message si il y a une erreur.
- Afficher la recette en grand dans l'application.
- Ajouter plus d'options de recherche (regarder l'api marmiton-api pour connaitre les différentes options possible) : filtre par ingrédients, par difficultés, prix, ...

## Fin
Duration: 0:00:30

Bravo ! Vous êtes arrivés à la fin de ce lab !
Nous espérons que vous avez apprécié cette petite expérience avec _Svelte_ !

Vous trouverez le code final de l'app [ici](https://github.com/Zenika/labs-svelte/tree/master/become-svelte).

<aside class="positive">
  Pour devenir <em>Svelte</em>, pratiquez régulièrement ...
</aside>
