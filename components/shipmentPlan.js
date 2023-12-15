import React, { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "./nav";

const Shipment = () => {
  const filters = ["Fastest", "Cheapest", "Greenest"];
  const [activeFilter, setActiveFilter] = useState("Fastest");
  const [shipmentData, setShipmentData] = useState([]);
  const [filteredShipments, setFilteredShipments] = useState([]);
  const [isActive, setIsActive] = useState();

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const getShipmentData = async () => {
      const apiUrl = "http://localhost:5000/get/quote/10000";

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setShipmentData(data.data);
        setFilteredShipments(
          data.data.filter((shipment) => shipment.type === activeFilter)
        );
      } catch (error) {
        console.error("Error fetching shipment data:", error);
      }
    };

    getShipmentData();
  }, [activeFilter]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setFilteredShipments(
      shipmentData.filter((shipment) => shipment.type === filter)
    );
  };

  return (
    <>
      <Nav shipmentData={shipmentData[0]} />
      <div className="w-full p-4 flex">
        <h3 className="font-bold text-lg ml-2">Shipping Routes</h3>
      </div>
      <div className="flex mt-8 ml-5 items-center">
        {filters.map((filter, index) => (
          <div
            key={index}
            className={` px-4 py-2 mr-2 cursor-pointer text-lg flex items-center gap-2 ${
              activeFilter === filter && filter === "Fastest"
                ? " text-blue-700 underline"
                : activeFilter === filter && filter === "Cheapest"
                ? "text-yellow-500 underline"
                : activeFilter === filter && filter === "Greenest"
                ? "text-green-700 underline"
                : ""
            }
              `}
            onClick={() => handleFilterClick(filter)}
          >
            {filter === "Fastest" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
                fill={`${activeFilter === filter ? "blue" : ""}`}
              >
                <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM256 416c35.3 0 64-28.7 64-64c0-17.4-6.9-33.1-18.1-44.6L366 161.7c5.3-12.1-.2-26.3-12.3-31.6s-26.3 .2-31.6 12.3L257.9 288c-.6 0-1.3 0-1.9 0c-35.3 0-64 28.7-64 64s28.7 64 64 64zM176 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM96 288a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm352-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
              </svg>
            )}
            {filter === "Cheapest" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="18"
                viewBox="0 0 576 512"
                fill={`${activeFilter === filter ? "yellow" : ""}`}
              >
                <path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
              </svg>
            )}
            {filter === "Greenest" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="16"
                viewBox="0 0 512 512"
                fill={`${activeFilter === filter ? "green" : ""}`}
              >
                <path d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.3 5.4c-25.9 5.9-49.9 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z" />
              </svg>
            )}
            {filter}
          </div>
        ))}
      </div>
      <div className="max-h-[900px] overflow-y-auto mb-5">
        <div className="flex flex-col items-start m-4">
          <div className="flex flex-wrap flex-col w-full">
            {filteredShipments.map((card, index) => (
              <div
                key={index}
                className={`w-[45%] h-[100%] border rounded-md m-2 flex flex-col p-3  mt-10 gap-3 ${
                  isActive === index
                    ? "border-green-600 border-4"
                    : "border-gray-300"
                }`}
                onClick={() => setIsActive(index)}
              >
                <div className="flex items-start gap-3">
                  <button className="bg-[#d00cf7] rounded-md h-8 w-24">
                    {card.type}
                  </button>
                  {/* <button className="bg-[#f7c10c] rounded-md h-8 w-24">
                    Robust
                  </button> */}
                </div>
                <div className="flex gap-2">
                  {card.shipmentMode.toLowerCase() === "sea" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="18"
                      viewBox="0 0 576 512"
                    >
                      <path d="M192 32c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32V64h48c26.5 0 48 21.5 48 48V240l44.4 14.8c23.1 7.7 29.5 37.5 11.5 53.9l-101 92.6c-16.2 9.4-34.7 15.1-50.9 15.1c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-16.2 0-34.7-5.7-50.9-15.1l-101-92.6c-18-16.5-11.6-46.2 11.5-53.9L96 240V112c0-26.5 21.5-48 48-48h48V32zM160 218.7l107.8-35.9c13.1-4.4 27.3-4.4 40.5 0L416 218.7V128H160v90.7zM306.5 421.9C329 437.4 356.5 448 384 448c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 501.7 417 512 384 512c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 437.2 165.1 448 192 448c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="18"
                      viewBox="0 0 576 512"
                    >
                      <path d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z" />
                    </svg>
                  )}
                  <p>
                    {card.shipmentMode} | Delivery on{" "}
                    <span className="font-semibold">
                      {formatDate(card.expectedDeliveryDate)}
                    </span>{" "}
                    | Est.{" "}
                    <span className="font-semibold">
                      {card.daysInTransit} days
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <b>{card.pickupLocationName}</b> ---
                  {/* ... (other content) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {card.destinationLocationName} ---
                  <Image
                    src="/images/blimp.png"
                    alt="Blimp"
                    width={30}
                    height={30}
                  />
                  ---
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  {card.destination}
                </div>
                <button className="bg-white flex items-start ml-7 border-2 border-purple-900 w-fit p-3">
                  Show detailed plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipment;
