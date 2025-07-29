# N8N Workflow Setup for Complete Recipe Generator with Chatbot

This document explains how to set up the n8n workflow to handle complete recipe generation including GPT-4 recipe creation, DALL·E image generation, and context-aware chatbot functionality, decoupling these features from the main application.

## Overview

The n8n workflow provides two main endpoints:
1. **Recipe Generation**: Receives ingredients and dietary preferences, generates recipes using GPT-4, creates images using DALL·E
2. **Chat Assistant**: Provides context-aware cooking assistance for specific recipes using GPT-4

## Setup Steps

### 1. Install and Configure n8n

```bash
# Install n8n globally
npm install -g n8n

# Start n8n
n8n start
```

Or use Docker:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. Import the Workflow

1. Open n8n at `http://localhost:5678`
2. Go to **Workflows** → **Import from File**
3. Select the `n8n-recipe-image-workflow.json` file
4. Click **Import**

### 3. Configure OpenAI Credentials

1. In the imported workflow, click on the **Generate Image** node
2. Click **Add Credential** → **OpenAI API**
3. Enter your OpenAI API key
4. Save the credential

### 4. Activate the Workflow

1. Click the **Active** toggle in the workflow
2. Two webhook URLs will be available:
   - Recipe Generation: `https://your-n8n-instance.com/webhook/generate-recipe`
   - Chat Assistant: `https://your-n8n-instance.com/webhook/chat-assistant`

### 5. Update Environment Variables

Add the webhook URL to your `.env.local`:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/generate-recipe
# The chat assistant will automatically use: https://your-n8n-instance.com/webhook/chat-assistant
```

## Workflow Details

### Recipe Generation Endpoint

**Input Format:**
```json
{
  "ingredients": [
    {"name": "Ingredient 1", "quantity": "1 cup"},
    {"name": "Ingredient 2", "quantity": "2 tbsp"}
  ],
  "dietaryPreferences": ["vegan", "gluten-free"],
  "userId": "user123"
}
```

**Output Format:**
```json
{
  "recipe": {
    "name": "Recipe Name",
    "ingredients": [
      {"name": "Ingredient 1", "quantity": "1 cup"},
      {"name": "Ingredient 2", "quantity": "2 tbsp"}
    ],
    "instructions": ["Step 1", "Step 2"],
    "dietaryPreference": ["vegan", "gluten-free"],
    "additionalInformation": {
      "tips": "Cooking tips",
      "variations": "Recipe variations",
      "servingSuggestions": "How to serve",
      "nutritionalInformation": "Nutritional info"
    },
    "imgLink": "https://oaidalleapiprodscus.blob.core.windows.net/...",
    "userId": "user123",
    "openaiPromptId": "generated-1234567890"
  },
  "success": true
}
```

### Chat Assistant Endpoint

**Input Format:**
```json
{
  "message": "How can I make this recipe vegan?",
  "recipeId": "recipe123",
  "history": [
    {"role": "user", "content": "What can I substitute for eggs?"},
    {"role": "assistant", "content": "You can use flax eggs or chia eggs..."}
  ],
  "userId": "user123",
  "recipe": {
    // Full recipe object from database
  }
}
```

**Output Format:**
```json
{
  "reply": "To make this recipe vegan, you can substitute...",
  "totalTokens": 150,
  "success": true
}
```

## Workflow Nodes

### Recipe Generation Flow:
1. **Webhook Trigger**: Receives POST requests for recipe generation
2. **Parse Input**: Extracts and validates ingredients and dietary preferences
3. **Generate Recipe Prompt**: Creates GPT-4 prompt for recipe generation
4. **Generate Recipe (GPT-4)**: Calls OpenAI GPT-4 API to create recipe
5. **Parse Recipe**: Extracts and validates the generated recipe
6. **Generate Image Prompt**: Creates DALL·E prompt from recipe
7. **Generate Image (DALL-E)**: Calls OpenAI DALL·E API to create image
8. **Combine Recipe & Image**: Merges recipe and image data
9. **Return Response**: Returns complete recipe with image to your app

### Chat Assistant Flow:
1. **Chat Webhook Trigger**: Receives POST requests for chat assistance
2. **Parse Chat Input**: Extracts message, recipe context, and chat history
3. **Generate Chat Prompt**: Creates context-aware system prompt for the recipe
4. **Generate Chat Response (GPT-4)**: Calls OpenAI GPT-4 API for cooking assistance
5. **Extract Chat Response**: Processes the AI response
6. **Chat Response**: Returns helpful cooking advice to your app

## Benefits of This Approach

- **Decoupled Architecture**: Image generation is separate from your main app
- **Scalability**: n8n can handle multiple requests and retries
- **Monitoring**: n8n provides execution logs and error handling
- **Flexibility**: Easy to modify prompts or add additional processing
- **Cost Control**: Can implement rate limiting and usage tracking

## Error Handling

The workflow includes basic error handling:
- Validates input data
- Handles OpenAI API errors
- Returns fallback responses on failure

## Deployment Options

### Self-Hosted
- Run n8n on your own server
- Use environment variables for configuration
- Set up reverse proxy for HTTPS

### Cloud Hosted
- Use n8n.cloud for managed hosting
- Automatic scaling and monitoring
- Built-in security features

### Docker Deployment
```bash
docker-compose up -d n8n
```

## Monitoring and Logs

- Check n8n execution logs for debugging
- Monitor webhook response times
- Set up alerts for failed executions
- Track OpenAI API usage and costs

## Troubleshooting

### Common Issues

1. **Webhook not receiving requests**
   - Check n8n is running and workflow is active
   - Verify webhook URL is correct
   - Check firewall/network settings

2. **OpenAI API errors**
   - Verify API key is correct
   - Check API rate limits
   - Ensure sufficient credits

3. **Image generation failures**
   - Review DALL·E prompt quality
   - Check for inappropriate content
   - Verify image size parameters

### Debug Mode

Enable debug logging in n8n:
```bash
n8n start --debug
```

## Security Considerations

- Use HTTPS for webhook URLs
- Implement authentication if needed
- Validate input data
- Monitor API usage
- Set up rate limiting 