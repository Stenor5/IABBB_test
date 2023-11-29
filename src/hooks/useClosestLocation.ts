import { useCallback, useState } from "react";
import { getClosestLocationByLatAndLon } from "../utils/api";
import { ClosestLocationResponse } from "../types";

export const useClosestLocation = () => {
  const [closestLocations, setClosestLocations] = useState<ClosestLocationResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const getClosestLocation = useCallback(async (latitude: number, longitude: number) => {
    setIsLoading(true);
    try {
      const data = await getClosestLocationByLatAndLon(latitude, longitude);
      if (data.errors) {
        window.alert(data.errors);
      }
      setClosestLocations(data?.location);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    closestLocations,
    getClosestLocation,
  };
};
