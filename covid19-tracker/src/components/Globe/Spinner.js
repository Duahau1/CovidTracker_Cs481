import React from 'react';
import './Globe.css';
function getSpinner(props) {
    let spinnerClass = props.page==='usa'? "spinbodyUSA":"spinbody";
    return (
      <div className={spinnerClass}>
        <div className="spinner"></div>
        <p style={{ position: "absolute", left: "40%", bottom: "50px" }}></p>
      </div>
    )
}
export default getSpinner;