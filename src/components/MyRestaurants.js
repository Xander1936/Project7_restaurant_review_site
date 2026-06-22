import React, { useState, useRef, useMemo } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import { red, yellow } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import "./MyRestaurants.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) => ({
  root: { maxWidth: 345 },
  media: {
    height: 150,
    width: "100%",
    objectFit: "contain",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: { transform: "rotate(180deg)" },
}));

const BootstrapInput = withStyles(() => ({
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "white",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: "border-color 120ms ease, box-shadow 120ms ease",
  },
}))(InputBase);

// Component to display and manage the list of restaurants in the sidebar
export default function RecipeReviewCard({ restaurants, setRestaurants }) {
  const classes = useStyles();

  // State for adding a new review to a restaurant
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");
  
  // State for filtering restaurants by rating in the sidebar
  const [searchRating, setSearchRating] = useState("");

  const inputRef = useRef();
  const textareaRef = useRef();

  // Memoized filter for restaurants based on their average rating
  const filteredRestaurants = useMemo(() => {
    if (searchRating === "" || searchRating === "0") {
      return restaurants;
    }

    const v = Number(searchRating);
    return restaurants.filter((res) => {
      const avg = Number(res.avg_rating);
      // Rating ranges for filtering
      if (v === 1) return avg >= 1 && avg < 2;
      if (v === 2) return avg >= 2 && avg < 3;
      if (v === 3) return avg >= 3 && avg < 4;
      if (v === 4) return avg >= 4 && avg < 5;
      if (v === 5) return avg === 5;
      return true;
    });
  }, [restaurants, searchRating]);

  // Update searchRating state when user selects a different rating filter
  const handleSearch = (e) => {
    setSearchRating(e.target.value);
  };

  /**
   * Handles submission of a new review for a specific restaurant.
   * Recalculates the average rating for the restaurant.
   */
  const handleSubmit = (e, restaurantId) => {
    e.preventDefault();
    
    // Validation: Require rating and name for reviews
    if (!rating || !name) {
      alert("Please provide a name and a rating.");
      return;
    }

    // Update the restaurants state immutably
    const updatedRestaurants = restaurants.map((r) => {
      if (r.id === restaurantId) {
        const next = { ...r, reviews: [...(r.reviews || [])] };
        const comment = { user_name: name, comment: body, rating: rating };
        next.reviews.push(comment);

        // Recalculate average rating based on all reviews
        let ratingSum = 0;
        for (const rev of next.reviews) {
          ratingSum += Number(rev.rating);
        }
        next.avg_rating = (ratingSum / next.reviews.length).toFixed(1);
        return next;
      }
      return r;
    });

    setRestaurants(updatedRestaurants);
    // Reset form fields after submission
    setName("");
    setRating("");
    setBody("");
  };

  /**
   * Toggles the visibility of reviews for a specific restaurant card.
   * @param {string} restaurantId - The unique ID of the restaurant.
   */
  const handleOpenReviews = (restaurantId) => {
    const updatedRestaurants = restaurants.map((r) => {
      if (r.id === restaurantId) {
        return { ...r, isReviewsOpen: !r.isReviewsOpen };
      }
      return r;
    });

    setRestaurants(updatedRestaurants);
  };

  /**
   * Deletes a restaurant from the list.
   * @param {string} restaurantId - The unique ID of the restaurant to remove.
   */
  const deleteRestaurant = (restaurantId) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      const updatedRestaurants = restaurants.filter((r) => r.id !== restaurantId);
      setRestaurants(updatedRestaurants);
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", paddingBottom: "10px" }}>
        <FormControl>
          <InputLabel htmlFor="demo-customized-select-native">By Rating</InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            defaultValue=""
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

      {filteredRestaurants.map((restaurant) => (
        <Card className={classes.root} key={restaurant.id}>
          <CardMedia className={classes.media} image={restaurant.restaurant_image} />
          <CardContent>
            <h4>{restaurant.restaurant_name}</h4>
            <p style={{ marginBottom: '8px' }}>{restaurant.restaurant_description}</p>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                const avgRating = Number(restaurant.avg_rating);
                if (avgRating >= ratingValue) {
                  return <StarIcon key={i} style={{ color: yellow[700] }} />;
                } else if (avgRating >= ratingValue - 0.5) {
                  return <StarHalfIcon key={i} style={{ color: yellow[700] }} />;
                } else {
                  return <StarBorderIcon key={i} style={{ color: yellow[700] }} />;
                }
              })}
              <h4 style={{ marginLeft: '10px', marginRight: '10px' }}>
                {restaurant.avg_rating}
              </h4>
            </div>

            <CardActions disableSpacing style={{ padding: 0 }}>
              <IconButton
                  aria-label="delete"
                  onClick={() => deleteRestaurant(restaurant.id)}
                  style={{ color: red[500], padding: '8px 8px 8px 0' }}
              >
                <DeleteIcon />
              </IconButton>

              <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: restaurant.isReviewsOpen,
                  })}
                  onClick={() => handleOpenReviews(restaurant.id)}
                  aria-expanded={restaurant.isReviewsOpen}
                  aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </CardContent>
          
          <Collapse in={restaurant.isReviewsOpen} timeout="auto" unmountOnExit>
            <CardContent>
              <form onSubmit={(e) => handleSubmit(e, restaurant.id)}>
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
                />

                <label>Customer rating:</label>
                <input
                  type="text"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />

                <button style={{ marginTop: '10px' }} >Add Comment</button>
              </form>

              <div className="posts">
                {(restaurant.reviews || []).map((review, i) => (
                  <div key={i} className="post">
                    <h4>{review.user_name}</h4>
                    <p>{review.comment}</p>
                    <h5>Rating: {review.rating}</h5>
                  </div>
                ))}
              </div>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </div>
  );
}

<Divider />;