import { Button, Grid, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import AppBar from '../Components/AppBarButton'
import RecipeForm from '../Components/RecipeForm'
import { Recipes } from '../Components/Recipes'
import AppContext from '../Context/AppContext'


const Home = () => {
    const { user } = React.useContext(AppContext)
    const [open, setOpen] = React.useState(false)

    const [recipes, setRecipes] = React.useState([])



    useEffect(() => {
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
        fetch_products();
        return () => {
            setRecipes([])
        }
    }, [])

    return (
        <Grid container direction={"column"} spacing={10}  >
            <Grid item>
                <AppBar />
            </Grid>
            <Grid item >
                <Paper elevation={1}  >
                    <Grid container direction={"column"} alignItems={"center"} spacing={1}>
                        <Grid item xs={12}>
                            <Recipes recipes={recipes} />
                        </Grid>
                        {(user.authenticated) ? (
                            <Grid item xs={12} marginBottom={1}>
                                <Button color='primary' variant='contained' onClick={() => setOpen(true)} >+ Add Recipe</Button>
                                <RecipeForm open={open} setOpen={setOpen} user={user} />
                            </Grid>
                        ) : null}
                    </Grid>
                </Paper>
            </Grid>
        </Grid >
    )
}

export default Home