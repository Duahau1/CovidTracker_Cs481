import React from 'react'
import './Globe.css'

function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const TimeLine =(props)=>{
  return(
    <div className="bottom-info-container">
       <span className="gradient-container">
      LOW<div className="gradient"></div>HIGH
      </span>
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