// lib/api.ts
import { Recipe, Category } from "@/types/types";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";

// Fetch recipes by name
export async function fetchRecipesByName(name: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE}/search.php?s=${name}`, {
      next: { revalidate: 60 }, // ISR (revalidate cache every 60s)
    });
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching recipes by name:", error);
    return [];
  }
}

// Fetch recipe by ID
export async function fetchRecipeById(id: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${API_BASE}/lookup.php?i=${id}`, {
      next: { revalidate: 60 },
    });
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    return null;
  }
}

// Fetch categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE}/categories.php`, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch recipes by category
export async function fetchRecipesByCategory(
  category: string
): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE}/filter.php?c=${category}`, {
      next: { revalidate: 300 }, // cache for 5 min
    });
    const data = await response.json();
    const meals = data.meals || [];

    const detailedRecipes = await Promise.all(
      meals.map(async (meal: any) => {
        const res = await fetch(`${API_BASE}/lookup.php?i=${meal.idMeal}`);
        const detailData = await res.json();
        return detailData.meals ? detailData.meals[0] : null;
      })
    );

    return detailedRecipes.filter((recipe) => recipe !== null) as Recipe[];
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return [];
  }
}
