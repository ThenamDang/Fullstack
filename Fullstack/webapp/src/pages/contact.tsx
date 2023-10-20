import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './contact.css'
import emailjs from '@emailjs/browser';
import MailIcon from '../images/mail';

function Contact() {
  const [isMobile, setMobile] = useState(window.innerWidth < 1140);

  const updateMedia = () => {
    setMobile(window.innerWidth < 1140);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    emailjs.sendForm('service_q6q8o1g', 'template_zzp4zl5', e.target, 'wn0xo64EytEdXardL')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.target.reset()
  };

  return (
    <Box className='container'>
      <Box className='title'>
        <Typography variant={isMobile ? 'h4' : 'h2'} sx={{fontWeight: 'bold'}}>
          Contact Us
        </Typography>
        <Typography variant={isMobile ? 'subtitle1' : 'h5'}>
          Any questions or remarks? Just write us a message!
        </Typography>
      </Box>
      <Box className='mailContainer'>
        {!isMobile &&
          <Box>
            <MailIcon className='mail'
            />
          </Box>
        }
        <Box className='form'>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField className='fields' sx={{ fieldset: { border: 'none' } }}
                  id='name-basic'
                  label='Name'
                  name='name'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField className='fields' sx={{ fieldset: { border: 'none' } }}
                  id='email-basic'
                  label='Email'
                  name='email'
                />
              </Grid>

              <Grid item xs={12}>
                <TextField className='fields' sx={{ fieldset: { border: 'none' } }}
                  id='comment-basic'
                  label='Comments'
                  multiline
                  rows={4}
                  name='message'
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  className='submit'
                  variant="contained"
                  type='submit'>
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        {isMobile &&
          <Box>
            <MailIcon
              className='mailMobile' />
          </Box>
        }
      </Box>
    </Box>
  );
};

export default Contact;