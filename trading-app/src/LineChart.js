import React, { useEffect, useRef} from "react";
import * as d3 from 'd3'
import './LineChart.css'

const LineChart = () => {

  const d3Chart = useRef()

  //this is going to be your Y axis data
const myData =  useEffect(() => {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=ZV7DIFPQUWYA1LD0')
    .then(response => response.json())
    .then(data => {
    for (let key in data["Time Series (Daily)"]) {
        const close =
         console.log(data["Time Series (Daily)"][key]["4. close"])
      }
    })
  })

const width = 500
const height = 500

const svg = d3.select('body')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .attr('class', 'container')

// shopping list: 
// y axis line with
// data values plotted horizontally

const yAxis = svg.append("line")
   .attr("x1", 25)
   .attr("x2", 25)
   .attr("y1", 10)
   .attr("y2", 450)
   .attr("stroke", "black")



  // return (
  //   <div>
  //     {/* <svg ref={d3Chart}></svg> */}
  //   </div>
  // )
}

export default LineChart