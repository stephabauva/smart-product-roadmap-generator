const form = document.getElementById('roadmapForm');
const loading = document.getElementById('loading');
const results = document.getElementById('results');

// Translation object
const translations = {
  fr: {
    pageTitle: "Générateur de Feuille de Route Produit IA",
    apiProviderLabel: "Fournisseur d'API",
    apiKeyLabel: "Clé API",
    modelSizeLabel: "Taille du Modèle",
    productIdeaLabel: "Idée de Produit",
    productIdeaPlaceholder: "Décrivez votre idée de produit en détail...",
    targetAudienceLabel: "Public Cible",
    targetAudiencePlaceholder: "Qui sont vos utilisateurs cibles?",
    generateButton: "Générer la Feuille de Route",
    loadingText: "Génération en cours...",
    userStoriesTitle: "Histoires Utilisateur",
    roadmapTitle: "Feuille de Route Produit",
    metricsTitle: "Métriques de Succès & Gestion du Changement",
    // Model sizes
    nanoLabel: "Nano (Le plus rapide)",
    miniLabel: "Mini (Équilibré)",
    standardLabel: "Standard (Meilleure qualité)",
    liteLabel: "Lite (Le plus rapide)",
    flashLabel: "Flash (Équilibré)",
    proLabel: "Pro (Meilleure qualité)",
    // Chart labels
    mvp: "MVP",
    iteration: "Itération",
    feature: "Fonctionnalité",
    effort: "Effort",
    priority: "Priorité",
    coreFeatures: "Fonctionnalités Principales",
    enhancementFeatures: "Fonctionnalités d'Amélioration",
    growthFeatures: "Fonctionnalités de Croissance",
    numberOfFeatures: "Nombre de Fonctionnalités",
    roadmapChartTitle: "Feuille de Route Produit - Distribution Stratégique des Fonctionnalités",
    successMetrics: "Métriques de Succès",
    changeManagement: "Gestion du Changement",
    // Error messages
    errorGenerating: "Erreur lors de la génération de la feuille de route: ",
    // User story template
    userStoryTemplate: (userType, feature, benefit) => `En tant que ${userType}, je veux ${feature} afin de ${benefit}`,
    priorityLabel: "Priorité: "
  },
  en: {
    pageTitle: "Smart Product Roadmap Generator",
    apiProviderLabel: "API Provider",
    apiKeyLabel: "API Key",
    modelSizeLabel: "Model Size",
    productIdeaLabel: "Product Idea",
    productIdeaPlaceholder: "Describe your product idea in detail...",
    targetAudienceLabel: "Target Audience",
    targetAudiencePlaceholder: "Who are your target users?",
    generateButton: "Generate Roadmap",
    loadingText: "Generating your roadmap...",
    userStoriesTitle: "User Stories",
    roadmapTitle: "Product Roadmap",
    metricsTitle: "Success Metrics & Change Management",
    // Model sizes
    nanoLabel: "Nano (Fastest)",
    miniLabel: "Mini (Balanced)",
    standardLabel: "Standard (Best Quality)",
    liteLabel: "Lite (Fastest)",
    flashLabel: "Flash (Balanced)",
    proLabel: "Pro (Best Quality)",
    // Chart labels
    mvp: "MVP",
    iteration: "Iteration",
    feature: "Feature",
    effort: "Effort",
    priority: "Priority",
    coreFeatures: "Core Features",
    enhancementFeatures: "Enhancement Features",
    growthFeatures: "Growth Features",
    numberOfFeatures: "Number of Features",
    roadmapChartTitle: "Product Roadmap - Strategic Feature Distribution",
    successMetrics: "Success Metrics",
    changeManagement: "Change Management",
    // Error messages
    errorGenerating: "Error generating roadmap: ",
    // User story template
    userStoryTemplate: (userType, feature, benefit) => `As a ${userType}, I want ${feature} so that ${benefit}`,
    priorityLabel: "Priority: "
  }
};

// Language state
let currentLanguage = localStorage.getItem('language') || 'fr';

// Update UI language
function updateLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  
  const t = translations[lang];
  
  // Update text elements
  document.getElementById('pageTitle').textContent = t.pageTitle;
  document.getElementById('apiProviderLabel').textContent = t.apiProviderLabel;
  document.getElementById('apiKeyLabel').textContent = t.apiKeyLabel;
  document.getElementById('modelSizeLabel').textContent = t.modelSizeLabel;
  document.getElementById('productIdeaLabel').textContent = t.productIdeaLabel;
  document.getElementById('productIdea').placeholder = t.productIdeaPlaceholder;
  document.getElementById('targetAudienceLabel').textContent = t.targetAudienceLabel;
  document.getElementById('targetAudience').placeholder = t.targetAudiencePlaceholder;
  document.getElementById('generateButton').textContent = t.generateButton;
  document.getElementById('loadingText').textContent = t.loadingText;
  document.getElementById('userStoriesTitle').textContent = t.userStoriesTitle;
  document.getElementById('roadmapTitle').textContent = t.roadmapTitle;
  document.getElementById('metricsTitle').textContent = t.metricsTitle;
  
  // Update language toggle buttons
  document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(lang === 'fr' ? 'langFr' : 'langEn').classList.add('active');
  
  // Update model size options
  updateModelSizeOptions();
}

