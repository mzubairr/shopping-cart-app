import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Snackbar, Alert, Slide } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../config/redux/reducers/cartSlice';
import Appsnackbar from './Appsnakbar';

const ProductCard = ({ title, description, image, id, price }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const addInCart = () => {
        dispatch(addToCart({ title, description, image, id, price }));
    };

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => navigate(`/product/${id}`)}>
                    <CardMedia
                        component="img"
                        height="180"
                        image={image}
                        alt={title}
                        sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5' }}
                    />
                    <CardContent>
                        <Typography variant="h6" gutterBottom>{title}</Typography>
                        <Typography variant="body2" color="text.secondary">{description.slice(0, 100)}...</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{
                            borderColor: '#FF5722',
                            color: '#FF5722',
                            '&:hover': {
                                backgroundColor: '#ff8c16',
                                borderColor: '#FF7043',
                                color: '#FFFFFF',
                            }
                        }}
                        onClick={() => navigate(`/product/${id}`)}
                    >
                        See More
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff8c16',
                            '&:hover': {
                                backgroundColor: '#E64A19'
                            }
                        }}
                        onClick={addInCart}
                    >
                        Add to Cart
                    </Button>
                </CardActions>

            </Card>
            <Appsnackbar />
        </>
    );
};

export default ProductCard;
