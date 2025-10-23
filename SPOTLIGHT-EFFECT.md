# 🔦 Spotlight Intro Effect

## Descrizione

Effetto di introduzione scenografico che mostra una schermata nera con un cerchio illuminato al centro (effetto torcia). L'utente deve cliccare per rivelare il sito.

## ✨ Caratteristiche

### Effetti Visivi
- 🔦 **Spotlight dinamico** - Segue il movimento del mouse
- 💫 **Particelle esplosive** - 100 particelle colorate quando clicchi
- 🎭 **Animazioni fluide** - Transizioni smooth e naturali
- 🌟 **Glow effects** - Effetti luminosi su hover
- 📱 **Responsive** - Si adatta a tutti i dispositivi

### Interazioni
- 🖱️ **Mouse tracking** - Lo spotlight segue il cursore
- 👆 **Click to reveal** - Clicca per entrare nel sito
- 🎯 **Freccia animata** - Indica dove cliccare
- ⚡ **Feedback visivo** - Effetti su hover

### Performance
- 🚀 **Canvas-based** - Rendering ottimizzato
- 💾 **Session storage** - Mostra l'intro solo una volta per sessione
- 🎨 **GPU accelerated** - Animazioni hardware-accelerated

## 🎮 Come Funziona

### 1. Caricamento Pagina
```
┌─────────────────────────────────┐
│  Schermo nero con spotlight     │
│  ┌───────────────────────┐      │
│  │   WebNovis Logo       │      │
│  │   "Clicca per entrare"│      │
│  │         ↓             │      │
│  └───────────────────────┘      │
└─────────────────────────────────┘
```

### 2. Mouse Movement
Lo spotlight segue il cursore con smooth easing

### 3. Click
- Esplosione di 100 particelle colorate
- Cerchio si rimpicciolisce
- Fade out dell'overlay
- Reveal del sito con blur effect

### 4. Sessioni Successive
L'intro viene saltata automaticamente (salvato in sessionStorage)

## 🎨 Personalizzazione

### Colori
Modifica in `css/style.css`:

```css
.spotlight-logo .logo-novis {
    background: var(--gradient-1); /* Cambia gradiente */
}

.spotlight-arrow {
    color: var(--primary-light); /* Colore freccia */
}
```

### Dimensioni Spotlight
```css
.spotlight-circle {
    width: 400px;  /* Larghezza */
    height: 400px; /* Altezza */
}
```

### Velocità Animazioni
In `js/main.js`:

```javascript
// Velocità seguimento mouse
mouseX += (targetX - mouseX) * 0.1; // 0.1 = lento, 0.5 = veloce

// Durata transizione
spotlightOverlay.style.transition = 'opacity 1.5s ease'; // Cambia 1.5s
```

### Numero Particelle
```javascript
for (let i = 0; i < 100; i++) { // Cambia 100
    particles.push(new Particle(e.clientX, e.clientY));
}
```

## 🔧 Configurazione

### Disabilitare l'Intro
Per disabilitare completamente l'effetto:

```javascript
// In js/main.js, aggiungi all'inizio:
sessionStorage.setItem('spotlightSeen', 'true');
```

Oppure rimuovi l'HTML:
```html
<!-- Rimuovi questo blocco da index.html -->
<div class="spotlight-overlay" id="spotlightOverlay">
    ...
</div>
```

### Mostrare Sempre l'Intro
Rimuovi questa riga da `js/main.js`:
```javascript
sessionStorage.setItem('spotlightSeen', 'true'); // Rimuovi
```

### Cambiare Testo
In `index.html`:
```html
<p class="spotlight-text">Il tuo testo qui</p>
```

## 📱 Responsive

### Desktop (> 768px)
- Cerchio: 400x400px
- Logo: 3rem
- Testo: 1.2rem

### Tablet (768px)
- Cerchio: 300x300px
- Logo: 2rem
- Testo: 1rem

### Mobile (< 480px)
- Cerchio: 250x250px
- Logo: 1.5rem
- Testo: 0.9rem

## 🎯 Best Practices

### Performance
✅ **DO:**
- Usa `requestAnimationFrame` per animazioni
- Limita il numero di particelle su mobile
- Usa `will-change` per animazioni CSS

❌ **DON'T:**
- Non usare troppi effetti simultanei
- Non bloccare il main thread
- Non dimenticare di pulire i listener

### UX
✅ **DO:**
- Fornisci indicazioni chiare (freccia)
- Permetti di saltare l'intro
- Mantieni l'animazione sotto 2 secondi

❌ **DON'T:**
- Non forzare l'utente a guardare l'intro ogni volta
- Non rendere l'intro troppo lunga
- Non nascondere il modo per procedere

## 🐛 Troubleshooting

### L'intro non appare
- Verifica che `spotlightOverlay` esista nell'HTML
- Controlla la console per errori JavaScript
- Verifica che sessionStorage non sia già impostato

### Lo spotlight non segue il mouse
- Verifica che il canvas sia correttamente inizializzato
- Controlla che `mousemove` listener sia attivo
- Verifica dimensioni del canvas

### Le particelle non appaiono
- Controlla che la classe `Particle` sia definita
- Verifica che `animateParticles()` venga chiamata
- Controlla il context del canvas

### L'intro si mostra sempre
- Cancella sessionStorage: `sessionStorage.clear()`
- Verifica che `sessionStorage.setItem()` venga chiamato

## 🎨 Varianti

### Variante 1: Spotlight Colorato
```css
.spotlight-circle {
    background: radial-gradient(circle, 
        rgba(99, 102, 241, 0.2) 0%, 
        transparent 70%
    );
}
```

### Variante 2: Più Particelle
```javascript
for (let i = 0; i < 200; i++) { // Più particelle
    particles.push(new Particle(e.clientX, e.clientY));
}
```

### Variante 3: Spotlight Più Grande
```javascript
const gradient = ctx.createRadialGradient(
    mouseX, mouseY, 0, 
    mouseX, mouseY, 500 // Aumenta da 300 a 500
);
```

## 📚 Risorse

- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [RequestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)

## 🎉 Risultato

Un'esperienza di ingresso memorabile che:
- Cattura l'attenzione
- Crea aspettativa
- Introduce il brand in modo elegante
- Non disturba nelle visite successive

Perfetto per siti portfolio, agenzie creative, e landing page premium! ✨
