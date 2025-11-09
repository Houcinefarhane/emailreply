require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialiser le client Anthropic
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Endpoint pour générer une réponse email
app.post('/api/generate-reply', async (req, res) => {
  try {
    const { emailContent, tone } = req.body;

    if (!emailContent) {
      return res.status(400).json({ error: 'Le contenu de l\'email est requis' });
    }

    // Définir les instructions selon le ton choisi
    const toneInstructions = {
      formel: 'Génère une réponse formelle et professionnelle, avec vouvoiement et formules de politesse appropriées.',
      amical: 'Génère une réponse amicale et chaleureuse, avec tutoiement et un ton décontracté mais respectueux.',
      bref: 'Génère une réponse courte et directe, allant droit au but tout en restant poli.'
    };

    const selectedTone = toneInstructions[tone] || toneInstructions.formel;

    // Créer le prompt pour Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Tu es un assistant qui aide à rédiger des réponses à des emails.

${selectedTone}

Voici l'email reçu :
"""
${emailContent}
"""

Génère une réponse appropriée à cet email. Retourne uniquement le corps de l'email (sans "Objet:" ni signature détaillée, juste le contenu).`
      }]
    });

    const reply = message.content[0].text;

    res.json({
      success: true,
      reply: reply
    });

  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération de la réponse',
      details: error.message
    });
  }
});

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EmailReply API fonctionne' });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});
