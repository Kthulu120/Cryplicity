import React from 'react';
import styles from './cryptoStockHome.css';
import { abbreviateNumber, slugify } from '../../lib/commons/util';
import { coinDictionary } from '../../lib/coins/coinList';

const NumberConverter = require('number-converter').NumberConverter;


const nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.SCIENTIFIC_NOTATION);

export const CryptoStockInformation = ({ stock, detailedStock }) => (
  <div className={styles.cryptoStockInformation}>
    <div className={styles.cryptoStockInformationColumn}>

      <h5 className={styles.cryptoStockInformationLabel}>Stats</h5>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              OPEN
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {detailedStock.open}
        </div>
      </div>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              HIGH
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {detailedStock.high}
        </div>
      </div>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              LOW
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {detailedStock.low}
        </div>
      </div>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              AVAIL SUPLY
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {abbreviateNumber(parseFloat(stock.available_supply))}
        </div>
      </div>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              TOT SUPLY
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {abbreviateNumber(parseFloat(stock.total_supply))}
        </div>
      </div>
    </div>
    <div className={styles.cryptoStockInformationColumnTwo}>

      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              VOL FROM
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {abbreviateNumber(parseFloat(detailedStock.volumefrom))}
        </div>
      </div>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              VOL TO
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {abbreviateNumber(parseFloat(detailedStock.volumeto))}
        </div>
      </div>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              MKT CAP
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {`$ ${abbreviateNumber(parseFloat(stock.market_cap_usd)).toString()}`}
        </div>
      </div>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              PRICE USD
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {(parseFloat(stock.price_usd)).toExponential(2)}
        </div>
      </div>
      <div className={styles.cryptoStockInformationRowCon}>
        <div className={styles.cryptoStockInformationStatKey}>
              PRICE BTC
        </div>
        <div className={styles.cryptoStockInformationStatValue}>
          {(parseFloat(stock.price_btc)).toExponential(2)}
        </div>
      </div>

    </div>
    <div className={styles.cryptoStockInformationColumnAbout}>
      <h5 className={styles.cryptoStockInformationLabel}>About</h5>
      <div style={{
        display: 'flex',
        maxHeight: '125px',
        overflowX: 'auto',
        width: '100%'
      }}
      >{ slugify(stock.name) in coinDictionary ? coinDictionary[slugify(stock.name)].about : 'Information Not Available At This Time'}</div>
    </div>
  </div>

    );
