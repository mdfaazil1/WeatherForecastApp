import React,{useEffect,useContext, useState} from "react";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Grid} from "@mui/material";
import UserContext from "../MyContext";
import { Pie } from "react-chartjs-2";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

Chart.register(CategoryScale);
const BarGrah=()=>{
    
  const [WindSpeed,setWindSpeed]=useState("");
  const {WeatherData,WeatherData1} = useContext(UserContext);

  useEffect(()=>{
    const windSpeed1=WeatherData1?.forecast?.forecastday[0]?.hour?.map((item)=>item.wind_kph);
    setWindSpeed(windSpeed1);
  },[WeatherData1])

  const WindSpeedL1=WeatherData?.forecast?.forecastday[0]?.hour?.map((item)=>item.wind_kph);
  const timeLabels = WeatherData?.forecast?.forecastday[0]?.hour?.map(
    (item) =>
      new Date(item.time).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
  );

  const data1 = {
    labels: timeLabels,
    datasets: [
      {
        label: `Wind Speed(Km/h) in ${WeatherData?.location?.name} `,
        backgroundColor:"orange",
        borderColor: "black",
        data: WindSpeedL1,
      },
      {
        label: `Wind Speed(Km/h) in ${WeatherData1?.location?.name} `,
        backgroundColor:"brown",
        borderColor: "black",
        data: WindSpeed,
      },
    ],
  };
    return(
        <>
            <Bar data={data1}/>
        </>
    );
}
export default BarGrah;