// ===== WEBY CHATBOT SYSTEM =====
console.log('💬 WebNovis Chat System v2.0 Loading...');

// Configuration
const CHAT_CONFIG = {
    apiEndpoint: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000/api/chat' 
        : 'https://webnovis-chat.onrender.com/api/chat',
    healthCheckUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api/health'
        : 'https://webnovis-chat.onrender.com/api/health',
    typingSpeed: 30, // ms per character
    botName: 'Weby',
    botAvatar: '🤖',
    userAvatar: '👤',
    welcomeMessage: 'Ciao! Sono Weby, l\'assistente AI di WebNovis. 👋\nCome posso aiutarti a far crescere il tuo business oggi?',
    keepAliveInterval: 5 * 60 * 1000 // 5 minutes
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Chat Interface...');
    
    // DOM Elements
    const elements = {
        button: document.getElementById('chatButton'),
        popup: document.getElementById('chatPopup'),
        close: document.getElementById('chatClose'),
        input: document.getElementById('chatInput'),
        send: document.getElementById('chatSend'),
        messages: document.getElementById('chatMessages'),
        bubble: document.getElementById('webyBubble'),
        bubbleClose: document.getElementById('webyBubbleClose')
    };

    // Check for critical elements
    if (!elements.button || !elements.popup) {
        console.error('❌ Critical chat elements missing from DOM');
        return;
    }

    // State
    let state = {
        isOpen: false,
        isTyping: false,
        history: [], // Conversation history for context
        hasInteracted: false
    };

    // --- EVENT LISTENERS ---

    // Toggle Chat
    elements.button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleChat();
    });

    // Close Chat
    if (elements.close) {
        elements.close.addEventListener('click', () => closeChat());
    }

    // Close Bubble
    if (elements.bubbleClose) {
        elements.bubbleClose.addEventListener('click', (e) => {
            e.stopPropagation();
            if (elements.bubble) elements.bubble.classList.add('hidden');
        });
    }

    // Input Handling
    if (elements.input) {
        elements.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        // Prevent scroll on mobile focus
        elements.input.addEventListener('focus', () => {
            if (window.innerWidth < 768) {
                setTimeout(() => elements.messages.scrollTop = elements.messages.scrollHeight, 300);
            }
        });
    }

    if (elements.send) {
        elements.send.addEventListener('click', sendMessage);
    }

    // Quick Replies
    document.querySelectorAll('.quick-reply').forEach(btn => {
        btn.addEventListener('click', function() {
            const msg = this.dataset.message;
            if (msg) {
                elements.input.value = msg;
                sendMessage();
                // Fade out quick replies
                const container = this.parentElement;
                container.style.opacity = '0';
                setTimeout(() => container.remove(), 300);
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (state.isOpen && 
            !elements.popup.contains(e.target) && 
            !elements.button.contains(e.target)) {
            closeChat();
        }
    });

    // --- FUNCTIONS ---

    function toggleChat() {
        state.isOpen = !state.isOpen;
        elements.popup.classList.toggle('active', state.isOpen);
        
        if (state.isOpen) {
            // Hide notification bubble when open
            if (elements.bubble) elements.bubble.classList.add('hidden');
            
            // Focus input
            setTimeout(() => elements.input?.focus(), 100);
            
            // Scroll to bottom
            scrollToBottom();
        }
    }

    function closeChat() {
        state.isOpen = false;
        elements.popup.classList.remove('active');
    }

    function appendMessage(content, type = 'bot') {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${type === 'user' ? 'user-message' : 'bot-message'}`;
        
        const avatar = type === 'user' ? 'TU' : 'WN';
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Parse basic markdown-like syntax for bot messages
        let formattedContent = escapeHtml(content);
        if (type === 'bot') {
            formattedContent = formattedContent
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        }

        msgDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${formattedContent}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        elements.messages.appendChild(msgDiv);
        scrollToBottom();
    }

    async function sendMessage() {
        if (state.isTyping || !elements.input.value.trim()) return;

        const message = elements.input.value.trim();
        elements.input.value = ''; // Clear input immediately
        state.hasInteracted = true;

        // Add User Message
        appendMessage(message, 'user');

        // Show Typing Indicator
        showTyping();

        try {
            // Determine response
            const response = await fetchResponse(message);
            
            // Remove Typing Indicator
            hideTyping();
            
            // Add Bot Response
            appendMessage(response, 'bot');
            
            // Update History
            state.history.push({ role: 'user', content: message });
            state.history.push({ role: 'assistant', content: response });
            
            // Limit history
            if (state.history.length > 10) state.history = state.history.slice(-10);

        } catch (error) {
            console.error('Chat Error:', error);
            hideTyping();
            appendMessage('Mi dispiace, si è verificato un errore di connessione. Riprova tra poco! 😔', 'bot');
        }
    }

    async function fetchResponse(message) {
        // Artificial delay for natural feel if local
        const startTime = Date.now();
        
        try {
            console.log(`📡 Calling API: ${CHAT_CONFIG.apiEndpoint}`);
            
            const res = await fetch(CHAT_CONFIG.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    conversationHistory: state.history
                })
            });

            if (!res.ok) throw new Error(`API Error: ${res.status}`);

            const data = await res.json();
            
            // Ensure minimum visibility time for typing indicator
            const elapsed = Date.now() - startTime;
            if (elapsed < 1000) await new Promise(r => setTimeout(r, 1000 - elapsed));

            return data.response || data.fallback || getLocalFallback(message);

        } catch (error) {
            console.warn('⚠️ API Unreachable, using local fallback:', error);
            await new Promise(r => setTimeout(r, 1000)); // Simulate network delay
            return getLocalFallback(message);
        }
    }

    function getLocalFallback(message) {
        const lower = message.toLowerCase();
        
        // Simple keyword matching aligned with WebNovis services
        if (lower.includes('prezz') || lower.includes('cost')) {
            return "I nostri prezzi sono su misura! 🏷️\n• Landing Page: da €500\n• Siti Vetrina: da €1.200\n• E-commerce: da €3.500\n\nPer un preventivo esatto, scrivici a webnovis.info@gmail.com!";
        }
        if (lower.includes('sito') || lower.includes('web')) {
            return "Sviluppiamo siti web ultra-veloci e moderni! 🚀\nCi occupiamo di design, sviluppo e SEO. Vuoi vedere qualche esempio del nostro portfolio?";
        }
        if (lower.includes('social') || lower.includes('instagram')) {
            return "Gestiamo la tua presenza social a 360°! 📱\nDalla strategia alla creazione dei contenuti. I nostri piani partono da €300/mese.";
        }
        if (lower.includes('contatt') || lower.includes('email')) {
            return "Puoi contattarci qui: 📧 webnovis.info@gmail.com\nOppure compila il form in fondo alla pagina!";
        }
        if (lower.includes('ciao') || lower.includes('salve')) {
            return "Ciao! 👋 Benvenuto in WebNovis. Come posso aiutare il tuo business oggi?";
        }
        
        return "Grazie per il messaggio! 😊\nPer darti una risposta precisa, ti consiglio di scriverci a webnovis.info@gmail.com. Il nostro team ti risponderà in giornata!";
    }

    function showTyping() {
        state.isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'chat-message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">WN</div>
            <div class="message-content">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        elements.messages.appendChild(typingDiv);
        scrollToBottom();
    }

    function hideTyping() {
        state.isTyping = false;
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }

    function scrollToBottom() {
        requestAnimationFrame(() => {
            elements.messages.scrollTop = elements.messages.scrollHeight;
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // --- INITIALIZATION ---
    
    // Show bubble after delay if not interacted
    setTimeout(() => {
        if (!state.isOpen && !state.hasInteracted && elements.bubble) {
            elements.bubble.classList.add('visible');
        }
    }, 3000);

    // Keep-Alive Heartbeat
    setInterval(() => {
        if (window.location.hostname !== 'localhost') {
            fetch(CHAT_CONFIG.healthCheckUrl).catch(() => {});
        }
    }, CHAT_CONFIG.keepAliveInterval);

    // Wake up server immediately on load
    if (window.location.hostname !== 'localhost') {
        fetch(CHAT_CONFIG.healthCheckUrl).catch(() => {});
    }

    console.log('✅ WebNovis Chat System Ready');
});
