import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useClosestLocation } from "./hooks/useClosestLocation";
import PinballCard from "./components/PinballCard";
import PinBallMap from "./components/PinBallMap";
import Spinner from "./components/Icons/Spinner";
import InfoAlert from "./components/Alerts/InfoAlert";

function App() {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [invalidLat, setInvalidLat] = useState(false);
  const [invalidLon, setInvalidLon] = useState(false);

  const { errorMsg, isLoading, getClosestLocation, closestLocations } = useClosestLocation();
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
    <div className="container mx-auto px-2">
      {errorMsg.length !== 0 && <InfoAlert msg={errorMsg} />}
      <h1 className="text-3xl font-bold text-center py-10">Pinball Locations Near Me</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
            Latitude
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ${
              invalidLat ? "focus:border-red-400" : "focus:border-blue-400"
            }  focus:shadow-outline`}
            id="latitude"
            type="number"
            min={-90}
            max={90}
            step={0.1}
            onChange={(e) => {
              if (parseFloat(e.target.value) > 90 || parseFloat(e.target.value) < -90) {
                setInvalidLat(true);
                setTimeout(function () {
                  setInvalidLat(false);
                }, 3000);
              } else {
                setLatitude(parseFloat(e.target.value || "0"));
              }
            }}
            value={latitude || ""}
            placeholder="0.0000"
          />
          {invalidLat && (
            <p className="text-red-500 text-xs italic absolute">Latitude value must be between -90 and 90.</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
            Longitude
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              invalidLon ? "focus:border-red-400" : "focus:border-blue-400"
            }`}
            id="longitude"
            type="number"
            min={-180}
            max={180}
            onChange={(e) => {
              if (parseFloat(e.target.value) > 180 || parseFloat(e.target.value) < -180) {
                setInvalidLon(true);
                setTimeout(function () {
                  setInvalidLon(false);
                }, 3000);
              } else {
                setLongitude(parseFloat(e.target.value || "0"));
              }
            }}
            value={longitude || ""}
            placeholder="0.0000"
          />
          {invalidLon && (
            <p className="text-red-500 text-xs italic absolute">
              Longitude value must be between -180 and 180.
            </p>
          )}
        </div>
        <div className="flex justify-start mx-auto md:mx-0 items-end mb-4 gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={getLocation}
          >
            Near Me
          </button>

          <button
            className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSearch}
          >
            {isLoading && <Spinner />}
            {isLoading ? "Searching" : "Search"}
          </button>
        </div>
      </div>
      {closestLocations && (
        <div className="md:flex md:items-start my-4 gap-4">
          <PinballCard pinballData={closestLocations} />
          <PinBallMap lat={latitude} lon={longitude} pinballData={closestLocations} />
        </div>
      )}
    </div>
  );
}

export default App;
