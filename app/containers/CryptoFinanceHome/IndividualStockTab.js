import React from 'react';
import styles from './cryptoStockHome.css';
import { Line, LineChart, ReferenceLine } from 'recharts';

const NumberConverter = require('number-converter').NumberConverter;


const nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.SCIENTIFIC_NOTATION);

export const IndividualStockTab = ({ stock, onClickContainer }) => (
  <div className={styles.cryptosContainer} onClick={(e) => { onClickContainer(stock.symbol); }}>
    <div className={styles.cryptoNameContainer}>
      <div className={styles.cryptoName}>
        {stock.name.length < 17 ? stock.name : stock.name.substring(0, 10) + "..."}
      </div>
      <div className={styles.cryptoAmt}>
        {stock.symbol}
      </div>
    </div>
    <div className={styles.cryptoSmallChart}>
      <LineChart
        width={100}
        height={60}
        data={stock.chartData}
        margin={{ top: 20, right: 50, left: 20, bottom: 5 }}
        className="miniCryptoChart"
      >
        <ReferenceLine y={stock.chartData[0].price} strokeDasharray="2 1" stroke="#AEB9C2" />
        <Line type="monotone" dataKey="price" dot={false} stroke="#82ca9d" />
      </LineChart>
    </div>
    <div className={styles.stockButtonContainer}>
      <div className={styles.stockButton}>
        {parseFloat(stock.price_usd) < 0.00001 ? nc.convert(parseFloat(stock.price_usd)).toString() : `$${stock.price_usd}`}
      </div>
    </div>
  </div>

    );
