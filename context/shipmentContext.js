// shipmentContext.js
import { createContext, useContext, useState, useEffect } from "react";

const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {
  const [shipmentData, setShipmentData] = useState([]);

  const fetchShipmentData = async () => {
    console.log("Fetching shipment data...");
    try {
      const response = await fetch("http://localhost:5000/get/quote/10000", {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched shipment data:", data);
      setShipmentData(data.data);
    } catch (error) {
      console.error("Error fetching shipment data:", error);
    }
  };

  useEffect(() => {
    console.log("ShipmentProvider mounted, fetching data...");
    // Fetch shipment data when the component mounts
    fetchShipmentData();
  }, []); // Empty dependency array ensures it runs only once on mount

  useEffect(() => {
    console.log("Shipment data changed:", shipmentData);
    // Additional logic you might want to perform when shipmentData changes
  }, [shipmentData]); // Include shipmentData in the dependency array

  return (
    <ShipmentContext.Provider value={{ shipmentData, fetchShipmentData }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = () => {
  return useContext(ShipmentContext);
};
