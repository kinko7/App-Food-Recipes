import "./App.css";
import { Route, Switch } from "react-router-dom";
import React from "react";
import CreateRecipe from "./Components/CreateRecipe/index";
import RecipeDetail from "./Components/RecipeDetail/index";
import RecipeSearch from "./Components/RecipeSearch";
import Home from "./Components/Home/index";
import LandingPage from "./Components/LandingPage/index";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/recipeCreate" component={CreateRecipe} />
        <Route path="/" exact component={LandingPage} />
        <Route path="/home" exact component={RecipeSearch} />
        <Route path="/:id" component={RecipeDetail} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
