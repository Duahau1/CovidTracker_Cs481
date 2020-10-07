const dataset =[12,11,10,9,8,7,3]
const svg = d3.select('body').append('svg').attr('width',960).attr('height',500);
const padding=20;
const xScale = d3.scaleBand().domain(dataset).rangeRound([padding,d3.select('svg').attr('width')]).padding(0.1);
const yScale = d3.scaleLinear().domain([0,d3.max(dataset)+2]).range([d3.select('svg').attr('height')-padding,0]);
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);
svg.selectAll('rect')
.data(dataset).enter()
.append('rect')
.style('fill','red')
.attr('x',d=>xScale(d))
.attr('y',d=>yScale(d))
.attr('width',xScale.bandwidth())
.attr('height',d=>d3.select('svg').attr('height')-padding-yScale(d))
svg.append('g').attr("transform", "translate(0, " + (d3.select('svg').attr('height')-padding) + ")")
.call(xAxis);
svg.append('g').attr("transform", "translate("+ padding + ",0)")
.call(yAxis);
