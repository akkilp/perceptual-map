import {useContext, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from '../contexts/AuthenticationService'
import { MessageContext } from '../contexts/MessageService';

import {Box, AppBar, Toolbar, Menu, MenuItem, Typography, Button } from '@mui/material'

const NavBar = () => {
    const {user, logOut} = useContext(AuthenticationContext);

    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = (e) => {
      e.preventDefault()
      logOut()
      navigate('/')
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor:'pointer' }} onClick={()=>navigate('/home')}>
              Perceptual Maps
            </Typography>
            <div style={{display: 'flex', flexDirection: 'col', alignItems:'center'}}>
                {user ?
                    (
                        <>
                            <Typography variant="body1" component="div" sx={{ flexGrow: 1, marginRight: 5 }}>
                                Logged in as {user.username} {user.admin && " (admin)"}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>  
                        </>
                    ) 
                    : (
                    <>
                    <Button color="inherit" onClick={handleMenu}>Login</Button>  
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                        <MenuItem onClick={()=>navigate('/login')} >Login</MenuItem>
                        <MenuItem onClick={()=>navigate('/signin')} >Sign in</MenuItem>
                    </Menu>
                    </>
                    )
                }  
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    )
}

export default NavBar;