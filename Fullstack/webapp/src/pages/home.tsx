import { useEffect, useState } from 'react';
import './home.css';
import bagelFront from '../images/bagel.jpg';
import bagelFront1 from '../images/bagel.svg';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Button, Snackbar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useSelector, useDispatch } from "react-redux";
import { closeAccount } from '../store/accountSlice'
import { GetMenu } from '../apiCalls/apiCalls'

function Home() {
    const data = useSelector((state: any) => state.apiData.menuData)
    const [isMobile, setMobile] = useState(window.innerWidth < 1140);
    const account = useSelector((state: any) => state.account.account)
    const [lang, setLang] = useState(true) //english default true. false == finnish
    const dispatch = useDispatch();

    //Get bagel data 
    useEffect(() => {
        GetMenu()
    }, [])

    const updateMedia = () => {
        setMobile(window.innerWidth < 1140);
    };

    useEffect(() => {
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    });

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const MenuItem = data.map((elem: any) => {
        let english = elem.ingredientsEnglish.join(', ')
        let finnish = elem.ingredientsFinnish.join(', ')

        return (
            <Grid item xs={6} key={elem._id}>
                <Card sx={{ width: 375, backgroundColor: '#a6f2ff' }}>
                    <CardContent className='bagelContent'>
                        <Typography variant="h5">
                            {elem.name} Bagel
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {elem.price}€
                        </Typography>
                    </CardContent>
                </Card>
                <Accordion disableGutters sx={{ width: 375 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography>Ingredients</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {lang ? english : finnish}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        )
    })

    return (
        <>
            <Box className="App">
                <Box className='frontImage'>
                    <img src={bagelFront1} alt="Bagel" className='pic' />
                </Box>
                <Box className='bg'>
                    <Box className='callToAction'>
                        <Typography variant='h5' className='callToActionText'>ORDER NOW TO GET 10% OFF YOUR FIRST BAGEL ORDER!</Typography>
                    </Box>
                    <Box className='lang'>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setLang(false)}
                            sx={{ marginRight: '5px' }}>
                            FIN
                        </Button>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => setLang(true)}>
                            ENG
                        </Button>
                    </Box>
                    <Box className='menu'>
                        <Grid container
                            spacing={isMobile ? 2 : 5}
                            direction={isMobile ? 'column' : 'row'}
                            justifyContent="center"
                            alignItems="center"
                        >
                            {MenuItem}
                        </Grid>
                    </Box>
                </Box>
                <Snackbar
                    open={account}
                    autoHideDuration={6000}
                    onClose={() => dispatch(closeAccount())}
                >
                    <Alert severity="success"
                        sx={{ width: '100%' }}
                        onClose={() => dispatch(closeAccount())}
                    >
                        Account Created!
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default Home;
