import { Button } from "@mui/material";
import axios from "axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { HistoricalChart, chartDays } from "../../../data";
import './chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = () => {
  const { id } = useParams();
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [predict, setPredict] = useState(false);
  const [activeButton, setActiveButton] = useState('days'); // 'days' or 'predict'
  // eslint-disable-next-line
  const [_, setflag] = useState(false);
  const fetchCoin = async () => {
    const { data } = await axios.get(HistoricalChart(id, days));
    setflag(true);
    setHistoricData(data.prices);
    console.log('api data',data.prices);
  };
  const fetchPredictCoin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'GET',
        withCredentials: true,
        /*crossorigin: true,
        mode: 'no-cors',*/
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setflag(true);
      setHistoricData(data);
      console.log('Predicted Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  useEffect(() => {
    if (predict && activeButton === 'predict'){
      fetchPredictCoin();
    }else{fetchCoin();}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, predict, id]);

  const handleButtonClick = (value) => {
    setActiveButton(value);
    setDays(value === 'predict' ? 1 : value); // Si le bouton est 'predict', réinitialisez les jours à 1
    setPredict(value === 'predict'); // Si le bouton est 'predict', activez la prédiction
  };
  

  return (
    <div className="chart">
      <Line
              data={{
                labels: historicData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData?.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in usd`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays?.map((day) => (
                <Button
                key={day.value}
                onClick={() => handleButtonClick(day.value)}
                selected={day.value === days && activeButton === 'days'}
              >
                {day.label}
              </Button>
              
              ))}
              { id === 'bitcoin' && (
                <Button
                onClick={() => handleButtonClick('predict')}
                selected={predict && activeButton === 'predict'}
              >
                Prediction
              </Button>
              
              )}
            </div>
    </div>
  );
};

export default Chart;