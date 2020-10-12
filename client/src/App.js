import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";


function App() {

  const [dogs, setDogs] = useState([]);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");

  const fetchDogs = () => {
    axios.get("http://localhost:8000/api/dogs")
      .then(res => {
        console.log(res);
        setDogs(res.data);
      })
      .catch(err => console.log(err));
  }

  const addDog = (e) => {
    e.preventDefault();
    const newDog = {name, age, breed};
    axios.post("http://localhost:8000/api/dogs", newDog)
      .then(res => {
        console.log(res);
        fetchDogs();
        setName("");
        setBreed("");
        setAge("");
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <div className="App">
      <div className="container"></div>

        <h1>Disco Dogs</h1>

        <div>
          {dogs.map( dog => 
            <div key={dog.id}>
              <h4>Name: { dog.name }</h4>
              <p>Breed: { dog.breed } </p>
              <p>Age: { dog.age }</p>
            </div>
            )}
        </div>

        <form onSubmit={ addDog }>
          <p>Name:  <input type="text" onChange={ e => setName(e.target.value) } value={ name } /> </p>
          <p>Breed: <input type="text" onChange={ e => setBreed(e.target.value)} value={ breed } /> </p>
          <p>Age:   <input type="number" onChange={ e => setAge(e.target.value) } value={ age }/> </p>
          <input type="submit" />
        </form>

    </div>
  );
}

export default App;
