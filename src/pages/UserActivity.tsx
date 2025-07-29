import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loading from '../components/Loading';
import ErrorPage from './auth/error';
import { ExtendedRecipe } from '../types';
import { call_api } from '../utils/utils';
import ViewRecipes from '../components/Recipe_Display/ViewRecipes';

interface UserType {
    name: string;
    image: string;
    joinedDate: string;
}

const initialUser: UserType = {
    name: '',
    image: '',
    joinedDate: '',
};

export default function UserActivityPage() {
    const router = useRouter();
    const { userId } = router.query as { userId?: string };

    const [user, setUser] = useState<UserType>(initialUser);
    const [createdRecipes, setCreatedRecipes] = useState<ExtendedRecipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await call_api({ address: `/api/get-user-activity?userId=${userId}` });
                if (result.error) {
                    throw new Error(result.error);
                }
                setUser(result.user || initialUser);
                setCreatedRecipes(result.createdRecipes || []);
                setLoading(false);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Failed to load user activity');
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const handleRecipeListUpdate = (updatedRecipe: ExtendedRecipe | null, deleteId?: string) => {
        if (updatedRecipe) {
            // Update a recipe
            setCreatedRecipes((prev) =>
                prev.map((recipe) => recipe._id === updatedRecipe._id ? updatedRecipe : recipe)
            );
        } else if (deleteId) {
            // Delete a recipe
            setCreatedRecipes((prev) =>
                prev.filter((recipe) => recipe._id !== deleteId)
            );
        }
    };

    // Render the ErrorPage component if userId is not present
    if (!userId) return <ErrorPage message="Invalid Recipe" />;
    if (loading) return <Loading />;
    if (error) return <ErrorPage message={error} />;

    const recipesToShow = createdRecipes;

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <div className="mb-6">
                    {/* User Info */}
                    <div className="flex flex-col items-center space-y-4 mb-6 mt-4">
                        {user?.image && (
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    className="rounded-full"
                                />
                            </div>
                        )}
                        <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
                        {user?.joinedDate && (
                            <p className="text-sm text-gray-500">
                                Joined {new Date(user.joinedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                            </p>
                        )}
                    </div>
                    {/* Title */}
                    <div className="text-center mt-4 mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Created Recipes</h2>
                    </div>
                </div>


            </div>
            {/* Recipes List */}
            {recipesToShow.length === 0 ? (
                <div className="text-center text-gray-500 mt-10">
                    No recipes created yet.
                </div>
            ) : (
                <ViewRecipes recipes={recipesToShow} handleRecipeListUpdate={handleRecipeListUpdate} />
            )}
        </div>
    );
}
