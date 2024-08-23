import React, { useState } from "react";

function PlantCard({ plant }) {
  const [isInStock, setIsInStock] = useState(plant.inStock);

  const toggleStockStatus = async () => {
    try {
      const response = await fetch(`http://localhost:6001/plants/${plant.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inStock: !isInStock }),
      });

      if (!response.ok) throw new Error("Failed to update stock status");

      const updatedPlant = await response.json();
      setIsInStock(updatedPlant.inStock);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button onClick={toggleStockStatus} className={isInStock ? "primary" : ""}>
        {isInStock ? "In Stock" : "Sold Out"}
      </button>
    </li>
  );
}

export default PlantCard;
