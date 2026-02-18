import type { AssetClass } from "../components/instruments-table/types";

export const assetClassPriority: Record<AssetClass, number> = {
  Equities: 0,
  Macro: 1,
  Credit: 2,
};
