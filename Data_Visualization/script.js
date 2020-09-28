let searchState;
let selectedInterval;
let oldSelectedInterval;
let legendChange = false;
let navigate = null;
import {chartPlot} from "./controller/chartplot.js"
import {table} from "./controller/tabularview.js"
document.getElementById("search").addEventListener('click', () => {
  let input = document.getElementById("state").value;
  navigate = "search";
  document.getElementById("state").value = null;
  if (input == "") {
    searchState = undefined;
    ["svg", "h1",".ui.error.message"].forEach(value => d3.select("#container").selectAll(value).remove().exit());
  }
  else {
    ["svg", "h1",".ui.error.message"].forEach(value => d3.select("#container").selectAll(value).remove().exit());

    searchState = input;
    chartPlot(input);
    

  }
  d3.selectAll('rect').style('opacity', 1)
  render(searchState);
})

var body = d3.select("body");
var margin = {top: 20, right: 20, bottom: 60, left: 50};
var width = 975 -margin.left-margin.right;
var height = 610-margin.top-margin.bottom;
var svg = d3.select("svg").attr("viewBox", [0, 0, width+margin.left+margin.right,height+margin.top+margin.bottom])

var tooltip = body.append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

const COUNTY = "https://d3js.org/us-10m.v1.json";
const EDU = "https://corona.lmao.ninja/v2/states";
const fipsState = "./fipstostate.json";
const pathGenerator = d3.geoPath();

let render = (param) => {
  Promise.all([fetch(COUNTY), fetch(EDU), fetch(fipsState)])
    .then(result => Promise.all(result.map(v => v.json())))
    .then(([data, edu, fipsData]) => {
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
        map.set(value.state, [value.cases, value.deaths, value.state])
      })
      let max = edu.reduce((prev, curr) => Math.max(prev, curr.cases), edu[0].cases);
      let min = edu.reduce((prev, curr) => Math.min(prev, curr.cases), edu[0].cases);
      /*
       * Graph color legend
       *
       */
      if (legendChange == false) {
        legend({
          color: d3.scaleThreshold(d3.range(min, max, Math.round((max - min) / 6)), d3.schemeReds[7]),
          tickSize: 0,
        })
      }

      /*
      * Graph choropleth with tooltip effect
      *
      */
      let threshold = d3.scaleThreshold().domain(d3.range(min, max, (max - min) / 6))
        .range(d3.schemeReds[7]);
      let paths = svg.selectAll('path').remove()
        .exit().data(county.features).enter().append('path')
        .attr('class', 'county')
        .attr('d', d => pathGenerator(d))
        .style('fill', d => {
          if (map.get(d.name) != undefined) {
            map.get(d.name).push(threshold(map.get(d.name)[0]));
            return threshold(map.get(d.name)[0])
          }
        })
        .style('opacity', d => {
          if (searchState != undefined) {
            if (map.get(d.name)[2] == searchState) {
              return 1;
            }
            else {
              return 0.1;
            }
          }
          if (selectedInterval == undefined || (oldSelectedInterval === selectedInterval)) {
            oldSelectedInterval = selectedInterval = undefined;
            navigate = null;
            return 1;
          }
          else {
            if (map.get(d.name)[3] === selectedInterval) {
              return 1;
            }
            else {
              return 0.1;
            }
          }
        })

        .on('mouseover', (d, i) => {
          tooltip.style('opacity', 0.9);
          tooltip.html(() => {
            let arr = map.get(d.name)
            return arr[2] + "," + arr[0] + " cases";
          })
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function (d) {
          tooltip.style("opacity", 0);
        });
      oldSelectedInterval = selectedInterval;
    })
}
render(undefined);


/*
* Draw legend
*
*/

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

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));

    svg.append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(color.copy()
      .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
      { range() { return [marginLeft, width - marginRight]; } });

    svg.append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
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
        selectedInterval = d;
        console.log(selectedInterval + " " + oldSelectedInterval)

        if (selectedInterval == oldSelectedInterval || navigate == 'search') {
          d3.selectAll('rect').style('opacity', 1);
        }
        else {
          legendChange = true;
          arr.forEach((value, index, arr) => {
            if (index != i) {
              d3.select(arr[index]).style('opacity', 0.2);
            }
            else {
              d3.select(arr[index]).style('opacity', 1);
            }
          })
        }
        render(selectedInterval);
      })
      ;

    tickValues = d3.range(thresholds.length);
    tickFormat = i => thresholdFormat(thresholds[i], i);
  }

  // Ordinal
  else {
    x = d3.scaleBand()
      .domain(color.domain())
      .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
      .attr("x", x)
      .attr("y", marginTop)
      .attr("width", Math.max(0, x.bandwidth() - 1))
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", color)
      ;
    tickAdjust = () => { };
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
export{width,height,body,tooltip}