import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThrashIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import AppContext from '../Context/AppContext';
import Delete from '@mui/icons-material/Delete';
import { DeleteRecipe } from '../func/recipeFunc';




export default function RecipeCard(props) {
    const { user } = React.useContext(AppContext)

    const handleDelete = async () => {
        await DeleteRecipe(props._id)
        props.fetch_products()
    }

    const DeleteRecipe = async (id) => {
        await fetch(`http://localhost:3001/recipe/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then(json => {
                return console.log(json)
            })
    }


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {props.author[0]}
                    </Avatar>
                }
                action={
                    (props.author_id === user._id) ? (
                        <IconButton onClick={() =>
                            handleDelete()
                        }>
                            <ThrashIcon />
                        </IconButton>) : (
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    )
                }
                title={props.name}
                subheader={props.author}
            />
            <CardMedia
                component="img"
                height="194"
                image='https://p.kindpng.com/picc/s/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.png'
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                }}>
                    {props.description}
                </Typography>
            </CardContent>
        </Card >
    );
}