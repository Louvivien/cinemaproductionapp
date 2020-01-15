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

## Fonctionnalités supplémentaires (en cours de développement)

- Mise en place de tests sous truffle sur les fonctionnalités existantes
- Il est possible de lier le contrat à un projet global
- En fonction des recettes saisies, l'application calcul le montant à verser aux parties prenantes du projet

## Deploiement en local

- `git clone` le repository
- cd filmproductionapp
- Installer et lancer `ganache,` l'application est configurée sur le port 7545 qui correspond au port par défaut de ganache en version interface graphique
- `npm install` dans le dossier cloné
- `truffle migrate` pour compiler les smartcontract
- `npm run dev` pour lancer le server
- http://localhost:3000 pour voir l'application
- configurer `Metamask` en mode custom RPC avec comme RPC URL http://127.0.0.1:7545 afin de se connecter à réseau Ganache

## Deploiement sur Heroku

- `git clone` le repository
- cd filmproductionapp
- truffle compile
- Configure settings variables to rinkeby in truffle-config.js file:
  var infura_apikey = "you need to register in Infura for an Access Token.";
  var mnemonic = "< twelve words you can find in metamask/settings/reveal seed words >";
  var address = "rinkeby address with ether";
- truffle migrate --reset --network rinkeby
  Note: If you receive an error Error: Exceeds block gas limit, you may need to manually set the gas limit for your contract. See the Truffle Configuration documentation for details.
- git push heroku master

http://filmproductiondapp.herokuapp.com/

### Projet

|      Nom       |                          Lien Github                           |
| :------------: | :------------------------------------------------------------: |
| Vivien Richaud | [https://github.com/Louvivien/](https://github.com/Louvivien/) |
