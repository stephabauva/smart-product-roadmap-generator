const form = document.getElementById('roadmapForm');
const loading = document.getElementById('loading');
const results = document.getElementById('results');

// Translation object
const translations = {
  fr: {
    pageTitle: "Générateur de Feuille de Route Produit IA",
    apiProviderLabel: "Fournisseur d'API",
    apiKeyLabel: "Clé API",
    apiKeyHelp: "créer votre clé API Google gratuite",
    apiKeyHelpOpenAI: "obtenir une clé API OpenAI",
    modelSizeLabel: "Taille du Modèle",
    // Modal content
    googleModalTitle: "Comment obtenir votre clé API Google",
    openaiModalTitle: "Comment obtenir votre clé API OpenAI",
    googleStep1: "Visitez",
    googleStep2: "Connectez-vous avec votre adresse email Google",
    googleStep3: "Cliquez sur le bouton \"Get API Key\"",
    googleStep4: "Copiez votre clé API et collez-la ici",
    openaiStep1: "Visitez",
    openaiStep2: "Connectez-vous à votre compte OpenAI",
    openaiStep3: "Cliquez sur \"Create new secret key\"",
    openaiStep4: "Copiez votre clé API et collez-la ici",
    modalClose: "Compris!",
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
    // Validation messages
    fieldRequired: "Ce champ est obligatoire",
    apiKeyRequired: "La clé API est obligatoire",
    productIdeaRequired: "L'idée de produit est obligatoire",
    targetAudienceRequired: "Le public cible est obligatoire",
    clearButton: "Effacer",
    // User story template
    userStoryTemplate: (userType, feature, benefit) => `En tant que ${userType}, je veux ${feature} afin de ${benefit}`,
    priorityLabel: "Priorité: "
  },
  en: {
    pageTitle: "Smart Product Roadmap Generator",
    apiProviderLabel: "API Provider",
    apiKeyLabel: "API Key",
    apiKeyHelp: "create your free Google api key",
    apiKeyHelpOpenAI: "get an OpenAI API key",
    modelSizeLabel: "Model Size",
    // Modal content
    googleModalTitle: "How to Get Your Google API Key",
    openaiModalTitle: "How to Get Your OpenAI API Key",
    googleStep1: "Visit",
    googleStep2: "Login with your Google email address",
    googleStep3: "Click on \"Get API Key\" button",
    googleStep4: "Copy your API key and paste it here",
    openaiStep1: "Visit",
    openaiStep2: "Login to your OpenAI account",
    openaiStep3: "Click \"Create new secret key\"",
    openaiStep4: "Copy your API key and paste it here",
    modalClose: "Got it!",
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
    // Validation messages
    fieldRequired: "This field is required",
    apiKeyRequired: "API key is required",
    productIdeaRequired: "Product idea is required",
    targetAudienceRequired: "Target audience is required",
    clearButton: "Clear",
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
  document.getElementById('apiKeyLabel').innerHTML = `${t.apiKeyLabel} <span id="apiKeyHelp" class="text-cyan-400 cursor-pointer hover:text-cyan-300 text-sm ml-2 underline">${t.apiKeyHelp}</span> | <span id="apiKeyHelpOpenAI" class="text-cyan-400 cursor-pointer hover:text-cyan-300 text-sm ml-2 underline">${t.apiKeyHelpOpenAI}</span>`;
  document.getElementById('modelSizeLabel').textContent = t.modelSizeLabel;
  document.getElementById('productIdeaLabel').textContent = t.productIdeaLabel;
  document.getElementById('productIdea').placeholder = t.productIdeaPlaceholder;
  document.getElementById('targetAudienceLabel').textContent = t.targetAudienceLabel;
  document.getElementById('targetAudience').placeholder = t.targetAudiencePlaceholder;
  document.getElementById('generateButton').textContent = t.generateButton;
  document.getElementById('clearButton').textContent = t.clearButton;
  document.getElementById('loadingText').textContent = t.loadingText;
  document.getElementById('userStoriesTitle').textContent = t.userStoriesTitle;
  document.getElementById('roadmapTitle').textContent = t.roadmapTitle;
  document.getElementById('metricsTitle').textContent = t.metricsTitle;
  
  // Update modal content
  document.getElementById('googleModalTitle').textContent = t.googleModalTitle;
  document.getElementById('openaiModalTitle').textContent = t.openaiModalTitle;
  document.getElementById('googleStep1Text').textContent = t.googleStep1;
  document.getElementById('googleStep2Text').textContent = t.googleStep2;
  document.getElementById('googleStep3Text').textContent = t.googleStep3;
  document.getElementById('googleStep4Text').textContent = t.googleStep4;
  document.getElementById('openaiStep1Text').textContent = t.openaiStep1;
  document.getElementById('openaiStep2Text').textContent = t.openaiStep2;
  document.getElementById('openaiStep3Text').textContent = t.openaiStep3;
  document.getElementById('openaiStep4Text').textContent = t.openaiStep4;
  document.getElementById('closeModal').textContent = t.modalClose;
  document.getElementById('closeOpenaiModal').textContent = t.modalClose;
  
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
  
  // Add modal event listeners with delegation
  document.addEventListener('click', (e) => {
    if (e.target.id === 'apiKeyHelp') {
      document.getElementById('apiKeyModal').classList.remove('hidden');
    }
    if (e.target.id === 'apiKeyHelpOpenAI') {
      document.getElementById('openaiKeyModal').classList.remove('hidden');
    }
    if (e.target.id === 'closeModal') {
      document.getElementById('apiKeyModal').classList.add('hidden');
    }
    if (e.target.id === 'closeOpenaiModal') {
      document.getElementById('openaiKeyModal').classList.add('hidden');
    }
    if (e.target.id === 'apiKeyModal') {
      document.getElementById('apiKeyModal').classList.add('hidden');
    }
    if (e.target.id === 'openaiKeyModal') {
      document.getElementById('openaiKeyModal').classList.add('hidden');
    }
  });
});

