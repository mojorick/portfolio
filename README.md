# Portfolio de Hémérick Morié

Portfolio bilingue réalisé avec React, TypeScript et Vite.

```sh
npm ci
npm run dev
npm run lint
npm run build
```

## Mettre à jour les CV

Le profil, les expériences et les disponibilités sont dans `src/data/content.ts`. Le document partagé entre l’aperçu du site et l’impression est `src/components/ResumeDocument.tsx`. Les liens publics Canva sont dans `src/components/Resume.tsx`.

Après une modification du CV, ouvrez `/?resume=fr` et `/?resume=en` sur le serveur de développement. Imprimez chaque page en PDF au format A4, avec les en-têtes et pieds de page du navigateur désactivés. Remplacez `public/cv/hemerick-morie-fr.pdf` et `public/cv/hemerick-morie-en.pdf`, puis vérifiez que chaque document tient sur une page et que son texte est sélectionnable.
