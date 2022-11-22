import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Recipe from "../Recipe/index";
import { Link } from "react-router-dom";
import Paginado from "../Paginado/paginado";
import RecipeSearch from "../RecipeSearch/index";
import styles from "./Home.module.css";

import {
  getRecipes,
  filterRecipeByType,
  orderByTitle,
  sortScore,
} from "../../actions/index";

function Home() {
  const dispatch = useDispatch(); //para despachar las acciones
  const allRecipes = useSelector((state) => state.loadRecipe); //usamos HOOKS
  // const type = useSelector((state) => state.types);

const [ currentPage, setCurrentPage ] = useState( 1 );
const [ recipesPerPage ] = useState( 9 );
const [ order, setOrder ] = useState( "" );
const lastRecipe = currentPage * recipesPerPage;
const firstRecipe = lastRecipe - recipesPerPage;
const currentRecipes = allRecipes.slice( firstRecipe, lastRecipe );
 
console.log(allRecipes)
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  //traemos las recetas cuando el componente se montan //component dipmount
  useEffect(() => {
    dispatch(getRecipes()); //despacjo la accion , el dispach remplaza el mapdispacht to props
  }, [dispatch]); //condicion para el montaje


  function handleOnClickGet(e) { //funcion para el reload / le paso un evento
    e.preventDefault(); //para que no se llame infinitamente el evento.
    dispatch(getRecipes()); //("")
  }
  function handleFilterTypes(e) {
       e.preventDefault();
    dispatch(filterRecipeByType(e.target.value));
  }


  function handleScore(e) {
    e.preventDefault();
    dispatch(sortScore(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered ${e.target.value}`);
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByTitle(e.target.value));
    setCurrentPage(1);
    setOrder(`ordered ${e.target.value}`);
  }
  return (
    <>  
    <div className={styles.hea}>
      <span>THE BEST FOOD RECIPES </span>
    </div>
          <div className={styles.container}> 
            <div >
            <button className={styles.alls}
              onClick={(e) => {
                handleOnClickGet(e);
              }}
            >
              RELOAD 
            </button>
       
 

        <Link to="/recipecreate">
          <button className={styles.all}>CREATE RECIPE</button>
        </Link>
  <select
          className={styles.select}
          onChange={e => {
            handleFilterTypes(e);
          }}
        >
          <option value= 'all'> by Diet</option>
                        <option value="gluten free">Gluten free</option>
                        <option value="ketogenic">ketogenic</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="lacto-vegetarian">Lacto-vegetarian</option>
                        <option value="paleo">Paleolithic</option>
                        <option value="ovo-vegetarian">Ovo-vegetarian</option>
                        <option value="low fodmap">Low fodmap</option>
                        <option value="pescetarian" >Pescetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="primal">Primal</option>
                        <option value="whole 30" >Whole 30</option>
                        <option value="dairy free">Dairy free</option>
                        <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                        <option value="fodmap friendly">Fodmap friendly</option>
                    </select> 
       
      
           <select className={styles.select} 
        onChange={(e) =>{ handleScore(e)}}>
          <option hidden disabled selected value>
            by HealthScore
          </option>
          <option value="punAsc">Lower</option>
          <option value="punDesc">Heigher</option>
        </select>
        <select className={styles.select} onChange={(e) => handleSort(e)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option hidden disabled selected value>
            Alphabetical
          </option>
        </select>

        </div>

<div className={styles.searchBar}>
        <RecipeSearch />
</div>
          <div className={styles.cards}>
          {currentRecipes ? (
            currentRecipes.map((recipe) => {
              return (
                <div key={recipe.id}>
                  <Recipe
                    
                    id={recipe.id}
                    name={recipe.name}
                    image={recipe.image}
                    diets={recipe.diets}
                  />
                                </div>
                );
              })
            ) : (
              <h2></h2>
            )}
                </div>
       
       <Paginado
  recipesPerPage={recipesPerPage}
  allRecipes={allRecipes.length}
  paginado={paginado}
/>
</div>
      
       
   
      
    </>
  );

}
export default Home;





