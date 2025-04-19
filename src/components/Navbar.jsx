import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Button,
} from '@mui/material';

const pages = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Product', path: '/product' },
    { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const cartItems = useSelector(state => state.cart.items);
    let uniqueItemCount = 0;
    let seenItemIds = [];

    cartItems.forEach(item => {
        if (!seenItemIds.includes(item.id)) {
            uniqueItemCount++;
            seenItemIds.push(item.id);
        }
    });

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#ff8c16' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        textDecoration: 'none',
                        color: 'white',
                        fontWeight: 'bold',
                        flexGrow: 1,
                    }}
                >
                    Product App
                </Typography>

                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={handleOpenNavMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorElNav}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        {pages.map((page) => (
                            <MenuItem
                                key={page.label}
                                component={Link}
                                to={page.path}
                                onClick={handleCloseNavMenu}
                            >
                                {page.label}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            key={page.label}
                            component={Link}
                            to={page.path}
                            color="inherit"
                        >
                            {page.label}
                        </Button>
                    ))}
                </Box>

                <IconButton
                    component={Link}
                    to="/cart"
                    color="inherit"
                    sx={{ ml: 2 }}
                >
                    <ShoppingCartIcon />
                    {uniqueItemCount > 0 &&
                        <Typography variant="caption" color="inherit" sx={{ ml: 1 }}>
                            {uniqueItemCount}
                        </Typography>
                    }
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
