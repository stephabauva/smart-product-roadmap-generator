// Cyberpunk Component Enhancements
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
    
    // Initialize all enhancements
    enhanceNeuralInputs();
    enhanceQuantumButtons();
    enhanceCyberSelects();
    enhanceHolographicCards();
    enhanceFormValidation();
    
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