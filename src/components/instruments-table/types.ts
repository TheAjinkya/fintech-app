export type AssetClass = 'Equities' | 'Macro' | 'Credit';

export interface Instrument {
  ticker: string;
  price: number;
  assetClass: AssetClass;
}
