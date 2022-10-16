import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import AppContext from '../Context/AppContext';


export default function RecipeForm(props) {

    const [form_data, setForm_data] = React.useState({})
    const { cookie } = React.useContext(AppContext);
    const history = useNavigate();
    const handleClose = () => {
        return props.setOpen(false);
    };

    const handleAddRecipe = async () => {
        console.log(cookie);
        await fetch('http://localhost:3001/recipe/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'session-token': cookie["session-token"]
            },
            body: JSON.stringify({ ...form_data, author: props.user.name, author_id: props.user._id })
        })
            .then((res) => res.json())
            .then(json => {
                console.log(json)
                handleClose()
                props.fetch_products()
                return history('/home')
            })

    }


    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Nueva receta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Recuerde hacer buen uso del formulario y tampoco se olvide de llenar todos los campos.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nombre de la receta"
                        type="text"
                        fullWidth
                        variant="filled"
                        onChange={(e) => setForm_data({ ...form_data, name: e.target.value })}

                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Descripción"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline
                        rows={5}
                        onChange={(e) => setForm_data({ ...form_data, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' color='success' onClick={handleAddRecipe}>Añadir</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
