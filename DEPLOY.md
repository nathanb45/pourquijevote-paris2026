# Guide de déploiement — pourquoivoter.fr

## Prérequis
- Un compte GitHub (gratuit)
- Un compte Vercel (gratuit)
- Ta clé API Claude (Anthropic)

---

## Étape 1 — Mettre le projet sur GitHub

1. Va sur [github.com](https://github.com) → **New repository**
2. Nom : `pourquoivoter` — visibility : **Private** (recommandé)
3. Sur ton ordinateur, ouvre un terminal dans le dossier du projet :

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TON-USERNAME/pourquoivoter.git
git push -u origin main
```

---

## Étape 2 — Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com) → **Add New Project**
2. Importe ton repo GitHub `pourquoivoter`
3. Vercel détecte automatiquement la config — **ne change rien**, clique **Deploy**
4. Ton site est en ligne sur une URL `*.vercel.app` en ~60 secondes

---

## Étape 3 — Ajouter la clé API Claude

1. Dans Vercel → ton projet → **Settings** → **Environment Variables**
2. Ajoute :
   - **Name** : `ANTHROPIC_API_KEY`
   - **Value** : ta clé API (commence par `sk-ant-...`)
   - **Environment** : Production + Preview + Development
3. Clique **Save**
4. Va dans **Deployments** → clique les **3 points** sur le dernier déploiement → **Redeploy**

---

## Étape 4 — Pointer le domaine pourquoivoter.fr

1. Achète le domaine `pourquoivoter.fr` (OVH, Gandi, Namecheap…)
2. Dans Vercel → **Settings** → **Domains** → tape `pourquoivoter.fr` → **Add**
3. Vercel te donne des enregistrements DNS à copier
4. Dans ton registrar (OVH etc.) → zone DNS → colle les enregistrements Vercel
5. Attends 10-30 minutes → le domaine est actif avec HTTPS automatique

---

## Modifications ultérieures

| Ce que tu veux changer | Fichier à modifier |
|---|---|
| Design (couleurs, fonts, mise en page) | `public/index.html` — section `<style>` |
| Questions suggérées | `public/index.html` — tableau `SUGGESTED_QUESTIONS` en haut du `<script>` |
| System prompt / règles du chatbot | `system_prompt.md` |
| Programmes des candidats | `system_prompt.md` (section PROGRAMMES COMPLETS) |

Après chaque modification : `git add . && git commit -m "update" && git push`
Vercel redéploie automatiquement en ~30 secondes.

---

## Structure du projet

```
pourquoivoter/
├── api/
│   └── chat.js          ← Fonction serverless (appel API Claude)
├── public/
│   └── index.html       ← Frontend complet (HTML + CSS + JS)
├── system_prompt.md     ← System prompt + 6 programmes candidats
├── vercel.json          ← Config routing Vercel
├── package.json         ← Dépendances Node
└── DEPLOY.md            ← Ce fichier
```
