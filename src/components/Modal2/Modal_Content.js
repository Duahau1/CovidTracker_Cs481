import React from 'react';
import './Modal2.css'
import Chart from './stateChart';

const ModalContent = (props)=>{
return (
<div className="panel">
<h1 style={{fontSize: '1.8rem',color:'#fff'}}>{props.stateName}</h1>
<div style={{fontSize: '1.2rem',color:'#fff',opacity: '0.6'}}>COVID-19 STATUS</div>
<hr/>

<Chart panel={{top:undefined,transform:undefined}} width={props.width} height={props.height} stateName={props.stateName}></Chart>

</div>
)

}
export default ModalContent;