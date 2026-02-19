import { useEffect, useState } from 'react';
import { fetchInstruments } from '../services/instrumentsApi';
import type { Instrument } from '../components/instruments-table/types';

export const useInstrumentsData = () => {
  const [data, setData] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstruments().then((res) => {
      console.log("res", res)
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
};
