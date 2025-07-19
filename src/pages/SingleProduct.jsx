import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import {
  Container, Grid, Typography, Box, Button, CircularProgress, Alert, Rating, Divider, Snackbar, Slide
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../config/redux/reducers/cartSlice';
import Appsnackbar from '../components/Appsnakbar';

const SingleProduct = () => {
  const { id } = useParams();
  const [loading, error, data] = useFetch(`https://dummyjson.com/products/${id}`);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: data.id,
      title: data.title,
      price: data.price,
      image: data.thumbnail,
      description: data.description,
    }));
  };
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: 'black' }} />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Alert severity="error">Something went wrong. Please try again later.</Alert>
      </Box>
    );
  }
  const SlideTransition = (props) => <Slide {...props} direction="left" timeout={{ enter: 500, exit: 500 }} />;
  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Grid container spacing={5}>
        {/* Image Section */}
        <Grid size={{xs:12, md:6}}>
          <Box
            component="img"
            src={data.thumbnail}
            alt={data.title}
            sx={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'contain',
              borderRadius: 2,
              boxShadow: 3
            }}
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <Typography variant="h4" gutterBottom>{data.title}</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h5" color="green">${data.price}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              ${(data.price / (100 - data.discountPercentage) * 100).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="green">-{data.discountPercentage}%</Typography>
          </Box>
          <Box mt={2} display="flex" alignItems="center" gap={1}>
            <Rating value={data.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">({data.rating} Rating)</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ mb: 2 }}>
            {data.description}
          </Typography>
          <Typography variant="body2">Availability: {data.stock > 0 ? `In Stock (${data.stock})` : 'Out of Stock'}</Typography>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleAddToCart}
            sx={{
              mt: 3,
              backgroundColor: '#ff8c16',
              '&:hover': {
                backgroundColor: '#E64A19'
              }
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
      <Appsnackbar />
    </Container>
  );
};

export default SingleProduct;
