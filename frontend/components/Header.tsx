import React from "react";

const Header = () => {
  const storeName = "Triforsys Store"; // Replace with your store name

  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-white text-2xl font-bold">{storeName}</h1>
      </div>
    </header>
  );
};

export default Header;
