export const extractLocations = (events) => {
  let extractLocations = events.map((event) => event.location);
  let locations = [...new Set(extractLocations)]; // why do we need the spread operator?
  return locations;
}