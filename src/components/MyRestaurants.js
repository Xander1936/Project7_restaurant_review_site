import React, { useState, useRef, useEffect } from "react";
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

export default function RecipeReviewCard({ restaurants, setRestaurants }) {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [body, setBody] = useState("");

  const inputRef = useRef();
  const textareaRef = useRef();

  // NEW: keep original unfiltered list
  const [originalRestaurants, setOriginalRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    // whenever parent provides a new restaurants array, reset both lists
    setOriginalRestaurants(restaurants);
    setFilteredRestaurants(restaurants);
  }, [restaurants]);

  const handleSearch = (e) => {
    const value = e.target.value; // "", "1".."5"

    if (value === "") {
      setFilteredRestaurants(originalRestaurants);
      return;
    }

    const v = Number(value);

    const restos = originalRestaurants.filter((res) => {
      const avg = Number(res.avg_rating);

      if (v === 1) return avg >= 1 && avg < 2;
      if (v === 2) return avg >= 2 && avg < 3;
      if (v === 3) return avg >= 3 && avg < 4;
      if (v === 4) return avg >= 4 && avg < 5;
      if (v === 5) return avg === 5;

      return true;
    });

    setFilteredRestaurants(restos);
  };

  // Update comment / average in BOTH lists
  const handleSubmit = (e, filteredIndex) => {
    e.preventDefault();

    // Map filtered index back to original by matching object reference
    const targetRestaurant = filteredRestaurants[filteredIndex];
    if (!targetRestaurant) return;

    const updatedOriginal = originalRestaurants.map((r) => {
      if (r === targetRestaurant) {
        const next = { ...r, reviews: [...(r.reviews || [])] };
        const comment = { user_name: name, comment: body, rating: rating };
        next.reviews.push(comment);

        let ratingSum = 0;
        for (const rev of next.reviews) {
          ratingSum += parseInt(rev.rating, 10);
        }
        next.avg_rating = (ratingSum / next.reviews.length).toFixed(1);

        return next;
      }
      return r;
    });

    setOriginalRestaurants(updatedOriginal);
    setRestaurants(updatedOriginal);

    // Re-apply current filter by using current select value
    const selectEl = document.getElementById("demo-customized-select-native");
    const currentValue = selectEl ? selectEl.value : "";
    if (currentValue === "") {
      setFilteredRestaurants(updatedOriginal);
    } else {
      const v = Number(currentValue);
      const restos = updatedOriginal.filter((res) => {
        const avg = Number(res.avg_rating);
        if (v === 1) return avg >= 1 && avg < 2;
        if (v === 2) return avg >= 2 && avg < 3;
        if (v === 3) return avg >= 3 && avg < 4;
        if (v === 4) return avg >= 4 && avg < 5;
        if (v === 5) return avg === 5;
        return true;
      });
      setFilteredRestaurants(restos);
    }

    setName("");
    setBody("");
    setRating("");
    inputRef.current?.focus();
    textareaRef.current?.focus();
  };

  const handleOpenReviews = (filteredIndex) => {
    const targetRestaurant = filteredRestaurants[filteredIndex];
    if (!targetRestaurant) return;

    const updatedOriginal = originalRestaurants.map((r) => {
      if (r === targetRestaurant) {
        return { ...r, isReviewsOpen: !r.isReviewsOpen };
      }
      return r;
    });

    setOriginalRestaurants(updatedOriginal);
    setRestaurants(updatedOriginal);

    // Keep filtered list in sync (re-derive based on current filter)
    setFilteredRestaurants((prevFiltered) => {
      // easiest: just filter again using current select value
      const selectEl = document.getElementById("demo-customized-select-native");
      const currentValue = selectEl ? selectEl.value : "";
      if (currentValue === "") return updatedOriginal;

      const v = Number(currentValue);
      return updatedOriginal.filter((res) => {
        const avg = Number(res.avg_rating);
        if (v === 1) return avg >= 1 && avg < 2;
        if (v === 2) return avg >= 2 && avg < 3;
        if (v === 3) return avg >= 3 && avg < 4;
        if (v === 4) return avg >= 4 && avg < 5;
        if (v === 5) return avg === 5;
        return true;
      });
    });
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

      {filteredRestaurants.map((restaurant, index) => (
        <Card className={classes.root} key={index}>
          <CardMedia className={classes.media} image={restaurant.restaurant_image} />
          <CardContent>
            <h4>{restaurant.restaurant_name}</h4>
            <p>{restaurant.restaurant_description}</p>
          </CardContent>

          <CardActions disableSpacing>
            <h4 style={{ border: "2px", borderRadius: "1px" }}>
              Rating: {restaurant.avg_rating}
            </h4>

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
                />

                <label>Customer rating:</label>
                <input
                  type="text"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />

                <button>Add Comment</button>
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