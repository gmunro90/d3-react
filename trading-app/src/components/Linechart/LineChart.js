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
const newData1 = []

async function main() {
  const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=ZV7DIFPQUWYA1LD0')
   const data = await (response.json())
        for (let key in data["Time Series (Daily)"]) {
        newData.push(+data["Time Series (Daily)"][key]["4. close"])
        newData1.push(new Date(key))

        }

console.log('parsed data', newData)
// console.log('dates', newData1)

const yScale = d3.scaleLinear()
            .domain([d3.min(newData), d3.max(newData)])
            .range([height - 110, 0])

const y_axis = d3.axisLeft(yScale);

svg.append("g")
  .attr("transform", "translate(50, 50)")
  .call(y_axis)

//X axis data
const xScale = d3.scaleTime()
                .domain([newData1[0], newData1.pop()])
                .range([0, 600])

const x_axis = d3.axisBottom(xScale)

svg.append('g')
    .attr('transform', 'translate(50, 340)')
    .call(x_axis)
}


main()

// svg.append('line')
//       .attr('x1', 10)
//       .attr('y1', 400)
//       .attr('x2', 700)
//       .attr('y2', 100)
//       .attr('stroke', 'blue')

  // const d3Chart = useRef()

  // return (
  //   <div>
  //     {/* <svg ref={d3Chart}></svg> */}
  //   </div>
  // )
}

export default LineChart