import mongoose from 'mongoose';

export type Ingredient = {
    name: string
    quantity?: number | null
    id: string
}

// Type for dietary preferences in client
export type DietaryPreference = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Keto' | 'Dairy-Free' | 'Halal' | 'Kosher';

interface RecipeIngredient {
    name: string;
    quantity: string;
}

interface AdditionalInformation {
    tips: string;
    variations: string;
    servingSuggestions: string;
    nutritionalInformation: string;
}

export interface Recipe {
    name: string;
    ingredients: RecipeIngredient[];
    instructions: string[];
    dietaryPreference: string[];
    additionalInformation: AdditionalInformation;
    openaiPromptId: string
}

// this is for raw recipe documents to be stored in the db
interface tagType {
    _id: string,
    tag: string,
}

interface unPopulatedComment {
    _id: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    comment: string,
    createdAt: string,
}


export interface RecipeDocument extends Recipe {
    owner: mongoose.Types.ObjectId
    imgLink: string
    comments: unPopulatedComment[],
    createdAt: string,
    tags: tagType[]
}

// this is for recipes returned from the db back to the client or those returned from populated mongoose queries
export interface ExtendedRecipe extends Recipe {
    _id: string
    imgLink: string
    owner: {
        _id: string
        name: string
        image: string
    }
    createdAt: string
    updatedAt: string
    owns: boolean
    tags: tagType[]
}

export interface IngredientDocumentType {
    _id: string,
    name: string,
    createdBy: string | null,
    createdAt: string,
}

export interface UploadReturnType {
    location: string,
    uploaded: boolean
}



export interface PaginationQueryType {
    page?: string,
    limit?: string,
    sortOption?: string,
    query?: string
}