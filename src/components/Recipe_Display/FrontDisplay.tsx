import React from 'react'
import Image from "next/image"
import { Button } from '@headlessui/react'
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'
import { ExtendedRecipe } from '../../types';


interface FrontDisplayProps {
    recipe: ExtendedRecipe
    showRecipe: (recipe: ExtendedRecipe) => void
    updateRecipeList: (recipe: ExtendedRecipe) => void
}




const FrontDisplay = React.forwardRef<HTMLDivElement, FrontDisplayProps>(
    ({ recipe, showRecipe, updateRecipeList }, ref) => {

    return (
        <div ref={ref} className="recipe-card max-w-sm bg-gradient-to-r from-slate-200 to-stone-100 border border-gray-200 rounded-lg shadow-lg mt-4 mb-2 transform transition-transform hover:scale-105 hover:shadow-lg flex flex-col h-full animate-fadeInUp">
            <div className="relative w-full h-64"> {/* Add a container for the image */}
                <Image
                    src={recipe.imgLink}
                    fill
                    alt={recipe.name}
                    style={{ objectFit: 'cover' }}
                    className="rounded-t-lg"
                    priority
                    sizes="auto"
                />
            </div>
            <div className="p-5 flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 drop-shadow-lg">{recipe.name}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{recipe.additionalInformation.nutritionalInformation}</p>
            </div>
            <div className="mx-auto flex">
                {
                    recipe.dietaryPreference.map((preference) => (
                        <span key={preference} className="chip bg-brand-100 text-brand-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded hover:scale-110">{preference}</span>
                    ))
                }
            </div>
            <div className="p-5">
                <div className="flex items-center justify-center">
                    <Button
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-brand-700 rounded-lg hover:bg-brand-800 focus:ring-4 focus:outline-none focus:ring-brand-300"
                        onClick={() => showRecipe(recipe)}
                    >
                        See Recipe
                        <ArrowRightCircleIcon className="block ml-2 h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>

    )
    }
)
FrontDisplay.displayName = 'FrontDisplay'

export default FrontDisplay


