import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar } from '../config/redux/reducers/cartSlice';

const SlideTransition = (props) => (
    <Slide {...props} direction="left" timeout={{ enter: 500, exit: 500 }} />
);

const AppSnackbar = () => {
    const dispatch = useDispatch();
    const snackbarMessage = useSelector((state) => state.cart.snackbarMessage);
    const snackbarOpen = useSelector((state) => state.cart.snackbarOpen);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        dispatch(closeSnackbar());
    };

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            slots={{ transition: SlideTransition }}
            sx={{ marginTop: '50px' }}
        >
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{
                    backgroundColor: '#eae6e5',
                    color: 'green',
                }}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
};

export default AppSnackbar;
