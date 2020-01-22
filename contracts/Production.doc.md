# Noms et descriptions des fonctions et événements du smartcontract Production.sol

## Légende

### Nom de la fonction

| name        | type | description |
| ----------- | ---- | ----------- |
| \_argument1 | type |

**Description de la fonction **

## Fonctions permettant la saisie d'informations dans la blockchain

### addProducer - read

| name            | type    | description |
| --------------- | ------- | ----------- |
| \_name          | string  |
| \_producerShare | uint256 |

**Cette fonction permet d'ajouter un producteur, il est demandé de préciser le nom du producteur et sa part sur les recettes en % **
**Ex: Steven Spielberg, 10 **

### addRevenue - read

| name            | type    | description |
| --------------- | ------- | ----------- |
| \_revenueAmount | uint256 |

**Cette fonction permet d'ajouter une recette, il est demandé de préciser le montant de la recette en euros **
**Ex: 100 **

### addMandat - read

| name         | type   | description |
| ------------ | ------ | ----------- |
| \_mandatType | string |

**Cette fonction permet d'ajouter un mandat, il est demandé de préciser le type de mandat **
**Ex: Droits d'exploitation TV **

## Fonctions permettant la lecture d'informations de la blockchain

### getProducer - view

| name       | type    | description |
| ---------- | ------- | ----------- |
| producerID | uint256 |

**Cette fonction permet retourne le nom d'un producteur et sa part sur les recettes en saisissant son ID **

### listProducers - view

| name | type    | description |
| ---- | ------- | ----------- |
|      | address |

**Cette fonction permet de savoir si une adresse est associée à un producteur du contrat **

### mandats - view

| name | type    | description |
| ---- | ------- | ----------- |
|      | uint256 |

**Cette fonction retourne le nom d'un mandat en fonction de son ID **

### producers - view

| name | type    | description |
| ---- | ------- | ----------- |
|      | uint256 |

**Cette fonction permet retourne le nom d'un producteur et sa part sur les recettes en saisissant son ID **

### producersCount - view

_No parameters_

**Cette fonction retourne le nombre de producteurs **

### revenues - view

| name | type    | description |
| ---- | ------- | ----------- |
|      | uint256 |

**Cette fonction retourne le montant d'une recette en fonction de son ID **

### revenuesCount - view

_No parameters_

**Cette fonction retourne le nombre de lignes de recette **

### mandatsCount - view

_No parameters_

**Cette fonction retourne le nombre de mandats **

### name - view

_No parameters_

**Cette fonction donne le nom de l'application **

### revenuesTotal - view

_No parameters_

**Cette fonction retourne la somme totale des recettes **

## Evénements du smartcontracts

### addedProducerEvent - read

| name          | type    | description |
| ------------- | ------- | ----------- |
| id            | uint256 |
| name          | string  |
| producerShare | uint256 |
| owner         | address |

**Cet événement est créé lorsqu'un utilisateur ajoute un producteur **

### addedRevenueEvent - read

| name          | type    | description |
| ------------- | ------- | ----------- |
| revenuesCount | uint256 |
| revenuesTotal | uint256 |

**Cet événement est créé lorsqu'un utilisateur ajoute une recette **

### addedMandatEvent - read

| name         | type    | description |
| ------------ | ------- | ----------- |
| mandatsCount | uint256 |

**Cet événement est créé lorsqu'un utilisateur ajoute un mandat **
