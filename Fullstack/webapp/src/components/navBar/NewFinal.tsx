import { Box, Button, Grid, Modal, TextField,Snackbar, Typography } from '@mui/material'
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { DateTimePicker, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs, { Dayjs } from 'dayjs';
import React, {useEffect, useState } from 'react'


//added in from Jaakko's modal
import { useDispatch, useSelector } from 'react-redux';
import { updateDateTime,
         updateEverythingBagels,
         updatePlainBagels,
         falseOrderOpen,
         falseSnack } from '../../store/orderSlice'



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

type Props = {
    openFinalSubmit: boolean;
    setOpenFinalSubmit: (active: boolean) => void;
}

export const FinalSubmit = () => {
    const [isMobile, setMobile] = React.useState(window.innerWidth<1140);

    // const [value1, setValue1] = React.useState<Dayjs | null>(dayjs('2022-04-07'));
    const [plain, setPlain] = useState(0);
    const [everything, setEverything] = useState(0);

    const style = isMobile ? styleBoxMobile : styleBox
    // const handleOpenFinalOrder = () => setOpenFinalSubmit(true);
    // const handleCloseFinalOrder = () => setOpenFinalSubmit(false);

    //adding in stuff to work like Jaakko's Modals
    // const snack = useSelector((state: any) => state.login.snack)
    const orderOpen = useSelector((state: any) => state.order.orderOpen)
    const dispatch = useDispatch();
    // const snack = useSelector((state: any) => state.order.snack)

    const updateMedia = () => {
        setMobile(window.innerWidth < 1140);
    };


    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const onSubmit = async (event: any) => {
        event.preventDefault(); //delete to keep reload
        //dispatch(updateDateTime(value1))
        //dispatch(updatePlainBagels(plain))
        // GetByPhoneLogin()
    }

    return (
        <Modal
            open={orderOpen}
            onClose={() => dispatch(falseOrderOpen())}
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

                        <Grid item xs={8}>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Please choose the amount for your bagels!
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Button onClick={() => dispatch(falseOrderOpen())} variant="contained">
                                X
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={12}>
                            <Typography id="modal-modal-title" component="p">
                                By continuing, you agree to create a JBB account and accept our Terms of Service and Privacy Policy.
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="DateTimePicker"
                                    value={value1}
                                    onChange={(newValue) => {
                                        setValue1(newValue);
                                        }}
                                />
                            </LocalizationProvider> */}
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                // id="modal-modal-description"
                                label='Number of Plain Bagels'
                                placeholder='0'
                                value={plain}
                                onChange={(e) => setPlain(Number(e.target.value))}                
                                type='number'
                                sx={{ mt: 2 }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                // id="modal-modal-description"
                                label='Number of Everything Bagels'
                                value={everything}
                                onChange={(e) => setEverything(Number(e.target.value))}
                                type='number'
                                sx={{ mt: 2 }}
                                required
                            />
                        </Grid>

                        {/* <Snackbar
                            open={snack}
                            autoHideDuration={6000}
                            onClose={() => dispatch(falseSnack())}
                            message="Account does NOT exist!"
                            action={action}
                        /> */}

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                type='submit'>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    )
}

export default FinalSubmit;