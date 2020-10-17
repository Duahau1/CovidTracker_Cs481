import React,{useEffect,useRef} from 'react';
import * as d3 from "d3";
import './Modal2.css'
import Chart from './stateChart';
function numberWithCommas(x){
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const ModalContent = (props)=>{
return (
<div className="panel">
<h1 style={{fontSize: '1.8rem',color:'#fff'}}>{props.stateName}</h1>
<div style={{fontSize: '1.2rem',color:'#fff',opacity: '0.6'}}>COVID-19 STATUS</div>
<hr/>

<Chart width={props.width} height={props.height} stateName={props.stateName}></Chart>

</div>
)

}
export default ModalContent;