import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppContext from '../Context/AppContext';
import { useNavigate } from 'react-router-dom';


export default function AppBarButton() {

    const history = useNavigate();
    const { user, setUser } = React.useContext(AppContext)
    const handleLogOut = () => {
        setUser({
            authenticated: false,
        })
        history('/home');
        console.log("assadasd")
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Recipes
                    </Typography>
                    {(user.authenticated) ? (
                        <Button color="inherit" onClick={() => handleLogOut()}>
                            {`${user.name}`}
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            href='/SignIn'
                        >Login</Button>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}
