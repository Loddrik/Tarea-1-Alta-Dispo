import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import RecipeCard from './RecipeCard';
import { Paper, Typography } from '@mui/material';




export const Recipes = (props) => {
    return (
        <div>
            {(props.recipes.length > 0) ?
                (
                    <Grid margin={1} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }} >
                        {props.recipes.map((re, index) => (
                            < Grid item key={index} xs={4} sm={6} md={6} >
                                <RecipeCard name={re.name} _id={re._id} author_id={re.author_id} description={re.description} author={re.author} />
                            </Grid>
                        ))}
                    </Grid>

                ) : (
                    <Paper>
                        <Box sx={{ p: 2, textAlign: 'center' }}>
                            <Typography variant="h5" component="h2">
                                No Recipes Found
                            </Typography>
                        </Box>
                    </Paper>
                )
            }


        </div >
    )
}
