import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography, Divider, CardMedia, Grid, Paper } from '@mui/material';
import { increaseQuantity, decreaseQuantity, deleteCart } from '../config/redux/reducers/cartSlice';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '80%', margin: '20px auto 0' }}>
      {cartItems.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CardMedia
            component="img"
            height="220"
            image="https://img.freepik.com/premium-vector/error-404-illustration-ecommerce-website-concept-illustration_288067-444.jpg"
            alt="cart image"
            sx={{ objectFit: 'contain', width: '100%', maxWidth: 400 }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
              Your Cart is empty
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Shop today's deals
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2} justifyContent="center">
            {cartItems.map(item => (
              <Grid size={{ sm: 12, md: 6, lg: 4 }} key={item.id}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: 2,
                    minHeight: 350,
                    height: '100%',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.image}
                    alt={item.title}
                    sx={{ objectFit: 'contain', maxWidth: '100%', backgroundColor: '#f5f5f5' }}
                  />
                  <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                    {item.description}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                    <Button variant="outlined" size="small" onClick={() => dispatch(decreaseQuantity({ id: item.id }))}>
                      -
                    </Button>
                    <Typography variant="body1">{item.quantity}</Typography>
                    <Button variant="outlined" size="small" onClick={() => dispatch(increaseQuantity({ id: item.id }))}>
                      +
                    </Button>
                    <Typography variant="body1" sx={{ ml: 2 }}>
                      ${(item.quantity * item.price).toFixed(2)}
                    </Typography>
                  </Box>
                  <Button variant="contained" color="error" fullWidth onClick={() => dispatch(deleteCart({ id: item.id }))}>
                    Remove
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {cartItems.length > 0 && (
        <Box sx={{ mt: 3, p: 2, width: '100%', borderTop: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Total Price: ${totalPrice.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" sx={{
            height: '40px', backgroundColor: '#ff8c16', '&:hover': { backgroundColor: '#E64A19' }
          }} >
            Checkout
          </Button>
        </Box>
      )
      }
    </Box >
  );
};

export default Cart;
