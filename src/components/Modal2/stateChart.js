import React,{useEffect,useRef} from 'react';
import './Modal2.css'
import * as d3 from "d3";

const Chart =(props)=>{
    const ref=useRef(null);
    useEffect(()=>{
    let mounting =true;
    //let url =`https://covidtracker-lac.vercel.app/api/server?stateName=${props.stateName}`
    if(mounting){
    let url = `https://disease.sh/v3/covid-19/nyt/states/${props.stateName}`;
    fetch(url).then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        }
        else {
          throw Error(res.statusText);
        }
      }).then(data => {
        let dataset = data.map((value, index, arr) => {
          return [new Date(value.date), value.cases, value.deaths];
        })
        var margin = {top: 20, right: 20, bottom: 60, left: 50};
        let width = props.width;
        let height =props.height;
        let subSvg = d3.select(ref.current).attr("class", "chart").attr("viewBox", [0, 0, width+margin.left+margin.right, height+margin.left+margin.right]);
        let padding = 50;
        let maxValue = d3.max(dataset, d => d[1]);
        let band = dataset.map(value => value[0])
        let xScale = d3.scaleBand().domain(band).range([padding, width]).padding(0.1).round(true);
        let yScale = d3.scaleLinear().domain([dataset[0][1] / 1.5, maxValue]).range([height - padding, 0]);
        const xAxis = d3.axisBottom(xScale).tickFormat(d => d.toLocaleDateString('en-US')).tickSize(10);
        subSvg.append("g")
          .attr("id", "x-axis")
          .attr("transform", "translate(0," + (height - padding) + ")")
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)")
          .style("font-size",'2em')
          .style('color','white');
          
        const yAxis = d3.axisLeft(yScale).tickFormat(d=>String(d).replace(/0{3}$/g,"K"));
    
        subSvg.append("g")
          .attr("id", "y-axis")
          .attr("transform", `translate(${padding},0)`)
          .call(yAxis).selectAll("text").style("font-size",'2em')
          .style('color','white');
    
        subSvg.selectAll("rect").data(dataset).enter().append("rect").attr("class", "bar").attr("x", d => xScale(d[0]))
          .attr("y", d => yScale(dataset[0][1] / 1.5))
          .style("width", d => xScale.bandwidth())
          .attr("height", function(d) { return height - yScale(dataset[0][1] / 1.5)-padding; }) // always equal to 0
    
          .attr("data-date", (d, i) => (d[0]))
        
      subSvg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d) { return yScale(d[1]); })
      .attr("height", function (d) { return height - yScale(d[1])-padding; })
      .delay(function (d, i) { return (i * 50) })
      })
     }
      return ()=>{
        mounting=false;
      }
},[props.height,props.width,props.stateName])
return (
    <svg className="svg" ref={ref}></svg>
)

}

export default Chart;