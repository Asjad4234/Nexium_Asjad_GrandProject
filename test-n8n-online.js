// Test script for n8n online workflow
// Replace the webhook URL with your actual n8n webhook URL

const webhookUrl = 'https://your-workspace.n8n.cloud/webhook/generate-recipe';

async function testRecipeGeneration() {
  try {
    console.log('🧪 Testing n8n Recipe Generation...');
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ingredients: [
          { name: 'chicken breast', quantity: '2 pieces' },
          { name: 'rice', quantity: '1 cup' },
          { name: 'vegetables', quantity: 'mixed' }
        ],
        dietaryPreferences: ['healthy'],
        userId: 'test-user-123'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    console.log('✅ Recipe generated successfully!');
    console.log('📝 Recipe Name:', result.recipe.name);
    console.log('🖼️ Image URL:', result.recipe.imgLink);
    console.log('📋 Ingredients:', result.recipe.ingredients.length, 'items');
    console.log('👨‍🍳 Instructions:', result.recipe.instructions.length, 'steps');
    
  } catch (error) {
    console.error('❌ Error testing n8n workflow:', error.message);
  }
}

async function testChatAssistant() {
  try {
    console.log('\n💬 Testing n8n Chat Assistant...');
    
    const chatWebhookUrl = webhookUrl.replace('/generate-recipe', '/chat-assistant');
    
    const response = await fetch(chatWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'How can I make this recipe spicier?',
        recipeId: 'test-recipe-123',
        history: [],
        userId: 'test-user-123',
        recipe: {
          name: 'Test Recipe',
          ingredients: [{ name: 'chicken', quantity: '2 pieces' }],
          instructions: ['Cook chicken'],
          dietaryPreference: [],
          additionalInformation: {
            tips: 'Cook until golden',
            variations: 'Add spices',
            servingSuggestions: 'Serve hot',
            nutritionalInformation: 'High protein'
          }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    console.log('✅ Chat response received!');
    console.log('💭 Reply:', result.reply);
    console.log('🔢 Tokens used:', result.totalTokens);
    
  } catch (error) {
    console.error('❌ Error testing chat assistant:', error.message);
  }
}

// Run tests
testRecipeGeneration().then(() => {
  setTimeout(testChatAssistant, 2000); // Wait 2 seconds between tests
}); 