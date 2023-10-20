import { Box, Button, Grid, Modal, Snackbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { updateUserPhoneNumber, falseLoginOpen, falseSnack } from '../../store/loginSlice'
import { GetByPhoneLogin } from '../../apiCalls/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const styleBox = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    textAlign: 'center',
};

const styleBoxMobile = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
    textAlign: 'center',
};

export const LoginModal = () => {
    const [isMobile, setMobile] = useState(window.innerWidth < 1140);
    const [phoneNumber, setPhoneNumber] = useState('');
    const snack = useSelector((state: any) => state.login.snack)
    const loginOpen = useSelector((state: any) => state.login.loginOpen)
    const style = isMobile ? styleBoxMobile : styleBox
    const dispatch = useDispatch();

    const updateMedia = () => {
        setMobile(window.innerWidth < 1140);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(falseSnack())
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const onSubmit = async (event: any) => {
        event.preventDefault(); //prevents keep reload
        dispatch(updateUserPhoneNumber(phoneNumber))
        GetByPhoneLogin()
    }

    return (
        <Modal
            open={loginOpen}
            onClose={() => dispatch(falseLoginOpen())}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={onSubmit}>
                    <Grid container spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        paddingBottom='10px'>
                        <Grid item xs={9}>
                            <Typography id="modal-modal-title" variant="h5" sx={{ fontWeight: 'bold' }}>
                                Login
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Button onClick={() => dispatch(falseLoginOpen())} variant="contained">
                                X
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={12}>
                            <Typography id="modal-title" component="p">
                                By continuing, you agree are setting up a JBB account and agree to our User Agreement and Privacy Policy.
                            </Typography>
                        </Grid>

                        <Grid item xs={9}>
                            <PhoneInput
                                placeholder="Enter phone number *"
                                value={phoneNumber}
                                onChange={value => setPhoneNumber('+' + String(value))}
                                country="fi"
                                inputProps={{
                                    required: true,
                                }} />
                        </Grid>

                        <Snackbar
                            open={snack}
                            autoHideDuration={6000}
                            onClose={() => dispatch(falseSnack())}
                            message="Account does NOT exist!"
                            action={action}
                        />

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type='submit'>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>)
}

export default LoginModal;