// Model size options for different providers
function getModelSizeOptions(provider, lang) {
  const t = translations[lang];
  
  if (provider === 'openai') {
    return [
      { value: 'nano', label: t.nanoLabel },
      { value: 'mini', label: t.miniLabel },
      { value: 'standard', label: t.standardLabel }
    ];
  } else {
    return [
      { value: 'lite', label: t.liteLabel },
      { value: 'flash', label: t.flashLabel },
      { value: 'pro', label: t.proLabel }
    ];
  }
}

// Update model size dropdown based on provider selection
function updateModelSizeOptions() {
  const provider = document.getElementById('apiProvider').value;
  const modelSizeSelect = document.getElementById('modelSize');
  const currentValue = modelSizeSelect.value;
  
  // Clear current options
  modelSizeSelect.innerHTML = '';
  
  // Add new options based on provider and current language
  const options = getModelSizeOptions(provider, currentLanguage);
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    modelSizeSelect.appendChild(optionElement);
  });
  
  // Try to maintain equivalent selection
  if (provider === 'openai') {
    // Map Google tiers to OpenAI tiers
    const tierMapping = { 'lite': 'nano', 'flash': 'mini', 'pro': 'standard' };
    const mappedValue = tierMapping[currentValue] || 'mini';
    modelSizeSelect.value = mappedValue;
  } else if (provider === 'google') {
    // Map OpenAI tiers to Google tiers
    const tierMapping = { 'nano': 'lite', 'mini': 'flash', 'standard': 'pro' };
    const mappedValue = tierMapping[currentValue] || 'flash';
    modelSizeSelect.value = mappedValue;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Initialize language
  updateLanguage(currentLanguage);
  
  // Add language toggle event listeners
  document.getElementById('langFr').addEventListener('click', () => updateLanguage('fr'));
  document.getElementById('langEn').addEventListener('click', () => updateLanguage('en'));
});

// Listen for provider changes
document.getElementById('apiProvider').addEventListener('change', updateModelSizeOptions);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading
  loading.classList.remove('hidden');
  results.classList.add('hidden');
  
  const formData = {
    apiProvider: document.getElementById('apiProvider').value,
    apiKey: document.getElementById('apiKey').value,
    modelSize: document.getElementById('modelSize').value,
    productIdea: document.getElementById('productIdea').value,
    targetAudience: document.getElementById('targetAudience').value,
    language: currentLanguage
  };
  
  try {
    const response = await fetch('/api/generate-roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    alert(translations[currentLanguage].errorGenerating + error.message);
  } finally {
    loading.classList.add('hidden');
  }
});

// Enhanced metric formatting function
const formatMetrics = (metrics) => {
  if (!Array.isArray(metrics)) return '';
  
  return metrics.map(metric => {
    // Handle both string and object formats
    if (typeof metric === 'string') {
      return `<div class="metrics-item">• ${metric}</div>`;
    }
    
    // Extract meaningful data from metric objects
    const iteration = metric.iteration || metric.phase || '';
    const description = metric.successMetric || metric.metric || metric.description || '';
    const target = metric.target || metric.value || '';
    
    return `
      <div class="metrics-item">
        ${iteration ? `<span class="phase-label">Phase ${iteration}:</span>` : ''}
        <span>${description}</span>
        ${target ? `<span class="target-value ml-2">(Target: ${target})</span>` : ''}
      </div>
    `;
  }).join('');
};

// Enhanced change management formatting
const formatChangeManagement = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    // Fallback content if AI doesn't provide
    return `
      <div class="metrics-item">• Stakeholder communication plan needed</div>
      <div class="metrics-item">• User training materials to be developed</div>
      <div class="metrics-item">• Phased rollout strategy recommended</div>
    `;
  }
  
  return items.map(item => {
    const text = typeof item === 'string' ? item : 
                 item.action || item.description || JSON.stringify(item);
    return `<div class="metrics-item">• ${text}</div>`;
  }).join('');
};

