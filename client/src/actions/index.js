import axios from "axios";
import {
  GET_RECIPES,
  GET_DETAILS,
  FILTER_RECIPE_BY_TYPE,
  GET_TYPES,
  GET_RECIPE_BY_TITLE,
  ORDER_BY_TITLE,
  POST_RECIPE,
  SORT_BY_SCORE,
} from "./const";

//no usamos el then de promesa sino elsync await
export function getRecipes() {
  return async function (dispatch) {
    try {
      var recipes = await axios.get(`http://localhost:3001/recipes`);
      //este es el momento de la conexion con el back
      return dispatch({
        //retorna la accion
        type: GET_RECIPES,
        payload: recipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createRecipe(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        `http://localhost:3001/recipe`,
        payload
      );
      return dispatch({ type: POST_RECIPE, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function sortScore(payload) {
  return {
    type: SORT_BY_SCORE,
    payload,
  };
}

export function orderByTitle(payload) {
  return {
    type: ORDER_BY_TITLE,
    payload,
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/types`);
      return dispatch({ type: GET_TYPES, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function filterRecipeByType(payload) {
  return {
    type: FILTER_RECIPE_BY_TYPE,
    payload,
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      const json = await axios(`http://localhost:3001/recipes/${id}`);
      return dispatch({ type: GET_DETAILS, payload: json.data });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getRecipeByTitle(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
      return dispatch({
        type: GET_RECIPE_BY_TITLE,
        payload: json.data,
      });
    } catch (err) {
      alert("does not exist");
      console.log("error");
    }
  };
}
