// components/TickerDisplay.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from '@/styles/TickerDisplay.module.css';

const TickerDisplay = ({ currentStock }) => {
  const { ticker, currentPrice, lastClose } = currentStock;
  const priceChange = currentPrice - lastClose;
  const priceChangePercent = ((priceChange / lastClose) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  return (
    <div className={styles.tickerDisplay}>
      <span className={styles.ticker}>{ticker}</span>
      <span className={`${styles.price} ${isPositive ? styles.priceSuccess : styles.priceDanger}`}>
        {currentPrice.toFixed(2)}
      </span>
      <span className={`${styles.change} ${isPositive ? styles.changeSuccess : styles.changeDanger}`}>
        ({isPositive ? '+' : ''}{priceChangePercent}%)
      </span>
    </div>
  );
};

TickerDisplay.propTypes = {
  currentStock: PropTypes.shape({
    ticker: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    lastClose: PropTypes.number.isRequired,
  }).isRequired,
};

export default TickerDisplay;
