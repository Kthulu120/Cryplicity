import React from "react";
import {Cell, Label, Legend, Pie, PieChart} from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">

      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export const WalletChart = ({wallets}) => {

    return (
      <PieChart width={500} height={400}>
        <Label value="Portfolio By Coin" position="bottom" />
        <Legend />
        <Pie
          data={wallets}
          dataKey={'balance'}
          nameKey={'name'}
          labelLine={false}
          isAnimationActive={false}
          label={renderCustomizedLabel}
          outerRadius={180}
          fill="#8884d8"
        >
          {
            wallets.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>

    )
}
