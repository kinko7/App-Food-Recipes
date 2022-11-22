import React from "react";
import styles from "./Paginado.module.css";

function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.paginado}>
      {pageNumbers?.map((number) => {
        return (
          <div
            key={number}
            className={styles.num}
            onClick={() => paginado(number)}
          >
            <a className={styles.nums}>{number}</a>
          </div>
        );
      })}
    </div>
  );
}

export default Paginado;