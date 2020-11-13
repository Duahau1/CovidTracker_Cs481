import React from 'react';
import './style.css';
const FLAG_ENDPOINT='https://cdn.civil.services/us-states/flags/';
const tooltip =(props)=>{
    
function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let Cardclass = props.carousel?"card-tool2":"card-tool";
  
    return (
        <div className={Cardclass} style={{opacity:props.opacity, left:props.left, top:props.top, zIndex:props.zIndex||10, 
        transform:`scale(${props.scale})`||'scale(0.8)'}} >
        <img className="card-img-tool" src={`${FLAG_ENDPOINT}${String(props.data.name).replace(/\s+/g,'-')}-small.png`} alt="flag" />
        <div className="container-tool">
           <span className="card-title-tool"><b>{String(props.data.name).toUpperCase()}</b></span> <br />
           <div className="card-spacer-tool"></div>
           <hr style={{width:'100%'}}/>
           <div class="card-spacer-tool"></div>
           <span className="card-info-tool">Cases: {numberWithCommas( props.data.totalCases)}</span>  <br />
           <span className="card-info-tool">Deaths: {numberWithCommas(props.data.totalDeaths)}</span> <br />
           <span className="card-info-tool">Recovered: {numberWithCommas(props.data.recoveries)}</span> <br />
           <span className="card-info-tool">Active: {numberWithCommas(props.data.activeCases)}</span>  <br />
        </div>
      </div>
    )
}
export default tooltip;