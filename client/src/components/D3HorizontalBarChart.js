import React, {useEffect} from "react";
import * as d3 from "d3";

function D3HorizontalBarChart( { data } )
{
    const ref = React.useRef();

    useEffect(() => {

        const maxYYY = data.reduce((acc, shot) => acc = acc > shot.yyy ? acc : shot.yyy, 0);

        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 30, bottom: 40, left: 90},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        ref.current.innerHTML = '';
        var svg = d3.select(ref.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");



        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, maxYYY])
            .range([ 0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        var y = d3.scaleBand()
            .range([ 0, height ])
            .domain(data.map(function(d) { return d.xxx; }))
            .padding(.1);
        svg.append("g")
            .call(d3.axisLeft(y))

        //Bars
        svg.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0) )
            .attr("y", function(d) { return y(d.xxx); })
            .attr("width", function(d) { return x(d.yyy); })
            .attr("height", y.bandwidth() )
            .attr("fill", "#1765C0");

        return () => {};
    }, [data.length]);

    return <svg
        ref={ref}
        style={{
            height: 400,
            width: 500,
            marginRight: "0px",
            marginLeft: "0px",
        }}
    >
        <g className="plot-area" />
        <g className="x-axis" />
        <g className="y-axis" />
    </svg>;
}
export default D3HorizontalBarChart