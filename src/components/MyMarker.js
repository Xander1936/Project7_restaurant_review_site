import React from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

export default function MyMarker(props) {
  //  Create the Icon
  const LeafIcon = Icon.extend({
    options: {},
  });

  const blueIcon = new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
      shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
    }),
    redIcon =  new LeafIcon({
      iconUrl:
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000&chf=a,s,ee00FFFF",
    });

  return (
    <Marker
      position={props.position}
      icon={props.color === "red" ? redIcon : blueIcon}
    >
      <Popup>
        <h3>{props.restaurant_name}</h3>
        <p>{props.address}</p>
        <img src={props.restaurant_image} alt="" />
      </Popup>
    </Marker>
  );
}
// <=>
