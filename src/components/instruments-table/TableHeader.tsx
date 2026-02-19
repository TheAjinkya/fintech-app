import styles from './instrumentsTable.module.css';

type SortField = 'ticker' | 'price' | 'assetClass';

type Props = {
  onSort: (field: SortField) => void;
  currentSort: SortField;
};

const SortIcon = ({ active }: { active: boolean }) => (
  <span style={{ opacity: active ? 1 : 0.25, fontSize: 12 }}>
    {active ? '↓' : '↕'}
  </span>
);

export const TableHeader = ({ onSort, currentSort }: Props) => {
  const getClass = (field: SortField) =>
    currentSort === field ? styles.activeSort : '';

  return (
    <thead>
      <tr>
        <th>
          <button
            className={getClass('ticker')}
            onClick={() => onSort('ticker')}
          >
            Ticker <SortIcon active={currentSort === 'ticker'} />
          </button>
        </th>

        <th>
          <button
             className={currentSort === 'price' ? styles.activeSort : ''}
            onClick={() => onSort('price')}
          >
            Price <SortIcon active={currentSort === 'price'} />
          </button>
        </th>

        <th>
          <button
            className={getClass('assetClass')}
            onClick={() => onSort('assetClass')}
          >
            Asset Class{' '}
            <SortIcon active={currentSort === 'assetClass'} />
          </button>
        </th>
      </tr>
    </thead>
  );
};
