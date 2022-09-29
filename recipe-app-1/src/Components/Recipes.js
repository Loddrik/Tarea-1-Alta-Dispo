import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import RecipeCard from './RecipeCard';
import { Paper } from '@mui/material';



export const Recipes = () => {
    const fetch_products = async () => {
        await fetch('http://localhost:3001/recipe/recipe', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(json => {
                setRecipes(json)
            })
    }
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        fetch_products()
    }, [])
    return (
        <Grid direction={"column"} alignItems={"center"} spacing={3} container >
            {recipes.map((re, index) => (
                <Grid item key={index}>
                    <RecipeCard name={re.name} description={re.description} />
                </Grid>
            ))}
        </Grid>
    )
}
