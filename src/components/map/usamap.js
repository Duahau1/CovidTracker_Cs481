import React, { useState, useEffect, useRef } from 'react';
import './style.css'
import * as d3 from "d3";
import * as topojson from 'topojson';
import fipsData from './fipstostate.json';
import Tooltip from './tooltip';
import Modal from '../Modal2/Modal';
import Spinner from '../Globe/Spinner';
import {BiCarousel} from 'react-icons/bi';

const USAMap = () => {
  let mapref = useRef(null);
  const [dimension,setDimension] =useState({width:0, height:0});
  const [tooltip, setTool] = useState({ opacity: 0, data: {totalCases:0,totalDeaths:0,name:'',recoveries:0,activeCases:0}, left: 0, top: 0 })
  const [search,setSearch] = useState('');
  const [modalState,setModalState] = useState(false);
  const [stateData,setStateData] =useState();
  const [loading,setLoading] =useState(false);
  
  

  useEffect(() => {
    let mounted =true;
      var margin = { top: 20, right: 20, bottom: 60, left: 50 };
  var width = 975 - margin.left - margin.right;
  var height = 610 - margin.top - margin.bottom;
    const COUNTY = "https://d3js.org/us-10m.v1.json";
    const EDU = "https://corona.lmao.ninja/v2/states";
    setDimension({width,height})
    let selectedInterval ='';
    var svg = d3.select(mapref.current).attr("viewBox", [0, 0, width + margin.left + margin.right, height + margin.top + margin.bottom]);
    window.addEventListener('mousedown',()=>{ 
      setTool({ opacity: 0, data: {totalCases:0,totalDeaths:0,name:'',recoveries:0,activeCases:0}, left: 0, top: 0 });
      if(selectedInterval!==''){
        d3.selectAll('path').style('opacity',1);
        }
    })
    async function render() {
      const pathGenerator = d3.geoPath();
      let data = await fetch(COUNTY).then(res => res.json());
      let edu = await fetch(EDU).then(res => res.json());
      let map = new Map();
      let county = topojson.feature(data, data.objects.states)
      county.features.forEach((value, index, arr) => {
        arr[index].name = fipsData[value.id];
      })
      edu.splice(51, 12);
      edu.forEach((value, index, arr) => {
        if (value.state === "District Of Columbia") {
          value.state = "District of Columbia";
        }
        map.set(value.state, [value.cases, value.deaths, value.state,value.recovered,value.active])
      })
      let max = edu.reduce((prev, curr) => Math.max(prev, curr.cases), edu[0].cases);
      let min = edu.reduce((prev, curr) => Math.min(prev, curr.cases), edu[0].cases);

      legend({
        color: d3.scaleThreshold(d3.range(min, max, Math.round((max - min) / 6)), d3.schemeReds[7]),
        tickSize: 0,
      })
    
      let threshold = d3.scaleThreshold().domain(d3.range(min, max, (max - min) / 6))
        .range(d3.schemeReds[7]);
      svg.selectAll('path').remove()
        .exit().data(county.features).enter().append('path')
        .attr('class', 'county')
        .attr('d', d => pathGenerator(d))
        .style('fill', d => {
          if (map.get(d.name) !== undefined) {
            map.get(d.name).push(threshold(map.get(d.name)[0]));
            return threshold(map.get(d.name)[0]);
          }
        })
        .style('opacity', d => {
          if (selectedInterval===''||map.get(d.name)[5] === selectedInterval) {
              return 1;
          }
          else {
              return 0.1;
          }
        })
        .on('click', (d, i) => {
          let arr = map.get(d.name);
          setTool({ opacity: 1, data: {totalCases:arr[0],totalDeaths:arr[1],name:arr[2].toLowerCase(),recoveries:arr[3],activeCases:arr[4]}, left: String((d3.event.pageX + 10) + "px"), top: (d3.event.pageY - 28) + "px" })
        })
       
        setStateData(map);
        setLoading(true);
      }
      function legend({
        color,
        title,
        tickSize = 6,
        width = 320,
        height = 44 + tickSize,
        marginTop = 18,
        marginRight = 0,
        marginBottom = 16 + tickSize,
        marginLeft = 0,
        ticks = width / 64,
        tickFormat,
        tickValues
      } = {}) {
        
        let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
        let x;
        // Threshold
        if (color.invertExtent) {
          const thresholds
            = color.thresholds ? color.thresholds() // scaleQuantize
              : color.quantiles ? color.quantiles() // scaleQuantile
                : color.domain(); // scaleThreshold
      
          const thresholdFormat
            = tickFormat === undefined ? d => d
              : typeof tickFormat === "string" ? d3.format(tickFormat)
                : tickFormat;
      
          x = d3.scaleLinear()
            .domain([-1, color.range().length - 1])
            .rangeRound([600, 860]);
      
          svg.append("g")
            .attr('id','legend')
            .selectAll("rect")
            .data(color.range())
            .join("rect")
            .attr("x", (d, i) => x(i - 1))
            .attr("y", marginTop)
            .attr("width", (d, i) => x(i) - x(i - 1))
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", d => d)
            .attr('id',(d,i)=>'Bar_'+i)
            .style('cursor', 'pointer')
            .on('click', (d, i, arr) => {
              selectedInterval=d;
              if(mounted){
              render();
              }
            });
          tickValues = d3.range(thresholds.length);
          tickFormat = i => thresholdFormat(thresholds[i], i);
        }
        svg.append("g")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(d3.axisBottom(x)
            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
            .tickSize(tickSize)
            .tickValues(tickValues))
          .call(tickAdjust)
          .call(g => g.select(".domain").remove())
          .call(g => g.append("text")
            .attr("x", marginLeft)
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(title));
            
        return svg.node();
      }
      if(mounted){
    render();
      }
    return ()=>{
      mounted =false;
    }
  }, [])
  
  function handleClick(){
    let tempSearch = search !==''?search[0].toUpperCase()+search.substring(1):'';
    if(stateData.get(tempSearch)!==undefined){
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
    if(e.key==='Enter'){
      handleClick();
    }
  }
  function handleClose(){
    setModalState(false);
    setSearch('');
  }
  return (
    <div className="first_component">
      
      {loading ? null : <Spinner page={'usa'} /> }
        <div id="search_engine">
        <BiCarousel size={38} className="carousel" onClick={()=>window.location.href='/carousel'} />
        <input type="text" placeholder="Search..." id="state" onChange={handleSearch} onKeyDown={handleEnter}/>
          <button id="search" onClick={handleClick}>
            Search
        </button>
        <Modal  show={modalState} stateName={search}  handleClose={handleClose} width={dimension.width} height={dimension.height}/>
      </div>
      <svg className="usmap" ref={mapref}></svg>
      {tooltip.opacity?<Tooltip  carousel={false} data={tooltip.data} left={tooltip.left} top={tooltip.top} opacity={tooltip.opacity} />:null}
    </div>
  )
}
export default USAMap;