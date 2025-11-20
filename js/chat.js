// ===== CHAT POPUP FUNCTIONALITY =====
console.log('💬 Loading chat system...');

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 DOM loaded, initializing chat...');
    
    const chatButton = document.getElementById('chatButton');
    const chatPopup = document.getElementById('chatPopup');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const fabNotification = document.querySelector('.fab-notification');

    console.log('🔍 Chat elements:', { 
        chatButton: !!chatButton, 
        chatPopup: !!chatPopup,
        chatClose: !!chatClose,
        chatInput: !!chatInput,
        chatSend: !!chatSend,
        chatMessages: !!chatMessages
    });

    if (!chatButton || !chatPopup) {
        console.error('❌ Chat elements not found!');
        return;
    }

    // Toggle chat popup - usando onclick per massima compatibilità
    chatButton.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = chatPopup.classList.contains('active');
        console.log('🖱️ Chat button clicked! State:', isActive ? 'open→close' : 'closed→open');
        
        chatPopup.classList.toggle('active');
        
        // Nascondi notifica quando apri la chat
        if (chatPopup.classList.contains('active') && fabNotification) {
            fabNotification.style.display = 'none';
        }
        
        // Focus sull'input quando si apre
        if (chatPopup.classList.contains('active') && chatInput) {
            setTimeout(() => chatInput.focus(), 300);
        }
        
        console.log('✅ Chat state changed to:', chatPopup.classList.contains('active') ? 'open' : 'closed');
    };

    // Close chat
    if (chatClose) {
        chatClose.onclick = function() {
            chatPopup.classList.remove('active');
        };
    }

    // Send message function
    function sendMessage() {
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (message === '') return;
        
        addUserMessage(message);
        chatInput.value = '';
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            addBotResponse(message);
        }, 1000 + Math.random() * 1000);
    }

    // Send message on button click
    if (chatSend) {
        chatSend.onclick = sendMessage;
    }

    // Send message on Enter key - FIX: previeni refresh e scroll
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                sendMessage();
            }
        });
        
        // Previeni scroll della pagina quando si digita nella chat
        chatInput.addEventListener('keydown', (e) => {
            e.stopPropagation();
        });
        
        chatInput.addEventListener('input', (e) => {
            e.stopPropagation();
        });
    }

    // Quick reply buttons
    const quickReplyButtons = document.querySelectorAll('.quick-reply');
    quickReplyButtons.forEach(button => {
        button.onclick = function() {
            const message = button.dataset.message;
            chatInput.value = message;
            sendMessage();
            
            const quickRepliesContainer = document.querySelector('.chat-quick-replies');
            if (quickRepliesContainer) {
                quickRepliesContainer.style.opacity = '0';
                setTimeout(() => quickRepliesContainer.remove(), 300);
            }
        };
    });

    // Helper functions
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">TU</div>
            <div class="message-content">
                <p>${escapeHtml(message)}</p>
                <span class="message-time">Ora</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    async function addBotResponse(userMessage) {
        const response = await getBotResponse(userMessage);
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message bot-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">WN</div>
            <div class="message-content">
                <p>${response}</p>
                <span class="message-time">Ora</span>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">WN</div>
            <div class="message-content">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    function scrollToBottom() {
        if (chatMessages) {
            requestAnimationFrame(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            });
        }
    }

    // Conversation history per ChatGPT
    let conversationHistory = [];
    
    // Configurazione Endpoint API
    // Quando sei in locale usa localhost, quando sei online userà l'URL di produzione
    const PRODUCTION_API_URL = 'https://webnovis-chat.onrender.com/api/chat'; // ⚠️ DA AGGIORNARE DOPO IL DEPLOY SU RENDER
    
    const API_ENDPOINT = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/chat'
        : PRODUCTION_API_URL;

    async function getBotResponse(message) {
        try {
            console.log('🔄 Sending message to:', API_ENDPOINT);
            
            // Prova a chiamare il backend con ChatGPT
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: conversationHistory
                })
            });

            console.log('📥 Response status:', response.status);

            if (!response.ok) {
                throw new Error(`Backend error: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ Received response from backend');
            
            // Aggiorna la cronologia della conversazione
            conversationHistory.push(
                { role: 'user', content: message },
                { role: 'assistant', content: data.response }
            );

            // Mantieni solo gli ultimi 10 scambi (20 messaggi) per non superare i limiti
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }

            return data.response || data.fallback;

        } catch (error) {
            console.error('❌ Error calling backend:', error);
            console.warn('⚠️ ChatGPT non disponibile, uso risposte locali');
            // Fallback a risposte locali
            return getLocalResponse(message);
        }
    }

    // Risposte locali di fallback (quando il backend non è disponibile)
    function getLocalResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('servizi') || lowerMessage.includes('info')) {
            return 'Offriamo tre servizi principali: 🌐 Web Development, 🎨 Graphic Design e 📱 Social Media Management. Quale ti interessa di più?';
        } else if (lowerMessage.includes('preventivo') || lowerMessage.includes('prezzo') || lowerMessage.includes('costo')) {
            return 'Perfetto! Per un preventivo personalizzato, ti invito a compilare il form di contatto o scriverci a webnovis.info@gmail.com. Ogni progetto è unico e vogliamo offrirti la soluzione migliore! 💼';
        } else if (lowerMessage.includes('supporto') || lowerMessage.includes('aiuto') || lowerMessage.includes('problema')) {
            return 'Siamo qui per aiutarti! 🆘 Puoi contattarci via email a webnovis.info@gmail.com o compilare il form. Il nostro team è sempre disponibile!';
        } else if (lowerMessage.includes('web') || lowerMessage.includes('sito')) {
            return 'Il nostro servizio Web Development include: siti responsive, e-commerce, ottimizzazione SEO e performance ultra-veloci. Vuoi saperne di più? 🚀';
        } else if (lowerMessage.includes('design') || lowerMessage.includes('grafica') || lowerMessage.includes('logo')) {
            return 'Creiamo identità visive complete: logo, branding, materiale pubblicitario e molto altro. Il design è la nostra passione! ✨';
        } else if (lowerMessage.includes('social') || lowerMessage.includes('instagram') || lowerMessage.includes('facebook')) {
            return 'Gestiamo i tuoi social media con strategie mirate, contenuti di qualità e campagne pubblicitarie ottimizzate. Facciamo crescere il tuo brand! 📱';
        } else if (lowerMessage.includes('contatto') || lowerMessage.includes('email') || lowerMessage.includes('telefono')) {
            return 'Puoi contattarci via email a webnovis.info@gmail.com o compilare il form nella sezione contatti. Rispondiamo sempre entro 24 ore! 📧';
        } else if (lowerMessage.includes('ciao') || lowerMessage.includes('salve') || lowerMessage.includes('buongiorno')) {
            return 'Ciao! 👋 Benvenuto su WebNovis. Come posso aiutarti oggi?';
        } else if (lowerMessage.includes('grazie')) {
            return 'Prego! È stato un piacere aiutarti. Se hai altre domande, sono qui! 😊';
        } else {
            return 'Interessante! Per informazioni più dettagliate, ti consiglio di contattarci direttamente. Il nostro team sarà felice di rispondere a tutte le tue domande! 💬';
        }
    }

    // Keep-Alive System per Render.com
    // Mantiene il server attivo simulando traffico quando l'utente è sul sito
    const KEEPALIVE_INTERVAL = 5 * 60 * 1000; // 5 minuti
    
    // URL di base per il health check
    const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : 'https://webnovis-chat.onrender.com'; // Deve corrispondere a PRODUCTION_API_URL base

    setInterval(() => {
        // Esegui il ping solo se non siamo in locale (o per test se vuoi)
        if (window.location.hostname !== 'localhost' && window.location.protocol !== 'file:') {
            console.log('💓 Sending keep-alive heartbeat...');
            fetch(`${BASE_URL}/api/health`)
                .then(res => {
                    if(res.ok) console.log('💓 Heartbeat success');
                    else console.warn('💔 Heartbeat returned status:', res.status);
                })
                .catch(err => {
                    // Silenzioso per l'utente, utile per debug
                    console.warn('💔 Heartbeat failed (server might be sleeping):', err);
                });
        }
    }, KEEPALIVE_INTERVAL);

    // Ping immediato all'avvio per svegliare il server se necessario
    if (window.location.hostname !== 'localhost' && window.location.protocol !== 'file:') {
        setTimeout(() => {
            fetch(`${BASE_URL}/api/health`).catch(() => {});
        }, 2000);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (chatPopup.classList.contains('active')) {
            if (!e.target.closest('.chat-popup') && !e.target.closest('#chatButton') && !e.target.closest('.fab-container')) {
                chatPopup.classList.remove('active');
            }
        }
    });

    // Show notification after 5 seconds
    setTimeout(() => {
        if (fabNotification && !chatPopup.classList.contains('active')) {
            fabNotification.style.display = 'flex';
        }
    }, 5000);

    console.log('✅ Chat system initialized successfully!');
    console.log('🌐 Current URL:', window.location.href);
    
    if (window.location.protocol === 'file:') {
        console.warn('⚠️ ATTENZIONE: Stai aprendo il file direttamente!');
        console.warn('📌 Per usare ChatGPT, apri: http://localhost:3000');
        console.warn('💡 Il server deve essere avviato con: npm start');
    }
});
