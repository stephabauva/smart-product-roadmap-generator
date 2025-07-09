/* ==========================================
   CYBERPUNK EFFECTS - PHASE 2
   Background Effects Implementation
   ========================================== */

class CyberpunkEffects {
  constructor() {
    this.matrixRain = null;
    this.neonOrbs = [];
    this.isInitialized = false;
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEffects());
    } else {
      this.setupEffects();
    }
    
    this.isInitialized = true;
  }

  setupEffects() {
    this.createBackgroundElements();
    this.initMatrixRain();
    this.initNeonOrbs();
    this.addMouseInteraction();
    this.optimizePerformance();
    this.startAnimations();
  }

  createBackgroundElements() {
    // Create grid element
    const grid = document.createElement('div');
    grid.className = 'cyber-grid';
    document.body.appendChild(grid);

    // Create matrix rain canvas
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.className = 'matrix-rain';
    matrixCanvas.id = 'matrix-canvas';
    document.body.appendChild(matrixCanvas);

    // Create neon orbs container
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'neon-orbs';
    orbsContainer.id = 'neon-orbs';
    document.body.appendChild(orbsContainer);
  }

  initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    this.matrixRain = {
      canvas,
      ctx,
      charArray,
      fontSize,
      columns,
      drops,
      animate: () => this.animateMatrixRain()
    };
  }

  animateMatrixRain() {
    const { ctx, canvas, charArray, fontSize, columns, drops } = this.matrixRain;
    
    // Create fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text properties
    ctx.fillStyle = '#00ff00';
    ctx.font = `${fontSize}px 'Fira Code', monospace`;
    
    // Draw characters
    for (let i = 0; i < drops.length; i++) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      ctx.fillText(char, x, y);
      
      // Reset drop to top randomly
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  }

  initNeonOrbs() {
    const container = document.getElementById('neon-orbs');
    if (!container) return;

    const orbCount = 15;
    const colors = ['cyan', 'magenta', 'green'];
    
    for (let i = 0; i < orbCount; i++) {
      const orb = document.createElement('div');
      orb.className = `neon-orb ${colors[i % colors.length]}`;
      
      const size = Math.random() * 40 + 20;
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.left = `${Math.random() * window.innerWidth}px`;
      orb.style.top = `${Math.random() * window.innerHeight}px`;
      orb.style.animationDelay = `${Math.random() * 8}s`;
      orb.style.animationDuration = `${8 + Math.random() * 4}s`;
      
      container.appendChild(orb);
      this.neonOrbs.push({
        element: orb,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: size
      });
    }
  }

  animateNeonOrbs() {
    this.neonOrbs.forEach(orb => {
      // Update position
      orb.x += orb.vx;
      orb.y += orb.vy;
      
      // Bounce off edges
      if (orb.x <= 0 || orb.x >= window.innerWidth) {
        orb.vx *= -1;
      }
      if (orb.y <= 0 || orb.y >= window.innerHeight) {
        orb.vy *= -1;
      }
      
      // Keep in bounds
      orb.x = Math.max(0, Math.min(window.innerWidth, orb.x));
      orb.y = Math.max(0, Math.min(window.innerHeight, orb.y));
      
      // Apply position
      orb.element.style.left = `${orb.x}px`;
      orb.element.style.top = `${orb.y}px`;
    });
  }

  startAnimations() {
    const animate = () => {
      if (this.matrixRain) {
        this.animateMatrixRain();
      }
      
      this.animateNeonOrbs();
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  // Mouse interaction for orbs
  addMouseInteraction() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      this.neonOrbs.forEach(orb => {
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          orb.vx += (dx / distance) * force * 0.01;
          orb.vy += (dy / distance) * force * 0.01;
          
          // Add visual feedback on mouse proximity
          const scale = 1 + force * 0.5;
          orb.element.style.transform = `scale(${scale})`;
        } else {
          orb.element.style.transform = 'scale(1)';
        }
      });
    });
    
    // Add mouse click effect
    document.addEventListener('click', (e) => {
      const ripple = document.createElement('div');
      ripple.style.position = 'fixed';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      ripple.style.width = '4px';
      ripple.style.height = '4px';
      ripple.style.background = 'var(--neon-cyan)';
      ripple.style.borderRadius = '50%';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '9999';
      ripple.style.boxShadow = '0 0 20px var(--neon-cyan)';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.animation = 'ripple 0.8s ease-out forwards';
      
      document.body.appendChild(ripple);
      
      setTimeout(() => {
        document.body.removeChild(ripple);
      }, 800);
    });
  }

  // Performance optimization methods
  optimizePerformance() {
    // Reduce effects on mobile devices
    if (window.innerWidth < 768) {
      this.neonOrbs = this.neonOrbs.slice(0, 8);
      if (this.matrixRain) {
        this.matrixRain.drops = this.matrixRain.drops.slice(0, Math.floor(this.matrixRain.columns / 2));
      }
    }
    
    // Use will-change for better performance
    const grid = document.querySelector('.cyber-grid');
    if (grid) {
      grid.style.willChange = 'transform, opacity';
    }
  }
}

// Initialize effects when script loads
const cyberpunkEffects = new CyberpunkEffects();

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CyberpunkEffects;
}