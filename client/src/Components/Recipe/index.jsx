import React from "react";
import { Link } from "react-router-dom";
import styles from "./Recipe.module.css";



function Recipe({ name, image, diets, id }) {
  const checkedDiets = [];

  const verifyDiet = (diets) => {
    if (typeof diets[0] === "object") {
      diets.map((e) => checkedDiets.push(e.name + " "));
    } else {
      diets.map((e) => checkedDiets.push(e));
    }
  };

  verifyDiet(diets);
  return (
    <div>  
      <div className={styles.container}>
      <Link to={`/${id}`} >
        <img src={image} alt='img not found' width="150px" height="150px" />
        </Link>
        <div className={styles.details}>
      
            <h2>{name}</h2>
          
          <div className={styles.card}>
            <div className={styles.diets}>
            <strong >Diets : </strong>         
          <p>{checkedDiets}</p>                             
           </div>     
          </div>
        </div>
      </div>
 
    </div>

  )

}


export default Recipe;
