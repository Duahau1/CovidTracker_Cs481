import React,{useState,useEffect} from 'react';
import Label from '../map/tooltip';
import './carousel.css';
import Slider from '@material-ui/core/Slider';
import {CgCloseR} from 'react-icons/cg';
import Chart from '../Modal2/stateChart';
const Carousel =()=>{
    const [itemObj,setItemObj] =useState([]);
    const [deg, setDeg] =useState(0);
    let [oldDeg, setoldDeg] =useState(0);
    const [values, setValue] = useState(10);
    const [show, setShow] = useState(false);   
    const [stateData,setStateData] =useState([]);
    const [chosenC, setChosenC] =useState('');
    const [opacityArray,setOpacityArray] =useState([]);
    const EDU = "https://corona.lmao.ninja/v2/states";
let itemNumber =values;
let carouselW = 1000;
let carouselH = 500;
let itemSeparation =360/(itemNumber);
let rangeX = carouselW-190;
let counter = oldDeg;
let margin = { top: 20, right: 20, bottom: 60, left: 50 };
let width = 975 - margin.left - margin.right;
let height = 610 - margin.top - margin.bottom;
function degToRad(input){
return input*(Math.PI/180)
}
function handleCarouselClick(stateName){
setShow(true);
setChosenC(stateName);
}
function handleNext(){
    setoldDeg(deg);
    setDeg(curDeg=>Number(curDeg)+itemSeparation);
}
function handlePrev(){
    setoldDeg(deg);
    setDeg(curDeg=>Number(curDeg)-itemSeparation);

}
function handleSliderChange(event, newValue){
    setValue(newValue);
}
function animation(){
    let done =false;
    let rangeY = carouselH-300;
    if(deg-oldDeg<0 && counter>deg){
        counter-=1;
    }
    else if( deg-oldDeg>0 && counter<deg){
        counter+=1;
    }
    else{
        done=true;
    }
    let temp =[];
    let opacityArr=[];
    for(let i=0; i<itemNumber; i++){
        let itemDeg = counter +((360/(itemNumber))*i);
        var sin = 0.5 + Math.sin(degToRad(itemDeg))*0.5;
        var cos = 0.5 + Math.cos(degToRad(itemDeg))*0.5;
        let zIndex = 1+ Math.round(cos*100);
        let scale = 0.5 +cos*0.5;
        let opacity = 0.1 +cos*0.9;
        temp.push({left:sin*rangeX, top:cos*rangeY, zIndex:zIndex, scale:scale, opacity:opacity});
        opacityArr.push(opacity);
    }
    setOpacityArray(opacityArr);
    setItemObj(temp);
    if(oldDeg!==deg && done!==true){
   requestAnimationFrame(animation);
    }
}
useEffect(()=>{
    let mounted = true;
    async function getData(){
        let map = [];
        await fetch(EDU).then(res=>res.json()).then((covidData)=>{
            covidData.forEach((value,index) => {
                if ( index<=49 &&value.state !== "District Of Columbia" ) {
                    map.push(
                        {name:String(value.state).toLowerCase(),
                        cases:value.cases, 
                        deaths:value.deaths, 
                        recoveries:value.recovered,
                        active:value.active}
                        );
                }
                if(value.state === "District Of Columbia"){
                    map.push(
                        {name:'washington',
                        cases:value.cases, 
                        deaths:value.deaths, 
                        recoveries:value.recovered,
                        active:value.active}
                        );
                }
                
              })
        }).catch(()=>{console.log('Error in fetch')})
        map.sort((a, b) => (a.cases < b.cases) ? 1 : (a.cases === b.cases) ? ((a.cases > b.cases) ? 1 : -1) : -1)
        setStateData(map);
    }
    if(mounted){
    getData();
    }
    return()=>{
        mounted =false;
    }
    
},[])
useEffect(()=>{
    let mounted = true;
    if(mounted){
        window.addEventListener('mousedown',()=>{
            setShow(false);
        })
        animation();
    }
    return()=>{
        mounted = false;
    }
    
},[deg,values])

    return (
        <div className="carousel-modal">
        <CgCloseR size={35} onClick={()=>window.location.href='./usa'} style={{position:'absolute', top:0, right:0,cursor:'pointer'}}></CgCloseR>
        <div className="carousel-container">
        {!show?<button className="forward" onClick={handleNext}>Next</button>:null}
        {!show?<button className="backward" onClick={handlePrev}>Prev</button>:null}
        {
        itemObj.map((value,index,array)=>{
            if(stateData.length!==0)
            return <Label carousel={true} click={()=>handleCarouselClick(stateData[index].name)} reset_card={show} 
            key={stateData[index].name} length={opacityArray}
            data={{totalCases:stateData[index].cases,totalDeaths:stateData[index].deaths,name:stateData[index].name,
                recoveries:stateData[index].recoveries,activeCases:stateData[index].active}}
            left={value.left} top={value.top} zIndex={value.zIndex} opacity={value.opacity} scale={value.scale}  />
        })
        }
        {show? <div className="tempStateChart"><h1 style={{color:'#22384f'}}>{chosenC!==''?chosenC.toUpperCase():''}</h1><Chart panel={{top:0,transform: 'translateX(-50%) translateY(2rem)'}} 
        width ={width} height={height} stateName={chosenC!==''?chosenC:'none'}/></div>:null}
        
        </div>
        {!show?
        <div style={{width:'60%', margin:'0 auto'}}>
        <Slider
            value={typeof values === 'number' ? values : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={50}
            min={10}
            step={2}
            valueLabelDisplay="on"
          />
        <span style={{display:'inherit',color: '#3255B3'}}>Slide to display more states</span>
        </div>:null}
        </div>
    )
}
export default Carousel;