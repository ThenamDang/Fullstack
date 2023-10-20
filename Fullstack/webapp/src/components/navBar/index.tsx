import React, { useEffect } from 'react';
import {
  Nav,
  NavLink,
  NavBtn,
  NavBtnLink
} from './navBarElements';
import { Button, Typography } from '@mui/material';
import MuiDrawer from './muiDrawer';
import LoginModal from './loginModal';
import SignUpModal from './signUpModal'
import FinalSubmit from './NewFinal';
import { useDispatch, useSelector } from "react-redux";
import { openSignUp } from '../../store/accountSlice'
import { falseloggedIN, trueLoginOpen } from '../../store/loginSlice'
import { trueOrderOpen } from '../../store/orderSlice';
import Logo from '../../logo.jpg';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const [isMobile, setMobile] = React.useState(window.innerWidth < 1140);
  const loggedIN = useSelector((state: any) => state.login.loggedIN)
  const userName = useSelector((state: any) => state.login.userName)
  const dispatch = useDispatch();

  //adding Handler to open the order From Oscar Hero
  //changed it to the new order form using MUI for cleaner design
  const [openFinalSubmit, setOpenFinalSubmit] = React.useState(false);
  const handleOpenFinalSubmit = () => setOpenFinalSubmit(true);
  //end of Oscar changes

  const updateMedia = () => {
    setMobile(window.innerWidth < 1140);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  if (!loggedIN) {
    return (
      <>
        {isMobile ? (
          <Nav style={{ paddingLeft: 15, color: 'black' }}>
            <MuiDrawer open={open} setOpen={setOpen} />
          </Nav>
        ) : (
          <Nav style={{background: '#E7E3E2',  }}>
          <NavLink to='/'>
            <img src={Logo} alt='logo' width={'300%'} height={'300%'} />
          </NavLink>
            <NavLink to='/About'>
              ABOUT
            </NavLink>
            <NavLink to='/Contact'>
              CONTACTS
            </NavLink>
            <NavBtn>
              <Button variant="contained" onClick={() => dispatch(trueLoginOpen())}>
                Login
              </Button>
            </NavBtn>
            <NavBtn>
              <Button variant="contained" onClick={() => dispatch(openSignUp())}>
                Sign Up
              </Button>
            </NavBtn>
            {/* adding a button below for the order form Oscar Hero*/}
            <NavBtn>
              <Button variant="contained" onClick={() => dispatch(trueOrderOpen())}>
                OrderNow!
              </Button>
            </NavBtn>
          </Nav>
        )}
        <LoginModal />
        <SignUpModal />
        
        {/* changing my OrderFormModals to MUI under here Oscar Hero */ }
        <FinalSubmit />
      </>
    );
  }
  else {
    return (
      <>
        {isMobile ? (
          <Nav style={{ paddingLeft: 15, color: 'black'  }}>
            <MuiDrawer open={open} setOpen={setOpen} />
          </Nav>
        ) : (
          <Nav style={{background: '#E7E3E2',  }}>
          <NavLink to='/'>
            <img src={Logo} alt='logo' width={'300%'} height={'300%'} />
          </NavLink>
            <NavLink to='/About'>
              ABOUT
            </NavLink>
            <NavLink to='/Contact'>
              CONTACTS
            </NavLink>
            <NavLink to='/'>
              <Typography>
                {userName}
              </Typography>
            </NavLink>
            <NavBtn>
              <Button variant="contained" onClick={() => {dispatch(falseloggedIN())}}>
                Log Out
              </Button>
            </NavBtn>
            {/* adding a button below for the order form Oscar Hero*/}
            <NavBtn>
              <Button variant="contained" onClick={() => dispatch(trueOrderOpen())}>
                OrderNow!
              </Button>
            </NavBtn>
          </Nav>
        )}
        <LoginModal />
        <SignUpModal />

        {/* changing my OrderFormModals to MUI under here Oscar Hero  */}
        <FinalSubmit/>
      </>
    )
  }
};

export default Navbar;