import React from "react";

const PinballCard = ({ pinballData }: any) => {
  return (
    <div className="max-w-sm bg-white border border-gray-300 p-4 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-2">{pinballData.name}</h2>
      <p className="text-gray-600 mb-2">
        {pinballData.city}, {pinballData.country}
      </p>
      <p className="text-gray-700">{pinballData.street}</p>
      {pinballData.website && (
        <p className="text-blue-500 mt-4">
          <a href={pinballData.website} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </p>
      )}
    </div>
  );
};

export default PinballCard;
