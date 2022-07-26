import React, { useEffect, useRef} from "react";
import * as d3 from 'd3'
import './LineChart.css'

const LineChart = () => {
const d3Chart = useRef()

const newData = []

  //Y axis data
const myData =  useEffect(() => {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=ZV7DIFPQUWYA1LD0')
    .then(response => response.json())
    .then(data => {
      for (let key in data["Time Series (Daily)"]) {
         newData.push(data["Time Series (Daily)"][key]["4. close"])
        }
      })
      console.log(newData)
  })


const width = 500
const height = 500

const svg = d3.select('body')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .attr('class', 'container')


const yscale = d3.scaleLinear()
            .domain([d3.min([newData]), d3.max([newData])])
            .range([height - 50, 0]);


const y_axis = d3.axisLeft(yscale);

svg.append("g")
.attr("transform", "translate(100, 10)")
.call(y_axis)

  // return (
  //   <div>
  //     {/* <svg ref={d3Chart}></svg> */}
  //   </div>
  // )
}

export default LineChart