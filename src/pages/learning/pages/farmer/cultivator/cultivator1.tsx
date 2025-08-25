import React, { useState } from 'react';
import './cultivator.css';
import { Link } from 'react-router-dom';

type FinancialStatementItem = {
    item: string;
    value: string;
    analogy: string;
    description: string;
};

const FINANCIAL_STATEMENT_DATA: FinancialStatementItem[] = [
    {
        item: '매출 (Revenue)',
        value: '1,000,000,000원',
        analogy: '한 해 농사로 벌어들인 총 금액',
        description:
            '기업이 제품이나 서비스를 판매하고 얻은 총 수익입니다. 아직 비용을 빼기 전의 금액이에요.',
    },
    {
        item: '매출원가 (Cost of Goods Sold)',
        value: '600,000,000원',
        analogy: '농사를 짓는 데 들어간 직접적인 비용 (씨앗, 비료 등)',
        description:
            '제품을 만들거나 서비스를 제공하는 데 직접적으로 들어간 비용입니다. 예를 들어, 공장 운영비, 원자재 비용 등이 포함됩니다.',
    },
    {
        item: '매출총이익 (Gross Profit)',
        value: '400,000,000원',
        analogy: '농사로 번 돈에서 직접적인 비용을 뺀 나머지',
        description:
            '매출에서 매출원가를 뺀 금액입니다. 기업의 기본적인 수익성을 보여주는 지표입니다.',
    },
    {
        item: '판매비와 관리비 (Selling, General & Administrative Expenses)',
        value: '150,000,000원',
        analogy:
            '농산물을 시장에 내다 팔고 농장을 관리하는 데 쓴 돈 (운송비, 창고비 등)',
        description:
            '제품 판매 및 기업 운영에 들어가는 간접적인 비용입니다. 광고비, 직원 월급, 사무실 임대료 등이 여기에 해당됩니다.',
    },
    {
        item: '영업이익 (Operating Income)',
        value: '250,000,000원',
        analogy: '농사로 실제로 벌어들인 순수한 이익',
        description:
            '매출총이익에서 판매비와 관리비를 뺀 금액입니다. 기업의 핵심적인 영업 활동으로 얼마나 이익을 냈는지를 보여줍니다.',
    },
    {
        item: '당기순이익 (Net Income)',
        value: '180,000,000원',
        analogy: '농부가 한 해 농사를 마치고 손에 쥐게 된 최종 금액',
        description:
            '영업이익에서 세금, 이자 등 모든 비용을 제외하고 최종적으로 남은 순수한 이익입니다.',
    },
];

const FinancialStatementGuide = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="cultivator-container">
            <h1 className="cultivator-title">재무제표 해부하기</h1>
            <p className="cultivator-subtitle">
                실제 기업의 재무제표를 살펴보며, 각 항목이 무엇을 의미하는지
                쉽고 재미있게 배워보세요. 아래 항목을 클릭하면 설명이
                펼쳐집니다.
            </p>
            <div className="financial-statement">
                <h2 className="statement-title">칠성전자 재무상태표</h2>
                <p className="statement-period">
                    2024년 1월 1일 ~ 2024년 12월 31일
                </p>
                <table>
                    <tbody>
                        {FINANCIAL_STATEMENT_DATA.map((row, index) => (
                            <React.Fragment key={row.item}>
                                <tr
                                    onClick={() => handleToggle(index)}
                                    className={
                                        activeIndex === index ? 'selected' : ''
                                    }
                                >
                                    <td>{row.item}</td>
                                    <td className="value">{row.value}</td>
                                </tr>
                                {activeIndex === index && (
                                    <tr className="description-row">
                                        <td colSpan={2}>
                                            <div className="description-content">
                                                <div className="analogy">
                                                    <span className="analogy-icon">
                                                        👨‍🌾
                                                    </span>
                                                    <div>
                                                        <p className="analogy-title">
                                                            농부의 비유
                                                        </p>
                                                        <p>{row.analogy}</p>
                                                    </div>
                                                </div>
                                                <div className="description">
                                                    <p className="description-title">
                                                        쉬운 설명
                                                    </p>
                                                    <p>{row.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Link to="/learning/pages/farmer/cultivator/cultivator2">
                        <button>다음 단계로</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Cultivator1 = () => {
    return <FinancialStatementGuide />;
};

export default Cultivator1;
