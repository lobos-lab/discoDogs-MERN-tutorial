import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";


const EditDog = (props) => {

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/dogs/${props._id}`)
      .then(res => {
        setName(res.data.name);
        setBreed(res.data.breed)
        setAge(res.data.age)
        console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  const updateDog = (e) => {
    e.preventDefault();
    const newDog = {name, age, breed};
    axios.put(`http://localhost:8000/api/dogs/${props._id}`, newDog)
      .then(res => {
        if(res.data.errors) {
          setErrors(res.data.errors);
        } else {
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  } 

  const adoptDog = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/api/dogs/${props._id}`)
      .then(res => {
          navigate("/");
      })
      .catch(err => console.log(err));
  }

  return(
    <form onSubmit={ updateDog }>
    <p>Name:  <input type="text" onChange={ e => setName(e.target.value) } value={ name } /> </p>
    {
      errors.name ?
      <p>{errors.name.message}</p>:
      ""
    }
    <p>Breed: <input type="text" onChange={ e => setBreed(e.target.value)} value={ breed } /> </p>
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
    <input type="submit" value="Update Dog Info" />
    <button onClick={adoptDog}>Adopt This Dog </button>
  </form>
  )

}

export default EditDog;