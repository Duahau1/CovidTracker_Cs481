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
  
    export default legend;