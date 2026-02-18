import data from '../assets/sampleData.json';
import type { Instrument, AssetClass } from '../components/instruments-table/types';

export const fetchInstruments = async (): Promise<Instrument[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data.map(item => ({
      ...item,
      assetClass: item.assetClass as AssetClass
    }))), 500);
  });
};
