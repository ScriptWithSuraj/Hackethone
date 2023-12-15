function haversineDistance(coord1, coord2) {
    const [lat1, lon1] = coord1; 
    const [lat2, lon2] = coord2;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

const coordinateList = [
    {
        locationName: "Nhava Sheva",
        coordinates: [18.9499, 72.9512],
        country: "IN",
        type: "Sea Port",
    },
    {
        locationName: "Cochin Port",
        coordinates: [9.9546, 76.2678],
        country: "IN",
        type: "Sea Port",
    },
    {
        locationName: "indira gandhi international airport",
        coordinates: [28.5567, 77.1006],
        country: "IN",
        type: "Air Port",
    },
    {
        locationName: "Mumbai airport",
        coordinates: [19.0902, 72.8628],
        country: "IN",
        type: "Air Port",
    },
    {
        locationName: "Chennai airport",
        coordinates: [12.9811, 80.1596],
        country: "IN",
        type: "Air Port",
    },
    {
        locationName: "Los Angeles Port",
        coordinates: [34.052235, -118.243683],
        country: "US",
        type: "Sea Port",
    },
    {
        locationName: "NewYork Port",
        coordinates: [40.706322, -74.002640],
        country: "US",
        type: "Sea Port",
    },

    {
        locationName: "Memphis International Airport",
        coordinates: [35.0471, -89.9814],
        country: "US",
        type: "AIR Port",
    },
    {
        locationName: "Los Angeles International Airport",
        coordinates: [33.9438, -118.4091],
        country: "US",
        type: "AIR Port",
    },
];
export function sortObjectsByDistance(referenceCoord) {
    const distances = coordinateList.map((obj, index) => ({
        index,
        distance: haversineDistance(referenceCoord, obj.coordinates),
    }));
    distances.sort((a, b) => a.distance - b.distance);
    const sortedObjects = distances.map((item) => coordinateList[item.index]);
    return sortedObjects;
}

// Example usage:
// const givenCoordinate = [13.025753, 80.239527]; //Chennai teynampet
// const givenCoordinate = [28.6139, 77.2090];//delhi
// const coordinateList = [
//     [18.9499, 72.9512],//maharashtra
//     [9.9546, 76.2678],//kochi kerla
//     [28.5567, 77.1006],//delhi
//     [19.0902, 72.8628],//chatrapati shivaji maharashtra
//     [12.9811, 80.1596],//anna termical chennai
//     [34.052235, -118.243683],//LA police
//     [40.706322, -74.002640],//newyork america
//     [35.0471, -89.9814],//memphis Airport
//     [33.9438, -118.4091]//LA usa
// ];

const givenCoordinate = [13.025753, 80.239527]; //Chennai teynampet
// const givenCoordinate = [28.6139, 77.2090];//delhi






const sortedCoordinates = sortObjectsByDistance(givenCoordinate, coordinateList);
console.log("Given Coordinate:", givenCoordinate);
console.log("Sorted Coordinates by Distance:", sortedCoordinates);



module.exports ={ coordinateList,sortObjectsByDistance }