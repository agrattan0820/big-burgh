import * as Location from "expo-location";
import { useEffect, useState } from "react";

export const useLocation = () => {
  type LocationProps = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };

  const [location, setLocation] = useState<LocationProps | null>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    /** https://docs.expo.dev/versions/latest/sdk/location/ */
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return { text, location, setLocation };
};
