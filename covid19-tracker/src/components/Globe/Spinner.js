import React from 'react';
function getSpinner() {
    return (
      <div className="spinbody">
        <div className="spinner"></div>
        <p style={{ position: "absolute", left: "40%", bottom: "50px" }}></p>
      </div>
    )
}
export default getSpinner;