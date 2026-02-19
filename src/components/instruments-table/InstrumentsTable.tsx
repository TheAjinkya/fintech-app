import { useMemo, useState } from 'react';
import styles from './instrumentsTable.module.css';
import {
  sortByAssetClass,
  sortByPriceDesc,
  sortByTicker,
} from '../../utils/sorters';
import { TableRow } from './TableRow';
import { TableHeader } from './TableHeader';
import type { Instrument } from './types';

type SortField = 'ticker' | 'price' | 'assetClass';

export const InstrumentsTable = ({ data }: { data: Instrument[] }) => {
  const [sortField, setSortField] = useState<SortField>('assetClass');

  const sortedData = useMemo(() => {
    switch (sortField) {
      case 'price':
        return sortByPriceDesc(data);
      case 'ticker':
        return sortByTicker(data);
      default:
        return sortByAssetClass(data);
    }
  }, [data, sortField]);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <TableHeader onSort={setSortField} currentSort={sortField} />
        <tbody>
          {sortedData.map((item) => (
            <TableRow key={item.ticker} instrument={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
