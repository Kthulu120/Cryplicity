import React from 'react';
import styles from './cryptoStockHome.css';
import { Legend, Line, LineChart, ReferenceLine, Tooltip } from 'recharts';
import PropTypes from 'prop-types';

const changeSelectedTab = () => {

};

export const CryptoStockGraphic = ({ chartData, selectedTab }) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div className={styles.cryptoStockChartGraph}>
      <LineChart
        width={1000}
        height={400}
        data={this.state.selectedChartData}
        margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
        className={styles.mainChartGraphic}
      >
        <Tooltip />
        <Legend />
        <ReferenceLine y={chartData.length > 0 ? chartData[0].close : 0} strokeDasharray="2 1" stroke="#AEB9C2" />
        <Line type="monotone" dataKey="close" dot={false} activeDot stroke="#82ca9d" />
      </LineChart>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
      <div className={selectedTab === 0 ? styles.activeTab : styles.regularTab} onClick={(e) => { changeSelectedTab(0); }}>1 Days</div>
      <div className={selectedTab === 1 ? styles.activeTab : styles.regularTab} onClick={(e) => { changeSelectedTab(1); }}>1 Week</div>
      <div className={selectedTab === 2 ? styles.activeTab : styles.regularTab} onClick={(e) => { changeSelectedTab(2); }}>1 Month</div><div className={selectedTab === 3 ? styles.activeTab : styles.regularTab} onClick={(e) => { changeSelectedTab(3); }}>6 Months</div>
      <div className={selectedTab === 4 ? styles.activeTab : styles.regularTab} onClick={(e) => { changeSelectedTab(4); }}>1 Year</div>
    </div>
  </div>

    );


CryptoStockGraphic.propTypes = {
  chartData: PropTypes.arrayOf.object.isRequired,
  selectedTab: PropTypes.number.isRequired,
};
