import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
 

function LandingPage() {

  return (
     <div>
    <div className={styles.img} >
    <Link to='/home'>
      <div className={styles.bt}>
        <button className={styles.btn}>
      WELCOME COOKER´S
        </button>
        </div>
    </Link>
</div>
</div>
)
}
         
  
export default LandingPage;
