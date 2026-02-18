import type { Instrument } from '../components/instruments-table/types';
import { assetClassPriority } from './assetClassConfig';

export const sortByTicker = (data: Instrument[]) =>
  [...data].sort((a, b) => a.ticker.localeCompare(b.ticker));

export const sortByPriceDesc = (data: Instrument[]) =>
  [...data].sort((a, b) => b.price - a.price);

export const sortByAssetClass = (data: Instrument[]) =>
  [...data].sort(
    (a, b) =>
      assetClassPriority[a.assetClass] -
      assetClassPriority[b.assetClass]
  );
