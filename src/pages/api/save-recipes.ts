import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { generateRecipeTags } from '../../lib/openai';
import { apiMiddleware } from '../../lib/apiMiddleware';
import { connectDB } from '../../lib/mongodb';
import recipe from '../../models/recipe';
import { Recipe, UploadReturnType, ExtendedRecipe } from '../../types';

// S3 helper function removed - images now handled by n8n workflow

/**
 * API handler for generating images for recipes, uploading them to S3, and saving the recipes to MongoDB.
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 */
const handler = async (req: NextApiRequest, res: NextApiResponse, session: any) => {
    try {
        // Extract recipes from the request body
        const { recipes } = req.body;
        const recipeNames = recipes.map(({ name, ingredients }: Recipe) => ({ name, ingredients }));

        // Recipes already have images from n8n workflow
        console.info('Recipes already contain images from n8n workflow...');
        
        // Use the image that's already in the recipe
        const getImageLink = (recipe: any) => {
            return recipe.imgLink || '/logo.svg';
        };

        // Update recipe data with owner information
        const updatedRecipes = recipes.map((r: any) => ({
            ...r,
            owner: new mongoose.Types.ObjectId(session.user.id),
            imgLink: getImageLink(r),
            openaiPromptId: r.openaiPromptId.split('-')[0] // Remove client key iteration
        }));

        // Connect to MongoDB and save recipes
        await connectDB();
        const savedRecipes = await recipe.insertMany(updatedRecipes);
        console.info(`Successfully saved ${recipes.length} recipes to MongoDB`);

        // Run `generateRecipeTags` asynchronously in the background
        savedRecipes.forEach((r) => {
            generateRecipeTags(r as ExtendedRecipe, session.user.id)
                .catch((error) => console.error(`Failed to generate tags for recipe ${r.name}:`, error));
        });

        // Respond with success message
        res.status(200).json({ status: 'Saved Recipes and generated the Images!' });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Failed to send response:', error);
        res.status(500).json({ error: 'Failed to save recipes' });
    }
};

export default apiMiddleware(['POST'], handler);
