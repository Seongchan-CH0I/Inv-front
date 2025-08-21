import React from 'react';
import { MarketPreviewDTO } from '../../../types/dashboard';

interface MarketCardProps {
    market: MarketPreviewDTO;
}

function MarketCard({ market }: MarketCardProps) {
    const marketChangeStyle = {
        color: market.marketIndexChange >= 0 ? 'green' : 'red',
    };

    return (
        <div className="dashboard-card">
            <h2>마켓</h2>
            <p>상태: {market.marketStatus}</p>
            <h3>{market.marketIndexName}</h3>
            <p>
                {market.marketIndexValue.toFixed(2)}
                <span style={marketChangeStyle}>
                    ({market.marketIndexChange.toFixed(2)})
                </span>
            </p>
        </div>
    );
}

export default MarketCard;
