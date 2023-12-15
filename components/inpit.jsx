// // Input.js

// import { useState } from "react";
// // Input.js

// const Input = ({ imageSrc, state, setState, placeholder, label, onChange, suggestions, handleSelect }) => {
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [selectedSuggestion, setSelectedSuggestion] = useState(null);

//     const handleClick = () => {
//         setShowSuggestions(!showSuggestions);
//     };

//     const handleBlur = () => {
//         setShowSuggestions(false);
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setSelectedSuggestion(suggestion);
//         setShowSuggestions(false);
//         setState(suggestion); // Set input value to the selected suggestion
//         handleSelect(suggestion);
//     };

//     const handleInputChange = (event) => {
//         const value = event.target.value;
//         setState(value);
//         setSelectedSuggestion(value); // Update selectedSuggestion to reflect the current input
//         onChange(event);
//     };

//     return (
//         <div className="flex items-center justify-center gap-2">
//             {imageSrc && <img src={imageSrc} alt="flag" className="w-6 h-6" />}
//             <div className="relative">
//                 <label className="sr-only">{label}</label>
//                 <input
//                     type="text"
//                     value={selectedSuggestion !== null ? selectedSuggestion : state}
//                     placeholder={placeholder}
//                     onChange={handleInputChange}
//                     onClick={handleClick}
//                     onBlur={handleBlur}
//                 />
//                 {showSuggestions && (
//                     <ul className="absolute z-10 w-full bg-white border border-gray-300">
//                         {suggestions.map((suggestion, index) => (
//                             <li
//                                 key={index}
//                                 onClick={() => handleSuggestionClick(suggestion)}
//                                 className="cursor-pointer p-2 hover:bg-gray-200"
//                             >
//                                 {suggestion}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Input;


import React, { useState } from "react";

const Input = ({ imageSrc, state, setState, placeholder, onChange, suggestions, handleSelect }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleToggleSuggestions = () => {
        setShowSuggestions(!showSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setState(suggestion);
        setShowSuggestions(false);
        handleSelect(suggestion);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        setState(value);
        onChange(value);
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {imageSrc && <img src={imageSrc} alt="flag" className="w-12 h-8" />}
            <div className="relative border border-black p-2 rounded-md">
                <input
                    type="text"
                    value={state}
                    required
                    placeholder={placeholder}
                    onChange={(event) => handleInputChange(event)}
                    onFocus={handleToggleSuggestions}
                    className="focus:outline-none"
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="cursor-pointer p-2 hover:bg-gray-200"
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Input;
