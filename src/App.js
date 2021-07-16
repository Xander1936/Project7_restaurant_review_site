import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Map from "./components/Map";
import MyRestaurants from "./components/MyRestaurants";
import restaurantsData from "./components/restaurantsData.json";
import axios from "axios";

//import Fade from "@material-ui/core/Fade";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [restaurants, setRestaurants] = React.useState(restaurantsData);
  const [venues, setVenues] = React.useState([]);
  const [position, setPosition] = React.useState([4.05382, 9.73432]);

  //Get the venues filtering by position from the FourSquare Api
  useEffect(() => {
    getVenues(position);
  }, [position]);
  
  // Give the position of the center marker
  useEffect(() => {
    getLocation();
  }, []);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    setPosition([position.coords.latitude, position.coords.longitude]);
  }
  //Open the Drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  //Close the Drawer
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //Set the Four Square API parameters
  let getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?";
    const parameters = {
      client_id: "IQJPRMFP1NKKXV4ITTPN50K2RCGLUL5DZ1HDNIPBTRGUBLYL",
      client_secret: "WQCQISY2FCGMXDJF1QOHFC2ADUZIGCWZMVSB45CFQVDWIGFA",
      query: "food",
      near: "Douala",
      v: "20210301",
      radius: "2000",
      ll: "4.05382,9.73432",
      categoryId: "4d4b7105d754a06374d81259",
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then((response) => {
        setVenues(response.data.response.venues);
        let rests = [...restaurants];
        for (let venue of response.data.response.venues) {
          console.log("Shazam***", venue);
          let newRestaurant = {
            id: "",
            position: [venue.location.lat, venue.location.lng],
            restaurant_name: venue.name,
            restaurant_description: venue.categories[0].pluralName,
            restaurant_image:
              "http://localhost:3000/placeholder-restaurant.png",
            address: venue.location.address,
            avg_rating: 5,
            reviews: [],
            isReviewsOpen: false,
          };
          rests.push(newRestaurant);
        }
        setRestaurants(rests);
        //console.log('Here we go ! ...', response.data.response.venues)
      })
      .catch((error) => {
        console.log("ERROR|| " + error);
      });
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Restaurants Of Ange Raphael In Douala.
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <MyRestaurants
          restaurants={restaurants}
          setRestaurants={setRestaurants}
        />
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Map restaurants={restaurants} setRestaurants={setRestaurants} />
      </main>
    </div>
  );
}
// <=>
