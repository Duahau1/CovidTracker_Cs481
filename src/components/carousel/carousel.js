import React,{useState,useEffect} from 'react';
import Label from '../map/tooltip';
import './carousel.css';
import Slider from '@material-ui/core/Slider';
import {CgCloseR} from 'react-icons/cg';
import { FaMedium } from 'react-icons/fa';

const Carousel =()=>{
    const [itemObj,setItemObj] =useState([]);
    const [deg, setDeg] =useState(0);
    let [oldDeg, setoldDeg] =useState(0);
    const [value, setValue] = useState(15);

    const [stateData,setStateData] = useState([]);
    const EDU = "https://corona.lmao.ninja/v3/covid-19/states";
let itemNumber =value;
let carouselW = 1000;
let carouselH = 500;
let itemSeparation =360/(itemNumber);
let rangeX = carouselW-190;
let counter = oldDeg;
function degToRad(input){
return input*(Math.PI/180)
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
    for(let i=0; i<itemNumber; i++){
        let itemDeg = counter +((360/(itemNumber))*i);
        var sin = 0.5 + Math.sin(degToRad(itemDeg))*0.5;
        var cos = 0.5 + Math.cos(degToRad(itemDeg))*0.5;
        let zIndex = 1+ Math.round(cos*100);
        let scale = 0.5 +cos*0.5;
        let opacity = 0.1 +cos*0.9;
        temp.push({left:sin*rangeX, top:cos*rangeY, zIndex:zIndex, scale:scale, opacity:opacity});
    }
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
        })
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
        animation();
    }
    return()=>{
        mounted = false;
    }
    
},[deg,value])

    return (
        <div className="carousel-modal">
        <CgCloseR size={35} onClick={()=>window.location.href='./usa'} style={{position:'absolute', top:0, right:0,cursor:'pointer'}}></CgCloseR>
        <div className="carousel-container">
        <button className="forward" onClick={handleNext}>Next</button>
        <button className="backward" onClick={handlePrev}>Prev</button>
        {
        itemObj.map((value,index,array)=>{
            if(stateData.length!==0)
            return <Label carousel={true} key={stateData[index].name} data={{totalCases:stateData[index].cases,totalDeaths:stateData[index].deaths,name:stateData[index].name,
            recoveries:stateData[index].recoveries,activeCases:stateData[index].active}} 
            left={value.left} top={value.top} zIndex={value.zIndex} opacity={value.opacity} scale={value.scale}  />
        })
        }
        
        </div>
        <div style={{width:'60%', margin:'0 auto'}}>
        <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={50}
            min={10}
            step={2}
            valueLabelDisplay="on"
          />
        </div>
        <span style={{display:'inherit',color: '#3255B3'}}>Slide to display more states</span>

        </div>
    )
}
export default Carousel;