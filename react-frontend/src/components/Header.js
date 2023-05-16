import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';

function Header(){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1 }}>
                        <Link to="/employees" style={{ textDecoration: 'none', color: 'inherit' }}>Employee Management System</Link>
                    </Typography>
                    <Button         
                        onClick={handleClick} color="inherit">Options</Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <Link to="/add-employee" style={{ textDecoration: 'none', color: 'inherit' }}><MenuItem onClick={handleClose}>Add Employee</MenuItem></Link>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header;