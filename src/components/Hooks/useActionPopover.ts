import { useState } from 'react';
import { useRouter } from 'next/router';
import { call_api } from '../../utils/utils';
import { ExtendedRecipe } from '../../types';

function useActionPopover(recipe: ExtendedRecipe | null) {
    const [linkCopied, setLinkCopied] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const router = useRouter();



    const handleClone = () => {
        router.push({
            pathname: '/CreateRecipe',
            query: {
                oldIngredients: recipe?.ingredients.map((i) => i.name),
            },
        });
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/RecipeDetail?recipeId=${recipe?._id}`
            );
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleDeleteDialog = () => setIsDeleteDialogOpen((prevState) => !prevState)

    const handleDeleteRecipe = async () => {
        try {
            const response = await call_api({
                address: `/api/delete-recipe?recipeId=${recipe?._id}`,
                method: 'delete'
            })
            return response;
        } catch (error) {
            console.error(error)
        }
    }

    return {
        handleClone,
        handleCopy,
        handleDeleteDialog,
        handleDeleteRecipe,
        linkCopied,
        isDeleteDialogOpen
    };
}

export default useActionPopover;