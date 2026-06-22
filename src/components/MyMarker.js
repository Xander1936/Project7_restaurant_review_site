import React from "react";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";

/**
 * Custom Marker component for the Leaflet map.
 * Displays either a red marker for the center/current position or a blue marker for restaurants.
 * Clicking a restaurant marker opens a popup with the name, address, and image.
 */
export default function MyMarker(props) {
  // Define custom Leaflet Icons
  const LeafIcon = Icon.extend({
    options: {},
  });

  // Blue icon for restaurants
  const blueIcon = new LeafIcon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    }),
    // Red icon for the map center
    redIcon = new LeafIcon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

  // Ensure position is valid before rendering
  if (!props.position || !Array.isArray(props.position) || props.position.length !== 2) {
    return null;
  }

  return (
    <Marker
      position={props.position}
      icon={props.color === "red" ? redIcon : blueIcon}
    >
      <Popup>
        {props.color === "red" ? (
          <h3>Center</h3>
        ) : (
          <div style={{ minWidth: "150px" }}>
            <h3>{props.restaurant_name || "Unknown Restaurant"}</h3>
            <p>{props.address || "No address provided"}</p>
            {props.image && (
              <img 
                src={props.image} 
                style={{ width: "100%", borderRadius: "4px", marginTop: "5px" }} 
                alt={props.restaurant_name} 
                onError={(e) => { e.target.src = "/placeholder-restaurant.png"; }}
              />
            )}
          </div>
        )}
      </Popup>
    </Marker>
  );
}
// <=>