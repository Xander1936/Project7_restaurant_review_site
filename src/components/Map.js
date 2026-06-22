import React, { useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, MapConsumer } from "react-leaflet";
import L from "leaflet";
import MyMarker from "./MyMarker";
import "./Map.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

//Icon propertie's view for the map
const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});


export default function Map({ restaurants, setRestaurants }) {
  // All the restaurant's State
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [Newposition, setNewPosition] = useState([4.05382, 9.73432]);
  const [NewRating, setNewRating] = useState("");
  
  const initialPosition = [4.05382, 9.73432];
  

  const TextFieldRef = useRef();

  // Open the Modal on the Map
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the Modal on the Map
  const handleClose = () => {
    setOpen(false);
  };

  // Function to Save the new restaurant on the map
  // and the Drawer with the correct properties
  const handleSaveRestaurant = (e) => {
    e.preventDefault();
    // Basic validation: ensure name and address are present
    if (name && address) {
      const newRestaurant = {
        id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
        position: Newposition,
        restaurant_name: name,
        restaurant_description: description || "New Restaurant",
        restaurant_image: image || "/placeholder-restaurant.png",
        address: address,
        avg_rating: NewRating || 5,
        reviews: [],
        isReviewsOpen: false,
      };
      
      // Update restaurants state with the new entry
      setRestaurants(prev => [...prev, newRestaurant]);
      
      // Reset form fields
      setName("");
      setAddress("");
      setDescription("");
      setImage("");
      setNewRating("");
      
      if (TextFieldRef.current) {
        TextFieldRef.current.focus();
      }
    }
    setOpen(false);
  };
  // Get Location function: catch the current position coordinates for the modal
  
  
  const markers = useMemo(() => {
    return restaurants.map((r) => (
      <MyMarker
        key={r.id + r.restaurant_name}
        position={r.position}
        restaurant_name={r.restaurant_name}
        address={r.address}
        image={r.restaurant_image}
      />
    ));
  }, [restaurants]);

  return (
    <div>
      {/*Modal to enter and save the informations of the new restaurant
       on the new marker on the Leaflet Map*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add a New Restaurant"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Fill in the details below to add a new restaurant to the map and your list.
          </DialogContentText>
          <div>
            <TextField
              fullWidth
              margin="dense"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Restaurant Name"
            />
          </div>
          <div>
            <TextField
              fullWidth
              margin="dense"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              label="Image URL"
            />
          </div>
          <div>
            <TextField
              fullWidth
              margin="dense"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              multiline
              rows={2}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              fullWidth
              margin="dense"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              multiline
              rows={2}
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              fullWidth
              margin="dense"
              value={NewRating}
              onChange={(e) => setNewRating(e.target.value)}
              label="Initial Rating (1-5)"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveRestaurant} color="primary" autoFocus>
            Save and close
          </Button>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
      {/* Leaflet Map*/}
      <MapContainer
        className="map-container"
        center={initialPosition}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MyMarker
          key={"center"}
          position={initialPosition}
          restaurant_name={"Center"}
          address={""}
          image={""}
          color={"red"}
        />
        {markers}
        {/*Click event to catch and set the new coordinates to the new restaurant on the Map*/}
        <MapConsumer>
          {(map) => {
            // console.log("map center:", map.getCenter());
            map.on("click", function (e) {
              const { lat, lng } = e.latlng;
              //let restTitle = prompt('enter a title');
              setNewPosition([lat, lng]);
              handleClickOpen();
              // L.marker([lat, lng], { icon }).addTo(map);
            });
            return null;
          }}
        </MapConsumer>
      </MapContainer>
    </div>
  );
}

// <=>
