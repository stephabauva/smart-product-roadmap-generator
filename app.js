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
  // Implementation in Task 4
}