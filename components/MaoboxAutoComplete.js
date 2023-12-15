// origin: { type: String },
// originLatLong: { type: String },
// destination: { type: String },
// destinationLatLong: { type: String },

// pickupDate: { type: Date, required: true },

// shipmentPlan: { type: mongoose.Schema.Types.Mixed },
// expectedDeliveryDate: { type: String },
// shipmentMode: { type: String }, //Air sea
// type: { type: String },   //cheap,fast,economical

// // pickupLocation:{type:String},//latitude,longitude
// // pickupLocationName:{type:String},//name

// // destinationLocation:{type:String},
// // destinationLocationName:{type:String},//name

// // nearestSeaPortLocation:{type:String},
// // nearestAirPortLocation:{type:String},


// originAirPortLocation: { type: String },
// originAirPortName: { type: String },

// destinationAirPortLocation: { type: String },
// destinationAirPortName: { type: String },

// shipmentType: { type: String },
// daysInTransit: { type: Number }

import axios from 'axios';
import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Input from './inpit';
import DateSelector from './datePicker';
import { sortObjectsByDistance } from './sortCordinate';

const MapboxAutoComplete = () => {
    const [searchQueryInputOne, setSearchQueryInputOne] = useState('');
    const [searchQueryInPutTwo, setSearchQueryInPutTwo] = useState('');
    const [date, setDate] = useState(null);
    const [suggestionsInPutOne, setSuggestionsInPutOne] = useState([]);
    const [suggestionsInPutTwo, setSuggestionsInPutTwo] = useState([]);
    const [isOriginPickupRequired, setIsOriginPickupRequired] = useState(true);
    const [isDestinationDeliveryRequired, setIsDestinationDeliveryRequired] = useState(true);
    const [preferredMode, setPreferredMode] = useState('BOTH');
    // const [suggestionsInPutOne, setSuggestionsInPutOne] = useState([]);
    // const [suggestionsInPutTwo, setSuggestionsInPutTwo] = useState([]);
    const [selectedLocationInputOne, setSelectedLocationInputOne] = useState(null);
    const [selectedLocationInputTwo, setSelectedLocationInputTwo] = useState(null);
    const handleChange = async (value, inputType) => {
        if (value.trim() !== '') {
            try {
                const apiKey = 'pk.eyJ1Ijoic3VyYWpzaW5naGJpc2h0IiwiYSI6ImNscTN1ajZmMDAwYWYyaWxvemJkeXh4bXcifQ.GVY_1nPPxmbhnCl_O_OnMg';
                if (inputType === 'inputOne') {
                const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?country=IN&access_token=${apiKey}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
        // console.log(data);
                    const suggestions = data.features.map((feature) => ({
                        name: feature.place_name,
                        latitude: feature.center[1],
                        longitude: feature.center[0],
                    }));
                    setSuggestionsInPutOne(suggestions);
                } else if (inputType === 'inputTwo') {
                const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?country=US&access_token=${apiKey}`;
                const response = await fetch(apiUrl);
                const data = await response.json();
                    const suggestions = data.features.map((feature) => ({
                        name: feature.place_name,
                        latitude: feature.center[1],
                        longitude: feature.center[0],
                    }));
                    setSuggestionsInPutTwo(suggestions);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            if (inputType === 'inputOne') {
                setSuggestionsInPutOne([]);
            } else if (inputType === 'inputTwo') {
                setSuggestionsInPutTwo([]);
            }
        }
    };

    const handleSelect = (selectedValue, inputType) => {

        // Find the selected location by name
        const selectedLocation = suggestionsInPutOne.find((location) => location.name === selectedValue)
            || suggestionsInPutTwo.find((location) => location.name === selectedValue);

        if (selectedLocation) {
            if (inputType === 'inputOne') {
                setSearchQueryInputOne(selectedValue);
                setSelectedLocationInputOne(selectedLocation);
                setSuggestionsInPutOne([]);
            } else if (inputType === 'inputTwo') {
                setSearchQueryInPutTwo(selectedValue);
                setSelectedLocationInputTwo(selectedLocation);
                setSuggestionsInPutTwo([]);
            }
        }
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('Origin:', searchQueryInputOne);
        console.log('Destination:', searchQueryInPutTwo);
        console.log('Date:', date);
        console.log('Date:', preferredMode);
        console.log('Date:', isDestinationDeliveryRequired);
        console.log('Date:', isOriginPickupRequired);
        console.log('Date:', selectedLocationInputTwo);
        console.log('Date:', selectedLocationInputOne);
function fetchShipmentType(){
    let shipmentType = ""

    if (!containsPortSubstring(searchQueryInputOne) && !containsPortSubstring(searchQueryInPutTwo)){
        shipmentType="Door To Door"
    }
    if (!containsPortSubstring(searchQueryInputOne) && containsPortSubstring(searchQueryInPutTwo)){
        shipmentType="Door To Port"
    }
    if (containsPortSubstring(searchQueryInputOne) && containsPortSubstring(searchQueryInPutTwo)){
        shipmentType="Port To Port"
    }
    if (containsPortSubstring(searchQueryInputOne) && !containsPortSubstring(searchQueryInPutTwo)){
        shipmentType="Port To Door"
    }

    return shipmentType
}
        function containsPortSubstring(str) {
            const lowercaseStr = str.toLowerCase();
            const lowercaseSubstring = "port";

            return lowercaseStr.includes(lowercaseSubstring);
        }


    //     {
    //         locationName: "indira gandhi international airport",
    //             coordinates: [28.5567, 77.1006],
    //                 country: "IN",
    //                     type: "Air Port",
    // },
        let nearestPort = sortObjectsByDistance([selectedLocationInputOne?.latitude,selectedLocationInputOne?.longitude])
        let firstSeaPortInIndia = null;
        let firstAirportInIndia = null;
        let firstSeaPortInUS = null;
        let firstAirportInUS = null;


        for (let i = 0; i < nearestPort.length; i++) {
            const location = nearestPort[i];
            if (location.country === "IN") {
                if (location.type === "Sea Port" && !firstSeaPortInIndia) {
                    firstSeaPortInIndia = location;
                } else if (location.type === "Air Port" && !firstAirportInIndia) {
                    firstAirportInIndia = location;
                }
            }
        }
        for (let i = 0; i < nearestPort.length; i++) {
            const location = nearestPort[i];
            console.log(location);
            if (location.country === "US") {

                if (location.type === "Sea Port" && !firstSeaPortInUS) {
                    firstSeaPortInUS = location;
                } else if (location.type === "AIR Port" && !firstAirportInUS) {
                    firstAirportInUS = location;
                }
            }
        }



        function containsAirPortSubstring(str) {
            const lowercaseStr = str.toLowerCase();
            const lowercaseSubstring = "airport";

            return lowercaseStr.includes(lowercaseSubstring);
        }

        let modeOfTrans = containsAirPortSubstring(searchQueryInputOne)
        const apiUrl = 'http://localhost:5000/create/quote';
        console.log(firstAirportInUS?.locationName,"firstSeaPortInIndia?.locationName");
    let data=    {
        origin: searchQueryInputOne,
        originLatLong: `${selectedLocationInputOne?.latitude},${selectedLocationInputOne?.longitude}` ,
        destination: searchQueryInPutTwo,
        destinationLatLong: `${selectedLocationInputTwo?.latitude},${selectedLocationInputTwo?.longitude}`,
        pickupDate: date,
        shipmentType: fetchShipmentType(),
        shipmentMode: modeOfTrans===true?"Air":"Sea",
        originAirPortName: firstAirportInIndia?.locationName,
        originAirPortLocation: `${firstAirportInIndia?.coordinates[0]},${firstAirportInIndia?.coordinates[1]}`,
        originSeaPortName: firstSeaPortInIndia?.locationName,
        originSeaPortLocation: `${firstSeaPortInIndia?.coordinates[0]},${firstSeaPortInIndia?.coordinates[1]}`,
       
         destinationAirPortName: firstAirportInUS?.locationName,
        destinationAirPortLocation: `${firstAirportInUS?.coordinates[0]},${firstAirportInUS?.coordinates[1]}` ,
      
        destinationSeaPortName: firstSeaPortInUS?.locationName,
        destinationSeaPortLocation: `${firstSeaPortInUS?.coordinates[0]},${firstSeaPortInUS?.coordinates[1]}`,
        }
        axios.post(apiUrl, data)
            .then(response => {
                // Handle the successful response here
                console.log('POST request successful:', response.data);
            })
            .catch(error => {
                // Handle the error here
                console.error('Error making POST request:', error);
            });

    };
    return (
        <div className="flex flex-col items-center justify-center bg-panel-header-background h-screen w-screen text-black">
            <h2 className="text-4xl">Where are you shipping to?</h2>
            <div className="flex justify-center items-center gap-6 mt-6 w-1/2 mx-auto border ">
                <div className="flex flex-col items-center justify-center mt-5 gap-6 ">
                    <Input
                        imageSrc="/images/India_flag_icon.png"
                        state={searchQueryInputOne}
                        setState={setSearchQueryInputOne}
                        placeholder="Enter Origin"
                        onChange={(value) => handleChange(value, 'inputOne')}
                        suggestions={suggestionsInPutOne.map((location) => location.name)}
                        handleSelect={(value) => handleSelect(value, 'inputOne')}
                    />
                    <Input
                        imageSrc="/images/Flag_of_the_United_States.png"
                        state={searchQueryInPutTwo}
                        setState={setSearchQueryInPutTwo}
                        placeholder="Enter Destination"
                        onChange={(value) => handleChange(value, 'inputTwo')}
                        suggestions={suggestionsInPutTwo.map((location) => location.name)}
                        handleSelect={(value) => handleSelect(value, 'inputTwo')}
                    />
                    <DateSelector date={date} setDate={setDate} />

            

               <button
                        className="bg-#414BB2 text-white px-4 py-2 rounded-md flex items-center text-start focus:outline-none h-10 rounded-md px-5 w-[83%] py-4 border border-black ml-14 mt-6"
                        type="submit"
                        style={{ backgroundColor: "#414BB2" }}
                        onClick={handleSubmit}
                    >
                        Show me shipping routes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MapboxAutoComplete;




