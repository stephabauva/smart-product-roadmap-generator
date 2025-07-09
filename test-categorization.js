// Test categorization logic
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

// Test with sample data
const testFeatures = [
  "anonymization of personal data in documents (individual)",
  "masking of confidential information in contracts (professional)", 
  "automatic redaction of sensitive data in invoices (company)"
];

console.log('Test features:', testFeatures);
console.log('Categorized:', categorizeFeatures(testFeatures));

const testFeatures2 = [
  "customizable anonymization rules based on document type (professional)",
  "easy-to-understand anonymization instructions (individual or company)"
];

console.log('\nTest features 2:', testFeatures2);
console.log('Categorized:', categorizeFeatures(testFeatures2));