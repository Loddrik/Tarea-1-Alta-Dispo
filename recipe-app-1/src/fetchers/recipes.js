import axios from "axios";

export const fetchRecipes = async () => {
    const response = await axios.get("http://localhost:3001/recipe/recipe");

    return response.data
};

export const fetchRecipe  = async (id) => {
    const response = await axios.get(`http://localhost:3001/recipe/${id}`);

    return response.data
};

