import React, { useState, useRef } from "react";
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
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl:
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
});

// Render Marker on the Leaflet Map
function renderMarkers(venues) {
  return (
    <div>
      {venues.map((r) => {
        return (
          <MyMarker
            key={Date.now() + r.restaurant_name}
            position={r.position}
            restaurant_name={r.restaurant_name}
            address={r.address}
            image={r.restaurant_image}
          />
        );
      })}
    </div>
  );
}

export default function Map({ restaurants, setRestaurants }) {
  // All the restaurant's State
  const [position, setPosition] = useState([4.05382, 9.73432]);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [Newposition, setNewPosition] = useState([4.05382, 9.73432]);
  const [NewRating, setNewRating] = useState();
  

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
  //and the Drawer with the correct properties
  const handleSaveRestaurant = (e) => {
    e.preventDefault();
    if (name && address) {
      let rests = [...restaurants];
      let newRestaurant = {
        id: "",
        position: Newposition,
        restaurant_name: name,
        restaurant_description: description,
        restaurant_image: image,
        address: address,
        avg_rating: NewRating,
        reviews: [],
        isReviewsOpen: false,
      };
      rests.push(newRestaurant);
      setRestaurants(rests);
      TextFieldRef.current.focus();
    }
    setOpen(false);
  };
  // Get Location function: catch the current position coordinates for the modal
  
  
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
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
          <div>
            <TextField
              ref={TextFieldRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
            />
          </div>
          <div>
            <TextField
              ref={TextFieldRef}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              label="image link"
            />
          </div>
          <div>
            <TextField
              ref={TextFieldRef}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Address"
              multiline
              rows={4}
              defaultValue="Default Value"
              variant="filled"
            />
          </div>
          <div>
            <TextField
              ref={TextFieldRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              multiline
              rows={2}
              defaultValue="Default Value"
              variant="filled"
            />
          </div>
          <div>
            <TextField
              ref={TextFieldRef}
              value={NewRating}
              onChange={(e) => setNewRating(e.target.value)}
              label="NewRating"
              multiline
              rows={4}
              defaultValue={NewRating}
              variant="filled"
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
        center={position}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MyMarker
          key={Date.now()}
          position={position}
          restaurant_name={"Center"}
          address={""}
          image={""}
          color={"red"}
        />
        {renderMarkers(restaurants)}
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
