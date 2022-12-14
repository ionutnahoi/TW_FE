import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MovieIcon from '@mui/icons-material/Movie';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logout } from "../state/slices/userSlice"
import { deauthenticate } from '../state/slices/jwtSlice';



const settings = ['My movies', 'Logout'];

export const NavBar = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = (event) => {
    if (event === "My movies") {
      navigate('/myMovies');
    }
    if (event === "Logout") {
      dispatch(logout())
      dispatch(deauthenticate())
      clearTimeout(props.timeOut)
      navigate('/')
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="x2">
        <Toolbar disableGutters>
          <MovieIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => { navigate('/'); }}
            sx={{
              cursor: 'pointer',
              mr: 2,
              display: "flex",
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Movie Rental
          </Typography>
          {user && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{user.name[0]}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

