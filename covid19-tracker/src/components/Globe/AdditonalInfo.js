import React from 'react';
import './Globe.css';
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
const TimeLine =(props)=>{
return(
  <div className="bottom-info-container">
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <div className="timeline-container">
        
        <span
          style={{fontSize: '14px', color: '#ccd6f6'}}
          className="slider-date"
        ></span>
      </div>
    </div>
    <div style={{fontSize: '24px', color: '#ccd6f6' ,marginTop: '35px'}}>
      Total Counts <span className="updated"></span>
    </div>
    <div style={{color: '#e6f1ff', padding: '0 5px'}}>
INFECTED: <span id="infected">{numberWithCommas(props.infected)}</span> • DEATHS:
<span id="deaths">{numberWithCommas(props.deaths)}</span> • RECOVERED: <span id="recovered">{numberWithCommas(props.recovered)}</span>
    </div>
  </div>
   
)
}
export default TimeLine;