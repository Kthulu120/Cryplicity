import React from 'react';
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import styles from './HistoricalPriceChart.css';

export const HistoricalPriceChart = ({data}) => (
  <div className={styles.historicalPriceChart} style={{color: 'rgb(124, 122, 174)',
  display: 'display', flexDirection: 'column', width: '60%',
    textAlign: 'center'}}>
    Price($USD) Over Time
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}
    >
      <XAxis hide name={"Days over Course of Month"} dataKey="time" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3"/>
      <Tooltip />
      <Legend />
      <Line type="linear" dot={false} activeDot dataKey="high" stroke="#8dbc78"/>
      <Line type="linear" dot={false} activeDot dataKey="low" stroke="#820e1f"/>
      <Line type="linear" dot={false} activeDot dataKey="close" stroke="#896f22"/>
    </LineChart>
  </div>
);
