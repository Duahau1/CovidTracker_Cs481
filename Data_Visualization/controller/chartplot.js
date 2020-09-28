import { tooltip, width, height, body } from "../script.js"
let chartPlot = function (stateName) {
  let url = `https://disease.sh/v3/covid-19/nyt/states/${stateName}`;
  //let url =`https://covidtracker-lac.vercel.app/api/server?stateName=${stateName}`
  d3.select('#state').attr('disabled','disabled');
  d3.select('#search').attr('class','ui loading button').attr('disabled','disabled');
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
    let div = d3.select("#container");
  
    div.append("h1").text(`Coronavirus Cases in ${stateName} last 30 days`);
    var margin = {top: 20, right: 20, bottom: 60, left: 50};

    let subSvg = div.append("svg").attr("class", "chart").attr("viewBox", [0, 0, width+margin.left+margin.right, height+margin.left+margin.right]);
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
      .style("font-size",20)
      ;
    const yAxis = d3.axisLeft(yScale).tickFormat(d=>String(d).replace(/0{3}$/g,"K"));

    subSvg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${padding},0)`)
      .call(yAxis).selectAll("text").style("font-size",20);

    subSvg.selectAll("rect").data(dataset).enter().append("rect").attr("class", "bar").attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(dataset[0][1] / 1.5))
      .style("width", d => xScale.bandwidth())
      .attr("height", function(d) { return height - yScale(dataset[0][1] / 1.5)-padding; }) // always equal to 0

      .attr("data-date", (d, i) => (d[0]))
      .on('mouseover', (d, i) => {
        tooltip.style('opacity', 0.9);
        tooltip.html(() => {
          return "Date: " + d[0].toLocaleDateString('en-US') + "\nCases: " + d[1];
        })
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        tooltip.style("opacity", 0);

      });
    // Animation
    subSvg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function (d) { return yScale(d[1]); })
      .attr("height", function (d) { return height - yScale(d[1])-padding; })
      .delay(function (d, i) { return (i * 100) }).on('end',(d,i)=>{
        if(i==29){
        d3.select('#state').attr('disabled',null);
        d3.select('#search').attr('class','ui primary button').attr('disabled',null);
        }
      })
    
  })
    .catch(error => {
      let div = d3.select("#container");
      div.append('div').attr('class',"ui error message").append('div').attr('class','header').text('Not found');
      d3.select('#state').attr('disabled',null);
      d3.select('#search').attr('class','ui primary button').attr('disabled',null);
      console.log(error);
    })
}
export { chartPlot }