import React from 'react';
import './WelcomeScreen.css';

interface WelcomeScreenProps {
    onSelectMode: (isTeamMode: boolean) => void;
    onShowDictionary: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSelectMode, onShowDictionary }) => {
    return (
        <div className="welcome-container">
            <h1 className="welcome-title">GitHub Flow Visualizer</h1>
            <p className="welcome-subtitle">開発の旅に出かけよう</p>

            <div className="mode-selection">
                <div className="mode-card solo" onClick={() => onSelectMode(false)}>
                    <div className="mode-icon">👤</div>
                    <h2>ソロモード</h2>
                    <p>まずは基本をマスター。<br />自分だけのペースで学習します。</p>
                    <button className="start-btn">はじめる</button>
                </div>

                <div className="mode-card team" onClick={() => onSelectMode(true)}>
                    <div className="mode-icon">👥</div>
                    <h2>チームモード</h2>
                    <p>開発現場の熱気を体験。<br />他のメンバーも同時に活動します。</p>
                    <button className="start-btn">はじめる</button>
                </div>
            </div>

            <div className="dictionary-section">
                <button className="dictionary-btn" onClick={onShowDictionary}>
                    <span className="dict-icon">📚</span>
                    <span className="dict-text">GitHub頻出コマンド辞書</span>
                </button>
            </div>
        </div>
    );
};
