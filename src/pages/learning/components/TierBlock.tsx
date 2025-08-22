import React from 'react';
import './TierBlock.css';

interface TierBlockProps {
    tierName: string;
    isActive: boolean;
    onClick: () => void;
}

const TierBlock: React.FC<TierBlockProps> = ({
    tierName,
    isActive,
    onClick,
}) => {
    return (
        <div
            className={`tier-block ${isActive ? 'active' : 'inactive'}`}
            onClick={isActive ? onClick : undefined}
        >
            {tierName}
        </div>
    );
};

export default TierBlock;
