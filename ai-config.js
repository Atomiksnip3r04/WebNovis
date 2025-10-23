// Configurazione AI per il chatbot
module.exports = {
    // Modello OpenAI da utilizzare
    model: 'gpt-4o-mini', // ⭐ CONSIGLIATO - Migliore rapporto qualità/prezzo

    // Altri modelli disponibili (decommentare per usare):
    // model: 'gpt-4o',           // Più intelligente, ~$2.50/1M tokens
    // model: 'gpt-4-turbo',      // Molto intelligente, ~$10/1M tokens  
    // model: 'gpt-3.5-turbo',    // Economico ma meno capace, ~$0.50/1M tokens

    // Parametri di generazione
    temperature: 0.7,        // 0.0 = più preciso e deterministico, 1.0 = più creativo
    maxTokens: 800,          // Lunghezza massima della risposta
    presencePenalty: 0.1,    // Penalizza ripetizioni (0.0 - 2.0)
    frequencyPenalty: 0.1,   // Incoraggia varietà (0.0 - 2.0)

    // Comportamento del bot
    systemPromptEnhancement: true, // Usa prompt di sistema avanzato
    conversationMemory: 20,        // Numero di messaggi da ricordare (max 20)

    // Fallback
    useFallbackOnError: true,      // Usa risposte locali se API fallisce

    // Costi stimati (per 1000 messaggi)
    costs: {
        'gpt-4o-mini': 0.15,
        'gpt-4o': 2.50,
        'gpt-4-turbo': 10.00,
        'gpt-3.5-turbo': 0.50
    }
};
