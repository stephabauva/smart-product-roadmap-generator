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
      return `<div class="mb-2">• ${metric}</div>`;
    }
    
    // Extract meaningful data from metric objects
    const iteration = metric.iteration || metric.phase || '';
    const description = metric.successMetric || metric.metric || metric.description || '';
    const target = metric.target || metric.value || '';
    
    return `
      <div class="mb-3 p-2 bg-gray-50 rounded">
        ${iteration ? `<span class="font-semibold">Phase ${iteration}:</span>` : ''}
        <span>${description}</span>
        ${target ? `<span class="text-blue-600 ml-2">(Target: ${target})</span>` : ''}
      </div>
    `;
  }).join('');
};

// Enhanced change management formatting
const formatChangeManagement = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    // Fallback content if AI doesn't provide
    return `
      <div class="text-gray-600">
        <p>• Stakeholder communication plan needed</p>
        <p>• User training materials to be developed</p>
        <p>• Phased rollout strategy recommended</p>
      </div>
    `;
  }
  
  return items.map(item => {
    const text = typeof item === 'string' ? item : 
                 item.action || item.description || JSON.stringify(item);
    return `<p class="mb-2">• ${text}</p>`;
  }).join('');
};

function displayResults(data) {
  results.classList.remove('hidden');
  
  // Display user stories
  const storiesHtml = data.userStories.map(story => `
    <div class="mb-3 p-3 bg-gray-50 rounded">
      <p class="font-medium">As a ${story.userType}, I want ${story.feature} so that ${story.benefit}</p>
      <span class="text-sm text-gray-500">Priority: ${story.priority}/5</span>
    </div>
  `).join('');
  document.getElementById('userStories').innerHTML = storiesHtml;
  
  // Create roadmap chart
  createRoadmapChart(data.roadmap);
  
  // Display metrics and change management with better formatting
  const metricsHtml = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="font-semibold mb-3 text-lg">Success Metrics</h3>
        <div class="space-y-2">
          ${formatMetrics(data.roadmap?.metrics || [])}
        </div>
      </div>
      <div>
        <h3 class="font-semibold mb-3 text-lg">Change Management</h3>
        <div class="space-y-2">
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
    
    features.forEach(feature => {
      const featureStr = typeof feature === 'string' ? feature : feature.name || feature.description || String(feature);
      
      // Simple categorization based on keywords
      if (featureStr.toLowerCase().includes('core') || featureStr.toLowerCase().includes('basic') || featureStr.toLowerCase().includes('essential')) {
        categorized.core.push(featureStr);
      } else if (featureStr.toLowerCase().includes('enhance') || featureStr.toLowerCase().includes('improve') || featureStr.toLowerCase().includes('optimize')) {
        categorized.enhancement.push(featureStr);
      } else if (featureStr.toLowerCase().includes('growth') || featureStr.toLowerCase().includes('scale') || featureStr.toLowerCase().includes('expand')) {
        categorized.growth.push(featureStr);
      } else {
        // Default to core for uncategorized features
        categorized.core.push(featureStr);
      }
    });
    
    return categorized;
  };
  
  // Create stacked bar chart showing feature categories
  const datasets = [
    {
      label: 'Core Features',
      backgroundColor: '#3B82F6',
      data: phases.map(p => {
        const categorized = categorizeFeatures(p.features);
        return categorized.core.length;
      })
    },
    {
      label: 'Enhancement Features', 
      backgroundColor: '#10B981',
      data: phases.map(p => {
        const categorized = categorizeFeatures(p.features);
        return categorized.enhancement.length;
      })
    },
    {
      label: 'Growth Features',
      backgroundColor: '#F59E0B', 
      data: phases.map(p => {
        const categorized = categorizeFeatures(p.features);
        return categorized.growth.length;
      })
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
              const allFeatures = phase.features.map(f => 
                typeof f === 'string' ? f : f.name || f.description || String(f)
              );
              return allFeatures.join('\n');
            }
          }
        }
      }
    }
  });
}