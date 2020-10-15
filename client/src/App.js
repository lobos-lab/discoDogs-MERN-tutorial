import React, { useState, useEffect } from 'react';
import './App.css';
import {Router, Link} from "@reach/router";
import axios from "axios";
import NewDog from "./Components/NewDog";
import AllDogs from "./Components/AllDogs";
import EditDog from "./Components/EditDog";


function App() {

  const [active, setActive] = useState("/");
  const [edit, setEdit] = useState(0);
  
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});
  const [changes, setChanges] = useState(false);

  const updateDog = (e) => {
    e.preventDefault();
    const newDog = {name, age, breed};
    axios.put(`http://localhost:8000/api/dogs/${edit}`, newDog)
      .then(res => {
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          // *TODO: something instead of: navigate("/");
          setChanges(!changes);
        }
      })
      .catch(err => console.log(err));
  }

  const adoptDog = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/dogs/${edit}`)
      .then(res => {
          // *TODO: something instead of: navigate("/");
          setChanges(!changes);
      })
      .catch(err => console.log(err));
  }

  useEffect( () => {
    axios.get(`http://localhost:8000/api/dogs/${edit}`)
      .then(res => {
        setName(res.data.name);
        setBreed(res.data.breed)
        setAge(res.data.age)
        console.log(res);
      })
      .catch(err => console.log(err));
  }, [edit])

  return (
    <div className="container">

      <div className="jumbotron">
        <h1>Disco Dogs</h1>
      </div>

      <ul className="nav nav-tabs mb-5">
        <li className="nav-item" onClick={ e => setActive("/")}>
          <Link className={ active === "/" ? "nav-link active" : "nav-link" } to="/">Home</Link>
        </li>

        <li className="nav-item" onClick={ e => setActive("/new")}>
        < Link className={ active === "/new" ? "nav-link active" : "nav-link" } to="/new">New Dog</Link>
        </li>
      </ul>

      <Router>
        <AllDogs path="/" edit={ _id => setEdit(_id) } changes={changes}/>
        <NewDog path="/new" />
        <EditDog path="/edit/:_id" />
      </Router>

      <div className={ edit ? "my-modal is-active" : "my-modal"}>

        <form onSubmit={ updateDog }>
          <div className="card">
            <div className="card-header bg-dark text-white">
            Edit Dog
            </div>

            <div className="card-body">
                <p>Name:  <input type="text" onChange={ e => setName(e.target.value) } value={ name } /> </p>
                { errors.name ? <p>{errors.name.message}</p> : "" }
                <p>Breed: <input type="text" onChange={ e => setBreed(e.target.value)} value={ breed } /> </p>
                { errors.breed ? <p>{errors.breed.message}</p> : ""}
                <p>Age:   <input type="number" onChange={ e => setAge(e.target.value) } value={ age } /> </p>
                { errors.age ? <p>{errors.age.message}</p> : ""}
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-outline-primary">Update Info</button>
              <button className="btn btn-outline-dark float-right" onClick={ e => setEdit(0) }>Cancel</button>
              <button className="btn btn-outline-danger" onClick={adoptDog}>Adopt This Dog </button>              
            </div>
          </div>
        </form>

      </div>

    </div>
  );
}

export default App;
