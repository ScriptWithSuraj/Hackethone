import Head from "next/head";
import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as turf from "@turf/turf";
import axios from "axios";
import { useShipment } from "../context/shipmentContext";
const MapComponent = () => {
  const [Map, setMap] = useState();
  const [pageIsMounted, setPageIsMounted] = useState(false);
  const [seaRoutes, setSeaRoutes] = useState([]);
  const { shipmentData } = useShipment();
  const [locations, setLocations] = useState([
    {
      name: "Mumbai",
      coordinates: [72.9396, 18.9482],
    },
    {
      name: "New York",
      coordinates: [-74.006, 40.7128],
    },
  ]);
  const convertToCoordinatesArray = (locationString, name) => {
    const [lat, lon] = locationString.split(",").map(Number);
    return { name, coordinates: [lon, lat] };
  };

  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3VyYWpzaW5naGJpc2h0IiwiYSI6ImNscTN1ajZmMDAwYWYyaWxvemJkeXh4bXcifQ.GVY_1nPPxmbhnCl_O_OnMg";

  useEffect(() => {
    if (shipmentData.length > 0) {
      // Assuming the shipmentData contains the required location information
      const source = convertToCoordinatesArray(
        shipmentData[0].nearestAirPortLocation,
        "source"
      );
      const destination = convertToCoordinatesArray(
        shipmentData[0].destinationLocation,
        "destination"
      );
      setLocations([source, destination]);
    }
  }, [shipmentData]);

  useEffect(() => {
    console.log(locations, "the context");
    setPageIsMounted(true);
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/light-v10",
      center: [80.2785, 13.0878], // Chennai coordinates
      zoom: 3.5,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");
    setMap(map);
  }, []);

  const addLocationMarkers = (locations) => {
    locations.forEach((location) => {
      const el = document.createElement("div");
      el.className = "location-marker";

      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(location.coordinates)
        .addTo(Map);

      el.addEventListener("click", () => {
        // Handle marker click if needed
      });
    });
  };

  const addInterconnectedRoutes = async () => {
    if (!Map) return;

    Map.on("load", async () => {
      // Fetch sea routes data
      const seaRoutesData = await fetchSeaRoutes();

      if (seaRoutesData) {
        setSeaRoutes(seaRoutesData);

        // Call the function to add location markers
        addLocationMarkers(locations);
        // Call the function to add interconnected routes
        addRoutes(locations, seaRoutesData);
      }
    });
  };

  const addRoutes = (locations, seaRoutesData) => {
    const bounds = new mapboxgl.LngLatBounds();

    // Add air route
    locations.forEach((location, i) => {
      const el = document.createElement("div");
      el.className = "location-marker";

      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(location.coordinates)
        .addTo(Map);

      if (i < locations.length - 1) {
        const start = location.coordinates;
        const end = locations[i + 1].coordinates;

        // Use turf.bezierSpline to create a curved line between two points
        const curvedLine = turf.bezierSpline({
          type: "LineString",
          coordinates: [start, [start[0], end[1]], end],
        });

        if (curvedLine && curvedLine.geometry.coordinates.length > 1) {
          const sourceId = `route-${i}`;
          const existingSource = Map.getSource(sourceId);

          if (existingSource) {
            Map.removeSource(sourceId);
          }

          Map.addSource(sourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: curvedLine.geometry,
            },
          });

          Map.addLayer({
            id: sourceId,
            type: "line",
            source: sourceId,
            layout: { "line-join": "round", "line-cap": "round" },
            paint: {
              "line-color": "red",
              "line-dasharray": [2, 2],
              "line-width": 2,
            },
          });

          bounds.extend(curvedLine.geometry.coordinates);
        } else {
          console.error(
            `Error creating curved line between locations ${i} and ${i + 1}`
          );
        }
      } else {
        bounds.extend(location.coordinates);
      }
    });

    // Add sea routes
    seaRoutesData.forEach((route, i) => {
      const seaLine = turf.lineString(route.geometry.coordinates);

      if (seaLine && seaLine.geometry.coordinates.length > 1) {
        const sourceId = `sea-route-${i}`;
        const existingSource = Map.getSource(sourceId);

        if (existingSource) {
          Map.removeSource(sourceId);
        }

        Map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: seaLine.geometry,
          },
        });

        Map.addLayer({
          id: sourceId,
          type: "line",
          source: sourceId,
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "green",
            "line-dasharray": [2, 2],
            "line-width": 2,
          },
        });

        bounds.extend(seaLine.geometry.coordinates);
      } else {
        console.error(`Error creating sea route ${i}`);
      }
    });

    Map.fitBounds(bounds, { padding: 50, maxZoom: 2 });
  };

  const fetchSeaRoutes = async () => {
    // const apiKey = "ozuEYeKOY34bXrI7bYsua85pprlTrX6M4lsTil88";
    // const chennaiCoordinates = "80.2785,13.0878";
    // const newYorkCoordinates = "-74.006,40.7128";

    // const apiUrl = `https://api.searoutes.com/route/v2/sea/${chennaiCoordinates}%3B${newYorkCoordinates}?continuousCoordinates=true&allowIceAreas=false&avoidHRA=false&avoidSeca=false`;
    const data = require("../components/data.JSON");
    // try {
    //   const response = await axios.get(apiUrl, {
    //     headers: {
    //       Accept: "application/json",
    //       "x-api-key": apiKey,
    //     },
    //   });
    //   return response.data.features;
    // } catch (error) {
    //   console.error("Error fetching sea routes:", error);
    //   return null;
    // }
    return data[0].features;
  };

  useEffect(() => {
    // console.log(shipmentData, "werfhkjfhs");
    if (pageIsMounted) {
      addInterconnectedRoutes();
    }
  }, [pageIsMounted]);

  return (
    <div>
      <div id="map" className="map"></div>
    </div>
  );
};

export default MapComponent;
