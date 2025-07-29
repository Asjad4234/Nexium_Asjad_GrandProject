/**
 * Simple test to verify n8n workflow integration
 * Run this with: node tests/n8n-workflow.test.js
 */

const testN8nWorkflow = async () => {
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/generate-recipe';
    
    const testData = {
        ingredients: [
            { name: "chicken breast", quantity: "2 pieces" },
            { name: "rice", quantity: "1 cup" },
            { name: "vegetables", quantity: "1 cup mixed" }
        ],
        dietaryPreferences: ["low-carb"],
        userId: "test-user-123"
    };

    console.log('Testing n8n workflow with data:', JSON.stringify(testData, null, 2));
    console.log('Webhook URL:', n8nWebhookUrl);

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
        console.log('✅ Success! Response:', JSON.stringify(result, null, 2));
        
        // Verify the response structure
        if (result.recipe && result.recipe.name && result.recipe.imgLink) {
            console.log('✅ Response structure is correct');
        } else {
            console.log('❌ Response structure is missing required fields');
        }
        
    } catch (error) {
        console.error('❌ Error testing n8n workflow:', error.message);
    }
};

// Run the test if this file is executed directly
if (require.main === module) {
    testN8nWorkflow();
}

module.exports = { testN8nWorkflow }; 