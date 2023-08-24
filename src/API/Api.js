import React, { useState } from "react";
import axios from "axios";

export async function GetData(latitude,longitude,City){
    let q;
    let days;
    
    if (!City) {
      q = `${latitude},${longitude}`;
      days = '3';
    } else {
      q = City;
      days = '3';
    }
  
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
        const response=await axios.request(options);
        console.log("check from api.js",response.data)
        return response.data;
      } catch (error) {

        console.error(error);
      }     
}