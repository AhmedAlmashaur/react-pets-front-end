// src/App.jsx

import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import * as petService from './services/petService';

import PetList from './components/PetList/PetList';
import PetForm from './components/PetForm/PetForm';
import PetDetail from './components/PetDetail/PetDetail';

const App = () => {
  const [pets, setPets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  /*------------------FETCH FUNCTIONALITY------------------*/
  //useEffect to fetch pets from the server
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const fetchedPets = await petService.index();
        // Don't forget to pass the error object to the new Error
        if (fetchedPets.err) {
          throw new Error(fetchedPets.err);
        }
        setPets(fetchedPets);
      } catch (err) {
        // Log the error object
        console.log(err);
      }
    };
    fetchPets();
  }, []);

  /*------------------UI FUNCTIONALITY------------------*/
  //handleSelect function to set the selected pet
  const handleSelect = (pet) => {
    setSelected(pet);
    setIsFormOpen(false);
  };

  //handleFormView function to open the form
  const handleFormView = (pet) => {
    if (!pet._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };


  /*------------------CRUD FUNCTIONALITY------------------*/

  //CREATE - handleAddPet function to add a new pet
  const handleAddPet = async (formData) => {
    try {
      // Remove _id and createdAt before sending to the backend
      const { _id, createdAt, ...cleanFormData } = formData;

      const newPet = await petService.create(cleanFormData);

      if (newPet.err) {
        throw new Error(newPet.err);
      }

      setPets([newPet, ...pets]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };


  //UPDATE - handleUpdatePet function to update a pet
  const handleUpdatePet = async (formData, petId) => {
    try {
      const updatedPet = await petService.update(formData, petId);

      // handle potential errors
      if (updatedPet.err) {
        throw new Error(updatedPet.err);
      }

      const updatedPetList = pets.map((pet) => (
        pet._id !== updatedPet._id ? pet : updatedPet
      ));
      setPets(updatedPetList);
      setSelected(updatedPet);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  //DELETE - handleDeletePet function to delete a pet
  const handleDeletePet = async () => {
    try {
      const deletedPet = await petService.destroy(selected._id);

      if (deletedPet.err) {
        throw new Error(deletedPet.err);
      }

      const updatedPets = pets.filter((pet) => pet._id !== selected._id);
      setPets(updatedPets);
      setSelected(null);
    } catch (err) {
      // Log the error to the console
      console.log(err);
    }
  };


  return (
    <>
      <PetList
        pets={pets}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {isFormOpen ? (
        <PetForm
          handleAddPet={handleAddPet}
          selected={selected}
          handleUpdatePet={handleUpdatePet}
        />
      ) : (
        <PetDetail selected={selected} handleFormView={handleFormView} />
      )}
    </>
  );
};

export default App;
