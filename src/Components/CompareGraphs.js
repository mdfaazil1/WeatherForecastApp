import React, { useContext, useState,useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Grid} from "@mui/material";
import UserContext from "../MyContext";
import { Pie } from "react-chartjs-2";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

Chart.register(CategoryScale);

const CompareChart = () => {
  const {WeatherData,WeatherData1} = useContext(UserContext);
    console.log("from Compare Graphs", WeatherData1)
  const [selectedUnit, setSelectedUnit] = useState("celsius"); // Initial unit
  const [TempData1,setTempData1]=useState("");

  useEffect(()=>{
  if(WeatherData1){
    const temperatureData1 = selectedUnit === "celsius"
    ? WeatherData1?.forecast?.forecastday[0]?.hour?.map((item) => item.temp_c)
    : WeatherData1?.forecast?.forecastday[0]?.hour?.map((item) => item.temp_f);
    setTempData1(temperatureData1);
  }},[WeatherData1,selectedUnit])

  
  const temperatureData = selectedUnit === "celsius"
    ? WeatherData?.forecast?.forecastday[0]?.hour?.map((item) => item.temp_c)
    : WeatherData?.forecast?.forecastday[0]?.hour?.map((item) => item.temp_f);

  const timeLabels = WeatherData?.forecast?.forecastday[0]?.hour?.map(
    (item) =>
      new Date(item.time).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
  );

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: ` Hourly Temp in ${WeatherData?.location.name}`,
        backgroundColor: `${selectedUnit==="celsius"?"skyblue":"yellow"}`,
        borderColor: "black",
        data: temperatureData,
      },
      {
        label: ` Hourly Temp in ${WeatherData1?.location?.name}`,
        backgroundColor: `${selectedUnit==="celsius"?"blue":"orange"}`,
        borderColor: "brown",
        data: TempData1,
      },
    ],
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  return (
    <>
      <Line data={data} />
      <FormControl component="fieldset">
        <RadioGroup
          row
          name="temperatureUnit"
          value={selectedUnit}
          onChange={handleUnitChange}
        >
          <FormControlLabel
            value="celsius"
            control={
              <Radio
                sx={{
                  color: "blue", 
                  "&.Mui-checked": {
                    color: "brown", 
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "12px",
                  },
                }}
              />
            }
            label={<Typography variant="h5">Celsius</Typography>}
          />
          <FormControlLabel
            value="fahrenheit"
            control={
              <Radio
                sx={{
                  
                  color: "blue", 
                  "&.Mui-checked": {
                    color: "brown", 
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: "12px", 
                  },
                }}
              />
            }
            label={<Typography variant="h5">Farenheit</Typography>}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CompareChart;
