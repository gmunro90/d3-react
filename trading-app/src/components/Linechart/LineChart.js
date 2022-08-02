import React, { useRef } from "react";
import * as d3 from 'd3'
import './LineChart.css'

const width = 700
const height = 400
const svg = d3.select('body')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .attr('class', 'container')

              
const LineChart = () => {

const newData = []

//Y axis data
const myData =
  fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=ZV7DIFPQUWYA1LD0')
    .then(response => response.json())
    .then(data => {
      for (let key in data["Time Series (Daily)"]) {
         newData.push(data["Time Series (Daily)"][key]["4. close"])
        }
      })


console.log('pushed data', newData)

  const yScale = d3.scaleLinear()
            .domain([0, 160])
            .range([height - 110, 0])


const y_axis = d3.axisLeft(yScale);

svg.append("g")
  .attr("transform", "translate(50, 50)")
  .call(y_axis)

  // const d3Chart = useRef()

  // return (
  //   <div>
  //     {/* <svg ref={d3Chart}></svg> */}
  //   </div>
  // )
}

export default LineChart