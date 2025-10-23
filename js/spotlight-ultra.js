// ===== SPOTLIGHT ULTRA-REALISTIC EFFECT =====
console.log('🔦✨ Initializing Ultra-Realistic Spotlight...');

const spotlightOverlay = document.getElementById('spotlightOverlay');
const spotlightCanvas = document.getElementById('spotlightCanvas');
const spotlightCircle = document.getElementById('spotlightCircle');

if (spotlightCanvas && spotlightOverlay) {
    // Optimized context with performance hints
    const ctx = spotlightCanvas.getContext('2d', { 
        alpha: true,
        desynchronized: true, // Better performance
        willReadFrequently: false
    });
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let isActive = true;

    // Resize canvas with debounce
    let resizeTimeout;
    function resizeSpotlightCanvas() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            spotlightCanvas.width = window.innerWidth;
            spotlightCanvas.height = window.innerHeight;
        }, 100);
    }
    resizeSpotlightCanvas();
    window.addEventListener('resize', resizeSpotlightCanvas, { passive: true });

    // Optimized Particle System
    class LightParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.isBlue = Math.random() > 0.5;
            this.life = 1;
            this.decay = Math.random() * 0.005 + 0.002;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= this.decay;
            this.opacity = this.life * 0.5;
        }

        draw() {
            // Batch rendering - no shadow for ambient particles (performance)
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.isBlue ? '#6366f1' : '#ec4899';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Optimized Explosion Particle
    class ExplosionParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 2;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 12 + 8;
            this.speedX = Math.cos(angle) * speed;
            this.speedY = Math.sin(angle) * speed;
            this.hue = Math.random() * 60 + 220;
            this.life = 1;
            this.gravity = 0.3;
            this.friction = 0.98;
        }

        update() {
            this.speedX *= this.friction;
            this.speedY *= this.friction;
            this.speedY += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 0.015;
            this.size *= 0.98;
        }

        draw() {
            // Optimized: single shadow blur setting, cached color
            ctx.globalAlpha = this.life;
            ctx.shadowBlur = 15;
            ctx.shadowColor = `hsl(${this.hue}, 100%, 65%)`;
            ctx.fillStyle = `hsl(${this.hue}, 100%, 65%)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Inner glow - simplified
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.globalAlpha = 1;
        }
    }

    // Optimized Light Ray Effect
    class LightRay {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.angle = Math.random() * Math.PI * 2;
            this.length = 0;
            this.maxLength = Math.random() * 200 + 100;
            this.speed = Math.random() * 15 + 10;
            this.width = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
            this.isBlue = Math.random() > 0.5;
            // Pre-calculate end point for performance
            this.cosAngle = Math.cos(this.angle);
            this.sinAngle = Math.sin(this.angle);
        }

        update() {
            this.length += this.speed;
            this.opacity -= 0.01;
        }

        draw() {
            if (this.length > this.maxLength || this.opacity <= 0) return;
            
            // Optimized: batch settings, pre-calculated values
            ctx.globalAlpha = this.opacity;
            ctx.strokeStyle = this.isBlue ? '#6366f1' : '#ec4899';
            ctx.lineWidth = this.width;
            ctx.shadowBlur = 10;
            ctx.shadowColor = ctx.strokeStyle;
            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x + this.cosAngle * this.length,
                this.y + this.sinAngle * this.length
            );
            ctx.stroke();
            
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }
    }

    let ambientParticles = [];
    let explosionParticles = [];
    let lightRays = [];
    
    // Optimized particle count based on device
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 40 : 60; // Ridotto da 80 per performance

    // Create ambient particles
    for (let i = 0; i < particleCount; i++) {
        ambientParticles.push(new LightParticle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        ));
    }

    // Optimized mouse tracking with throttling
    let lastMoveTime = 0;
    document.addEventListener('mousemove', (e) => {
        if (!spotlightOverlay.classList.contains('hidden')) {
            const now = performance.now();
            if (now - lastMoveTime > 16) { // ~60fps throttle
                targetX = e.clientX;
                targetY = e.clientY;
                lastMoveTime = now;
            }
        }
    }, { passive: true });

    // Optimized custom cursor with transform (better performance than left/top)
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(99, 102, 241, 0.8);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10002;
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
        will-change: transform;
    `;
    document.body.appendChild(cursor);

    let cursorX = 0, cursorY = 0;
    function updateCursor() {
        if (!spotlightOverlay.classList.contains('hidden')) {
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
            cursor.style.display = 'block';
        } else {
            cursor.style.display = 'none';
        }
    }

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        updateCursor();
    }, { passive: true });

    // Optimized spotlight rendering with batching
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    let frameCount = 0;
    const spotlightRadius = 350;
    
    function drawUltraSpotlight() {
        if (spotlightOverlay.classList.contains('hidden')) {
            cursor.style.display = 'none';
            return;
        }

        frameCount++;

        // Smooth follow with easing
        mouseX += (targetX - mouseX) * 0.08;
        mouseY += (targetY - mouseY) * 0.08;

        // Only clear and redraw if mouse moved significantly or particles need update
        const mouseMoved = Math.abs(mouseX - lastMouseX) > 0.5 || Math.abs(mouseY - lastMouseY) > 0.5;
        
        if (mouseMoved || explosionParticles.length > 0 || lightRays.length > 0 || frameCount % 2 === 0) {
            ctx.clearRect(0, 0, spotlightCanvas.width, spotlightCanvas.height);

            // Batch particle updates and draws
            for (let i = 0; i < ambientParticles.length; i++) {
                const particle = ambientParticles[i];
                particle.update();
                particle.draw();
                
                // Respawn particles
                if (particle.life <= 0) {
                    ambientParticles[i] = new LightParticle(
                        Math.random() * window.innerWidth,
                        Math.random() * window.innerHeight
                    );
                }
            }

            // Draw main spotlight - cache gradients when possible
            if (mouseMoved) {
                // Outer glow
                const outerGradient = ctx.createRadialGradient(
                    mouseX, mouseY, 0,
                    mouseX, mouseY, spotlightRadius * 1.5
                );
                outerGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                outerGradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.2)');
                outerGradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.7)');
                outerGradient.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
                
                ctx.fillStyle = outerGradient;
                ctx.fillRect(0, 0, spotlightCanvas.width, spotlightCanvas.height);

                // Inner light cone
                const innerGradient = ctx.createRadialGradient(
                    mouseX, mouseY, 0,
                    mouseX, mouseY, spotlightRadius
                );
                innerGradient.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
                innerGradient.addColorStop(0.3, 'rgba(236, 72, 153, 0.08)');
                innerGradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.3)');
                innerGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                
                ctx.globalCompositeOperation = 'lighter';
                ctx.fillStyle = innerGradient;
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, spotlightRadius, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
                
                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }

            // Batch light rays
            if (lightRays.length > 0) {
                lightRays = lightRays.filter(ray => ray.length < ray.maxLength && ray.opacity > 0);
                for (let i = 0; i < lightRays.length; i++) {
                    lightRays[i].update();
                    lightRays[i].draw();
                }
            }

            // Batch explosion particles
            if (explosionParticles.length > 0) {
                explosionParticles = explosionParticles.filter(p => p.life > 0);
                for (let i = 0; i < explosionParticles.length; i++) {
                    explosionParticles[i].update();
                    explosionParticles[i].draw();
                }
            }
        }

        requestAnimationFrame(drawUltraSpotlight);
    }

    drawUltraSpotlight();

    // Optimized: Generate light rays less frequently
    let rayInterval = setInterval(() => {
        if (!spotlightOverlay.classList.contains('hidden') && lightRays.length < 15) {
            // Ridotto da 3 a 2 raggi, meno frequentemente
            for (let i = 0; i < 2; i++) {
                lightRays.push(new LightRay(mouseX, mouseY));
            }
        }
    }, 300); // Aumentato da 200ms a 300ms

    // Click to reveal with optimized explosion
    spotlightOverlay.addEventListener('click', (e) => {
        console.log('💥 SPECTACULAR REVEAL!');
        
        if (spotlightOverlay.classList.contains('hidden')) return;

        // Clear ray interval
        clearInterval(rayInterval);

        // Optimized particle count based on device
        const explosionCount = isMobile ? 100 : 150; // Ridotto da 200
        const rayCount = isMobile ? 15 : 25; // Ridotto da 30

        // Create particle explosion
        for (let i = 0; i < explosionCount; i++) {
            explosionParticles.push(new ExplosionParticle(e.clientX, e.clientY));
        }

        // Create light rays burst
        for (let i = 0; i < rayCount; i++) {
            lightRays.push(new LightRay(e.clientX, e.clientY));
        }

        // Animate circle implosion
        if (spotlightCircle) {
            spotlightCircle.style.animation = 'none';
            spotlightCircle.style.transform = 'scale(0) rotate(180deg)';
            spotlightCircle.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.8s ease';
            spotlightCircle.style.opacity = '0';
        }

        // Flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            inset: 0;
            background: radial-gradient(circle at ${e.clientX}px ${e.clientY}px, 
                rgba(255, 255, 255, 0.8) 0%, 
                rgba(99, 102, 241, 0.4) 30%,
                transparent 70%);
            z-index: 10003;
            pointer-events: none;
            animation: flashFade 1s ease-out forwards;
        `;
        document.body.appendChild(flash);

        // Add flash animation
        const flashStyle = document.createElement('style');
        flashStyle.textContent = `
            @keyframes flashFade {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(flashStyle);

        setTimeout(() => flash.remove(), 1000);

        // Hide overlay with fade
        setTimeout(() => {
            spotlightOverlay.style.transition = 'opacity 1.5s ease';
            spotlightOverlay.classList.add('hidden');
            
            setTimeout(() => {
                spotlightOverlay.style.display = 'none';
                cursor.remove();
                
                // Cleanup for memory
                ambientParticles = [];
                explosionParticles = [];
                lightRays = [];
                
                console.log('✨ Spotlight complete!');
            }, 1500);
        }, 800);

        // Store session
        sessionStorage.setItem('spotlightSeen', 'true');
    });

    // Skip if already seen
    if (sessionStorage.getItem('spotlightSeen')) {
        console.log('⏭️ Skipping spotlight...');
        spotlightOverlay.classList.add('hidden');
        spotlightOverlay.style.display = 'none';
        cursor.remove();
    } else {
        console.log('🎬 Showing ultra-realistic spotlight!');
        document.body.classList.add('spotlight-active');
    }

    // Keyboard shortcut to reset (press 'R')
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'r' || e.key === 'R') && !(e.ctrlKey || e.metaKey)) {
            console.log('🔄 Resetting spotlight...');
            sessionStorage.removeItem('spotlightSeen');
            location.reload();
        }
    });

    // Remove spotlight-active class when hidden
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('hidden')) {
                document.body.classList.remove('spotlight-active');
            }
        });
    });

    observer.observe(spotlightOverlay, {
        attributes: true,
        attributeFilter: ['class']
    });

    console.log('✅ Ultra-realistic spotlight initialized!');
}
