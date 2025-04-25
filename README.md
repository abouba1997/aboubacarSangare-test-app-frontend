# 🧪 Test Technique Frontend – React / Next.js / Tailwind

Projet terminé dans le cadre du test technique frontend pour Sup Management Mali.  
Ce tableau de bord académique a été réalisé avec Next.js et TailwindCSS, en consommant une API REST sécurisée.

---

## ✅ Fonctionnalités Implémentées

### 🎨 Layout Admin Professionnel
- Sidebar fixe à gauche avec navigation
- Header sticky avec titre de la page
- Contenu principal responsive
- Routing complet pour les sections : `/programs`, `/levels`, `/students`

---

### 📘 /programs – Gestion des Programmes
- Liste des programmes sous forme de table (Nom, Sigle, Type, Niveaux associés, Date de création)
- CRUD complet :
  - ➕ Création d’un programme
  - ✏️ Édition d’un programme
  - 🗑️ Suppression avec confirmation
- Intégration des types de programme via `GET /v2/program-types`
- API utilisée :
  - `GET/POST/PATCH/DELETE /v2/programs`

---

### 🏷 /levels – Gestion des Niveaux
- Liste des niveaux (Nom, Sigle, Index, Programmes associés, Dernière modification)
- Ajout / Édition / Suppression d’un niveau
- Association dynamique de plusieurs programmes à un niveau (relation many-to-many)
- API utilisée :
  - `GET/POST/PATCH/DELETE /v2/levels`
  - `GET /v2/programs` pour les associations

---

### 👨‍🎓 /students – Liste des Étudiants
- Affichage des étudiants (Nom, Prénom, Email, Niveau, Programme, Date d’inscription)
- Recherche instantanée 🔍
- Filtres par **niveau** et **programme** 🎯
- Export de la liste :
  - 📤 Vers Excel (.xlsx)
  - 📤 Vers PDF

> **NB** : Les endpoints étudiants étant indisponibles, cette section est simulée via des données statiques mockées localement.

---

## 🔐 API & Authentification

- Base URL : `https://api-staging.supmanagement.ml`
- Authentification par **Token d'accès**
  - Clé utilisée : `0000-8432-3244-0923`
- Intégration via `Axios` avec intercepteur global

---

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router) avec TypeScript
- **Style** : TailwindCSS + shadcn/ui
- **Tableaux** : @tanstack/react-table v8
- **Appels API** : Axios
- **Formulaires** : React Hook Form + Zod (validation)
- **Gestion d’état** : Context API

---

## 🚀 Lancer le projet localement

```bash
git clone https://github.com/abouba1997/aboubacarSangare-test-app-frontend.git
cd aboubacarSangare-test-app-frontend

pnpm install
pnpm dev
