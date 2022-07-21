import React, { useEffect, useRef} from "react";
import * as d3 from 'd3'
import './LineChart.css'

const LineChart = () => {

  const d3Chart = useRef()

  useEffect(() => {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=compact&apikey=ZV7DIFPQUWYA1LD0')
    .then(response => response.json())
    .then(data => {
      console.log(data["Time Series (Daily)"]["2022-07-20"]["4. close"])
      

      // const closing = data.filter(data => {
      //   return data === 'close'
      // })
    })
  })

  return (
    <div>
      <svg ref={d3Chart}></svg>
    </div>
  )
}

export default LineChart