import React, { useEffect, useState } from 'react';
import NewPlantForm from './NewPlantForm';
import PlantList from './PlantList';
import Search from './Search';

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then(response => response.json())
      .then(data => {
        setPlants(data);
        setFilteredPlants(data);
      });
  }, []);

  const handleSubmitNewPlant = (newPlant) => {
    setPlants(prevPlants => [...prevPlants, newPlant]);
    setFilteredPlants(prevFilteredPlants => [...prevFilteredPlants, newPlant]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = plants.filter(plant =>
      plant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlants(filtered);
  };

  useEffect(() => {
    const filtered = plants.filter(plant =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlants(filtered);
  }, [searchQuery]);

  return (
    <main>
      <NewPlantForm handleSubmitNewPlant={handleSubmitNewPlant} />
      <Search handleSearch={handleSearch} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
