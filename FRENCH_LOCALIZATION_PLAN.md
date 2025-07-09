# French Localization Plan

## Overview
This plan outlines the implementation of French language support for the Smart Product Roadmap Generator. The app will default to French with a language toggle button allowing instant switching between French and English.

## Implementation Steps

### 1. UI Language Toggle Button
- Add a language selector at the top of the page (FR | EN)
- Style the toggle to match the existing dark theme
- Position in the header area for easy access
- Active language should be highlighted

### 2. Translation Structure
Create a translations object containing all UI text in both languages:

```javascript
const translations = {
  fr: {
    title: "Générateur de Feuille de Route Produit IA",
    subtitle: "Transformez votre idée de produit en feuille de route détaillée",
    formTitle: "Décrivez Votre Produit",
    productIdea: "Idée de Produit",
    productIdeaPlaceholder: "Décrivez votre idée de produit en détail...",
    targetAudience: "Public Cible",
    targetAudiencePlaceholder: "Qui sont vos utilisateurs cibles?",
    apiProvider: "Fournisseur d'API",
    selectProvider: "Sélectionnez un fournisseur",
    apiKey: "Clé API",
    apiKeyPlaceholder: "Entrez votre clé API",
    modelSize: "Taille du Modèle",
    generateButton: "Générer la Feuille de Route",
    generating: "Génération en cours...",
    userStories: "Histoires Utilisateur",
    productRoadmap: "Feuille de Route Produit",
    successMetrics: "Métriques de Succès",
    changeManagement: "Gestion du Changement",
    error: "Erreur",
    errorMessage: "Une erreur s'est produite. Veuillez réessayer.",
    // Chart labels
    mvp: "MVP",
    iteration: "Itération",
    feature: "Fonctionnalité",
    effort: "Effort",
    priority: "Priorité",
    // Model sizes
    nano: "nano (rapide, qualité minimale)",
    mini: "mini (équilibré)",
    standard: "standard (meilleure qualité)"
  },
  en: {
    // ... existing English text
  }
}
```

### 3. Language State Management
- Store current language in localStorage
- Default to French if no preference is saved
- Update all text elements when language changes
- No page reload required

### 4. JavaScript Implementation
Update `app.js` to:
- Initialize with French as default
- Create `updateLanguage()` function to switch all UI text
- Add event listeners for language toggle
- Pass language preference to API calls

### 5. Server-Side Updates
Modify `server.js` to:
- Accept a `language` parameter in the API request
- Adjust AI prompts to generate French content when requested
- Ensure all generated content (roadmap, metrics, etc.) is in the selected language

### 6. Specific French Translations Needed

#### Form Elements
- Product Idea → Idée de Produit
- Target Audience → Public Cible
- API Provider → Fournisseur d'API
- API Key → Clé API
- Model Size → Taille du Modèle
- Generate Roadmap → Générer la Feuille de Route

#### Results Sections
- User Stories → Histoires Utilisateur
- Product Roadmap → Feuille de Route Produit
- Success Metrics → Métriques de Succès
- Change Management → Gestion du Changement

#### Chart Elements
- MVP → MVP
- Iteration → Itération
- Feature → Fonctionnalité
- Effort → Effort
- Priority → Priorité

#### Error Messages
- "Error generating roadmap" → "Erreur lors de la génération de la feuille de route"
- "Please check your API key" → "Veuillez vérifier votre clé API"

### 7. AI Prompt Modifications
Update prompts to include language parameter:
- When French is selected, add to prompts: "Respond entirely in French"
- Ensure JSON keys remain in English for consistency
- Only values should be translated

### 8. Testing Checklist
- [X] Language toggle switches all UI elements instantly
- [X] French is the default language on first load
- [X] Language preference persists on page reload
- [X] Generated roadmaps are fully in French when French is selected
- [X] Charts display French labels
- [ ] Error messages appear in the correct language
- [X] API responses generate content in the requested language

## Implementation Priority
1. Create language toggle UI
2. Implement translation object
3. Add language switching logic
4. Update server to handle French content generation
5. Test all functionality in both languages

## Notes
- Keep JSON structure keys in English for code consistency
- Only translate user-facing text
- Ensure proper French grammar and technical terminology
- Consider using professional French tech terminology where appropriate