function displayResults(data) {
  results.classList.remove('hidden');
  
  const t = translations[currentLanguage];
  
  // Display user stories
  const storiesHtml = data.userStories.map(story => `
    <div class="user-story-card">
      <p class="story-text">${t.userStoryTemplate(story.userType, story.feature, story.benefit)}</p>
      <span class="story-priority">${t.priorityLabel}${story.priority}/5</span>
    </div>
  `).join('');
  document.getElementById('userStories').innerHTML = storiesHtml;
  
  // Create roadmap chart
  createRoadmapChart(data.roadmap);
  
  // Display metrics and change management with better formatting
  const metricsHtml = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="metrics-card">
        <h3>${t.successMetrics}</h3>
        <div>
          ${formatMetrics(data.roadmap?.metrics || [])}
        </div>
      </div>
      <div class="metrics-card">
        <h3>${t.changeManagement}</h3>
        <div>
          ${formatChangeManagement(data.roadmap?.changeManagement || [])}
        </div>
      </div>
    </div>
  `;
  document.getElementById('metrics').innerHTML = metricsHtml;
}

function createRoadmapChart(roadmap) {
  const ctx = document.getElementById('roadmapChart').getContext('2d');
  const t = translations[currentLanguage];
  
  // Extract timeline and features for each phase
  const phases = [
    { 
      name: t.mvp, 
      features: roadmap?.mvp?.features || [],
      timeline: roadmap?.mvp?.timeline || 'Q1',
      priority: 'Critical'
    },
    ...roadmap.iterations.map((iter, i) => ({
      name: `${t.iteration} ${i + 2}`,
      features: iter?.features || [],
      timeline: iter?.timeline || `Q${i + 2}`,
      priority: iter?.priority || 'High'
    }))
  ];
  
  // Categorize features by type for better visualization
  const categorizeFeatures = (features) => {
    const categorized = { core: [], enhancement: [], growth: [] };
    
    features.forEach((feature, index) => {
      const featureStr = typeof feature === 'string' ? feature : feature.name || feature.description || String(feature);
      const lowerFeature = featureStr.toLowerCase();
      
      // Enhanced categorization with better keywords and position-based logic
      if (lowerFeature.includes('basic') || lowerFeature.includes('essential') || lowerFeature.includes('core') || 
          lowerFeature.includes('login') || lowerFeature.includes('authentication') || lowerFeature.includes('select') ||
          lowerFeature.includes('upload') || lowerFeature.includes('process') || lowerFeature.includes('anonymize') ||
          index < Math.ceil(features.length * 0.4)) { // First 40% are core
        categorized.core.push(featureStr);
      } else if (lowerFeature.includes('enhance') || lowerFeature.includes('improve') || lowerFeature.includes('optimize') ||
                 lowerFeature.includes('customize') || lowerFeature.includes('preview') || lowerFeature.includes('report') ||
                 lowerFeature.includes('download') || lowerFeature.includes('visual') || lowerFeature.includes('rules') ||
                 index < Math.ceil(features.length * 0.8)) { // Next 40% are enhancements
        categorized.enhancement.push(featureStr);
      } else {
        // Remaining features or growth-related keywords
        categorized.growth.push(featureStr);
      }
    });
    
    // Ensure each category has at least something for visualization
    const allCategorized = [...categorized.core, ...categorized.enhancement, ...categorized.growth];
    const uncategorized = features.filter(f => {
      const fStr = typeof f === 'string' ? f : f.name || f.description || String(f);
      return !allCategorized.includes(fStr);
    });
    
    // Distribute uncategorized features evenly
    uncategorized.forEach((feature, index) => {
      const fStr = typeof feature === 'string' ? feature : feature.name || feature.description || String(feature);
      if (index % 3 === 0) categorized.core.push(fStr);
      else if (index % 3 === 1) categorized.enhancement.push(fStr);
      else categorized.growth.push(fStr);
    });
    
    return categorized;
  };
  
  // Create stacked bar chart showing feature categories
  const coreData = [];
  const enhancementData = [];
  const growthData = [];
  
  phases.forEach(phase => {
    const categorized = categorizeFeatures(phase.features);
    console.log(`Phase ${phase.name}:`, categorized);
    coreData.push(categorized.core.length);
    enhancementData.push(categorized.enhancement.length);
    growthData.push(categorized.growth.length);
  });
  
  const datasets = [
    {
      label: t.coreFeatures,
      backgroundColor: '#3B82F6',
      data: coreData
    },
    {
      label: t.enhancementFeatures, 
      backgroundColor: '#10B981',
      data: enhancementData
    },
    {
      label: t.growthFeatures,
      backgroundColor: '#F59E0B', 
      data: growthData
    }
  ];
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: phases.map(p => `${p.name}\n${p.timeline}`),
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        x: { stacked: true },
        y: { 
          stacked: true,
          beginAtZero: true,
          title: {
            display: true,
            text: t.numberOfFeatures
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: t.roadmapChartTitle
        },
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const phase = phases[context.dataIndex];
              const categorized = categorizeFeatures(phase.features);
              const datasetIndex = context.datasetIndex;
              
              let features = [];
              if (datasetIndex === 0) features = categorized.core;
              else if (datasetIndex === 1) features = categorized.enhancement;
              else if (datasetIndex === 2) features = categorized.growth;
              
              return features.join('\n');
            }
          }
        }
      }
    }
  });
}