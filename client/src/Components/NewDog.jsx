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
    <p>Name:  <input type="text" onChange={ e => setName(e.target.value) }  /> </p>
    {
      errors.name ?
      <p>{errors.name.message}</p>:
      ""
    }
    <p>Breed: <input type="text" onChange={ e => setBreed(e.target.value)}  /> </p>
    {
      errors.breed ?
      <p>{errors.breed.message}</p>:
      ""
    }
    <p>Age:   <input type="number" onChange={ e => setAge(e.target.value) } value={ age } /> </p>
    {
      errors.age ?
      <p>{errors.age.message}</p>:
      ""
    }
    <input type="submit" />
  </form>
  )

}

export default NewDog;