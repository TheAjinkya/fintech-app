import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './Dashboard.css'; // We'll create this CSS file

interface Instrument {
    ticker: string;
    price: number;
    assetClass: 'Equities' | 'Macro' | 'Credit';
}

type SortKey = keyof Instrument;
type SortDirection = 'ascending' | 'descending';

interface SortConfig {
    key: SortKey;
    direction: SortDirection;
}

const Dashboard: React.FC = () => {
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/sampleData.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setInstruments(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Sort function based on specification
    const sortedInstruments = useMemo(() => {
        if (!sortConfig) return instruments;

        return [...instruments].sort((a, b) => {
            const { key, direction } = sortConfig;
            const multiplier = direction === 'ascending' ? 1 : -1;

            switch (key) {
                case 'assetClass':
                    // Custom sort order: Equities first, then Macro, then Credit
                    const assetClassOrder = { 'Equities': 1, 'Macro': 2, 'Credit': 3 };
                    const orderA = assetClassOrder[a.assetClass];
                    const orderB = assetClassOrder[b.assetClass];
                    return (orderA - orderB) * multiplier;

                case 'price':
                    // Sort by price in descending order (specification)
                    // But we respect the direction toggle
                    return (b.price - a.price) * multiplier;

                case 'ticker':
                    // Alphabetical sort
                    return a.ticker.localeCompare(b.ticker) * multiplier;

                default:
                    return 0;
            }
        });
    }, [instruments, sortConfig]);

    // Handle sort request
    const requestSort = useCallback((key: SortKey) => {
        setSortConfig(prevConfig => {
            // Special handling for price - always start with descending as per spec
            if (key === 'price' && (!prevConfig || prevConfig.key !== 'price')) {
                return { key: 'price', direction: 'descending' };
            }
            
            // For other columns or toggling
            if (prevConfig?.key === key) {
                // Toggle direction
                return {
                    key,
                    direction: prevConfig.direction === 'ascending' ? 'descending' : 'ascending'
                };
            }
            
            // Default to ascending for new columns (except price handled above)
            return { key, direction: 'ascending' };
        });
    }, []);

    // Get sort indicator
    const getSortIndicator = (key: SortKey): string => {
        if (sortConfig?.key === key) {
            return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
        }
        return ' ↕️'; // Indicates sortable but not active
    };

    // Get row color based on asset class
    const getRowClassName = (assetClass: Instrument['assetClass']): string => {
        switch (assetClass) {
            case 'Equities':
                return 'row-equities';
            case 'Macro':
                return 'row-macro';
            case 'Credit':
                return 'row-credit';
            default:
                return '';
        }
    };

    // Get price color class
    const getPriceClassName = (price: number): string => {
        return price >= 0 ? 'price-positive' : 'price-negative';
    };

    if (loading) {
        return (
            <div className="dashboard loading">
                <h1>Financial Instruments</h1>
                <div className="spinner">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard error">
                <h1>Financial Instruments</h1>
                <div className="error-message">
                    Error: {error}
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h1>Financial Instruments</h1>
            <p className="instrument-count">Showing {instruments.length} instruments</p>
            
            {instruments.length > 0 ? (
                <table className="instruments-table">
                    <thead>
                        <tr>
                            <th>
                                <button 
                                    onClick={() => requestSort('ticker')}
                                    className="sort-button"
                                    aria-label="Sort by ticker"
                                >
                                    Ticker{getSortIndicator('ticker')}
                                </button>
                            </th>
                            <th>
                                <button 
                                    onClick={() => requestSort('price')}
                                    className="sort-button"
                                    aria-label="Sort by price"
                                >
                                    Price{getSortIndicator('price')}
                                </button>
                            </th>
                            <th>
                                <button 
                                    onClick={() => requestSort('assetClass')}
                                    className="sort-button"
                                    aria-label="Sort by asset class"
                                >
                                    Asset Class{getSortIndicator('assetClass')}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedInstruments.map((instrument) => (
                            <tr 
                                key={instrument.ticker}
                                className={getRowClassName(instrument.assetClass)}
                            >
                                <td className="ticker-cell">{instrument.ticker}</td>
                                <td className={`price-cell ${getPriceClassName(instrument.price)}`}>
                                    ${instrument.price.toFixed(2)}
                                </td>
                                <td className="asset-class-cell">{instrument.assetClass}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data">No instruments available</p>
            )}
        </div>
    );
};

export default Dashboard;