/**
 * Test for n8n chat assistant functionality
 * Run this with: node tests/n8n-chat-test.js
 */

const testN8nChat = async () => {
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL?.replace('/generate-recipe', '/chat-assistant') || 'http://localhost:5678/webhook/chat-assistant';
    
    const testData = {
        message: "How can I make this recipe vegan?",
        recipeId: "test-recipe-123",
        history: [
            {"role": "user", "content": "What can I substitute for eggs?"},
            {"role": "assistant", "content": "You can use flax eggs or chia eggs as a substitute."}
        ],
        userId: "test-user-123",
        recipe: {
            name: "Chicken Rice Bowl",
            ingredients: [
                {"name": "chicken breast", "quantity": "2 pieces"},
                {"name": "rice", "quantity": "1 cup"},
                {"name": "vegetables", "quantity": "1 cup mixed"}
            ],
            instructions: [
                "Cook the chicken until golden brown",
                "Prepare rice according to package instructions",
                "Mix vegetables and serve"
            ],
            dietaryPreference: ["low-carb"],
            additionalInformation: {
                tips: "Use fresh vegetables for best results",
                variations: "You can use different types of rice",
                servingSuggestions: "Serve hot with soy sauce",
                nutritionalInformation: "High protein, moderate carbs"
            }
        }
    };

    console.log('Testing n8n chat assistant with data:', JSON.stringify(testData, null, 2));
    console.log('Chat Webhook URL:', n8nWebhookUrl);

    try {
        const response = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Success! Chat Response:', JSON.stringify(result, null, 2));
        
        // Verify the response structure
        if (result.reply && result.totalTokens && result.success) {
            console.log('✅ Chat response structure is correct');
        } else {
            console.log('❌ Chat response structure is missing required fields');
        }
        
    } catch (error) {
        console.error('❌ Error testing n8n chat:', error.message);
    }
};

// Run the test if this file is executed directly
if (require.main === module) {
    testN8nChat();
}

module.exports = { testN8nChat }; 