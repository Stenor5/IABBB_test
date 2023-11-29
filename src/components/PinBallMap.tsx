import React, { useMemo, useRef } from "react";
import Map, { MapRef, Marker } from "react-map-gl";
import { ClosestLocationResponse } from "../types";
import MarkerItem from "./Marker";
import WebMercatorViewport from "viewport-mercator-project";

type Props = {
  lat: number;
  lon: number;
  pinballData: ClosestLocationResponse;
};

function PinBallMap({ lat, lon, pinballData }: Props) {
  const mapRef = useRef<MapRef>(null);

  const bounds = useMemo(() => {
    let cornersLongLat: [[number, number], [number, number]] = [
      [lon, lat],
      [parseFloat(pinballData.lon), parseFloat(pinballData.lat)],
    ];
    const viewport = new WebMercatorViewport({ width: 500, height: 500 });
    const bound = viewport.fitBounds(cornersLongLat, { padding: 10 });
    return bound;
  }, [pinballData, lat, lon]);
  return (
    <div className="w-full aspect-video border border-gray-500">
      <Map
        reuseMaps
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_KEY}
        initialViewState={{
          longitude: bounds.longitude,
          latitude: bounds.latitude,
          zoom: bounds.zoom,
        }}
        doubleClickZoom={true}
        scrollZoom={true}
        touchZoomRotate={false}
        keyboard={false}
        dragRotate={false}
        style={{ width: "100%", height: "100%", outline: "none" }}
        mapStyle={"mapbox://styles/bohusbiogas/clcthxwdi000v15p3v6h29can"}
      >
        <Marker
          longitude={lon}
          latitude={lat}
          anchor={"right"}
          style={{ cursor: "pointer", zIndex: 2 }}
          offset={[15, 15]}
        >
          <MarkerItem name={"My location"} color="red" zIndex="100" />
        </Marker>
        <Marker
          longitude={parseFloat(pinballData.lon)}
          latitude={parseFloat(pinballData.lat)}
          anchor={"right"}
          style={{ cursor: "pointer", zIndex: 2 }}
          offset={[15, 15]}
        >
          <MarkerItem name={pinballData.name} color="blue" zIndex="100" />
        </Marker>
      </Map>
    </div>
  );
}

export default PinBallMap;
