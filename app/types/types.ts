// types/types.ts

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions: string;
  strMealThumb: string;
  strTags?: string | null;
  strYoutube?: string | null;
  isCustom?: boolean; 
}

export interface CustomRecipe {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions: string;
  strMealThumb?: string; 
  ingredients: string[];
  isCustom?: boolean; 
}

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface User {
  email: string;
  password: string;
  name?: string;
  likedRecipes: string[]; 
  customRecipes: CustomRecipe[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (user: Omit<User, 'likedRecipes' | 'customRecipes'>) => void;
  logout: () => void;
}
