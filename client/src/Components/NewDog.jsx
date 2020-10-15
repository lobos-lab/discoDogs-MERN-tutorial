import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const NewDog = (props) => {

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  const addDog = (e) => {
    e.preventDefault();
    const newDog = {name, age, breed};
    axios.post("http://localhost:8000/api/dogs", newDog)
      .then(res => {
        console.log(res);
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
            navigate("/");
          }
        })
      .catch(err => console.log(err));
  }

  return(
    <form onSubmit={ addDog }>

      <div className="form-group">
        <label>Name: </label>
        <input type="text" className="form-control" onChange={ e => setName(e.target.value ) } />
        { errors.name ? <p className="text-danger">{errors.name.message}</p> : "" }
      </div>

      <div className="form-group">
        <label>Breed: </label>
        <input type="text" className="form-control" onChange={ e => setBreed(e.target.value ) } />
        { errors.breed ? <p className="text-danger">{errors.breed.message}</p> : "" }
      </div>

      <div className="form-group">
        <label>Age: </label>
        <input type="number" className="form-control" onChange={ e => setAge(e.target.value ) } value={ age } />
        { errors.age ? <p className="text-danger">{errors.age.message}</p> : "" }
      </div>

    <input className="btn btn-outline-primary" type="submit" />
  </form>
  )
}

export default NewDog;