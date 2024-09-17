// Utility function to calculate a random point within a radius
export const getRandomLocation = (lat: number, lng: number, radius: number) => {
  const radiusInKm = radius; // Radius in kilometers
  const radiusInDegrees = radiusInKm / 111; // Convert to degrees (approx 1 degree is ~111km)

  const u = Math.random();
  const v = Math.random();

  // Generate random angle and distance
  const w = radiusInDegrees * Math.sqrt(u);
  const t = 2 * Math.PI * v;

  // Adjust x and y distances based on the random angle
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  // Calculate the new latitude
  const newLat = lat + y;

  // Calculate the new longitude, adjusting for the shrinking east-west distances
  const newLng = lng + x / Math.cos(lat * (Math.PI / 180));

  return { lat: newLat, lng: newLng };
};
