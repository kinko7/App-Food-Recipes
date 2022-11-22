import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetails } from "../../actions/index.js";
import styles from "./RecipeDetail.module.css";
import { useParams } from "react-router";

export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const recipeDetail = useSelector((state) => state.detail);
  console.log("EEEEEE",recipeDetail);

  useEffect(() => {
    dispatch(getDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id,dispatch]);



  return (
    <div className={styles.container}>
  
      <div>
        <Link to="/home">
          <button className={styles.back}> BACK </button>
        </Link>
        <div className={styles.recipe}>

          <img className={styles.img} src={recipeDetail.image} alt="" />

          <div className={styles.detail}>
            <div className={styles.up}>
              <h2>{recipeDetail.name}</h2>
              <div className={styles.boxis}>
                <span className={styles.summary}>
                  
                  {recipeDetail.summary &&
                    recipeDetail.summary.replace(/<[^>]*>?/g, "")}
                </span>
                <br />
                <span className={styles.inf}>
                  Healthscore: {recipeDetail.healthiness}
                </span>
                <br />
                 <br />
                <span className={styles.inf}>Diets:</span>

                <span>{recipeDetail?.diets && recipeDetail?.diets.map((e) => e.name || e + ", "+ ".")}</span>
                <br />
                <br />

                <div>
                  <span className={styles.inf}>Step by step:</span>
                  <span>{recipeDetail.steps}</span>
                </div>
              </div>
        
            </div>



          </div>
        </div>
      </div>
  
    </div>
  );
}