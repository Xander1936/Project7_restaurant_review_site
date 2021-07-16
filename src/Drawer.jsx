import React from "react";
import {
    Drawer as MUIDrawer,
    IconButton,
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

// Styling the SideBar
const useStyles = makeStyles({
    drawer: {
        width: "160px"
    }
});
// The SideBar function
const Drawer = () => {
    const classes = useStyles();
        const theme = useTheme();
        const [open, setOpen] = React.useState(false);
        const handleDrawerOpen = () => {
            console.log(handleDrawerOpen);
            setOpen(true);
          };
        
          /* const handleDrawerClose = () => {
            setOpen(false);
          }; */
    return (
        <MUIDrawer>
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}>
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Restaurants Of Ange Raphael In Douala.
                </Typography>
            </Toolbar>
        </MUIDrawer>
    );
};

export default Drawer;
// <=>