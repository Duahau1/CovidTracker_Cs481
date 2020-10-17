import React, { useState, useEffect, useRef } from 'react';
import './style.css'
import * as d3 from "d3";
import * as topojson from 'topojson';
import fipsData from './fipstostate.json';
import Tooltip from './tooltip';
import Modal from '../Modal2/Modal';
import Spinner from '../Globe/Spinner';
const USAMap = () => {
  const ref = useRef(null);
  const [tooltip, setTool] = useState({ opacity: 0, data: {totalCases:0,totalDeaths:0,name:'',recoveries:0,activeCases:0}, left: 0, top: 0 })
  const [search,setSearch] = useState('');
  const [modalState,setModalState] = useState(false);
  const [stateData,setStateData] =useState();
  const [loading,setLoading] =useState(false);

  const COUNTY = "https://d3js.org/us-10m.v1.json";
  const EDU = "https://corona.lmao.ninja/v2/states";
  const pathGenerator = d3.geoPath();
  var margin = { top: 20, right: 20, bottom: 60, left: 50 };
  var width = 975 - margin.left - margin.right;
  var height = 610 - margin.top - margin.bottom;
  

  useEffect(() => {
  
    var svg = d3.select(ref.current).attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom]);
    window.addEventListener('mousedown',()=>{

      setTool({ opacity: 0, data: {totalCases:0,totalDeaths:0,name:'',recoveries:0,activeCases:0}, left: 0, top: 0 });
     
  })
    async function render() {
      let data = await fetch(COUNTY).then(res => res.json());
      let edu = await fetch(EDU).then(res => res.json());

      let map = new Map();
      let county = topojson.feature(data, data.objects.states)
      county.features.forEach((value, index, arr) => {
        arr[index].name = fipsData[value.id];
      })
      edu.splice(51, 12);
      edu.forEach((value, index, arr) => {
        if (value.state == "District Of Columbia") {
          value.state = "District of Columbia";
        }
        map.set(value.state, [value.cases, value.deaths, value.state,value.recovered,value.active])
      })
      let max = edu.reduce((prev, curr) => Math.max(prev, curr.cases), edu[0].cases);
      let min = edu.reduce((prev, curr) => Math.min(prev, curr.cases), edu[0].cases);
      let threshold = d3.scaleThreshold().domain(d3.range(min, max, (max - min) / 6))
        .range(d3.schemeReds[7]);
      svg.selectAll('path').remove()
        .exit().data(county.features).enter().append('path')
        .attr('class', 'county')
        .attr('d', d => pathGenerator(d))
        .style('fill', d => {
          if (map.get(d.name) != undefined) {
            map.get(d.name).push(threshold(map.get(d.name)[0]));
            return threshold(map.get(d.name)[0]);
          }
        })
        .on('click', (d, i) => {
          let arr = map.get(d.name);
          setTool({ opacity: 1, data: {totalCases:arr[0],totalDeaths:arr[1],name:arr[2].toLowerCase(),recoveries:arr[3],activeCases:arr[4]}, left: String((d3.event.pageX + 10) + "px"), top: (d3.event.pageY - 28) + "px" })
        })
       
        setStateData(map);
        setLoading(true);
      }
    render();
  }, [])
  
  function handleClick(){
    if(stateData.get(search)!==undefined){
      setModalState(true);
      document.getElementById("state").value = '';
    }
    else{
      document.getElementById("state").value = '';
    }
  }
  function handleSearch(e){
 
    setSearch(e.target.value);
    
  }
  function handleEnter(e){
    if(e.key=='Enter'){
      handleClick();
    }
  }
  function handleClose(){
    setModalState(false);
    setSearch('')
  }
  return (
    <div className="first_component">
      {loading ? null : <Spinner page={'usa'} /> }
        <div id="search_engine">
            <input type="text" placeholder="Search..." id="state" onChange={handleSearch} onKeyDown={handleEnter}/>
          <button id="search" onClick={handleClick}>
            Search
        </button>
        <Modal  show={modalState} stateName={search}  handleClose={handleClose} width={width} height={height}/>
      </div>
      <svg className="usmap" ref={ref}></svg>
      {tooltip.opacity?<Tooltip data={tooltip.data} left={tooltip.left} top={tooltip.top} opacity={tooltip.opacity} />:null}
    </div>
  )
}
export default USAMap;