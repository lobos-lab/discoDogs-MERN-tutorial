import React from "react";


const Dog = (props) => {

  const {name, breed, age} = props.dog;

    return(
      <div>
        <h4>Name: { name }</h4>
        <p>Breed: { breed } </p>
        <p>Age: { age }</p>
      </div>
    );

}

export default Dog;