import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import DogDetails from './components/DogDetails';

function App() {
  const [dogs, setDogs] = useState({
    data: null,
    isLoading: true
  });

  useEffect(() => {
    async function fetchDogs() {
      try {
        const response = await axios.get("http://localhost:5001/dogs");
        setDogs({
          data: response.data,
          isLoading: false
        });
      } catch (error) {
        if (error.response) {
          console.log("Error response from server:", error.response.data);
        } else if (error.request) {
          console.log("No response received from server:", error.request);
        } else {
          console.error("Error setting up the request:", error.message);
        }
        setDogs({
          data: null,
          isLoading: false
        });
      }
    }
    

    fetchDogs();
  }, []);

  if (dogs.isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <BrowserRouter>
        <Nav dogs={dogs.data} />
        <div className="container">
          <Routes>
            <Route
              path="/dogs"
              element={<DogList dogs={dogs.data} />}
            />

            <Route
              path="/dogs/:name"
              element={<FilterDogDetails dogs={dogs.data} />}
            />

            <Route
              path="/*"
              element={<Navigate to="/dogs" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

function DogList({ dogs }) {
  return (
    <div className="DogList">
      <div className="row mt-4">
        <div className="col">
          <h2 className="text-center">
            HELLO. WE HAVE DOGS. CLICK ON THEM FOR MORE INFO.
          </h2>
        </div>
      </div>
      <div className="row">
        {dogs.map(dog => (
          <div className="col-3 text-center" key={dog.name}>
            <img src={`/${dog.src}.jpg`} alt={dog.name} />
            <h3 className="mt-3">
              <Link to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function FilterDogDetails({ dogs }) {
  const { name } = useParams();

  if (name) {
    const currentDog = dogs.find(
      dog => dog.name.toLowerCase() === name.toLowerCase()
    );
    return <DogDetails dog={currentDog} />;
  }

  return null;
}

export default App;
