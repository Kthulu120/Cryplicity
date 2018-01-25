import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { coinDictionary } from '../../lib/coins/coinList';

export const CoinPriceChart = ({ coins, data }) => (
  <LineChart
    width={500}
    height={300}
    data={data}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    {coins.map(coin => (
      <Line
        type="solid"
        dataKey={coin.name}
        stroke={coinDictionary[coin.id].color}
      />
    ))}
  </LineChart>

);
