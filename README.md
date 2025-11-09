# EmailReply - Générateur de réponses emails avec Claude

Application web simple qui génère des réponses intelligentes à vos emails en utilisant l'API Claude d'Anthropic.

## Fonctionnalités

- Collez le contenu d'un email reçu
- Choisissez le ton de la réponse (Formel, Amical, Bref)
- Générez une réponse intelligente avec Claude
- Copiez facilement la réponse générée

## Stack technique

- **Frontend** : HTML, CSS, JavaScript vanilla
- **Backend** : Node.js + Express
- **IA** : Claude API (Anthropic)

## Installation

### 1. Prérequis

- Node.js (v16 ou supérieur)
- Une clé API Anthropic ([obtenez-la ici](https://console.anthropic.com/))

### 2. Installation des dépendances

```bash
cd emailreply/backend
npm install
```

### 3. Configuration

Créez un fichier `.env` dans le dossier `backend` :

```bash
cp .env.example .env
```

Modifiez le fichier `.env` et ajoutez votre clé API :

```
ANTHROPIC_API_KEY=votre_clé_api_ici
PORT=3000
```

## Utilisation

### 1. Démarrer le backend

```bash
cd backend
npm start
```

Le serveur démarre sur `http://localhost:3000`

### 2. Ouvrir le frontend

Ouvrez simplement le fichier `frontend/index.html` dans votre navigateur, ou utilisez un serveur local :

```bash
# Avec Python
cd frontend
python -m http.server 8080

# Avec Node.js (http-server)
npx http-server frontend -p 8080
```

Accédez à `http://localhost:8080`

## Utilisation de l'application

1. Collez le contenu de l'email reçu dans la zone de texte
2. Sélectionnez le ton souhaité :
   - **Formel** : Réponse professionnelle avec vouvoiement
   - **Amical** : Réponse chaleureuse avec tutoiement
   - **Bref** : Réponse courte et directe
3. Cliquez sur "Générer la réponse"
4. Copiez la réponse générée avec le bouton "Copier"

## Structure du projet

```
emailreply/
├── backend/
│   ├── server.js          # Serveur Express avec endpoint API
│   ├── package.json       # Dépendances Node.js
│   ├── .env.example       # Exemple de configuration
│   └── .env               # Configuration (à créer)
├── frontend/
│   ├── index.html         # Interface utilisateur
│   ├── style.css          # Styles
│   └── script.js          # Logique frontend
├── .gitignore
└── README.md
```

## API Endpoint

### POST /api/generate-reply

Génère une réponse à un email.

**Request:**
```json
{
  "emailContent": "Contenu de l'email reçu",
  "tone": "formel" | "amical" | "bref"
}
```

**Response:**
```json
{
  "success": true,
  "reply": "La réponse générée..."
}
```

## Développement

Pour le développement avec rechargement automatique :

```bash
cd backend
npm run dev
```

## Personnalisation

Vous pouvez modifier les instructions de ton dans `backend/server.js` dans l'objet `toneInstructions` pour adapter les réponses à vos besoins.

## Licence

MIT

## Auteur

Créé avec Claude Code
