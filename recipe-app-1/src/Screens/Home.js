import { Button, Grid, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import AppBar from '../Components/AppBarButton'
import CircularIndeterminate from '../Components/CircularIndeterminate'
import RecipeForm from '../Components/RecipeForm'
import { Recipes } from '../Components/Recipes'
import AppContext from '../Context/AppContext'


const Home = () => {
    const { user } = React.useContext(AppContext)
    const [open, setOpen] = React.useState(false)

    const [recipes, setRecipes] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    const fetch_products = async () => {
        setLoading(true)
        await fetch('http://localhost:3001/recipe/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
            .then((res) => {
                console.log("LLEGOOOO");
                return res.json()
            })
            .then(json => {
                setLoading(false)
                return setRecipes(json)
            })
    }


    useEffect(() => {

        console.log("llamandooo")
        fetch_products();
        console.log(user)
        return () => {
            setRecipes([])
        }
    }, [])

    return (
        <Grid container direction={"column"} spacing={10}  >
            <Grid item>
                <AppBar />
            </Grid>
            {(!loading) ? (
                <Grid item >
                    <Paper elevation={1}  >
                        <Grid container direction={"column"} alignItems={"center"} spacing={1}>
                            <Grid item xs={12}>
                                <Recipes fetch_products={fetch_products} recipes={recipes} />
                            </Grid>
                            {(user.authenticated) ? (
                                <Grid item xs={12} marginBottom={1}>
                                    <Button color='primary' variant='contained' onClick={() => setOpen(true)} >+ Add Recipe</Button>
                                    <RecipeForm open={open} setOpen={setOpen} fetch_products={fetch_products} user={user} />
                                </Grid>
                            ) : null}
                        </Grid>
                    </Paper>
                </Grid>
            ) : (
                <Grid item>
                    <CircularIndeterminate />
                </Grid>
            )}
        </Grid >
    )
}

export default Home