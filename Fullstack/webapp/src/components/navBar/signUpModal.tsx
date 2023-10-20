import { Box, Button, Grid, Modal, Snackbar, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import VerificationModal from './verificationModal';
import { useSelector, useDispatch } from "react-redux";
import { closeSignUp } from '../../store/accountSlice'
import { updateSignUpPhone, falseInUseTag, updateSignUpName, updateSignUpEmail } from '../../store/apiDataSlice';
import { GetByPhoneSignUp } from '../../apiCalls/apiCalls';

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

type SignUpData = {
    name: string;
    email: string;
};

const defaultData: SignUpData = {
    name: '',
    email: '',
};

export const SignUpModal = () => {
    const [isMobile, setMobile] = useState(window.innerWidth < 1140);
    const style = isMobile ? styleBoxMobile : styleBox
    const [data, setData] = useState<SignUpData>(defaultData);
    const [phone, setPhone] = useState('');
    const signUp = useSelector((state: any) => state.account.signUp)
    const inUseTag = useSelector((state: any) => state.apiData.inUseTag)
    const dispatch = useDispatch();

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(falseInUseTag())
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

    const onInputChange = <P extends keyof SignUpData>(prop: P, e: SignUpData[P]) => {
        setData({ ...data, [prop]: e })
    };

    const updateMedia = () => {
        setMobile(window.innerWidth < 1140);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const onSubmit = async (event: any) => {
        event.preventDefault(); //delete to keep reload
        dispatch(updateSignUpName(data.name))
        dispatch(updateSignUpEmail(data.email))
        dispatch(updateSignUpPhone(phone))
        GetByPhoneSignUp()
    }

    return (
        <Modal
            open={signUp}
            onClose={() => dispatch(closeSignUp())}
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
                                Sign Up
                            </Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <Button onClick={() => dispatch(closeSignUp())} variant="contained">
                                X
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={12}>
                            <Typography id="modal-title" component="p">
                                By continuing, you agree to create a JBB account and accept our Terms of Service and Privacy Policy.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="modal-name"
                                label='Name'
                                sx={{ mt: 2 }}
                                required
                                value={data.name}
                                onChange={(e) => onInputChange('name', e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="modal-email"
                                label='Email (Optional)'
                                sx={{ mt: 2 }}
                                type='email'
                                value={data.email}
                                onChange={(e) => onInputChange('email', e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={9}>
                            <PhoneInput
                                containerStyle={{ marginTop: '1rem' }}
                                placeholder="Enter phone number *"
                                value={phone}
                                onChange={value => setPhone('+' + String(value))}
                                country="fi"
                                inputProps={{
                                    required: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Snackbar
                                open={inUseTag}
                                autoHideDuration={6000}
                                onClose={() => dispatch(falseInUseTag())}
                                message="Phone Number already in use!"
                                action={action}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type='submit'>
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <VerificationModal/>
            </Box>
        </Modal>
    )
}

export default SignUpModal;

