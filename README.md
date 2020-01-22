# Projet final: plateforme blockchain de gestion des droits cinématographiques

L'application vise à gérer les droits cinématographiques et les relations contractuelles et financières entre les différents parties prenantes d'un film

![](https://srushtivfx.com/wp-content/uploads/2018/08/Evoution-of-Film-industry-Srushti-VFX.png)

# Fonctionnalités

- Il est possible d'ajouter plusieurs co-producteurs au contrat
- il est possible d'ajouter un type de recette dans la section mandat
- L'application affiche les co-producteurs du projet
- L'application affiche les types de recette
- L'application permet d'ajouter des recettes au projet
- Il est possible d'accéder à un décompte des recettes
- il est possible d'imprimer le décompte des recettes
- En fonction des recettes saisies, l'application calcule le montant à verser aux parties prenantes du projet

## Fonctionnalités supplémentaires (en cours de développement)

- Amélioration graphique de la barre de progression
- Amélioration graphique du décompte des recettes
- Amélioration graphique de la page d'impression
- Mise en place de tests avancés sous truffle sur les fonctionnalités existantes
- Il est possible de lier le contrat à un projet global

## Deploiement en local

- `git clone` le repository
- cd filmproductionapp
- Installer et lancer `ganache,` l'application est configurée sur le port 7545 qui correspond au port par défaut de ganache en version interface graphique
- `npm install` dans le dossier cloné
- `truffle compile` pour compiler les smartcontracts
- `truffle migrate` pour déployer les smartcontracts sur le réseau Ganache
- `truffle test --network ganache` pour lancer les tests
- `npm run start` pour lancer le server
- http://localhost:3000 pour voir l'application
- configurer `Metamask` en mode custom RPC avec comme RPC URL http://127.0.0.1:7545 afin de se connecter à réseau Ganache

## Deploiement sur Heroku

- `git clone` le repository
- `cd filmproductionapp` pour aller dans le dossier
- `truffle compile`
- vous devez saisir vos 3 paramatrages [https://infura.io/dashboard](Infura) afin d'accéder au réseau Rinkeby dans le fichier truffle-config.js :
  1. var infura_apikey = "you need to register in Infura for an Access Token.";
  2. var mnemonic = "< twelve words you can find in metamask/settings/reveal seed words >";
  3. var address = "rinkeby address with ether";
- `truffle migrate --reset --network rinkeby` pour déployer les smartcontracts sur le réseau Rinkeby
- vous devez avoir un compte [https://heroku.com](Heroku)
- `git init` pour initialiser le répertoire git
- `heroku create NOMDEVOTREAPP --buildpack mars/create-react-app` pour créer sur Heroku un nouveau projet
- `git add .`
- `git commit -m "VOTRE COMMENTAIRE"`
- `git remote -v` si vous souhaiter vérifier sur quels répertoires vous pouvez pusher votre application
- `git push heroku master` pour déployer l'application sur Heroku
  `

### Démo

[http://filmproductiondapp.herokuapp.com/](Lien vers mon application déployée sur Heroku)

### Projet

|      Nom       |                          Lien Github                           |
| :------------: | :------------------------------------------------------------: |
| Vivien Richaud | [https://github.com/Louvivien/](https://github.com/Louvivien/) |
