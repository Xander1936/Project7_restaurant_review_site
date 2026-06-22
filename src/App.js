import React, { useEffect, useMemo } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Map from "./components/Map";
import MyRestaurants from "./components/MyRestaurants";
import restaurantsData from "./components/restaurantsData.json";
import axios from "axios";
import { fade } from '@material-ui/core/styles';


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
  title: {
    flexGrow: 1,
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
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
  const [restaurants, setRestaurants] = React.useState(() => {
    const saved = localStorage.getItem("restaurants");
    return saved ? JSON.parse(saved) : restaurantsData;
  });

  useEffect(() => {
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
  }, [restaurants]);
  const [venues, setVenues] = React.useState([]);
  const [position, setPosition] = React.useState([4.05382, 9.73432]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const allRestaurants = useMemo(() => {
    // Return all restaurants if search term is empty
    if (!searchTerm) {
      return restaurants;
    }
    // Case-insensitive filtering by restaurant name
    return restaurants.filter((restaurant) =>
      restaurant.restaurant_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [restaurants, searchTerm]);

  // Fetch venues from Foursquare whenever position changes
  useEffect(() => {
    if (position) {
      getVenues(position);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);
  
  // Initialize location on mount
  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Request browser geolocation
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => showPosition(pos),
        (err) => console.warn("Geolocation error:", err.message)
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  // Update current position state
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
  // Set the Four Square API parameters
  // Using environment variables for security is recommended for production
  let getVenues = (pos) => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?";
    const parameters = {
      client_id: process.env.REACT_APP_FOURSQUARE_CLIENT_ID || "IQJPRMFP1NKKXV4ITTPN50K2RCGLUL5DZ1HDNIPBTRGUBLYL",
      client_secret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET || "WQCQISY2FCGMXDJF1QOHFC2ADUZIGCWZMVSB45CFQVDWIGFA",
      query: "food",
      v: "20210301",
      radius: "2000",
      ll: `${pos[0]},${pos[1]}`, // Dynamic position based on map center or user location
      categoryId: "4d4b7105d754a06374d81259",
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then((response) => {
        // Validate response structure to prevent crashes
        if (!response.data || !response.data.response || !response.data.response.venues) {
          console.warn("Unexpected API response structure:", response.data);
          return;
        }

        setVenues(response.data.response.venues);
        let rests = [...restaurants];
        const excludedNames = [
          "Food Village Restaurant",
          "Star Food",
          "Cameroun Chine Rotisserie fast food",
          "loic food",
          "Go food",
        ];

        response.data.response.venues.forEach((venue) => {
          // Skip excluded venues or duplicates
          if (excludedNames.includes(venue.name)) return;
          if (rests.some(r => r.restaurant_name === venue.name)) return;

          // Map Foursquare venue to our restaurant object structure
          let newRestaurant = {
            id: venue.id || Math.random().toString(36).substr(2, 9),
            position: [venue.location.lat, venue.location.lng],
            restaurant_name: venue.name,
            restaurant_description: venue.categories && venue.categories.length > 0 
              ? venue.categories[0].name 
              : "Restaurant",
            restaurant_image: "/placeholder-restaurant.png", // Default image
            address: venue.location.address || "No address provided",
            avg_rating: 5,
            reviews: [],
            isReviewsOpen: false,
          };
          rests.push(newRestaurant);
        });
        setRestaurants(rests);
      })
      .catch((error) => {
        console.error("Foursquare API Error:", error);
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
          <Typography variant="h6" noWrap className={classes.title}>
            Restaurants Of Ange Raphael In Douala.
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <IconButton
                size="small"
                color="inherit"
                onClick={() => setSearchTerm("")}
              >
                <ClearIcon />
              </IconButton>
            )}
          </div>
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
          restaurants={allRestaurants}
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
        <Map restaurants={allRestaurants} setRestaurants={setRestaurants} />
      </main>
    </div>
  );
}
// <=>
