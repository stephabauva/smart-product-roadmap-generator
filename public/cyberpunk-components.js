// Cyberpunk Component Enhancements - Phase 4: Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Neural Input Fields
    function enhanceNeuralInputs() {
        const inputs = document.querySelectorAll('.neural-input input, .neural-input textarea, .neural-input select');
        
        inputs.forEach(input => {
            const wrapper = input.closest('.neural-input');
            
            // Add scanner elements if not present
            if (!wrapper.querySelector('.input-scanner')) {
                const scanner = document.createElement('div');
                scanner.className = 'input-scanner';
                wrapper.appendChild(scanner);
                
                const scannerVertical = document.createElement('div');
                scannerVertical.className = 'input-scanner-vertical';
                wrapper.appendChild(scannerVertical);
                
                const inputGlow = document.createElement('div');
                inputGlow.className = 'input-glow';
                wrapper.appendChild(inputGlow);
            }
            
            // Add validation indicator
            if (!wrapper.querySelector('.validation-indicator')) {
                const indicator = document.createElement('div');
                indicator.className = 'validation-indicator';
                wrapper.appendChild(indicator);
            }
            
            // Ripple effect on click
            input.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                ripple.className = 'input-ripple';
                const rect = input.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';
                wrapper.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
    
    // Enhanced Quantum Buttons
    function enhanceQuantumButtons() {
        const buttons = document.querySelectorAll('.quantum-btn');
        
        buttons.forEach(button => {
            // Wrap button text if not already wrapped
            if (!button.querySelector('.btn-text')) {
                const text = button.textContent;
                button.innerHTML = `<span class="btn-text" data-text="${text}">${text}</span>`;
            }
            
            // Add particles container
            if (!button.querySelector('.btn-particles')) {
                const particlesContainer = document.createElement('div');
                particlesContainer.className = 'btn-particles';
                button.appendChild(particlesContainer);
            }
            
            // Particle effect on click
            button.addEventListener('click', function(e) {
                const particlesContainer = button.querySelector('.btn-particles');
                const rect = button.getBoundingClientRect();
                
                // Create multiple particles
                for (let i = 0; i < 8; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    
                    // Random position around click point
                    const angle = (Math.PI * 2 * i) / 8;
                    const distance = 50 + Math.random() * 50;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    
                    particle.style.left = '50%';
                    particle.style.top = '50%';
                    particle.style.transform = `translate(-50%, -50%)`;
                    
                    particlesContainer.appendChild(particle);
                    
                    // Animate particle
                    setTimeout(() => {
                        particle.style.opacity = '1';
                        particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
                    }, 10);
                    
                    setTimeout(() => {
                        particle.style.opacity = '0';
                    }, 300);
                    
                    setTimeout(() => particle.remove(), 600);
                }
            });
        });
    }
    
    // Enhanced Cyber Select Dropdowns
    function enhanceCyberSelects() {
        const selects = document.querySelectorAll('.neural-input select');
        
        selects.forEach(select => {
            const wrapper = select.parentElement;
            
            // Add cyber-select class if not present
            if (!wrapper.classList.contains('cyber-select')) {
                wrapper.classList.add('cyber-select');
            }
            
            // Add scanner line
            if (!wrapper.querySelector('.select-scanner')) {
                const scanner = document.createElement('div');
                scanner.className = 'select-scanner';
                wrapper.appendChild(scanner);
            }
        });
    }
    
    // Enhanced Holographic Cards
    function enhanceHolographicCards() {
        // Convert cyber-container to holo-card for results
        const containers = document.querySelectorAll('#results .cyber-container');
        
        containers.forEach(container => {
            if (!container.classList.contains('holo-card')) {
                container.classList.add('holo-card');
                
                // Add shimmer effect
                const shimmer = document.createElement('div');
                shimmer.className = 'holo-shimmer';
                container.insertBefore(shimmer, container.firstChild);
                
                // Add border scanner
                const border = document.createElement('div');
                border.className = 'card-border';
                container.appendChild(border);
                
                // Wrap content
                const content = document.createElement('div');
                content.className = 'card-content';
                while (container.children.length > 2) {
                    content.appendChild(container.children[1]);
                }
                container.insertBefore(content, container.lastChild);
                
                // Add color variants
                if (container.querySelector('h2')?.textContent.includes('User Stories')) {
                    container.classList.add('card-cyan');
                } else if (container.querySelector('h2')?.textContent.includes('Metrics')) {
                    container.classList.add('card-green');
                }
            }
        });
    }
    
    // Form Validation Enhancement
    function enhanceFormValidation() {
        const form = document.getElementById('roadmapForm');
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            const wrapper = input.closest('.neural-input');
            
            // Real-time validation
            input.addEventListener('input', function() {
                if (input.value.trim()) {
                    wrapper.classList.remove('error');
                    wrapper.classList.add('success');
                } else {
                    wrapper.classList.remove('success');
                }
            });
            
            // Blur validation
            input.addEventListener('blur', function() {
                if (!input.value.trim() && input.hasAttribute('required')) {
                    wrapper.classList.add('error');
                    wrapper.classList.remove('success');
                    
                    // Add validation message if not present
                    if (!wrapper.querySelector('.validation-message')) {
                        const message = document.createElement('div');
                        message.className = 'validation-message';
                        message.textContent = 'This field is required';
                        wrapper.appendChild(message);
                    }
                }
            });
        });
        
        // Form submit enhancement
        form.addEventListener('submit', function(e) {
            const emptyRequiredFields = Array.from(inputs).filter(input => 
                input.hasAttribute('required') && !input.value.trim()
            );
            
            if (emptyRequiredFields.length > 0) {
                e.preventDefault();
                form.classList.add('form-validating');
                
                emptyRequiredFields.forEach(input => {
                    input.closest('.neural-input').classList.add('error');
                });
                
                setTimeout(() => {
                    form.classList.remove('form-validating');
                }, 1000);
            }
        });
    }
    
    // ==========================================
    // PHASE 4: INTERACTIVE EFFECTS
    // ==========================================
    
    // Enhanced Hover Effects with Glow Intensification
    function addEnhancedHoverEffects() {
        // Enhanced hover for all interactive elements
        const interactiveElements = document.querySelectorAll(
            '.quantum-btn, .neural-input, .holo-card, .user-story-card, .metrics-card, .cyber-container'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                // Add hover glow intensification
                const currentGlow = window.getComputedStyle(element).boxShadow;
                const hoverGlow = currentGlow.replace(/rgba?\([^)]+\)/g, match => {
                    return match.replace(/0\.\d+/, '0.8'); // Intensify glow
                });
                
                // Scale transform for subtle lift
                if (element.classList.contains('quantum-btn')) {
                    element.style.transform = 'translateY(-3px) scale(1.02)';
                } else if (element.classList.contains('holo-card')) {
                    element.style.transform = 'rotateX(5deg) rotateY(-5deg) translateZ(15px) scale(1.01)';
                } else {
                    element.style.transform = 'translateY(-1px) scale(1.005)';
                }
                
                // Add pulsing animation
                element.style.animation = 'hoverPulse 2s ease-in-out infinite';
            });
            
            element.addEventListener('mouseleave', function(e) {
                // Reset transforms
                element.style.transform = '';
                element.style.animation = '';
            });
        });
    }
    
    // Scan Line Animations for Interactive Elements
    function addScanLineAnimations() {
        const scanElements = document.querySelectorAll('.neural-input, .holo-card, .user-story-card');
        
        scanElements.forEach(element => {
            // Create scan line element
            const scanLine = document.createElement('div');
            scanLine.className = 'interactive-scan-line';
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent);
                transition: all 0.3s ease;
                z-index: 10;
                pointer-events: none;
            `;
            
            // Ensure relative positioning
            if (getComputedStyle(element).position === 'static') {
                element.style.position = 'relative';
            }
            
            element.appendChild(scanLine);
            
            // Trigger scan on hover
            element.addEventListener('mouseenter', function() {
                scanLine.style.left = '0';
                scanLine.style.animation = 'scanAcross 0.6s ease-out';
            });
            
            element.addEventListener('mouseleave', function() {
                scanLine.style.left = '-100%';
                scanLine.style.animation = '';
            });
        });
    }
    
    // Particle Emission Effects on Hover
    function addParticleHoverEffects() {
        const hoverElements = document.querySelectorAll('.quantum-btn, .holo-card');
        
        hoverElements.forEach(element => {
            let particleInterval;
            
            element.addEventListener('mouseenter', function(e) {
                const rect = element.getBoundingClientRect();
                
                // Create particle container if not exists
                let particleContainer = element.querySelector('.hover-particles');
                if (!particleContainer) {
                    particleContainer = document.createElement('div');
                    particleContainer.className = 'hover-particles';
                    particleContainer.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: 5;
                        overflow: hidden;
                    `;
                    element.appendChild(particleContainer);
                }
                
                // Emit particles continuously
                particleInterval = setInterval(() => {
                    const particle = document.createElement('div');
                    particle.className = 'hover-particle';
                    particle.style.cssText = `
                        position: absolute;
                        width: 3px;
                        height: 3px;
                        background: var(--neon-cyan);
                        border-radius: 50%;
                        left: ${Math.random() * 100}%;
                        top: ${Math.random() * 100}%;
                        opacity: 0;
                        box-shadow: 0 0 6px var(--neon-cyan);
                        animation: particleFloat 1.5s ease-out forwards;
                    `;
                    
                    particleContainer.appendChild(particle);
                    
                    // Remove particle after animation
                    setTimeout(() => {
                        if (particle.parentNode) {
                            particle.parentNode.removeChild(particle);
                        }
                    }, 1500);
                }, 100);
            });
            
            element.addEventListener('mouseleave', function() {
                clearInterval(particleInterval);
                
                // Clear existing particles
                const particleContainer = element.querySelector('.hover-particles');
                if (particleContainer) {
                    particleContainer.innerHTML = '';
                }
            });
        });
    }
    
    // Enhanced Click Effects with Glitch Animations
    function addEnhancedClickEffects() {
        const clickElements = document.querySelectorAll('.quantum-btn, .neural-input input, .neural-input textarea');
        
        clickElements.forEach(element => {
            element.addEventListener('click', function(e) {
                // Add glitch effect
                element.style.animation = 'clickGlitch 0.3s ease';
                
                // Create energy burst effect
                const burst = document.createElement('div');
                burst.className = 'click-burst';
                burst.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 4px;
                    height: 4px;
                    background: var(--neon-magenta);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                    z-index: 999;
                    animation: energyBurst 0.5s ease-out forwards;
                `;
                
                // Position relative to click
                const rect = element.getBoundingClientRect();
                const containerRect = element.closest('.neural-input, .quantum-btn').getBoundingClientRect();
                burst.style.left = `${e.clientX - containerRect.left}px`;
                burst.style.top = `${e.clientY - containerRect.top}px`;
                
                const container = element.closest('.neural-input, .quantum-btn');
                if (container && getComputedStyle(container).position === 'static') {
                    container.style.position = 'relative';
                }
                
                container.appendChild(burst);
                
                // Remove burst after animation
                setTimeout(() => {
                    if (burst.parentNode) {
                        burst.parentNode.removeChild(burst);
                    }
                }, 500);
                
                // Clear animation
                setTimeout(() => {
                    element.style.animation = '';
                }, 300);
            });
        });
    }
    
    // Enhanced Ripple Effects for Button Clicks
    function addEnhancedRippleEffects() {
        const rippleElements = document.querySelectorAll('.quantum-btn');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', function(e) {
                const rect = element.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                // Create ripple element
                const ripple = document.createElement('div');
                ripple.className = 'enhanced-ripple';
                ripple.style.cssText = `
                    position: absolute;
                    left: ${e.clientX - rect.left}px;
                    top: ${e.clientY - rect.top}px;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, var(--neon-green) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0.6;
                    pointer-events: none;
                    z-index: 1;
                    animation: enhancedRipple 0.8s ease-out forwards;
                `;
                
                element.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 800);
            });
        });
    }
    
    // Loading States with Circuit Pattern Animations
    function addLoadingStateEffects() {
        const loadingContainer = document.getElementById('loading');
        const form = document.getElementById('roadmapForm');
        
        if (loadingContainer && form) {
            // Enhanced loading visual
            const enhanceLoadingState = () => {
                // Add circuit pattern overlay
                const circuitPattern = document.createElement('div');
                circuitPattern.className = 'circuit-pattern';
                circuitPattern.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 255, 255, 0.1) 10px, rgba(0, 255, 255, 0.1) 20px),
                        repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255, 0, 255, 0.1) 10px, rgba(255, 0, 255, 0.1) 20px);
                    animation: circuitFlow 3s linear infinite;
                    pointer-events: none;
                    z-index: 1;
                `;
                
                loadingContainer.appendChild(circuitPattern);
                
                // Add data stream effect
                const dataStream = document.createElement('div');
                dataStream.className = 'data-stream';
                dataStream.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 2;
                `;
                
                // Create streaming data particles
                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: absolute;
                        width: 2px;
                        height: 10px;
                        background: var(--neon-green);
                        left: ${Math.random() * 100}%;
                        top: -10px;
                        animation: dataFall ${2 + Math.random() * 2}s linear infinite;
                        animation-delay: ${Math.random() * 2}s;
                        opacity: 0.7;
                    `;
                    dataStream.appendChild(particle);
                }
                
                loadingContainer.appendChild(dataStream);
            };
            
            // Monitor form submission
            form.addEventListener('submit', function() {
                setTimeout(enhanceLoadingState, 100);
            });
        }
    }
    
    // Progress Indicators and Skeleton Screens
    function addProgressIndicators() {
        // Create progress bar for form validation
        const form = document.getElementById('roadmapForm');
        const progressBar = document.createElement('div');
        progressBar.className = 'form-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
            transition: width 0.3s ease;
            z-index: 9999;
            box-shadow: 0 0 10px currentColor;
        `;
        
        document.body.appendChild(progressBar);
        
        // Update progress based on form completion
        const updateProgress = () => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            const filled = Array.from(inputs).filter(input => input.value.trim()).length;
            const progress = (filled / inputs.length) * 100;
            
            progressBar.style.width = `${progress}%`;
            progressBar.style.opacity = progress > 0 ? '1' : '0';
        };
        
        // Monitor form inputs
        form.addEventListener('input', updateProgress);
        form.addEventListener('change', updateProgress);
        
        // Hide progress bar when form is submitted
        form.addEventListener('submit', function() {
            setTimeout(() => {
                progressBar.style.opacity = '0';
            }, 500);
        });
    }
    
    // Data Processing Visual Effects
    function addDataProcessingEffects() {
        const resultsContainer = document.getElementById('results');
        
        // Add processing visualization when results appear
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.target.id === 'results' && !mutation.target.classList.contains('hidden')) {
                    // Add data processing overlay
                    const processingOverlay = document.createElement('div');
                    processingOverlay.className = 'processing-overlay';
                    processingOverlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        z-index: 9998;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    `;
                    
                    const processingText = document.createElement('div');
                    // Get current language and appropriate text
                    const currentLanguage = localStorage.getItem('language') || 'fr';
                    const processingTextContent = currentLanguage === 'fr' ? 'TRAITEMENT DES DONNÉES...' : 'PROCESSING DATA...';
                    processingText.textContent = processingTextContent;
                    processingText.style.cssText = `
                        color: var(--neon-cyan);
                        font-family: var(--font-primary);
                        font-size: 1.5rem;
                        text-transform: uppercase;
                        letter-spacing: 0.2em;
                        margin-bottom: 2rem;
                        text-shadow: 0 0 20px var(--neon-cyan);
                        animation: textPulse 1s ease-in-out infinite;
                    `;
                    
                    const processingVisual = document.createElement('div');
                    processingVisual.style.cssText = `
                        width: 300px;
                        height: 200px;
                        border: 2px solid var(--neon-cyan);
                        position: relative;
                        background: var(--bg-secondary);
                        clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
                    `;
                    
                    // Add processing bars
                    for (let i = 0; i < 8; i++) {
                        const bar = document.createElement('div');
                        bar.style.cssText = `
                            position: absolute;
                            left: ${10 + i * 35}px;
                            bottom: 10px;
                            width: 20px;
                            height: ${20 + Math.random() * 60}px;
                            background: var(--neon-green);
                            animation: processingBar ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate;
                            animation-delay: ${i * 0.1}s;
                        `;
                        processingVisual.appendChild(bar);
                    }
                    
                    processingOverlay.appendChild(processingText);
                    processingOverlay.appendChild(processingVisual);
                    document.body.appendChild(processingOverlay);
                    
                    // Remove overlay after animation
                    setTimeout(() => {
                        if (processingOverlay.parentNode) {
                            processingOverlay.parentNode.removeChild(processingOverlay);
                        }
                    }, 2000);
                }
            });
        });
        
        if (resultsContainer) {
            observer.observe(resultsContainer, { 
                attributes: true, 
                attributeFilter: ['class'] 
            });
        }
    }
    
    // Add CSS animations for Phase 4 effects
    function addPhase4Animations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes hoverPulse {
                0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
                50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.6); }
            }
            
            @keyframes scanAcross {
                0% { left: -100%; opacity: 0; }
                50% { opacity: 1; }
                100% { left: 100%; opacity: 0; }
            }
            
            @keyframes particleFloat {
                0% { opacity: 0; transform: translateY(0) scale(0); }
                50% { opacity: 1; transform: translateY(-20px) scale(1); }
                100% { opacity: 0; transform: translateY(-40px) scale(0); }
            }
            
            @keyframes clickGlitch {
                0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
                25% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
                50% { transform: translate(2px, -2px); filter: hue-rotate(180deg); }
                75% { transform: translate(-2px, -2px); filter: hue-rotate(270deg); }
            }
            
            @keyframes energyBurst {
                0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                100% { transform: translate(-50%, -50%) scale(20); opacity: 0; }
            }
            
            @keyframes enhancedRipple {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
                100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
            }
            
            @keyframes circuitFlow {
                0% { background-position: 0 0, 0 0; }
                100% { background-position: 40px 40px, -40px -40px; }
            }
            
            @keyframes dataFall {
                0% { top: -10px; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: calc(100% + 10px); opacity: 0; }
            }
            
            @keyframes textPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            @keyframes processingBar {
                0% { height: 10px; opacity: 0.5; }
                100% { height: 80px; opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Initialize all enhancements
    enhanceNeuralInputs();
    enhanceQuantumButtons();
    enhanceCyberSelects();
    enhanceHolographicCards();
    enhanceFormValidation();
    
    // Initialize Phase 4 effects
    addPhase4Animations();
    addEnhancedHoverEffects();
    addScanLineAnimations();
    addParticleHoverEffects();
    addEnhancedClickEffects();
    addEnhancedRippleEffects();
    addLoadingStateEffects();
    addProgressIndicators();
    addDataProcessingEffects();
    
    // Re-enhance cards when results are shown
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.id === 'results' && !mutation.target.classList.contains('hidden')) {
                setTimeout(enhanceHolographicCards, 100);
            }
        });
    });
    
    const results = document.getElementById('results');
    if (results) {
        observer.observe(results, { 
            attributes: true, 
            attributeFilter: ['class'] 
        });
    }
});