// Listen for provider changes
document.getElementById('apiProvider').addEventListener('change', updateModelSizeOptions);

// Clear form function
function clearForm() {
  document.getElementById('apiKey').value = '';
  document.getElementById('productIdea').value = '';
  document.getElementById('targetAudience').value = '';
  
  // Clear validation errors
  document.querySelectorAll('.neural-input').forEach(input => {
    input.classList.remove('error');
  });
  document.querySelectorAll('.validation-message').forEach(msg => {
    msg.remove();
  });
  
  // Hide results
  results.classList.add('hidden');
  
  // Re-enable generate button
  const generateButton = document.getElementById('generateButton');
  generateButton.disabled = false;
  generateButton.textContent = translations[currentLanguage].generateButton;
}

// Add clear button event listener
document.getElementById('clearButton').addEventListener('click', clearForm);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Validate all fields before submission
  const isValid = validateForm();
  if (!isValid) {
    return; // Stop form submission if validation fails
  }
  
  // Disable generate button to prevent multiple submissions
  const generateButton = document.getElementById('generateButton');
  generateButton.disabled = true;
  generateButton.textContent = translations[currentLanguage].loadingText;
  
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
    
    // Check if response has error
    if (data.error) {
      throw new Error(data.error);
    }
    
    // Validate response structure
    if (!data.userStories || !Array.isArray(data.userStories)) {
      throw new Error('Invalid response format: userStories missing or not an array');
    }
    
    if (!data.roadmap) {
      throw new Error('Invalid response format: roadmap missing');
    }
    
    displayResults(data);
  } catch (error) {
    alert(translations[currentLanguage].errorGenerating + error.message);
  } finally {
    loading.classList.add('hidden');
    // Re-enable generate button
    generateButton.disabled = false;
    generateButton.textContent = translations[currentLanguage].generateButton;
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

// Global variable to store chart instance
let roadmapChartInstance = null;

function createRoadmapChart(roadmap) {
  // Destroy existing chart if it exists
  if (roadmapChartInstance) {
    roadmapChartInstance.destroy();
  }
  
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
  
  roadmapChartInstance = new Chart(ctx, {
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

// Form validation function
function validateForm() {
  const t = translations[currentLanguage];
  let isValid = true;
  
  // Clear previous error states
  document.querySelectorAll('.neural-input').forEach(input => {
    input.classList.remove('error');
  });
  
  // Fields to validate
  const fieldsToValidate = [
    { id: 'apiKey', message: t.apiKeyRequired },
    { id: 'productIdea', message: t.productIdeaRequired },
    { id: 'targetAudience', message: t.targetAudienceRequired }
  ];
  
  fieldsToValidate.forEach(field => {
    const element = document.getElementById(field.id);
    const value = element.value.trim();
    
    if (!value) {
      // Add error state
      const inputContainer = element.closest('.neural-input');
      inputContainer.classList.add('error');
      
      // Create or update validation message
      let validationMessage = inputContainer.querySelector('.validation-message');
      if (!validationMessage) {
        validationMessage = document.createElement('div');
        validationMessage.className = 'validation-message';
        inputContainer.appendChild(validationMessage);
      }
      validationMessage.textContent = field.message;
      
      isValid = false;
    }
  });
  
  return isValid;
}