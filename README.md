# Gratte-ciel

Un jeu d'adresse et de rythme : empile les étages d'un gratte-ciel. Chaque nouvel étage glisse d'un côté à l'autre au-dessus de la tour ; lâche-le au bon moment pour qu'il tombe pile sur le précédent. Monte le plus haut possible, des nuages jusqu'aux étoiles.

*English version: [README.en.md](README.en.md)*

## Commandes

- **Clic** ou **Espace** : lâcher l'étage qui glisse (et lancer la partie).
- **P** : pause.
- **Manette** : **A**, **X** ou **RB** lâche l'étage, **Start** met en pause.
- **Plein écran** : le bouton du même nom ; Échap pour en sortir. Hors plein écran, la tour prend la hauteur de la fenêtre.

## Règles

- Les étages arrivent alternativement par la gauche et par la droite, de plus en plus vite à mesure que la tour monte.
- La partie de l'étage qui dépasse de celui du dessous est **coupée** et tombe : la tour devient de plus en plus étroite.
- **Pile dessus** (à un cheveu près) : l'étage garde toute sa largeur, avec un « Parfait ! ».
- **Trois fois pile à la suite** : à partir du troisième, chaque parfait **élargit** la tour, jusqu'à sa largeur de départ. Chaque parfait de la série sonne **une note plus haut** que le précédent (la gamme monte sur deux octaves).
- Un étage lâché complètement à côté tombe, et la partie est finie.

Le ciel change avec la hauteur : la ville, les nuages, puis la nuit et l'espace.

Chaque étage est dessiné : le hall et sa porte vitrée en bas, des fenêtres allumées (parfois un rideau ou une plante) ou éteintes, des pilastres, un balcon tous les trois étages. Quand la tour s'arrête, elle reçoit son toit : château d'eau et antenne au feu rouge clignotant.

## Statistiques

Le panneau Records montre ta **plus haute tour** (en étages), le nombre de **tours** construites, le total d'**étages posés** et de **parfaits**.

## Données et synchronisation

Ton record et tes totaux sont enregistrés par NeoDex, sauvegardés et synchronisés entre tes PC si la synchro est activée.

## Installer

Dans NeoDex : **NeoStore → À découvrir → Gratte-ciel → Installer**.

Développer un plugin : voir le [SDK NeoDex](https://github.com/NDesumeur/neodex-sdk).
