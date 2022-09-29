import { Grid, Paper } from '@mui/material'
import React from 'react'
import AppBar from '../Components/AppBarButton'
import { Recipes } from '../Components/Recipes'

const Home = () => {
    return (
        <Paper elevation={2}>
            <Grid container direction={"column"} spacing={7}>
                <Grid item xs={12}>
                    <AppBar />
                </Grid>
                <Grid item xs={12}>
                    <Recipes />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Home