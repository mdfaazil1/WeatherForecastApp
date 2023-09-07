import React, { useState } from "react";
import axios from "axios";

export async function GetData(q,days){    
      const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params:{q,days},
        headers: {
          'X-RapidAPI-Key': 'f975f26eb2mshe985ed1001f4ea5p1c87e4jsnb3e181c3e99b',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        },
      };

      try {
        console.log("check5 q",q);
        const response=await axios.request(options);
        console.log("check from api.js",response.data)
        return response.data;
      } catch (error) {
        console.error(error);
        console.log("From api.js error",q);
    if (error.response && error.response.status === 400) {
      throw new Error("Invalid input. Please check the location and try again.");
    }
    throw new Error("An error occurred while fetching data. Please try again later.");
  } 
}