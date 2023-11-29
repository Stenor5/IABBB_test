import axios from "axios";

export const APIServer = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getClosestLocationByLatAndLon = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  const { data } = await APIServer.get(`/locations/closest_by_lat_lon?lat=${latitude}&lon=${longitude}`);
  return data;
};
