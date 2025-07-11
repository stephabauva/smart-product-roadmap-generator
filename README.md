# Smart Product Roadmap Generator | Générateur de Feuille de Route Produit IA

<div style="display: flex; justify-content: space-between; gap: 10px;">
<img src="github-assets/generation.png" alt="Smart Product Roadmap Generator - Homepage" style="width: 32%; max-width: 300px;"/>
<img src="github-assets/stories.png" alt="User Stories Generation" style="width: 32%; max-width: 300px;"/>
<img src="github-assets/roadmap-graph-metrics.png" alt="Roadmap Graph and Metrics" style="width: 32%; max-width: 300px;"/>
</div>

[English](#english) | [Français](#français)

---

## English

### 🚀 Overview

The Smart Product Roadmap Generator is an AI-powered web application that transforms your product ideas into comprehensive, visual product roadmaps. Built with cutting-edge cyberpunk aesthetics and dual-language support, this tool helps product managers, entrepreneurs, and development teams create strategic roadmaps with user stories, feature categorization, and success metrics.

### ✨ Core Features

- **🤖 AI-Powered Generation**: Leverages OpenAI and Google AI models to create intelligent product roadmaps
- **📊 Visual Roadmap Charts**: Interactive Chart.js visualizations showing feature distribution across phases
- **👥 User Story Creation**: Automatically generates user stories in proper format with priority scoring
- **🎯 Strategic Feature Categorization**: Organizes features into Core, Enhancement, and Growth categories
- **📈 Success Metrics & Change Management**: Provides KPIs and change management recommendations
- **🌐 Dual Language Support**: Full French/English localization with persistent language preference
- **🎨 Cyberpunk UI**: Modern, futuristic interface with neural network-inspired animations
- **🔧 Multiple AI Providers**: Supports both OpenAI and Google AI with model size selection
- **⚡ No Build Step**: Direct HTML/CSS/JS implementation for rapid deployment

### 🎮 Language Toggle Feature

The application features a sophisticated language toggle system:

- **Persistent Language Preference**: Your language choice is saved in localStorage
- **Real-time UI Updates**: All interface elements update instantly when switching languages
- **Localized Content**: Forms, labels, charts, and AI-generated content adapt to your language
- **Smart Model Mapping**: Model size options change based on AI provider (OpenAI: nano/mini/standard, Google: lite/flash/pro)
- **Cyberpunk Toggle Design**: Stylized FR/EN buttons with active state highlighting

### 🏗️ Architecture

- **Frontend**: HTML5 + Tailwind CSS + Vanilla JavaScript
- **Backend**: Node.js + Express API server
- **Visualization**: Chart.js for interactive roadmap charts
- **AI Integration**: OpenAI GPT-4 and Google Gemini APIs
- **Deployment**: Vercel-ready configuration

### 🛠️ Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/smart-product-roadmap-generator.git
   cd smart-product-roadmap-generator
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open in browser**:
   Navigate to `http://localhost:3001`

### 🎯 Usage

1. **Select AI Provider**: Choose between OpenAI or Google AI
2. **Enter API Key**: Provide your API key (not stored server-side)
   - **Need Help?** Click "create your free Google api key" or "get an OpenAI API key" links next to the API Key field for step-by-step instructions
   - **Interactive Help Modals**: Built-in modals with clickable links and instructions.
3. **Choose Model Size**: Select quality/speed trade-off
4. **Describe Product**: Enter your product idea and target audience
5. **Generate Roadmap**: Click generate to create your roadmap
6. **Review Results**: Analyze user stories, roadmap chart, and metrics

### 🗝️ Getting Your API Key

#### For Google AI (Recommended for Free Usage):
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Login with your Google email address
3. Click on "Get API Key" button
4. Copy your API key and paste it in the application

#### For OpenAI:
1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Login to your OpenAI account
3. Click "Create new secret key"
4. Copy your API key and paste it in the application

*Note: API keys are not stored server-side and are only used for your session.*

### 📊 Output Features

- **User Stories**: Properly formatted with priority scoring (1-5)
- **MVP Definition**: Core features for initial release
- **Iteration Planning**: 3 post-MVP phases with strategic feature distribution
- **Visual Timeline**: Interactive chart showing feature categories across phases
- **Success Metrics**: KPIs for each development phase
- **Change Management**: Recommendations for smooth rollout

### 🔧 API Support

**OpenAI Models**:
- Nano: gpt-4.1-nano-2025-04-14 (Fastest)
- Mini: o4-mini-2025-04-16 (Balanced)
- Standard: gpt-4.1-2025-04-14 (Best Quality)

**Google AI Models**:
- Lite: gemini-1.5-flash-8b (Fastest)
- Flash: gemini-1.5-flash (Balanced)
- Pro: gemini-1.5-pro (Best Quality)

### 🚀 Deployment

The application is Vercel-ready with zero configuration:

#### Quick Deploy to Vercel

1. **Fork/Clone this repository**
2. **Sign up at [vercel.com](https://vercel.com)** (free tier)
3. **Import your repository**:
   - Click "New Project"
   - Import from GitHub
   - Select this repository
4. **Deploy automatically** - Vercel detects the configuration

#### Manual Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Or deploy to preview
vercel
```

#### Environment Variables

No environment variables are required. Users provide their own API keys through the UI input field for security.

#### Custom Domain (Optional)

After deployment, you can add a custom domain in your Vercel dashboard.

### 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the ISC License.

---

## Français

### 🚀 Aperçu

Le Générateur de Feuille de Route Produit IA est une application web alimentée par l'IA qui transforme vos idées de produits en feuilles de route complètes et visuelles. Construit avec une esthétique cyberpunk de pointe et un support bilingue, cet outil aide les chefs de produits, entrepreneurs et équipes de développement à créer des feuilles de route stratégiques avec des histoires utilisateur, une catégorisation des fonctionnalités et des métriques de succès.

### ✨ Fonctionnalités Principales

- **🤖 Génération par IA**: Utilise les modèles OpenAI et Google AI pour créer des feuilles de route intelligentes
- **📊 Graphiques de Feuille de Route Visuels**: Visualisations interactives Chart.js montrant la distribution des fonctionnalités
- **👥 Création d'Histoires Utilisateur**: Génère automatiquement des histoires utilisateur avec notation de priorité
- **🎯 Catégorisation Stratégique**: Organise les fonctionnalités en catégories Principales, Amélioration et Croissance
- **📈 Métriques de Succès & Gestion du Changement**: Fournit des KPI et recommandations
- **🌐 Support Bilingue**: Localisation complète français/anglais avec préférence persistante
- **🎨 Interface Cyberpunk**: Interface moderne et futuriste avec animations inspirées des réseaux neuronaux
- **🔧 Multiples Fournisseurs IA**: Support d'OpenAI et Google AI avec sélection de taille de modèle
- **⚡ Pas d'Étape de Build**: Implémentation directe HTML/CSS/JS pour déploiement rapide

### 🎮 Fonctionnalité de Basculement de Langue

L'application propose un système sophistiqué de basculement de langue :

- **Préférence Linguistique Persistante**: Votre choix de langue est sauvegardé dans localStorage
- **Mises à Jour UI en Temps Réel**: Tous les éléments d'interface se mettent à jour instantanément
- **Contenu Localisé**: Formulaires, étiquettes, graphiques et contenu IA s'adaptent à votre langue
- **Mappage Intelligent des Modèles**: Les options de taille de modèle changent selon le fournisseur IA
- **Design Cyberpunk**: Boutons FR/EN stylisés avec mise en évidence de l'état actif

### 🏗️ Architecture

- **Frontend**: HTML5 + Tailwind CSS + JavaScript Vanilla
- **Backend**: Serveur API Node.js + Express
- **Visualisation**: Chart.js pour graphiques interactifs
- **Intégration IA**: APIs OpenAI GPT-4 et Google Gemini
- **Déploiement**: Configuration prête pour Vercel

### 🛠️ Installation & Configuration

1. **Cloner le dépôt**:
   ```bash
   git clone https://github.com/yourusername/smart-product-roadmap-generator.git
   cd smart-product-roadmap-generator
   ```

2. **Installer les dépendances**:
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**:
   ```bash
   npm start
   ```

4. **Ouvrir dans le navigateur**:
   Naviguer vers `http://localhost:3001`

### 🎯 Utilisation

1. **Sélectionner le Fournisseur IA**: Choisir entre OpenAI ou Google AI
2. **Entrer la Clé API**: Fournir votre clé API (non stockée côté serveur)
   - **Besoin d'aide?** Cliquez sur "créer votre clé API Google gratuite" ou "obtenir une clé API OpenAI" à côté du champ Clé API pour des instructions étape par étape
   - **Modales d'Aide Interactives**: Modales intégrées avec liens cliquables et instructions.
3. **Choisir la Taille du Modèle**: Sélectionner le compromis qualité/vitesse
4. **Décrire le Produit**: Entrer votre idée de produit et audience cible
5. **Générer la Feuille de Route**: Cliquer sur générer pour créer votre feuille de route
6. **Réviser les Résultats**: Analyser les histoires utilisateur, graphique et métriques

### 🗝️ Obtenir Votre Clé API

#### Pour Google AI (Recommandé pour l'usage gratuit):
1. Visitez [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Connectez-vous avec votre adresse email Google
3. Cliquez sur le bouton "Get API Key"
4. Copiez votre clé API et collez-la dans l'application

#### Pour OpenAI:
1. Visitez [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Connectez-vous à votre compte OpenAI
3. Cliquez sur "Create new secret key"
4. Copiez votre clé API et collez-la dans l'application

*Note: Les clés API ne sont pas stockées côté serveur et ne sont utilisées que pour votre session.*

### 📊 Fonctionnalités de Sortie

- **Histoires Utilisateur**: Correctement formatées avec notation de priorité (1-5)
- **Définition MVP**: Fonctionnalités principales pour la version initiale
- **Planification d'Itération**: 3 phases post-MVP avec distribution stratégique
- **Timeline Visuelle**: Graphique interactif montrant les catégories de fonctionnalités
- **Métriques de Succès**: KPI pour chaque phase de développement
- **Gestion du Changement**: Recommandations pour un déploiement fluide

### 🔧 Support API

**Modèles OpenAI**:
- Nano: gpt-4.1-nano-2025-04-14 (Le plus rapide)
- Mini: o4-mini-2025-04-16 (Équilibré)
- Standard: gpt-4.1-2025-04-14 (Meilleure qualité)

**Modèles Google AI**:
- Lite: gemini-1.5-flash-8b (Le plus rapide)
- Flash: gemini-1.5-flash (Équilibré)
- Pro: gemini-1.5-pro (Meilleure qualité)

### 🚀 Déploiement

L'application est prête pour Vercel avec zéro configuration :

#### Déploiement Rapide sur Vercel

1. **Forker/Cloner ce dépôt**
2. **S'inscrire sur [vercel.com](https://vercel.com)** (niveau gratuit)
3. **Importer votre dépôt**:
   - Cliquer "New Project"
   - Importer depuis GitHub
   - Sélectionner ce dépôt
4. **Déploiement automatique** - Vercel détecte la configuration

#### Déploiement Manuel via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer en production
vercel --prod

# Ou déployer en prévisualisation
vercel
```

#### Variables d'Environnement

Aucune variable d'environnement n'est requise. Les utilisateurs fournissent leurs propres clés API via le champ de saisie de l'interface pour la sécurité.

#### Domaine Personnalisé (Optionnel)

Après le déploiement, vous pouvez ajouter un domaine personnalisé dans votre tableau de bord Vercel.

### 🤝 Contribution

1. Forker le dépôt
2. Créer votre branche de fonctionnalité (`git checkout -b feature/fonctionnalite-incroyable`)
3. Commiter vos changements (`git commit -m 'Ajouter fonctionnalité incroyable'`)
4. Pousser vers la branche (`git push origin feature/fonctionnalite-incroyable`)
5. Ouvrir une Pull Request

### 📄 Licence

Ce projet est sous licence ISC.

---

## 📸 Screenshots

<!-- Add your screenshots here -->
*Screenshots will be added here to showcase the application's cyberpunk interface and dual-language functionality.*

## 🔗 Links

- **Live Demo**: [Add your demo link here]
- **Documentation**: [Add documentation link here]
- **Issues**: [GitHub Issues](https://github.com/yourusername/smart-product-roadmap-generator/issues)

---

Built with ❤️ using AI and modern web technologies.