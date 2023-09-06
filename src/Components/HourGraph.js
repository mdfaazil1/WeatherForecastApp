import React, { useContext, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import UserContext from "../MyContext";
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";

Chart.register(CategoryScale);

const LineChart = () => {
  const weatherData = useContext(UserContext);

  const [selectedUnit, setSelectedUnit] = useState("celsius"); // Initial unit

  const temperatureData = selectedUnit === "celsius"
    ? weatherData?.forecast?.forecastday[0]?.hour?.map((item) => item.temp_c)
    : weatherData?.forecast?.forecastday[0]?.hour?.map((item) => item.temp_f);

  const timeLabels = weatherData?.forecast?.forecastday[0]?.hour?.map(
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
        label: `Temperature in ${selectedUnit === "celsius" ? "Celsius" : "Fahrenheit"}`,
        backgroundColor: `${selectedUnit==="celsius"?"skyblue":"yellow"}`,
        borderColor: "black",
        data: temperatureData,
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

export default LineChart;
