import React, { useState,useEffect,useMemo } from 'react';
import './style.css';
const FLAG_ENDPOINT = 'https://cdn.civil.services/us-states/flags/';
const Tooltip = (props) => {
  const [selected, setSelected] = useState(true);
  const [chosenCard,setChosenCard]=useState('');
useEffect(()=>{  
  if(chosenCard!=='' && props.reset_card===false){
    [...document.querySelectorAll(".card-tool2")].map((value) => {
      if(value.style.opacity==1 &&value.getAttribute('data-state') === chosenCard){
          value.style.animation="reset_flat 1s linear"
      } 
      else{
        value.style.display = 'block';
        value.style.animation = "re_spinning 1s ease-out";
      }
       setSelected(true);
  })
  }
},[props.reset_card])
// useEffect(()=>{
// //Find the maximum opacity available to allow click
// if(props.length.length!==0){
// let maxValue=props.length.reduce((prev,cur)=>{return prev>cur?prev:cur},-1);
// setOpacityState(maxValue);
// }
// },[props.length])
let maxValue= useMemo(
  ()=> {if(props.length.length!==0) {return props.length.reduce((prev,cur)=>{return prev>cur?prev:cur},-1)}},
  [props.length]
)

  function handleSelectCard(stateName) {
    
    if (selected===true && Cardclass === 'card-tool2') {
      
      [...document.querySelectorAll(".card-tool2")].map((value) => {
        if (value.getAttribute('data-state') !== stateName) {
          value.style.animation = 'spinning 1s forwards ';
          setTimeout(() => { value.style.display = 'none'; }, 1001)
        }
        else {
          value.style.animation = "none";
          setTimeout(() => {
            value.style.animation = 'flattening 1s forwards ';
            setChosenCard(stateName)
            setTimeout(() => {
              props.click();
              setSelected(false);
            }, 1000);
          }, 1002)
        }
      })
    }
    else{
      [...document.querySelectorAll(".card-tool2")].map((value) => {
          if(value.getAttribute('data-state') === stateName){
              value.style.animation="reset_flat 2s forwards"
          } 
          else{
            value.style.animation = "spinning 3s linear";
            value.style.display = 'block';
          }
           setSelected(true);
      })
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let Cardclass = props.carousel ? "card-tool2" : "card-tool";
  return (
    <div className={Cardclass} data-state={props.data.name} onClick={() => {
      if(Number(props.opacity)===maxValue)
      return handleSelectCard(props.data.name)
    }}
      style={{
        opacity: props.opacity, left: props.left, top: props.top, zIndex: props.zIndex || 10,
        transform: `scale(${props.scale})`
      }} >
      <img className="card-img-tool" src={`${FLAG_ENDPOINT}${String(props.data.name).replace(/\s+/g, '-')}-small.png`} alt="flag" />
      <div className="container-tool">
        <span className="card-title-tool"><b>{String(props.data.name).toUpperCase()}</b></span> <br />
        <div className="card-spacer-tool"></div>
        <hr style={{ width: '100%' }} />
        <div class="card-spacer-tool"></div>
        <span className="card-info-tool">Cases: {numberWithCommas(props.data.totalCases)}</span>  <br />
        <span className="card-info-tool">Deaths: {numberWithCommas(props.data.totalDeaths)}</span> <br />
        <span className="card-info-tool">Recovered: {numberWithCommas(props.data.recoveries)}</span> <br />
        <span className="card-info-tool">Active: {numberWithCommas(props.data.activeCases)}</span>  <br />
      </div>
    </div>
  )
}
export default Tooltip;