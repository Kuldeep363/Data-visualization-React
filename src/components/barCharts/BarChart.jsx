import React, { useMemo } from 'react'
import ReactEcharts from "echarts-for-react";
import { useState } from 'react';
import data from '../../data'; // importing the data source

function BarChart({x,y}) {
    let [roundOff, setRoundOff] = useState(false);

    // Getting data from data source and converting it into an object with key as category and their value as average
    // used memo because data set may be so huge and we are toggling round off the average value, we can't perform this calculation for
    // everytime we toggle, hence i am caching the values for [x,y]( passed to component)

    // now it will not recalculate value for roundOff toggle
    const categoryObject = useMemo(()=>{
      console.log('calc')
      return data.reduce((category,d)=>{
        category['sum'][d[x]] = category['sum'][d[x]]+ d[y] || d[y];
        category['count'][d[x]] = category['count'][d[x]]+ 1 || 1;
        return category;
      },{'sum':{},'count':{}})
 
    },[x,y]);

    const setRoundOffValue = ()=>{
      setRoundOff(!roundOff);
    }
    
    const xData = Object.keys(categoryObject['sum']); // seperating keys as categories for x-axis

    //getting sum and count for calculating avegare
    const sum = Object.values(categoryObject['sum']); 
    const count1 = Object.values(categoryObject['count'])

    // calculating average for y-axis, according the roundOff variable value
    const yData = roundOff? sum.map((value,i)=>(value/count1[i]).toFixed(2)) : sum.map((value,i)=>value/count1[i]);
   
    //Chart style
    const style = { 
        height: "80vh",
        width: "95%"
    };
    
    const options = {
        legend:{
            left:'center'
        },
         xAxis: [{
          type: "category",
          data: xData,
          name: x,
          nameLocation: "middle",
          nameTextStyle: {
            align: "center",
            padding: [10, 4, 4, 4]
          },
        }],
        yAxis: {
          type: 'value',
          name: y,
          nameLocation: "middle",
          nameTextStyle: {
            align: "center",
            padding: [10, 4, 4, 4]
          },
        },
        series: [
          {
            data: yData,
            type: 'bar',
            smooth: true,
            name:y
          },
        ],
        tooltip: {
          trigger: 'axis',
        },
        title: {
          text: `Bar Chart`,
          subtext: '',
          left: "center",
          top: "bottom",
          textStyle: {
            fontSize: 18
          },
        }
      };

  return (
    <>
    <div style={{textAlign:'center',margin:'10px 0'}}>
        <input type="checkbox" name="roundOff" id="roundOff" style={{marginRight:'5px'}} onChange={()=>setRoundOffValue()} />
        <label htmlFor="roundOff">Round off data</label>
    </div>
      <ReactEcharts option={options} style={style}  />
    </>
  )
}

export default BarChart