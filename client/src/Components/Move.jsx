import React, {useState, useEffect} from "react";
import axios from 'axios';
import { navigate } from "@reach/router";

const Move = (props) => {

  const [dogs, setDogs] = useState([]);
  const [move, setMove] = useState({
    move:"",
    skillLevel: 0
  });

  const [dogId, setDogId] = useState("");
  const [errors,setErrors] = useState({});

  const handleMoveChange = (e) => {
    setMove({
      ...move,
      [e.target.name]:e.target.value
    })
  }

  const fetchDogs = () => {
    axios.get("http://localhost:8000/api/dogs")
      .then(res => {
        console.log(res);
        setDogs(res.data);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchDogs();
  }, [props]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/dance/${dogId}`, move)
        .then(res=> {
          console.log(res.data)
          if(res.data.errors){
            setErrors(res.data.errors)
          }
          else{
            navigate("/")
          }
        })
        .catch(err => console.log(err));
  }

  return ( 
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Dance Move: </label>
          <input type="text" 
          className="form-control" 
          value={move.move}
          onChange={ handleMoveChange }
          name="move"
          />
          { errors.move ? <p className="text-danger">{ errors.move.message }</p> : " " }
        </div>

        <div className="form-group">
          <label>Difficulty: </label>
          <input type="number" 
          className="form-control" 
          value={ move.skillLevel }
          onChange={ handleMoveChange }
          name="skillLevel"
          />
          { errors.skillLevel ? <p className="text-danger">{errors.skillLevel.message}</p> : " " }
        </div>

        <div className="form-group">
          <label>Dog: </label>
          <select className="form-control" 
                  onChange={ e => setDogId(e.target.value ) }>
                  <option value="">-Select a Dog-</option>
                  {
                    dogs.map((d,i) => <option key={i} value={d._id}> {d.name} </option>)
                  }
          </select>
          { errors.dogId ? <p className="text-danger">{errors.dogId.message}</p> : "" }
        </div>
        {       
          dogId ? <input 
                    type="submit" 
                    className={ move.skillLevel < 6 ? "btn btn-primary" : "btn btn-outline-danger"} 
                    value={ move.skillLevel < 6 ? "Boogie" : "YOURE IN THE DANGER ZONE!"} 
                  /> :
                  <input 
                  type="submit" 
                  className={ move.skillLevel < 6 ? "btn btn-primary" : "btn btn-outline-danger"} 
                  value={ move.skillLevel < 6 ? "Boogie" : "YOURE IN THE DANGER ZONE!"}
                  disabled
                />
        }
      </form>
    </div>
  );
}

export default Move;