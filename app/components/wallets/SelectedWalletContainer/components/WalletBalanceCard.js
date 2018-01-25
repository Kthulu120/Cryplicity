import React from "react";
import styles from './WalletBalanceCard.css';
import {Area, AreaChart, Pie, PieChart, Tooltip} from "recharts";

const data = [
  {name: 'Page A', uv: 435, pv: 2400, amt: 2400},
  {name: 'Page B', uv: 700, pv: 1398, amt: 2210},
  {name: 'Page C', uv: 1400, pv: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data01 = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const data02 = [{name: 'Bitcoin', value: 2400}, {name: 'Ethereum', value: 4567},
  {name: 'Ripple', value: 1398}, {name: 'Dash', value: 9800}];
export const WalletBalanceCard = () => {

  return (
    <div className={styles.walletAggContainer}>
      <div className={styles.walletAggInfoContainer}>
        <img alt="" src='https://i.imgur.com/astSmE8.png' className={styles.walletMainHeaderImg} height="80px" />
        <div className={styles.walletAggInfo}>
          <div className={styles.walletAggText}>
            Total Balance
          </div>
          <div className={styles.walletAggTotal}>
            $4,320
          </div>
        </div>
      </div>
      <div className={styles.walletMainGraphContainer}>
        <AreaChart width={300} height={100} data={data}
                   margin={{top: 5, right: 0, left: 0, bottom: 5}}>
          <Area type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' strokeWidth={5} />
        </AreaChart>
      </div>
    </div>

  );
}
