import { describe, it, expect } from 'vitest';
import {
  sortByTicker,
  sortByPriceDesc,
  sortByAssetClass,
} from './sorters';
import type { AssetClass } from '../components/instruments-table/types';

const mockData: Array<{ ticker: string; price: number; assetClass: AssetClass }> = [
  { ticker: 'BETA', price: 200, assetClass: 'Equities' as AssetClass },
  { ticker: 'ALPHA', price: 300, assetClass: 'Credit' as AssetClass },
  { ticker: 'GAMMA', price: 100, assetClass: 'Macro' as AssetClass },
];

describe('sorters', () => {
  it('sorts by ticker alphabetically', () => {
    const result = sortByTicker(mockData);
    expect(result[0].ticker).toBe('ALPHA');
  });

  it('sorts by price descending', () => {
    const result = sortByPriceDesc(mockData);
    expect(result[0].price).toBe(300);
  });

  it('sorts by asset class priority', () => {
    const result = sortByAssetClass(mockData);
    expect(result[0].assetClass).toBe('Equities');
    expect(result[2].assetClass).toBe('Credit');
  });
});
