import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "../components/ui/chart"

interface CandleData {
    candle_acc_trade_price: number;
    candle_acc_trade_volume: number;
    candle_date_time_kst: string;
    candle_date_time_utc: string;
    first_day_of_period: string;
    high_price: number;
    low_price: number;
    market: string;
    opening_price: number;
    timestamp: number;
    trade_price: number;
}

interface ICoinChart{
    first_day_of_period:string;
    high_price:number;
    low_price:number;
    
}

// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
//   ]
   
  const chartConfig = {
    highPrice: {
      label: "highPrice",
      color: "#EF4444",
    },
    lowPrice: {
      label: "lowPrice",
      color: "#3B82F6",
    },
  } satisfies ChartConfig

export function CoinChart() {
 
  const [chartData , setChartData] = useState<ICoinChart[]>([])

 
  useEffect(()=>{
    getCoinChartData()
  },[])

  const getCoinChartData = ()=>{
    axios.get(`https://api.bithumb.com/v1/candles/months?market=${id}&count=24`)
    .then(response => {
        const allData: CandleData[] = response.data
        const selectedData = allData.map(({ first_day_of_period, high_price, low_price }) => ({
            first_day_of_period,
            high_price,
            low_price,
        })).reverse();
        setChartData(selectedData)
    }
    )
    .catch(err => console.error(err))

    
  }
  console.log(chartData)

  
  const {id} = useParams()

  return (
    <ChartContainer config={chartConfig} className="max-h-[600px] w-full">
      <BarChart accessibilityLayer data={chartData} >
        <CartesianGrid vertical={false}  />
        <XAxis
          dataKey="first_day_of_period"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value}
          tick={{
            fill: 'white',  
            fontSize: 12,       
            fontWeight: 'bold', 
          }}
        />
        <ChartTooltip content={<ChartTooltipContent/>} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="high_price" fill="var(--color-highPrice)" radius={4} />
        <Bar dataKey="low_price" fill="var(--color-lowPrice)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
