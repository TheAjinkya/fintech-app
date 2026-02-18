import { useState } from 'react';

type Props = {
  onSort: (field: 'ticker' | 'price' | 'assetClass') => void;
};
const SortIcon = ({ active }: { active: boolean }) => (
  <span style={{ opacity: active ? 1 : 0.3 }}>↕</span>
);

export const TableHeader = ({ onSort }: Props) => {
  const [current, setCurrent] = useState<'ticker' | 'price' | 'assetClass' | null>(null);

  const handleSort = (field: 'ticker' | 'price' | 'assetClass') => {
    setCurrent(field);
    onSort(field);
  };

  return (
    <thead>
      <tr>
        <th><button onClick={() => handleSort('ticker')}>Ticker</button></th>
        <th>
          <button onClick={() => handleSort('price')}>
            Price <SortIcon active={current === 'price'} />
          </button>
        </th>
        <th><button onClick={() => handleSort('assetClass')}>Asset Class</button></th>
      </tr>
    </thead>
  );
};
