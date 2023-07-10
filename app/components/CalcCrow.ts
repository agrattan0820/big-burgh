import { ResourceItem } from "./Data";

/**
 * Given two coordinates, calculate the distance between them in miles
 * Doesn't account for roads and is in a straight line (As the crow flies)
 */
export function calcCrowInMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  let R = 6371; // km
  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;

  // Convert to miles
  d /= 1.60934;

  return d;
}

/** Converts numeric degrees to radians */
function toRad(value: number) {
  return (value * Math.PI) / 180;
}

export function sortResourceByCrow(
  currentLocationLat: number,
  currentLocationLon: number,
  resource1: ResourceItem,
  resource2: ResourceItem
) {
  const result1 = calcCrowInMiles(
    currentLocationLat,
    currentLocationLon,
    resource1.latitude,
    resource1.longitude
  );
  const result2 = calcCrowInMiles(
    currentLocationLat,
    currentLocationLon,
    resource2.latitude,
    resource2.longitude
  );

  return result1 < result2 ? -1 : result1 > result2 ? 1 : 0;
}
