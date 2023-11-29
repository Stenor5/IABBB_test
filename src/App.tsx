import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useClosestLocation } from "./hooks/useClosestLocation";
import PinballCard from "./components/PinballCard";
import PinBallMap from "./components/PinBallMap";

function App() {
  const [latitude, setLatitude] = useState<number>(0.0);
  const [longitude, setLongitude] = useState<number>(0.0);

  const { isLoading, getClosestLocation, closestLocations } = useClosestLocation();
  console.log(closestLocations);
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  };

  const handleSearch = async () => {
    await getClosestLocation(latitude, longitude);
  };

  return (
    <div className="container mx-auto my-5">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
            Latitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="latitude"
            type="text"
            onChange={(e) => {
              setLatitude(Number(e.target.value));
            }}
            value={latitude}
            placeholder="0.0000"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
            Longitude
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="longitude"
            type="text"
            onChange={(e) => {
              setLongitude(Number(e.target.value));
            }}
            value={longitude}
            placeholder="0.0000"
          />
        </div>
        <div className="flex justify-start items-end mb-4 gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getLocation}
          >
            Near Me
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {closestLocations && (
        <>
          <PinballCard pinballData={closestLocations} />
          <PinBallMap lat={latitude} lon={longitude} pinballData={closestLocations} />
        </>
      )}
    </div>
  );
}

export default App;
