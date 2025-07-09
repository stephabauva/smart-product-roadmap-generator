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
  
  // Display metrics and change management
  const metrics = Array.isArray(data.roadmap?.metrics) ? data.roadmap.metrics : [];
  const changeManagement = Array.isArray(data.roadmap?.changeManagement) ? data.roadmap.changeManagement : [];
  
  // Helper function to safely extract string content from objects or strings
  const extractString = (item) => {
    if (typeof item === 'string') return item;
    if (typeof item === 'object' && item !== null) {
      // Try common object properties that might contain the actual content
      return item.metric || item.description || item.title || item.name || JSON.stringify(item);
    }
    return String(item);
  };
  
  const metricsHtml = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 class="font-semibold mb-2">Success Metrics</h3>
        ${metrics.map(m => `<p class="mb-1">• ${extractString(m)}</p>`).join('')}
      </div>
      <div>
        <h3 class="font-semibold mb-2">Change Management</h3>
        ${changeManagement.map(c => `<p class="mb-1">• ${extractString(c)}</p>`).join('')}
      </div>
    </div>
  `;
  document.getElementById('metrics').innerHTML = metricsHtml;
}

function createRoadmapChart(roadmap) {
  const ctx = document.getElementById('roadmapChart').getContext('2d');
  
  // Safely access roadmap properties with fallbacks
  const mvpFeatures = roadmap?.mvp?.features || [];
  const iterations = roadmap?.iterations || [];
  
  // Prepare data for timeline chart
  const labels = ['MVP', ...iterations.map((_, i) => `Iteration ${i + 1}`)];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Features',
      data: [
        mvpFeatures.length,
        ...iterations.map(i => (i?.features || []).length)
      ],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
    }]
  };
  
  new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Product Roadmap - Features per Phase'
        },
        legend: {
          display: true
        },
        tooltip: {
          callbacks: {
            afterLabel: function(context) {
              const phase = context.dataIndex === 0 ? roadmap.mvp : roadmap.iterations[context.dataIndex - 1];
              return (phase?.features || []).join('\n');
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Features'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Development Phase'
          }
        }
      }
    }
  });
}