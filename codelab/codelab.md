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

*Svelte* est un compilateur plus qu'un framework, il ajoute du sucre syntaxique a du code javascript pour développer des applications.
Il va ainsi pouvoir instrumentaliser le code pour ajouter des instructions pour mettre à jour l'affichage lors de changement des données.

Sur le site de [Svelte](https://svelte.dev/), un REPL (Read Eval Print Loop) permet de tester en direct du code *Svelte* et voir le code généré.
De même un [tutoriel](https://svelte.dev/tutorial/basics) permet d'apprendre les base du framework pas à pas.

Un fichier *Svelte* (fichier avec une extension .svelte) ressemble à un fichier html qui va contenir les balises html de notre template,
 une balise `&lt;script>` contenant le code javascript, ainsi qu une balise `&lt;style>` contenant le style CSS.

Par exemple :
```sveltehtml
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


### Créer un projet Svelte

Comme *Svelte* est un compilateur, il est nécessaire de le lancer pour pouvoir transformer les fichiers .svelte en fichier javascript et css.

*Svelte* est capable de s'intégrer avec tous les package bundler existant comme *Webpack* ou *Rollup*.

Ils fournissent des templates pour créer le squelette d'une application, et propose d'utiliser `degit` un utilitaire qui télécharge les fichiers d'un repos git sans l'historique.

Pour créer un projet avec *Rollup* il suffit alors de saisir les lignes de commandes suivantes :
```bash
npx degit sveltejs/template my-svelte-project
cd my-svelte-project
npm install
npm run dev
```

Vous aurez alors un projet de base avec les outils pour lancer l'application en développement ou construire l'application à deployer.

<aside>
Vous pouvez utiliser Typescript en executant la commande : <code>node scripts/setupTypeScript.js</code>
</aside>

### Le projet pour ce codelab

Après cette rapide introduction à *Svelte*, nous allons créer pour ce codelab un projet pour calculer son IMC (Indice de Masse Corporelle)

<aside class="positive">
L'indice de masse corporelle ou IMC (en anglais, body mass index ou BMI) est une grandeur qui permet d'estimer la corpulence d’une personne.
Inventé au milieu du XIXe siècle par Adolphe Quetelet, mathématicien belge qui est l'un des fondateurs de la statistique moderne, cet indice est appelé aussi l'indice de Quetelet.
</aside>

La formule pour calculer l'IMC est le poids divisé par la taille au carré.

<!-- ------------------------ -->
## Créer votre première application
Duration: 10

### Initialiser le projet
Comme on l'a vu lors de la première étape, nous allons initialiser notre application en partant d'un template.
Nous avons créer un template pour le codelab qui va contenir des éléments qui seront utilisés directement par votre application.

```bash
npx degit zenika/labs-svelte/template labs-svelte
cd labs-svelte
npm install
```

### Découvrir ce qui a été généré
Vous vous retrouvez avec une application simple, voici les différents fichiers que l'on peut retrouver :

- **package.json** : Contient les dépendances, ainsi que les script `dev` (pour lancer le projet en développement) ou `build` (pour construire l'application final)
- **rollup.config.js** : Configuration pour le packageur d'application configurer pour utiliser *Svelte*
- **public** : Les resources statiques du projet, il contiendra également les fichiers bundle.js et bundle.css une fois votre application compilée
- **src**: Les fichiers sources de l'application où l'on ajoutera les différents composants
  - **main.js** : Fichier javascript qui initialise l'application
  - **App.svelte** : Premier composant *Svelte* qui s'affiche sur notre application, c'est dans ce fichier que nous allons commencer notre application.

### Lancer le projet

Maintenant lançons le projet :
```bash
npm run dev
```

En ouvrant le navigateur à l'url http://localhost:5000/ vous verrez la page de notre application  :

//TODO mettre une capture de l'application

### Modifier et voir le résultat

Maintenant entrons dans le vif du sujet et ouvrez le fichier **App.svelte**, et modifiez la variable `name` pour y mettre votre nom :

```javascript
  let name = "Votre nom"
```

L'application sera automatiquement rafraichis avec les changements, une fois celle ci sauvegardées, et vous devriez avoir le texte "Bonjour Votre nom" qui s'affiche à l'écran.

Passons maintenant à l'étape suivante, pour créer notre premier composant.

<!-- ------------------------ -->
## Créer un composant
Duration: 5

Nous allons maintenant créer notre premier composant, pour cela créez un nouveau fichier **Imc.svelte** dans le répertoire `src`.

Dans ce fichier, mettez du code html pour afficher un simple texte :

```sveltehtml
<div>Votre IMC est de 20</div>
```

Dans le fichier **App.svelte**, ajoutez simplement l'import de notre composant Imc :

```javascript
import Imc from './Imc.svelte'
```

<aside class="positive">
Placer ce code javascript entre les balise html <em>&lt;script>&lt;/script></em>
</aside>

On peut maintenant utiliser notre composant Imc directement dans notre contenu html :

```sveltehtml
<Imc />
```

On se retrouve maintenant avec une page qui contient affiche maintenant notre texte "Votre IMC est de 20".

Maintenant, il faudrait que ce texte soit plus dynamique et qu'il puisse être configurer en fonction du poids et de la taille.

<!-- ------------------------ -->
## Mettre des variables et afficher dans un template
Duration: 10

Dans notre fichier **Imc.svelte**, nous allons ajouter deux variables pour définir le poids et la taille, et afficher ensuite le calcul de l'IMC à la place de notre texte html statique.

Pour cela, ajoutez une balise script, contenant deux déclarations de variable :

```sveltehtml
<script>
  let poids = 80;
  let taille = 1.80;
</script>
```

Nous pouvons maintenant afficher ces variables dans le html en utilisant la syntaxe `{variable ou expression}`

```sveltehtml
<div>Votre IMC ({poids}/{taille}<sup>2</sup>) est de {(poids / taille ** 2).toFixed(2)}</div>
```

<aside class="positive">
La formule de l'IMC est le poids en kilo divisé par la taille en mètre au carré.
</aside>

Analysons le code ci-dessus :
`{poids}` ou `{taille}` sera remplacé par le contenu de la variable poids ou taille
`{(poids / taille ** 2).toFixed(2)}` Fait plusieurs actions :
 - `(poids / taille ** 2)` : Calcule de l'IMC (l'opérateur ** permet de faire une puissance en javascript)
 - `.toFixed(2)` : Convertis le nombre en chaine de caractère en ne gardant que deux chiffres après la virgule
 - `{}`: Syntax pour indiquer a *Svelte* d'afficher le contenu dans le html

Vous pouvez maintenant faire évoluer la valeur des variables poids ou taille et voir le résultat du calcul de l'IMC en rafraichissant la page.

Ce composant même si il permet de faire le calcule n'est pas utilisable dans une application, car il utilise des variables locales à celui-ci.
Voyons maintenant comment paramétrer ces variables pour permettre de recevoir ces valeurs en entrée du composant.

<!-- ------------------------ -->
## Attributs d'un composant
Duration: 10

Pour qu'un composant *Svelte* reçoivent des entrée via des attributs html, il suffit simplement que ce composant possède des variables préfixé par le mot clé `export`.

<aside class="positive">
En javascript, le mot clé <code>export</code> permet d'indiquer que la variable ou la fonction est accessible à l'extérieur du fichier (du module).
<i>Svelte</i> l'utilise pour définir les entrées des composants.
</aside>

Une fois ajouté ce mot clé :
```sveltehtml
<script>
  export let poids = 80;
  export let taille = 1.80;
</script>
```

On peut maintenant faire passer les valeurs par des attributs html à notre composant :
```sveltehtml
<Imc poids=100 taille=1.9 />
```

Il est bien sûr possible que cet attribut soit dynamique :
```sveltehtml
<Imc poids={monPoids} {taille} />
```
Ici :
- `poids={monPoids}` : on passe le contenu de la variable `monPoids` dans l'attribut `poids`
- `{taille}` : écriture simplifié de `taille={taille}`


<!-- ------------------------ -->
## Conditions d'affichages
Duration: 10

Ajoutons maintenant un message qui précise notre état de corpulence en fonction de l'IMC.

<aside class="positive">
Le rapport taille sur le poids au carré qui est considéré comme une corpulence est compris entre 18 et 35. Au delà, on est en surpoids et inversement en sous-poids si l'on est en dessous.
</aside>

On veut donc ajouter un message en fonction de notre IMC. *Svelte* permet d'ajouter des conditions dans un template avec la syntaxe `{#if condition}{:else if condition}{:else}{/if}`

Commençons par créer une variable pour calculer l'IMC et pouvoir réutiliser cette valeur dans notre condition :

```javascript
const imc = (poids / taille ** 2).toFixed(2)
```

On peut ensuite ajouter dans le code html, un ensemble de conditions pour afficher un message.
Pour cela on utilise un template propre a *Svelte* en utilisant les balises `{#if}`, `{:else if}` et `{/if}`.

```sveltehtml
<div>Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}</div>
{#if imc < 18}
  <div>Vous êtes en sous poids</div>
{:else if imc > 35}
  <div>Vous êtes en sur poids</div>
{:else}
  <div>Quel corps svelte !</div>
{/if}
```

*Svelte* donne accès à d'autres balises similaire pour aider la création de templates, tel que `{#each}{/each}`.

En règle générale, les balises de template *Svelte* sont encapsulées dans 2 accolades `{}`.
Afin de pouvoir imbrique les balises, on différencies les balises ouvrantes ou fermantes avec les caractères `#` et `/` respectivement.
Les balises `else` sont elles précèdes de `:`.
Il est possible de les utiliser en association avec une balise `if` mais aussi `each`.
Dans le second cas, cela permet d'afficher une alternative au cas ou le tableau est vide.

<!-- ------------------------ -->
## Ajouter du styles
Duration: 10

Maintenant que l'on affiche un petit message explicatif en fonction de l'IMC, on aimerait différencier ces messages via un système de couleur :
- *orange*: Si l'IMC est inférieur à 18
- *rouge*: Si l'IMC est supérieur à 35
- *vert*: Si on est dans fourchette d'un IMC normal

Pour cela, on va se créer 3 classes CSS. On peut soit mettre ces classes dans le fichier `global.css` qui se trouve dans le répertoire public.
Les classes seront alors disponible pour toute l'application. Mais si je veux ajouter du css directement dans notre composant,
il suffit d'ajouter la balise `&lt;style>&lt;/style>` dans votre fichier **Imc.svelte** et d'y ajouter votre code CSS :

```css
  .normal {
    color: green
  }

  .surpoids {
    color: red;
  }

  .souspoids {
    color: orange;
  }
```

Il faut maintenant ajouter les classes CSS dans le code html ajouté précédemment :

```sveltehtml
<div>Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}</div>
{#if imc < 18}
  <div class="souspoids">Vous êtes en sous-poids</div>
{:else if imc > 35}
  <div class="surpoids">Vous êtes en sur-poids</div>
{:else}
  <div class="normal">Quel corps svelte !</div>
{/if}
<style>
  .normal {
    color: green
  }
  .surpoids {
    color: red;
  }
  .souspoids {
    color: orange;
  }
</style>
```

*Svelte* va automatiquement ajouter une classe généré sur chaque composant, et le css sera automatiquement scopé avec cette classe.
Si un autre composant déclare aussi une classe CSS `.normal` chaque composant n'auront pas le même style css et il n'y aura pas de collision.

On peut aller plus loin dans l'ajout de style, en ajoutant des classes de façon conditionnelle. Pour tester cela on va faire varier le poids et la taille du texte en fonction de la valeur de l'IMC.

Pour cela on ajoute la déclaration des classes avec les conditions associées sur la balise `div` autours de l'affichage de l'IMC ;

```sveltehtml
<div class:thin={imc < 18} class:bold={imc > 35}>
    Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}
</div>
```

puis on ajoute les classes dans la balise style de notre composant

```sveltehtml
<style>
  .normal {
    color: green
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

C'est plutôt pratique, mais ça pose un petit soucis dans notre cas, on utilise 2 fois les même conditions a 2 endroits différents. Ce n'est pas idéal pour maintenir le code.
Heureusement, il existe un sucre syntaxique pour l'écriture de classes qui peut parfaitement résoudre notre problème.
Si la classe et la variable qui conditionne son affichage sont identiques, alors on peut simplement écrire `class:condition`.

On va donc commencer par ajouter stocker nos conditions dans 2 variables :

```sveltehtml
<script>
  const imc = (poids / taille ** 2).toFixed(2)
  const thin = imc < 18
  const bold = imc > 35
</script>
```

Puis on modifie notre code html en accord avec ces nouvelles variables :

```sveltehtml
<div class:thin class:bold>
    Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}
</div>
{#if thin}
  <div class="souspoids">Vous êtes en sous poids</div>
{:else if bold}
  <div class="surpoids">Vous êtes en sur poids</div>
{:else}
  <div class="normal">Quel corps svelte !</div>
{/if}
```

Ce qui nous donne le résultat suivant pour l'ensemble du composant :

```sveltehtml
<script>
  const imc = (poids / taille ** 2).toFixed(2)
  const thin = imc < 18
  const bold = imc > 35
</script>

<div class:thin class:bold>
    Votre IMC ({poids}/{taille}<sup>2</sup>) est de {imc}
</div>
{#if thin}
  <div class="souspoids">Vous êtes en sous poids</div>
{:else if bold}
  <div class="surpoids">Vous êtes en sur poids</div>
{:else}
  <div class="normal">Quel corps svelte !</div>
{/if}

<style>
  .normal {
    color: green
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

Pour l'instant, le poids et la taille sont définit comme des attributs du composant `Imc` mais ne sont pas éditable, ce qui n'est pas très pratique pour proposer à nos utilisateurs de calculer notre IMC.
Il est donc nécessaire de créer un formulaire pour pouvoir saisir notre poids et notre taille et ainsi pouvoir calculer notre IMC.

### Nouveau composant
Commençons par créer un nouveau composant que nous nommerons **Form.svelte**.

Ce composant contiendra un formulaire simple avec deux sliders pour définir notre poids et notre taille :

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

Petites notes sur ce code:
- *let poids = 0;*: On creer des variables pour le poids et la taille que l'on initialise a 0
- *Poids ({poids} kg)*: On affiche la valeur de chaque variable dans les labels, avec la syntaxe `{}` que l'on a vu précédemment
- *input type="range" min="10" max="200" step="5"*: On ajoute 2 inputs de type `range` que l'on a configure avec des min, max et step
- *value={poids}*: On initialise les inputs avec les valeurs de nos variables

Ajoutons maintenant ce formulaire dans notre composant principale **App.svelte**, en important notre composant :
```javascript
import Form from './Form.svelte'
```

Puis au dessus du composant `&lt;Imc />` notre composant `&lt;Form />`

```sveltehtml
<Form />
<Imc poids=100 taille=1.9 />
```

### Récupérer les valeurs

Mais pour l'instant, on ne récupère pas les valeurs du formulaire.
*Svelte* vous propose une syntaxe pour s'abonner aux évènements d'un composant, en utilisant le préfix `on:` sur le nom de l'évènement,
ainsi que la fonction à appeler entre accolade `{submit}` ou une fonction lambda `{event => changeEvent(event.target.value)}`

```sveltehtml
<input on:input={saveChange} />
<button on:click={submit} />
<div on:mousemove={event => handleMousemove(event.clientX, event.clientY)}></div>
```

On ajoute donc les 2 fonctions pour mettre a jour notre variable dans la balise `script` de notre composant :

```sveltehtml
<script>
  let poids = 0;
  let taille = 0;
  function onPoidChange(event) {
    poids = event.target.value
  }
  function onTailleChange(event) {
    taille = parseFloat(event.target.value)
  }
</script>
```

Puis on branche ces nouvelles fonctions sur les events de nos inputs :

```sveltehtml
<input name="poids" type="range" min="10" max="200" step="5" on:input={onPoidChange} />
<input name="taille" type="range" min="0.5" max="2.5" step="0.01" on:input={onTailleChange}/>
```

<!-- ------------------------ -->
## Double binding
Duration: 10

Maintenant que l'on peut récupérer la valeur de nos champs, il est nécessaire de faire passer la valeur de notre composant `Form` vers le composant `Imc`.

### Descendre une valeur d'un composant parent
Pour cela, il faut passer par le composant `App` pour faire passer les valeurs.

Ajoutons deux variables dans le fichier **App.svelte** à l'intérieur de la balise `&lt;script>&lt;/script>`

```
 let poids = 80;
 let taille = 1.8;
```

Pour faire passer les valeurs au composant `Imc`, rien de plus simple, il suffit d'utiliser la syntaxe permettant de passer des paramètres à un composant `taille={taille}` ou la syntaxe simplifié `{taille}` :

```sveltehtml
<Imc {taille} {poids} />
```

### Remonter une valeur au composant parent
Mais comment faire sortir les données du composant `Form` ?
*Svelte* permet de le faire avec les paramètres d'un composant et en utilisant le préfixe `bind:` qui permet de mettre en place un double binding entre deux composants.

Ajoutons donc le mot clé `export` devant les deux variables dans le fichier **Form.svelte** :

```javascript
export let poids = 0;
export let taille = 0;
```

et dans le fichier **App.svelte**

```sveltehtml
<Form {taille} {poids} />
```

Maintenant on transmet les valeurs de `taille` et `poids` depuis le composant `App` dans les composants `Form` et `Imc`.
On peut également modifier ces valeurs au sein du composant `Form` quand on modifie les inputs.
Toutefois les mises a jour ne modifient pas les valeurs dans le composant `Imc` car les modifications ne sont jamais remontées jusque dans `App`.

### Le Double Binding a la rescousse !

Jusqu'a présent on ne transmet les données que dans un seul sens. Du parent vers l'enfant.
Mais parfais on voudrait également que les modifications qui sont effectuées sur une propriété au sein de l'enfant soit transmise au parent.
Pour cela *Svelte* met a notre disposition une syntaxe de double binding, ou un binding qui est a la fois descendant mais aussi ascendant.

On realise ce binding avec le mot cle `bind`.

En ajoutant `bind` devant une propriété, on s'assure que toutes les mises a jour de la valeurs de cette propriété dans l'enfant seront aussi transmise a la variable associe dans le parent.

On peut donc modifier notre appel de `Form` dans le composant `App` en écrivant :

```sveltehtml
<Form bind:poids bind:taille />
```

Maintenant les modifications dans `Form` mettent a jour les valeurs de poids et taille dans `Imc`.

Les valeurs de l'IMC et les styles ne sont pas modifies lorsque l'on change les valeurs de poids et taille. C'est normal et le sujet du prochain chapitre.

### Double binding sur un élèment du DOM

La syntaxe `bind:` permet également de faire un double binding entre une variable et une propriété d'un élément du DOM pour par exemple les éléments du formulaire.

On peut donc remplacer la combinaison de `value:poids` et `on:input={onPoidChange}` par `bind:value={poids}` dans le fichier **Form.svelte**

```sveltehtml
<input name="poids" type="range" min="10" max="200" step="5" bind:value={poids} />
<input name="taille" type="range" min="0.5" max="2.5" step="0.01" bind:value={taille} />
 ```

Les fonctions `onPoidChange` et `onTailleChange` ne sont donc plus nécessaires et peuvent donc être supprimées. Ce qui nous donne le code suivant pour le composant `Form` :

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
## Réactive statement
Duration: 5


Comme on l'a vu précédemment, on peut maintenant modifier les valeurs de `poids` et `taille` dans `Imc` depuis `Form`, mais cela ne vient pas mettre a jour la valeur d'`imc`, ni les styles.
C'est parce que les valeurs de `imc`, `thin` et `bold` sont calculées uniquement a la création du composant. Et ne prennent pas en compte les évolutions de valeurs des propriétés.

*Svelte* propose donc une syntaxe pour rendre réactive une ligne (ou plusieurs) de code, c'est a dire que si une ou plusieurs variables contenues dans cette ligne sont modifiées, alors la ligne est réexecutée.

Pour cela il faut ajouter `$:` au début de la ligne (si on veut plusieurs lignes, on peut utiliser les {} : `$:{ }`).

```javascript
$: imc = (poids / taille ** 2).toFixed(2)
$: thin = imc < 18
$: bold = imc > 35
```

Maintenant l'IMC est bien recalculé lors de la modification du formulaire.

<aside class="positive">
Il n'est pas nécessaire de déclarer la variable avec <code>const</code> ou <code>let</code> lorsque l'on utilise cette syntaxe.
Si la variable n'est pas déjà déclarée avant alors <i>Svelte</i> se charge de le faire pour nous !
</aside>

Cette syntaxe permet également de logger les valeurs des variables :

```javascript
$: {
  console.log(poids);
  console.log(taille);
}
```

<aside class="negative">
Cette syntaxe n'est pas une invention de <i>Svelte</i>, mais réutilise une syntaxe peu utilisée de javascript, les <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label">labeled statements</a>.
</aside>

Une autre méthode permet de s'abonner aux changements des paramètres d'un composant en utilisant les fonctions du cycle de vie d'un composant :
- `beforeUpdate` : la fonction passé à cette fonction est appelé avant que les paramètres sont modifiés
- `afterUpdate` : la fonction est appelé après que les paramètres sont modifiés

```javascript
import { beforeUpdate, afterUpdate } from 'svelte';

beforeUpdate(() => {
  console.log('the component is about to update');
});

afterUpdate(() => {
  console.log('the component just updated');
  imc = (poids / taille ** 2).toFixed(2)
});
```

<!-- ------------------------ -->
## Évènement lors du click sur le bouton
Duration: 10

Pour le moment, dès qu'un changement est fait sur le formulaire, l'IMC est recalculé, ce qui pour de gros formulaire peut causer des pertes de performances et ne permet pas d'avoir une étape de validation.

Ajoutons un bouton "calculer" pour ne lancer le calcule de l'IMC seulement lorsque l'on clique sur le bouton, pour cela,
il faut s'abonner au click sur le bouton et ensuite envoyer un évènement personnalisé pour mettre à jour l'IMC :

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
Pour envoyer un évènement, on va utiliser le *dispatcher* de *svelte*. Après la création d'un eventDispatcher avec le code suivant :

```javascript
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
```

On peut maintenant dispatcher des évènements personnalisés :
```javascript
dispatch('calculer', {
  poids,
  taille
});
```

La fonction dispatch prends 2 arguments:
- Le nom de l'évènement que l'on veut créer
- La valeur que l'on passe dans cet évènement

Le composant parent peut alors s'abonner à l'évènement avec la syntaxe `on:calculer={fonction_a_appeler}`.

La fonction `fonction_a_appeler` du composant parent recevra alors un argument qui représente l'évènement.
Les valeurs que l'on a passe dans cette évènement sont accessible dans la propriété `detail` de cet argument :

```javascript
function fonction_a_appeler(event) {
  console.log('mes valeurs', event.detail)
}
```

### Évènement personnalisé

Ce qui nous donne le code suivant pour notre composant :

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

Et dans le fichier **App.svelte**, on réagit à l'évènement :

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

### C'est pas un peu complique quand même ?

Oui. Apres tout on veut juste prévenir notre composant parent que le formulaire vient d'être soumis.
Surement on peut faire un peu plus simple.

*Svelte* met a notre disposition une petite astuce pour simplifier ce genre de cas. On peut transmettre directement un event qui se passe dans notre composant a son parent.

Et la syntaxe est très simple dans notre cas : `on:submit`.

C'est tout. Le simple fait de ne pas associer de fonction a un évènement permet de le transmettre a son parent, ce qui nous donne le résultat suivant :

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

On doit donc également mettre a jour `App`, d'abord l'event que l'on observe :

```sveltehtml
<Form {poids} {taille} on:submit={calculerEvent} />
```

Puis la fonction `calculerEvent`, qui récupère maintenant directement l'event `submit` :

```javascript
function calculerEvent(event) {
  const formData = new FormData(event.target)
  poids = parseFloat(formData.get('poids'))
  taille = parseFloat(formData.get('taille'))
}
```

### Event modifier

Une fois ce code implémenté, vous devriez remarquer que le calcule de l'IMC se modifie mais rapidement la page est rafraichis, car le bouton envoie le formulaire.

Pour cela, il est nécessaire en javascript d'appeler la fonction `preventDefault` sur l'objet `event` passé en paramètre de la fonction `submitCalculer`.
Mais *Svelte* apporte une syntaxe pour ajouter des modificateurs à un évènement.

En ajoutant `|preventDefault` après le `on:click`, *Svelte* va automatiquement exécuter le code `event.preventDefault()` avant d'appeler votre fonction :

```sveltehtml
<form on:submit|preventDefault>
```

<aside>
<a href="https://svelte.dev/docs#on_element_event">D'autres modificateurs</a> sont disponibles :
<ul>
<li><code>stopPropagation</code> : Exécute le code <code>event.stopPropagation()</code> qui permet de ne pas propager l'évènement sur les noeuds html parents.</li>
<li><code>once</code>: Se désabonne après avoir reçu un évènement</li>
<li><code>self</code>: L'évènement n'est actif seulement si envoyé par l'élément dom où l'on ajoute l'évènement.</li>
</ul>
</aside>

<!-- ------------------------ -->
## Mise en place du store
Duration: 10


### Présentation
La communication entre plusieurs composant via les attributs et les évènements peut vite devenir complexe avec de grosse application.
Il est donc nécessaire d'avoir un mécanisme pour partager des données entre les différents composant.
Un pattern est maintenant de plus en plus en train de s'imposer dans les applications front, c'est le concept de store application.
L'idée est d'avoir un endroit où garder en mémoire à tous moments l'état global de l'application.

*Svelte* propose une implémentation de ce pattern en permettant d'écrire des stores. Il propose trois types de store :
- **writable** : Cas le plus courant, un store qui est modifiable.
- **readable** : L'application ne peut que lire des données du store, mais pas écrire (sert pour accéder à des données venant d'une autre source et non modifié par l'application : api du navigateur, push serveur, temps ...)
- **derived** : Ce store observe d'autres stores et se met a jour en fonction des modifications de ceux ci

Les composants qui vont communiquer par le store seront découplés.

### Un store writable

Un store **writable** est donc un object qui contient une valeur initiale, que l'on peut ensuite mettre à jour, et s'abonner sur ces mises à jours :

```javascript
import { writable } from 'svelte/store';

const count = writable(0);

count.subscribe(value => {
	console.log(value);
}); // logs '0'

count.set(1); // logs '1'

count.update(n => n + 1); // logs '2'
```

### Créer un store pour stocker le poids et la taille

Pour cela, créons un fichier javascript (il ne contient que du code, et pas template,
donc pas nécessaire d'avoir un fichier *Svelte*) `stores.js` qui va contenir la création de nos deux stores pour stocker le poids et la taille :

```javascript
import { writable } from 'svelte/store'

export const poids = writable(80)
export const taille = writable(1.8)
```

Maintenant, on peut modifier notre fichier **Form.svelte** pour utiliser notre store :

```javascript
import { poids, taille } from './stores'

function onPoidChange(event) {
 poids.set(event.target.value)
}
function onTailleChange(event) {
 taille.set(parseFloat(event.target.value))
}
```

et à l'inverse dans le fichier **Imc.svelte**

```javascript
import { poids as storePoid, taille as storeTaille } from './stores'

let poids;
let taille;

storePoid.subscribe(value => poids = value)
storeTaille.subscribe(value => taille = value)
```

<aside class="negative">
Attention, le subscribe retourne une fonction qui permet de se désabonner.
Il faut donc stocker cette fonction dans une variable et utiliser le livecycle <code>onDetroy()</code> pour nettoyer les souscriptions et éviter les fuites mémoires.
La syntaxe simplifié s'en occupe automatiquement.
</aside>

### Syntaxe simplifié

La syntaxe avec les méthodes set et subscribe n'est pas très pratique et lisible pour les développeurs. *Svelte* propose donc un mécanisme pour rendre ce code plus simple et lisible.
Pour cela, on va encore utiliser la syntaxe `$`, toute variable d'un store en ajoutant un `$` devant sera alors utilisable comme une variable de base :
```javascript
import { writable } from 'svelte/store';

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

### Utiliser la syntaxe simplifié dans notre application

Grâce à la syntaxe simplifié, on peut avoir un template simple en utilisant <code>$poids</code> et <code>$taille</code> comme si c'était de simple variables.

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
  $: bold = imc > 35
</script>

<div class:thin class:bold>
  <div>Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {imc}</div>
</div>
```

Maintenant, il n'est plus nécessaire de faire passer les informations par le composant `App`, et on pourrait avoir d'autres composants qui utilisent aussi ce store;

<!-- ------------------------ -->
## Store dérivée
Duration: 5

En plus des stores simples **writable**, *svelte* propose les stores **derived**, ce store se met à jours par la modification d'un ou plusieurs autres stores.
Ce qui est notre cas, ici, le calcule de l'IMC est un dérivée des valeurs du poids et de la taille.

Ajoutons dans le fichier `store.js`, ce nouveau store dérivée :

```javascript
import { derived, writable } from 'svelte'

export const poids = writable(80)
export const taille = writable(1.8)

export const imc = derived([poids, taille], ([$poids, $taille]) => {
  return ($poids / $taille ** 2).toFixed(2)
})
```

On peut maintenant supprimer dans le fichier **Imc.svelte** la ligne qui calcule l'IMC est utiliser à la place la syntaxe simplifié du store dérivée `$imc` :

```sveltehtml
<script>
  import { poids, taille, imc } from './stores'

  $: thin = $imc < 18
  $: bold = $imc > 35
</script>

<div class:thin class:bold>
  <div>Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {$imc}</div>
</div>
```

<!-- ------------------------ -->
## Animation
Duration: 10

### Présentation
Maintenant que nous avons une application finalisé, ajoutons un peu d'interactions en mettant des animations.

*Svelte* permet d'ajouter facilement des animations, en mettant simplement des attributs à une balise html ou un composant
pour ajouter une transition qui pourra s'exécuter à l'apparition ou la disparition d'un élément.
La syntaxe est simple, on indique la transition que l'on veut utiliser, que l'on préfixe par `in:` ou `out:` en fonction
de si l'on veut afficher l'animation à l'apparition ou à la disparition de l'élément. Si l'on peut la même transition à
l'apparition ou la disparition, il suffit d'utiliser le préfixe `transition:`
Il y a 6 transitions proposés par défaut, mais il est possible de créer sa propre transition personnalisé.
- **fade** : change l'opacité de l'élément
- **blur** : Applique un filtre de floue et change l'opacité
- **fly** : Déplace l'élément et change l'opacité
- **slide** : Masque ou affiche l'élément par un effet de volet.
- **scale** : Affiche ou masque l'élément en changeant sa taille
- **draw** : Intéressant pour un SVG pour avoir un effet de dessin par un crayon.

Il est bien sûr possible de passer des paramètres pour personnaliser l'animations avec par exemple la durée de l'animation, ou la position initiale :
```sveltehtml
<div in:fly="{{ y: 200, duration: 2000 }}" out:fade>
```

### Le mettre en place

Ajoutons maintenant des animations sur les textes qui s'affichent en fonction de la valeur de l'IMC.
Dans le fichier **Imc.svelte** :

```sveltehtml
<script>
  import { poids, taille, imc } from './stores'
  import { fly, fade } from 'svelte/transition';

  $: thin = $imc < 18
  $: bold = $imc > 35
</script>

<div class:thin class:bold>
  <div>Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {$imc}</div>
</div>
{#if thin}
  <div class="souspoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes en sous poids
  </div>
{:else if bold}
  <div class="surpoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes en sur poids
  </div>
{:else}
  <div class="normal" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Quel corps svelte !
  </div>
{/if}
```

<!-- ------------------------ -->
## Modifier le titre de la page
Duration: 10

*Svelte* donne acces a une collection d'[éléments spéciaux](https://svelte.dev/docs#svelte_self) qui nous donnent accès a des éléments déjà existant dans le DOM tel que la balise `head` ou `body`. Mais également a l'objet `window` pour l'ajout d'events.

On va modifier le composant `Imc`, pour qu'il mette a jour le titre de la page avec la valeur calculée de l'IMC.

Pour cela on va utiliser l'élément spécial `&lt;svelte:head>` :

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

<div class:thin class:bold>
  <div>Votre IMC ({$poids}/{$taille}<sup>2</sup>) est de {$imc}</div>
</div>
{#if thin}
  <div class="souspoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes en sous poids
  </div>
{:else if bold}
  <div class="surpoids" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Vous êtes en sur poids
  </div>
{:else}
  <div class="normal" in:fly="{{ y: 200, duration: 2000 }}" out:fade>
    Quel corps svelte !
  </div>
{/if}
```

L'ajout de ce code permet a *Svelte* de venir modifier la balise `title` de notre page a chaque fois que le composant est inclus dans notre page.
L'inclusion de `{$imc}` dans le titre permet également la mise a jour du titre quand la valeur du store `imc` change.

## Todo :
- Avoir des couleurs differentes pour souspoids et surpoids
- Modifier la taille du texte en fonction du poids (thin, normal, bold)
- Ajouter l'affichage du poids et de la taille dans le composant IMC
- Ajouter un bouton calculer dans le formulaire
- Ajouter entre l'étape 6 et l'étape 7, un bouton de validation pour mettre à jour l'IMC, création d'un Event custom lorsque l'on clique sur le bouton, propagation de l'event de click.
