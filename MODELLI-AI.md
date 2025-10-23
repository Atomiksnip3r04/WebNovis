# 🤖 Guida ai Modelli OpenAI

## Modelli Disponibili (Gennaio 2025)

### ⭐ gpt-4o-mini (CONSIGLIATO)
- **Costo**: ~$0.15 per 1000 messaggi
- **Velocità**: ⚡⚡⚡⚡⚡ Molto veloce
- **Qualità**: ⭐⭐⭐⭐ Ottima
- **Ideale per**: Chatbot, assistenti virtuali, FAQ
- **Quando usarlo**: Perfetto per la maggior parte dei casi d'uso

### 🚀 gpt-4o
- **Costo**: ~$2.50 per 1000 messaggi
- **Velocità**: ⚡⚡⚡⚡ Veloce
- **Qualità**: ⭐⭐⭐⭐⭐ Eccellente
- **Ideale per**: Consulenze complesse, analisi dettagliate
- **Quando usarlo**: Quando serve la massima qualità

### 💎 gpt-4-turbo
- **Costo**: ~$10 per 1000 messaggi
- **Velocità**: ⚡⚡⚡ Media
- **Qualità**: ⭐⭐⭐⭐⭐ Eccellente
- **Ideale per**: Progetti premium, analisi approfondite
- **Quando usarlo**: Budget alto e massima qualità richiesta

### 💰 gpt-3.5-turbo
- **Costo**: ~$0.50 per 1000 messaggi
- **Velocità**: ⚡⚡⚡⚡⚡ Molto veloce
- **Qualità**: ⭐⭐⭐ Buona
- **Ideale per**: Risposte semplici, FAQ base
- **Quando usarlo**: Budget molto limitato

## ⚠️ Modelli NON Esistenti

- ❌ **gpt-5** - Non ancora rilasciato
- ❌ **gpt-5-mini** - Non esiste
- ❌ **gpt-4.5** - Non esiste

## 📊 Confronto Costi

### Scenario: 100 conversazioni/giorno (3000 messaggi/mese)

| Modello | Costo Mensile | Qualità | Velocità |
|---------|---------------|---------|----------|
| gpt-4o-mini | **$0.45** ⭐ | ⭐⭐⭐⭐ | ⚡⚡⚡⚡⚡ |
| gpt-4o | $7.50 | ⭐⭐⭐⭐⭐ | ⚡⚡⚡⚡ |
| gpt-4-turbo | $30.00 | ⭐⭐⭐⭐⭐ | ⚡⚡⚡ |
| gpt-3.5-turbo | $1.50 | ⭐⭐⭐ | ⚡⚡⚡⚡⚡ |

### Scenario: 500 conversazioni/giorno (15000 messaggi/mese)

| Modello | Costo Mensile | Consigliato |
|---------|---------------|-------------|
| gpt-4o-mini | **$2.25** | ✅ Sì |
| gpt-4o | $37.50 | ⚠️ Solo se necessario |
| gpt-4-turbo | $150.00 | ❌ Troppo costoso |
| gpt-3.5-turbo | $7.50 | ✅ Alternativa economica |

## 🎯 Come Scegliere

### Per WebNovis (Chatbot Sito Web)

**Consiglio: gpt-4o-mini**

✅ **Vantaggi:**
- Costo bassissimo (~$0.45/mese per 100 conversazioni/giorno)
- Qualità eccellente per FAQ e informazioni
- Velocità ottima
- Perfetto per rispondere su servizi e prezzi

❌ **Quando NON usarlo:**
- Se serve analisi molto complesse
- Se il budget non è un problema

### Alternative

**gpt-4o** - Se vuoi la massima qualità e hai budget
**gpt-3.5-turbo** - Se vuoi risparmiare ancora di più (ma qualità inferiore)

## 🔧 Come Cambiare Modello

### Metodo 1: File ai-config.js (Consigliato)

Apri `ai-config.js` e cambia:

```javascript
model: 'gpt-4o-mini', // Cambia qui
```

### Metodo 2: Direttamente in server.js

Cerca la riga con `model:` e modifica.

## 📈 Monitoraggio Costi

Controlla i tuoi costi su:
https://platform.openai.com/usage

## 💡 Tips per Risparmiare

1. **Usa gpt-4o-mini** per la maggior parte dei casi
2. **Limita max_tokens** a 500-800 (già configurato)
3. **Mantieni conversationHistory** a max 20 messaggi
4. **Usa fallback locale** per domande semplici
5. **Monitora l'uso** regolarmente

## 🆘 Troubleshooting

### Errore: "Model not found"
- Verifica che il nome del modello sia corretto
- Controlla che il tuo account OpenAI abbia accesso al modello

### Costi troppo alti
- Riduci `max_tokens` in `ai-config.js`
- Passa a gpt-4o-mini o gpt-3.5-turbo
- Implementa cache per domande frequenti

### Risposte di bassa qualità
- Passa a gpt-4o
- Aumenta `temperature` per più creatività
- Migliora il system prompt in `chat-config.json`

## 📚 Risorse

- [OpenAI Pricing](https://openai.com/pricing)
- [Model Documentation](https://platform.openai.com/docs/models)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)
