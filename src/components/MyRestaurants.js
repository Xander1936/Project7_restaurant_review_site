import React, { useState, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import restaurantsData from "./restaurantsData.json";
import "./MyRestaurants.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

//import { FilledInput } from '@material-ui/core';

//Styles the Drawer
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 150,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],  
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
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function RecipeReviewCard({ restaurants, setRestaurants }) {
  // All the comment's States
  const classes = useStyles();
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");

  const inputRef = useRef();
  const textareaRef = useRef();

  // Sort the restaurants by rating
  const handleSearch = (e) => {
    let restos = restaurants.filter((res) => {
      if (e.target.value === "") {
        return true;
      }
      if (e.target.value === "1") {
        return res.avg_rating >= 1 && res.avg_rating < 2;
      }
      if (e.target.value === "2") {
        return res.avg_rating >= 2 && res.avg_rating < 3;
      }
      if (e.target.value === "3") {
        return res.avg_rating >= 3 && res.avg_rating < 4;
      }
      if (e.target.value === "4") {
        return res.avg_rating >= 4 && res.avg_rating < 5;
      }
      if (e.target.value === "5") {
        return res.avg_rating === 5;
      }
    });
    console.log(e.target.value);
    setRestaurants(restos);
  };

  // Set and save avg rating 
  //with the new comment from the current restaurant
  const handleSubmit = (e, index) => {
    e.preventDefault();
    let ratingSum = 0;
    let rests = [...restaurants];
    const comment = { user_name: name, comment: body, rating: rating };
    rests[index].reviews.push(comment);
    // Catch the current restaurant index 
    //and sum the ratings to get the average rating
    for( const rev of rests[index].reviews){
      // Get the current rating and add it to the current sum
      ratingSum += parseInt(rev.rating);
    }
    ratingSum = ratingSum/rests[index].reviews.length;
    rests[index].avg_rating = ratingSum;
    setRestaurants(rests);
    setName("");
    setBody("");
    setRating("");
    inputRef.current.focus();
    textareaRef.current.focus();
  };

  // Shows the comment on the current restaurant
  const handleOpenReviews = (index) => {
    let rests = [...restaurants];
    rests[index].isReviewsOpen = !rests[index].isReviewsOpen;
    setRestaurants(rests);
  };

  return (
    <div>
      <div style={{ textAlign: "center", paddingBottom: "10px" }}>
        {/* Filter the restaurants by rating*/}
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-select-native">
            By Rating
          </InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            onChange={handleSearch}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            <option value={1}>One </option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option>
          </NativeSelect>
        </FormControl>
      </div>

      {/*Display the restaurants with their properties on the Drawer*/}
      {restaurants.map((restaurant, index) => (
        <Card className={classes.root} key={index}>
          <CardMedia
            style={{
              width: "200px",
              display: "flex",
              textAlign: "center",
              paddingBottom: "5px",
              paddingTop: "5px",
              paddingRight: "20px",
              paddingLeft: "20px",
            }}
            className={classes.media}
            image={restaurant.restaurant_image}
          />
          <CardContent>
            <h4>{restaurant.restaurant_name}</h4>
            <p>{restaurant.restaurant_description}</p>
          </CardContent>

          <CardActions disableSpacing>
            <h4 style={{ border: "2px", borderRadius: "1px" }}>
              Rating: {restaurant.avg_rating}
            </h4>
            {/* Accordion to open reviews and add new comment*/}
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: restaurant.isReviewsOpen,
              })}
              onClick={() => handleOpenReviews(index)}
              aria-expanded={restaurant.isReviewsOpen}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          {/* Open the Modal for the new review */}
          <Collapse in={restaurant.isReviewsOpen} timeout="auto" unmountOnExit>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, index)}>
                <label>Customer name:</label>
                <input
                  ref={inputRef}
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Comment body:</label>
                <textarea
                  ref={textareaRef}
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Customer rating:</label>
                <input
                  ref={inputRef}
                  type="text"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <button>Add Comment</button>
              </form>
              {/* Shows reviews from the restaurantsData.json on the Drawer*/}
              <div className="posts">
                {restaurant.reviews.map((review, i) => {
                  return (
                    <div key={i} className="post">
                      <h4>{review.user_name}</h4>
                      <p>{review.comment}</p>
                      <h5>Rating: {review.rating}</h5>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}
<Divider />;
// <=>
