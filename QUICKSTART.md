# Démarrage rapide - EmailReply

## Étapes pour lancer l'application

### 1. Configurer votre clé API

Ouvrez le fichier `backend/.env` et remplacez `REMPLACEZ_CETTE_LIGNE_PAR_VOTRE_CLE_API` par votre vraie clé API Anthropic.

Pour obtenir une clé API :
- Allez sur https://console.anthropic.com/
- Créez un compte gratuit
- Générez une nouvelle clé API

### 2. Démarrer le serveur backend

```bash
cd emailreply/backend
npm start
```

Vous devriez voir : `🚀 Serveur démarré sur http://localhost:3000`

### 3. Ouvrir l'interface

Ouvrez simplement le fichier `frontend/index.html` dans votre navigateur.

**OU** utilisez un serveur local (recommandé) :

```bash
# Option 1 : Python
cd emailreply/frontend
python -m http.server 8080

# Option 2 : Node.js
npx http-server emailreply/frontend -p 8080
```

Puis ouvrez http://localhost:8080

## Utilisation

1. Collez un email dans la zone de texte
2. Choisissez le ton (Formel/Amical/Bref)
3. Cliquez sur "Générer la réponse"
4. Copiez la réponse générée

## Raccourci clavier

Ctrl+Enter (ou Cmd+Enter sur Mac) dans la zone de texte pour générer rapidement.

## Problèmes courants

### Erreur CORS
Si vous avez une erreur CORS, assurez-vous d'ouvrir le frontend depuis un serveur local (pas en ouvrant directement le fichier HTML).

### Erreur API Key
Vérifiez que votre clé API est correctement configurée dans `backend/.env`.

### Port déjà utilisé
Si le port 3000 est déjà utilisé, modifiez `PORT=3001` dans le fichier `.env`.
