import styles from './instrumentsTable.module.css';
import type { Instrument } from './types';

export const TableRow = ({ instrument }: { instrument: Instrument }) => {
  const priceClass =
    instrument.price >= 0 ? styles.positive : styles.negative;

  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(instrument.price);

  return (
    <tr className={styles[instrument.assetClass]}>
      <td className={styles.ticker}>{instrument.ticker}</td>

      <td className={`${styles.price} ${priceClass}`}>
        {formattedPrice}
      </td>

      <td>{instrument.assetClass}</td>
    </tr>
  );
};
