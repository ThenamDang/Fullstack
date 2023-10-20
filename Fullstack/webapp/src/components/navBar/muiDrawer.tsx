import { useState } from 'react'
import { Drawer, IconButton, Divider, List, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'
import { NavBurger } from './navBarElements';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import EmailIcon from '@mui/icons-material/Email';
import LoginIcon from '@mui/icons-material/Login';
import StraightIcon from '@mui/icons-material/Straight';
import CloseIcon from '@mui/icons-material/Close';
import BadgeIcon from '@mui/icons-material/Badge';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import { useDispatch, useSelector } from "react-redux";
import { openSignUp } from '../../store/accountSlice'
import { falseloggedIN } from '../../store/loginSlice'
import { trueOrderOpen } from '../../store/orderSlice';


type Props = {
    open: boolean;
    setOpen: (active: boolean) => void;
}

export const MuiDrawer = ({ open, setOpen }: Props) => {
    const handleOpen = () => setOpen(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const loggedIN = useSelector((state: any) => state.login.loggedIN)
    const userName = useSelector((state: any) => state.login.userName)
    const dispatch = useDispatch();

    if (!loggedIN) {
        return (
            <>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} >
                    <NavBurger>
                        <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                        <List disablePadding >
                            <ListItemButton href="/" >
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton href="/About">
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton href="/Contact">
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={handleOpen}>
                                <ListItemIcon>
                                    <LoginIcon />
                                </ListItemIcon>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => dispatch(openSignUp())}>
                                <ListItemIcon>
                                    <StraightIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sign Up" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => dispatch(trueOrderOpen())}>
                                <ListItemIcon>
                                    <RoomServiceIcon />
                                </ListItemIcon>
                                <ListItemText primary="OrderNow" />
                            </ListItemButton>
                        </List>
                    </NavBurger>
                </Drawer>
            </>
        )
    } else {
        return (
            <>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor='left' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} >
                    <NavBurger>
                        <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={() => setIsDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                        <List disablePadding >
                            <ListItemButton href="/" >
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton href="/About">
                                <ListItemIcon>
                                    <InfoIcon />
                                </ListItemIcon>
                                <ListItemText primary="About" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton href="/Contact">
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Contact" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton>
                                <ListItemIcon>
                                    <BadgeIcon />
                                </ListItemIcon>
                                <ListItemText primary={userName} />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => dispatch(falseloggedIN())}>
                                <ListItemIcon>
                                    <StraightIcon />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => dispatch(trueOrderOpen())}>
                                <ListItemIcon>
                                    <RoomServiceIcon />
                                </ListItemIcon>
                                <ListItemText primary="OrderNow" />
                            </ListItemButton>
                        </List>
                    </NavBurger>
                </Drawer>
            </>
        )
    }
}

export default MuiDrawer;