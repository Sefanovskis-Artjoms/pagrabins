"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { CAFE_LOCATION } from "@/content/restaurant";
import "leaflet/dist/leaflet.css";
import "./VisitMap.css";

const DARK_TILE_URL =
  "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const pinIcon = L.divIcon({
  className: "visit__map-pin-wrapper",
  html: `<span class="visit__map-pin" aria-hidden="true"></span>`,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
});

export function VisitMap({ ariaLabel }: { ariaLabel: string }) {
  return (
    <div className="visit__map">
      <MapContainer
        center={[CAFE_LOCATION.lat, CAFE_LOCATION.lng]}
        zoom={CAFE_LOCATION.zoom}
        scrollWheelZoom={false}
        className="visit__map-container"
        aria-label={ariaLabel}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={DARK_TILE_URL}
        />
        <Marker position={[CAFE_LOCATION.lat, CAFE_LOCATION.lng]} icon={pinIcon} />
      </MapContainer>
    </div>
  );
}
