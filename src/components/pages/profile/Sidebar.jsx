import React from 'react';
import {Toolbar, Divider, List, ListItem, ListItemText, Box, CssBaseline,AppBar, Typography, Drawer} from '@material-ui/core';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import '../../../css/sidebar.css';

const drawerWidth = 240;

const Sidebar = () => {
    const navigate = useNavigate();

    const logOut = () =>{
        localStorage.removeItem('name');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/', { replace: true });
        window.location.reload(true);
    }

  return (
        <Box sx={{ display: 'flex'}}>
            <Drawer
                variant="permanent"
                sx={{
                zIndex: 0,
                width: drawerWidth
                }}
            >   
                <div className='sidebar'>
                    <Box sx={{ overflow: 'auto', zIndex: 0}}>
                        <List className='list'>
                            <ListItem  disablePadding>
                                <ListItemButton onClick={()=>navigate('/profile/profileinfo')}>
                                <ListItemIcon>
                                    <AccountCircleIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Profile Info'} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem  disablePadding>
                                <ListItemButton onClick={()=>navigate('/profile/reservations', { replace: true })}>
                                <ListItemIcon>
                                    <BedroomParentIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Reservations'} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem  disablePadding>
                                <ListItemButton onClick={()=>navigate('/profile/security', { replace: true })}>
                                <ListItemIcon>
                                    <SecurityIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Security'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem  disablePadding>
                                <ListItemButton onClick={logOut}>
                                <ListItemIcon>
                                    <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary={'Log out'} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Box>
                </div>
            </Drawer>
        </Box>
  )
}

export default Sidebar;