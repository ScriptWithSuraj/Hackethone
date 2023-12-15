import React, { useState } from "react";

const Nav = ({ shipmentData }) => {
  const [isCopied, setIsCopied] = useState(false);
  const formatDate = (isoDateString) => {
    console.log("this is date", isoDateString);
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };
  const handleCopyToClipboard = () => {
    // Get the current URL
    const currentURL = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(currentURL)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => console.error("Unable to copy to clipboard", err));
  };
  return (
    <div className="w-full p-4 flex flex-col">
      <div className="flex gap-96">
        <h3 className="text-xl font-bold"> Showing shipping routes for</h3>
        <div className="flex gap-9">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
          <div>
            <button onClick={handleCopyToClipboard}>
              {!isCopied ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
              ) : (
                <p className="font-bold text-base text-green-600">
                  Copied to clipboard!
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-2 gap-4  p-3 font-black">
        <input
          className="border border-black text-center"
          disabled
          value={shipmentData?.pickupLocationName}
        ></input>
        {"=>"}
        <input
          className="border border-black text-center"
          disabled
          value={shipmentData?.destinationLocationName}
        ></input>
        <label htmlFor="cargoDate">Cargo Ready Date:</label>
        <input
          type="text"
          disabled
          name="cargoDate"
          className="border border-black text-center"
          value={formatDate(shipmentData?.pickupDate)}
        ></input>
      </div>
    </div>
  );
};

export default Nav;
