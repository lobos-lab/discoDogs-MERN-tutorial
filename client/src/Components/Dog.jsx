import React from "react";
import { Link } from "@reach/router";

const Dog = (props) => {

  const {name, breed, age} = props.dog;

    return(
      <div>
        <h4>Name: { name }</h4>
        <p>Breed: { breed } </p>
        <p>Age: { age }</p>
        <Link to={"/edit/" + props.dog._id}><button>Edit Dog</button></Link>
      </div>
    );

}

export default Dog;