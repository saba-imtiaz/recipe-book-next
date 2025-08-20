"use client";

import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/types/types";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-sm flex flex-col">
      <Image
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        width={400}
        height={200}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {recipe.strMeal}
        </h2>

        <div className="flex gap-2 mb-3">
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {recipe.strCategory}
          </span>
          <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {recipe.strArea}
          </span>
        </div>

        <div className="min-h-[120px]">
          <p className="text-sm text-gray-500 mb-4">
            {recipe.strInstructions
              ? recipe.strInstructions.slice(0, 100) + "..."
              : "RECIPE REMOVED."}
          </p>
        </div>

        <Link
         href={`/recipeDetail/${recipe.idMeal}`}
 
          className="mt-auto block w-full text-center !text-white bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;
