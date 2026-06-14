import React from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

export default function MyMarker(props) {
  //  Create the Icon on initialization
  const LeafIcon = Icon.extend({
    options: {},
  });
  // Create the blue and red Icon for the map
  const blueIcon = new LeafIcon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    redIcon = new LeafIcon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

  return (
    <Marker
      position={props.position}
      icon={props.color === "red" ? redIcon : blueIcon}
    >
      <Popup>
        <h3>{props.restaurant_name}</h3>
        <p>{props.address}</p>
        <img src={props.color === "blue" ? props.image : props.image} style={{width: "100%"}} alt="restaurant_image" />
      </Popup>
    </Marker>
  );
}
// <=>