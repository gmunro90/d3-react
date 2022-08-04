import * as d3 from 'd3'
import './LineChart.css'

const yData = []
const xData = []

const width = 800
const height = 450
const svg = d3.select('body')
              .append('svg')
              .attr('width', width)
              .attr('height', height)
              .attr('class', 'container')

const LineChart = () => {

async function main() {
  const response = await fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=ZV7DIFPQUWYA1LD0')
   const data = await (response.json())
        for (let key in data["Time Series (Daily)"]) {
        yData.push(+data["Time Series (Daily)"][key]["4. close"])
        xData.push(new Date(key))
        }

// console.log('parsed data', yData)
// console.log('dates', xData)

const yScale = d3.scaleLinear()
            .domain([d3.min(yData), d3.max(yData)])
            .range([height - 110, 0])
const y_axis = d3.axisLeft(yScale);
              svg.append("g")
              .attr("transform", "translate(50, 50)")
              .call(y_axis)

const xScale = d3.scaleTime()
                .domain([xData[0], xData.pop()])
                .range([0, 600])
const x_axis = d3.axisBottom(xScale)
              svg.append('g')
                  .attr('transform', 'translate(50, 390)')
                  .call(x_axis)

}
/*
let fakeData = [
  [0,10],
  [5,20],
  [15,75],
  [55,100],
] 

  let line = d3.line()
  let result = line(fakeData)
  console.log(result)

*/
  
svg.append('path')
  .datum(yData)
  .attr('fill', 'none')
  .attr('stroke', 'steelblue')
  .attr('stroke-width', 1.5)
  .attr('d', d3.line())

main()

  // return (
  //   <>
  
  //   </>
  // )


}

export default LineChart