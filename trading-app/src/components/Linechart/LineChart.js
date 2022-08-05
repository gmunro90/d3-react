import { useEffect, createRef, useState } from "react";
import * as d3 from "d3";
import "./LineChart.css";

const yData = [];
const xData = [];

const width = 800;
const height = 450;

let svg;
let yAxisG
let xAxisG

const LineChart = () => {
  const elRef = createRef();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (elRef && elRef.current) {
      if (!svg) {
        d3.select(elRef.current).select('svg').remove()
        svg = d3
          .select(elRef.current)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          yAxisG = svg.append('g')
          xAxisG =  svg.append("g")
          getData()
      }
    }
  }, [elRef]);

  useEffect(() => {
    if (data) {
      main();
    }
  }, [data]);

  useEffect(() => {
    return () => {
      svg.remove()
      svg = null
    }
  }, [])

  async function getData() {
    const response = await fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=ZV7DIFPQUWYA1LD0"
    );
    const d = await response.json()
    setData(d);
  }

  async function main() {
    console.log('testing')
    for (let key in data["Time Series (Daily)"]) {
      yData.push(+data["Time Series (Daily)"][key]["4. close"]);
      xData.push(new Date(key));
    }

    // console.log('parsed data', yData)
    // console.log('dates', xData)

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(yData), d3.max(yData)])
      .range([height - 110, 0]);
    const y_axis = d3.axisLeft(yScale);
    yAxisG.attr("transform", "translate(50, 50)").call(y_axis);

    const xScale = d3
      .scaleTime()
      .domain([xData[0], xData.pop()])
      .range([0, 600]);
    const x_axis = d3.axisBottom(xScale);
    xAxisG.attr("transform", "translate(50, 390)").call(x_axis);
  }

  //hard coded line
  // svg
  // .append("line")
  // .attr("x1", 50)
  // .attr("y1", 300)
  // .attr("x2", 300)
  // .attr("y2", 200)
  // .attr("stroke", "lightblue");

  // const fakeData = [
  //   { x: 0, y: 20 },
  //   { x: 150, y: 150 },
  //   { x: 300, y: 100 },
  //   { x: 450, y: 20 },
  //   { x: 600, y: 130 },
  // ]

  //   let line = d3.line()
  //   let result = line(fakeData)
  //   console.log('line results', result)

  // const line = d3.select('#line').append('svg').attr("width", 800).attr("height", 200)

  // const lineFunc = d3.line()
  //   .x(function(d) { return d.x })
  //   .y(function(d) { return d.y })

  //   line.append('path')
  //   .attr('d', lineFunc(fakeData))
  //   .attr('stroke', 'black')
  //   .attr('fill', 'none')

  return <div ref={elRef}></div>;
};

export default LineChart;
