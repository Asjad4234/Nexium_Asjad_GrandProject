<<<<<<< HEAD

# 🍳 Smart Recipe Generator

A modern, AI-powered recipe generation application built with Next.js, OpenAI GPT-3.5, and n8n workflows. Create delicious recipes from ingredients and get cooking assistance through an intelligent chatbot.

## ✨ Features

### 🎯 Core Functionality
- **AI Recipe Generation** - Create recipes from ingredients using GPT-3.5-turbo
- **Smart Chat Assistant** - Get cooking tips and recipe modifications
- **Free Image Integration** - Automatic Unsplash food images
- **Dietary Preferences** - Support for vegan, gluten-free, and other dietary needs
- **User Authentication** - Google OAuth integration with NextAuth.js

### 🚀 Technical Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **AI Integration**: OpenAI GPT-3.5-turbo via n8n workflows
- **Authentication**: NextAuth.js with Google OAuth
- **Testing**: Jest, Cypress E2E testing
- **Deployment**: Vercel-ready configuration

### 💰 Cost Optimized
- **Free Tier Compatible** - Optimized for OpenAI's free tier ($5 credit)
- **Efficient Token Usage** - Minimal API calls for maximum value
- **Free Image Service** - Unsplash integration instead of DALL·E

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- OpenAI API key
- Google OAuth credentials

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Asjad4234/Nexium_Asjad_GrandProject.git
   cd Nexium_Asjad_GrandProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local`:
   ```env
   # Database
   MONGO_URI=your-mongodb-connection-string
   
   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   # OpenAI
   OPENAI_API_KEY=your-openai-api-key
   
   # N8N Workflow (set after n8n setup)
   N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/generate-recipe
   
   # App Settings
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   API_REQUEST_LIMIT=100
   ```

4. **Set up n8n workflow**
   - Import `n8n-workflow-free-tier.json` to your n8n instance
   - Configure OpenAI credentials
   - Get your webhook URLs

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
smart-recipe-generator/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Next.js pages and API routes
│   ├── models/             # MongoDB schemas
│   ├── lib/                # Utility libraries
│   ├── types/              # TypeScript definitions
│   └── utils/              # Helper functions
├── docs/                   # Documentation
├── tests/                  # Test files
├── cypress/                # E2E tests
├── n8n-workflow-*.json     # n8n workflow configurations
└── public/                 # Static assets
```

## 🔧 N8N Workflow Setup

### Workflow Files
- `n8n-workflow-free-tier.json` - Optimized for free OpenAI tier
- `n8n-workflow-simple.json` - Simplified version
- `n8n-workflow-updated-openai.json` - Latest OpenAI node version

### Setup Instructions
1. **Import workflow** to n8n.cloud or local n8n instance
2. **Configure OpenAI credentials** with your API key
3. **Get webhook URLs** for recipe generation and chat
4. **Update environment variables** with the webhook URLs

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
npm run cypress:open
```

### N8N Workflow Tests
```bash
node test-n8n-online.js
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Compatible with Next.js
- **Railway**: Full-stack deployment
- **DigitalOcean App Platform**: Scalable deployment

## 📊 Usage Statistics

### OpenAI API Usage (Free Tier)
- **Recipe Generation**: ~$0.001 per recipe
- **Chat Messages**: ~$0.0005 per message
- **$5 Credit**: ~5,000 recipes or 10,000 chat messages

### Performance
- **Recipe Generation**: 2-5 seconds
- **Chat Response**: 1-3 seconds
- **Image Loading**: Instant (Unsplash CDN)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT-3.5-turbo API
- **n8n** for workflow automation
- **Unsplash** for free food images
- **Next.js** for the amazing framework
- **Tailwind CSS** for beautiful styling

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Asjad4234/Nexium_Asjad_GrandProject/issues)
- **Documentation**: Check the `docs/` folder
- **N8N Setup**: See `docs/n8n-setup.md`

---

**Made with ❤️ by Asjad** | **Powered by AI** 🤖
=======
# Nexium_Asjad_GrandProject
>>>>>>> 55d745f5068078e0c31b0f7bb401f52bde224ec8
