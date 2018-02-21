import React from 'react';
import styles from './cryptoStockHome.css';

const posStyle = {
  color: 'darkgreen',
  marginLeft: '5px'
};
const negStyle = {
  color: 'red',
};
const spanStyle = {
  marginLeft: '10px'
};

export const CryptoStockChartNameContainer = ({stock, detailedStock}) => {
  const stock_ch = parseFloat(stock.percent_change_1h);
  const price_ch = parseFloat(stock.price_usd) * (stock_ch/ 100);
  return (
    <div className={styles.cryptoStockChartNameContainer}>
      <div className={styles.cryptoStockChartNameContainerLeft}>
        <div style={{ fontSize: '50px' }}>
          {`$${stock.price_usd}`}
        </div>
        <div style={stock_ch > 0 ? posStyle : negStyle}>
           {`$${price_ch}`} <span style={spanStyle}>{`${stock.percent_change_1h}%`}</span>
        </div>
        <div style={{ color: '#C4CBD1' }}>
            Last Updated 4:34PM (US CST)
        </div>
      </div>
      <div className={styles.cryptoStockChartNameContainerRight}>
        <div style={{ paddingTop: '55px', fontSize: '20px' }}>
          {stock.symbol}
        </div>
        <div style={{ color: '#C4CBD1' }}>
          {stock.name}
        </div>
      </div>

      <div />
    </div>

  );
};
