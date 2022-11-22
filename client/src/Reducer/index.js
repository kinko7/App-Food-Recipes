import {
  GET_RECIPES,
  FILTER_RECIPE_BY_TYPE,
  GET_RECIPE_BY_TITLE,
  ORDER_BY_TITLE,
  GET_TYPES,
  POST_RECIPE,
  SORT_BY_SCORE,
  GET_DETAILS,
} from "../actions/const";

//esto es un objeto
const initialState = {
  loadRecipe: [],
  allRecipes: [],
  detail: "",
  types: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        loadRecipe: action.payload, //mando todo lo que te mande la accion de recipes
        allRecipes: action.payload,
      };
    case GET_RECIPE_BY_TITLE:
      return {
        ...state,
        loadRecipe: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };
    case POST_RECIPE: {
      return {
        ...state,
      };
    }
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case FILTER_RECIPE_BY_TYPE:
      const allRecipes = state.allRecipes;
      const typeApi = []; //api---> aca tengo guardados los tipos de dieta dela api
      const types = []; // db---> aca tengo guardados los tipos de dieta dela bd
      allRecipes.forEach((e) => {
        if (e.hasOwnProperty("diets") && e.diets.includes(action.payload)) {
          typeApi.push(e);
        }
      });

      allRecipes.forEach((e) => {
        if (
          e.hasOwnProperty("diets") &&
          e.diets.map((t) => t.name === action.payload)
        ) {
          types.push(e);
        }
      });

      const allTypes = typeApi.concat(types);
      if (allTypes?.length) {
        return {
          ...state,
          loadRecipe: allTypes,
        };
      }
      break;
    case ORDER_BY_TITLE:
      let orderByTitle =
      action.payload === "asc" ?
      state.loadRecipe.sort( function ( a, b ) {
        if ( a.name.toLowerCase( ) > b.name.toLowerCase( ) ) return 1;
        else if ( a.name.toLowerCase( ) < b.name.toLowerCase( ) ) return -1;
        return 0;
      } ) : action.payload === "desc"
      state.loadRecipe.sort( function ( a, b ) {
        if ( a.name.toLowerCase( ) > b.name.toLowerCase( ) ) return -1;
        else if ( a.name.toLowerCase( ) < b.name.toLowerCase( ) ) return 1;
        return 0;
      } );
      return {
        ...state
        , loadRecipe: orderByTitle
      , };

    case SORT_BY_SCORE:
      let sortedRecipesScore =
        action.payload === "punAsc"
          ? state.loadRecipe.sort(function (a, b) {
              if (a.healthiness > b.healthiness) {
                return 1;
              }
              if (b.healthiness > a.healthiness) {
                return -1;
              }
              return 0;
            })
          : action.payload === "punDesc"
          ? state.loadRecipe.sort(function (a, b) {
              if (a.healthiness > b.healthiness) {
                return -1;
              }
              if (b.healthiness > a.healthiness) {
                return 1;
              }
              return 0;
            })
          : null;
      return {
        ...state,
        loadRecipe: sortedRecipesScore,
      };

    default:
      return state;
  }
}
