import React,{useEffect,useRef} from 'react';
import * as d3 from "d3";
import './Modal.css'

function numberWithCommas(x){
    return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
const ModalContent = (props)=>{
    const ref = useRef(null);
    const createPie = d3
      .pie()
      .value(d => d)
      .sort(null);
    const createArc = d3
      .arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);
  
    useEffect(
      () => {
        const data = createPie(props.data);
        const group = d3.select(ref.current);
        const groupWithData = group.selectAll("g.arc").data(data);
        groupWithData.exit().remove();
        const groupWithUpdate = groupWithData
          .enter()
          .append("g")
          .attr("class", "arc");
  
        const path = groupWithUpdate
          .append("path")
          .merge(groupWithData.select("path.arc"));
  
        path
          .attr("class", "arc")
          .attr("d", createArc)
          .attr("fill", (d, i) => colors(i));
          
  
        const text = groupWithUpdate
          .append("text")
          .merge(groupWithData.select("text"));
  
        text
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("transform", d => `translate(${createArc.centroid(d)})`)
          .style("fill", "white")
  
      },
      [props.data,colors, createArc,createPie]
    );
return (
<div className="panel">
<h1 style={{fontSize: '1.8rem',color:'#fff'}}>{props.name.name}</h1>
<div style={{fontSize: '1.2rem',color:'#fff',opacity: '0.6'}}>COVID-19 STATUS</div>
<hr/>
<div className="modal_info">
<div className="info_block" style={{color:colors(0),fontSize:'1.3em'}}>{numberWithCommas(props.name.caseperM)}<br/>active<br/></div>
<div className="info_block" style={{color:colors(1),fontSize:'1.3em'}}>{numberWithCommas(props.name.deathsperM)}<br/>deaths<br/></div>
<div className="info_block" style={{color:colors(2),fontSize:'1.3em'}}>{numberWithCommas(props.name.testperM)}<br/>test<br/></div>
</div>
<div style={{fontSize: '0.8rem',color:'#fff',opacity: '0.6'}}>cases per millions in {props.name.name}</div>
<hr/>
<svg id="donut" viewBox={"0 0 "+ props.width + " " + props.height}>
      <g
        ref={ref}
        transform={`translate(${props.outerRadius} ${props.outerRadius})`}
      />
</svg>
<div className="modal_info">
<div className="info_block" style={{color:colors(0),fontSize:'1.3em'}}>{numberWithCommas( props.data[0])}<br/>active<br/></div>
<div className="info_block" style={{color:colors(1),fontSize:'1.3em'}}>{numberWithCommas(props.data[1])}<br/>deaths<br/></div>
<div className="info_block" style={{color:colors(2),fontSize:'1.3em'}}>{numberWithCommas(props.data[2])}<br/>recoveries<br/></div>
</div>
</div>
)

}
export default ModalContent;