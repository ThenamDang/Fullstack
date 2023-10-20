import { Modal, Box, Grid, Button, TextField, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VerifyCode } from "../../apiCalls/apiCalls";
import { closeVerification } from '../../store/accountSlice'
import { falseCodeValidModal, updateSignUpCode } from '../../store/apiDataSlice';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    borderRadius: 5,
    textAlign: 'center',
};

export const VerificationModal = () => {
    const verification = useSelector((state: any) => state.account.verification)
    const [code, setCode] = useState('')
    const codeValidModal = useSelector((state: any) => state.apiData.codeValidModal)
    const dispatch = useDispatch();

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault(); //delete to keep reload
        dispatch(updateSignUpCode(code))
        VerifyCode();
    }

    return (
        <React.Fragment>
            <Modal
                hideBackdrop
                open={verification}
                onClose={() => dispatch(closeVerification())}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <Grid container spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item>
                            <h2 id="child-modal-title">Enter Code</h2>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => dispatch(closeVerification())} variant="contained">X</Button>
                        </Grid>
                    </Grid>

                    <form onSubmit={onSubmit}>
                        <TextField
                            id="modal-verification"
                            label='Verification'
                            sx={{ mt: 1, mb: 2 }}
                            required
                            type='number'
                            value={code}
                            onChange={handleChange}>
                        </TextField>

                        <Snackbar
                            open={codeValidModal}
                            autoHideDuration={6000}
                            onClose={() => dispatch(falseCodeValidModal())}
                        >
                            <Alert severity="error"
                                sx={{ width: '100%' }}
                                onClose={() => dispatch(falseCodeValidModal())}
                            >
                                Wrong Code!
                            </Alert>
                        </Snackbar>
                        <Button
                            variant="contained"
                            type='submit'>
                            Verify
                        </Button>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    )
}

export default VerificationModal;