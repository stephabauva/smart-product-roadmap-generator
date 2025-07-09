const form = document.getElementById('roadmapForm');
const loading = document.getElementById('loading');
const results = document.getElementById('results');

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
    targetAudience: document.getElementById('targetAudience').value
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
    alert('Error generating roadmap: ' + error.message);
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
  
  // Display user stories
  const storiesHtml = data.userStories.map(story => `
    <div class="user-story-card">
      <p class="story-text">As a ${story.userType}, I want ${story.feature} so that ${story.benefit}</p>
      <span class="story-priority">Priority: ${story.priority}/5</span>
    </div>
  `).join('');
  document.getElementById('userStories').innerHTML = storiesHtml;
  
  // Create roadmap chart
  createRoadmapChart(data.roadmap);
  
  // Display metrics and change management with better formatting
  const metricsHtml = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="metrics-card">
        <h3>Success Metrics</h3>
        <div>
          ${formatMetrics(data.roadmap?.metrics || [])}
        </div>
      </div>
      <div class="metrics-card">
        <h3>Change Management</h3>
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
  
  // Extract timeline and features for each phase
  const phases = [
    { 
      name: 'MVP', 
      features: roadmap?.mvp?.features || [],
      timeline: roadmap?.mvp?.timeline || 'Q1',
      priority: 'Critical'
    },
    ...roadmap.iterations.map((iter, i) => ({
      name: `Phase ${i + 2}`,
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
      label: 'Core Features',
      backgroundColor: '#3B82F6',
      data: coreData
    },
    {
      label: 'Enhancement Features', 
      backgroundColor: '#10B981',
      data: enhancementData
    },
    {
      label: 'Growth Features',
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
            text: 'Number of Features'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: 'Product Roadmap - Strategic Feature Distribution'
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