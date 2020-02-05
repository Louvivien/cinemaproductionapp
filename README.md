# Projet final: plateforme blockchain de gestion des droits cinématographiques

L'application vise à gérer les droits cinématographiques et les relations contractuelles et financières entre les différents parties prenantes d'un film

![](https://srushtivfx.com/wp-content/uploads/2018/08/Evoution-of-Film-industry-Srushti-VFX.png)

# Fonctionnalités

- Il est possible d'ajouter plusieurs co-producteurs au contrat
- Il est possible d'ajouter un type de recette dans la section mandat
- L'application affiche les co-producteurs du projet
- L'application affiche les types de recette
- L'application permet d'ajouter des recettes au projet
- Il est possible d'accéder à un décompte des recettes
- Il est possible d'imprimer le décompte des recettes
- En fonction des recettes saisies, l'application calcule le montant à verser aux parties prenantes du projet
- Il est possible d'utiliser l'application sur un navigateur mobile blockchain tel que [Metamask Mobile](https://play.google.com/store/apps/details?id=io.metamask&hl=en)
- il est possible d'ajouter des articles au contrat

<p align="center">
<img src="https://github.com/Louvivien/cinemaproductionapp/blob/master/public/screenshot.jpg">
</p>

## Documentation relative aux fonctions du smartcontract

[Lien vers la documentation](https://github.com/Louvivien/cinemaproductionapp/blob/master/contracts/Production.doc.md)

## Fonctionnalités supplémentaires (en cours de développement)

- Les producteurs peuvent signer le contrat ce qui empeche toutes modifications a part la saisie des recettes
- Les informations sont enregistrees sous forme de hash
- Optimisation graphique de la barre de progression
- Optimisation graphique du décompte des recettes
- Optimisation graphique de la page d'impression
- Mise en place de tests avancés sous truffle sur les fonctionnalités existantes
- Verifier que tous les controles React sont aussi mis en place au niveau du smartcontract
- Il est possible de lier le contrat à un projet global

## Déploiement en local

- `git clone git@github.com:Louvivien/cinemaproductionapp.git` pour télécharger le repertoire sous Linux ou Mac
- `cd filmproductionapp`pour aller dans le dossier
- Installer et lancer `ganache,` l'application est configurée sur le port 7545, port par défaut en version interface graphique
- `npm install` dans le dossier cloné
- `truffle compile` pour compiler les smartcontracts
- `truffle migrate` pour déployer les smartcontracts sur le réseau Ganache
- `truffle test --network ganache` pour lancer les tests
- `npm run start` pour lancer le server
- [http://localhost:3000](http://localhost:3000) pour accéder a l'application sur votre navigateur
- Configurer `Metamask` en mode custom RPC avec comme RPC URL http://127.0.0.1:7545 afin de se connecter au réseau Ganache

## Déploiement sur Heroku

- `git clone git@github.com:Louvivien/cinemaproductionapp.git` pour télécharger le repertoire sous Linux ou Mac
- `cd filmproductionapp` pour aller dans le dossier
- `truffle compile`
- Vous devez saisir 3 paramétrages [Infura](https://infura.io/dashboard) afin d'accéder au réseau Rinkeby dans le fichier truffle-config.js :
  1. var infura_apikey = `VOTRE CLEE D'ACCEES INFURA`;
  2. var mnemonic = `DOUZE MOTS QUE VOUS TROUVEREZ DANS LES PARAMETRES DE VOTRE WALLET METAMASK`;
     Attention à ne pas communiquer un compte sur Github
  3. var address = `ADRESSE ETHEREUM AVEC DES ETHER SUR LE RESEAU RINKEBY`;
- `truffle migrate --reset --network rinkeby` pour déployer les smartcontracts sur le réseau Rinkeby
- vous devez avoir un compte [Heroku](https://heroku.com)
- `git init` pour initialiser le répertoire git
- `heroku create NOMDEVOTREAPP --buildpack mars/create-react-app` pour créer sur Heroku un nouveau projet
- `git add .`
- `git commit -m "VOTRE COMMENTAIRE"`
- `git remote -v` si vous souhaiter vérifier sur quels répertoires vous pouvez pusher votre application
- `git push heroku master` pour déployer l'application sur Heroku
  `

## Démo

[Lien vers l'application déployée sur Heroku](https://cinemaproductionapp.herokuapp.com/)

### Projet

|      Nom       |                          Lien Github                           |
| :------------: | :------------------------------------------------------------: |
| Vivien Richaud | [https://github.com/Louvivien/](https://github.com/Louvivien/) |
