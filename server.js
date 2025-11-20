// Backend Node.js per gestire le chiamate a ChatGPT
require('dotenv').config(); // Carica le variabili d'ambiente
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const aiConfig = require('./ai-config'); // Configurazione AI

console.log('🔧 AI Config loaded:', aiConfig);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve i file statici

// Carica la configurazione
const config = JSON.parse(fs.readFileSync('chat-config.json', 'utf8'));

// Crea il system prompt da inviare a ChatGPT
function createSystemPrompt() {
    // TOON (Token-Oriented Object Notation) Helper
    // Ottimizza i dati per risparmiare token e migliorare la comprensione dell'AI
    const toToon = (obj, indent = 0) => {
        const spaces = '  '.repeat(indent);
        let output = '';
        
        for (const [key, value] of Object.entries(obj)) {
            if (key === 'chatbotInstructions') continue; // Salta istruzioni separate
            
            // Formatta la chiave (da camelCase a Human Readable)
            const readableKey = key.replace(/([A-Z])/g, ' $1').toUpperCase();
            
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                output += `${spaces}${readableKey}:\n${toToon(value, indent + 1)}`;
            } else if (Array.isArray(value)) {
                output += `${spaces}${readableKey}:\n`;
                value.forEach(item => {
                    if (typeof item === 'object') {
                        output += `${spaces}  -\n${toToon(item, indent + 2)}`;
                    } else {
                        output += `${spaces}  - ${item}\n`;
                    }
                });
            } else {
                output += `${spaces}${readableKey}: ${value}\n`;
            }
        }
        return output;
    };

    return `${config.chatbotInstructions}

DATI AZIENDALI (Formato TOON - Strict Data):
${toToon(config)}

Usa queste informazioni per rispondere. Mantieni un tono professionale ma cordiale.`;
}

// Endpoint per la chat
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;
        
        console.log(`💬 New message: "${message}"`);
        console.log(`📚 Conversation history length: ${conversationHistory.length}`);
        
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
        
        if (!OPENAI_API_KEY) {
            console.log('⚠️ No API key found, using local responses');
            // Fallback a risposte predefinite se non c'è API key
            const response = getLocalResponse(message);
            console.log(`📤 Local response: ${response.substring(0, 50)}...`);
            return res.json({ response });
        }
        
        console.log('🤖 Calling OpenAI API...');

        // Chiamata a OpenAI
        const fetch = (await import('node-fetch')).default;
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: aiConfig.model, // Configurabile in ai-config.js
                messages: [
                    {
                        role: 'system',
                        content: createSystemPrompt()
                    },
                    ...conversationHistory,
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: aiConfig.temperature,
                max_completion_tokens: aiConfig.maxTokens, // Nuovo parametro per gpt-4o-mini
                presence_penalty: aiConfig.presencePenalty,
                frequency_penalty: aiConfig.frequencyPenalty
            })
        });

        const data = await openaiResponse.json();
        
        if (data.error) {
            console.error('❌ OpenAI API error:', data.error);
            throw new Error(data.error.message);
        }

        const response = data.choices[0].message.content;
        console.log(`✅ OpenAI response: ${response.substring(0, 100)}...`);
        res.json({ response });

    } catch (error) {
        console.error('❌ Full error:', error);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error stack:', error.stack);
        res.status(500).json({ 
            error: 'Si è verificato un errore. Riprova tra poco o contattaci direttamente.',
            errorDetails: error.message,
            fallback: getLocalResponse(req.body.message)
        });
    }
});

// Funzione di fallback per risposte locali
function getLocalResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('prezzo') || lowerMessage.includes('costo') || lowerMessage.includes('preventivo')) {
        return `Ecco i nostri prezzi principali:

💻 **Web Development:**
- Landing Page: €800-€1.500
- Sito Corporate: €2.000-€5.000
- E-commerce: €3.500-€10.000+

🎨 **Graphic Design:**
- Logo: €400-€1.200
- Brand Identity: €1.500-€3.500
- Materiale Pubblicitario: €150-€500/pezzo

📱 **Social Media:**
- Piano Basic: €500-€800/mese
- Piano Professional: €900-€1.500/mese
- Piano Premium: €1.600-€3.000/mese

Per un preventivo personalizzato, contattaci a ${config.companyInfo.email}! 💼`;
    }
    
    if (lowerMessage.includes('servizi') || lowerMessage.includes('cosa fate')) {
        return `Offriamo tre servizi principali:

🌐 **Web Development** - Siti web, e-commerce, web app
🎨 **Graphic Design** - Logo, branding, materiale pubblicitario
📱 **Social Media** - Gestione, contenuti, campagne ads

Quale ti interessa di più? Posso darti maggiori dettagli! ✨`;
    }
    
    if (lowerMessage.includes('contatt') || lowerMessage.includes('email') || lowerMessage.includes('telefono')) {
        return `Puoi contattarci in questi modi:

📧 Email: ${config.companyInfo.email}
📞 Telefono: ${config.companyInfo.phone}

Oppure compila il form nella sezione contatti del sito. Rispondiamo entro 24 ore! 🚀`;
    }
    
    return `Grazie per il tuo messaggio! Per informazioni dettagliate sui nostri servizi e prezzi, contattaci a ${config.companyInfo.email} o chiamaci. Il nostro team sarà felice di aiutarti! 💬`;
}

// Endpoint per ottenere la configurazione (opzionale)
app.get('/api/config', (req, res) => {
    res.json(config);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📝 API endpoint: http://localhost:${PORT}/api/chat`);
    console.log(`🔑 OpenAI API Key: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Missing'}`);
    console.log(`🤖 AI Model: ${aiConfig.model}`);
    console.log(`💰 Estimated cost: ~$${aiConfig.costs[aiConfig.model]}/1000 messages`);
    console.log(`📋 Config loaded: ${Object.keys(config).length} sections`);
});
