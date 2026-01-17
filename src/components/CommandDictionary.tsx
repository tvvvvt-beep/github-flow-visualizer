import React from 'react';
import { GIT_COMMANDS, type GitCommand } from '../data/commandData';
import './CommandDictionary.css';

interface CommandDictionaryProps {
    onBack: () => void;
}

export const CommandDictionary: React.FC<CommandDictionaryProps> = ({ onBack }) => {
    const getImportanceBadge = (importance: string) => {
        switch (importance) {
            case 'high':
                return { text: '超重要', className: 'badge-high' };
            case 'medium':
                return { text: '重要', className: 'badge-medium' };
            case 'low':
                return { text: '便利', className: 'badge-low' };
            default:
                return { text: '', className: '' };
        }
    };

    return (
        <div className="command-dictionary">
            <div className="dictionary-header">
                <button className="back-button" onClick={onBack}>
                    ← 戻る
                </button>
                <h1 className="dictionary-title">📚 GitHub頻出コマンド辞書</h1>
                <p className="dictionary-subtitle">重要度順に並んでいます</p>
            </div>

            <div className="commands-container">
                {GIT_COMMANDS.map((cmd: GitCommand) => {
                    const badge = getImportanceBadge(cmd.importance);
                    return (
                        <div key={cmd.id} className="command-card">
                            <div className="command-header">
                                <code className="command-name">{cmd.command}</code>
                                <span className={`importance-badge ${badge.className}`}>
                                    {badge.text}
                                </span>
                            </div>
                            <p className="command-description">{cmd.description}</p>
                            <div className="command-example">
                                <div className="example-label">使用例:</div>
                                <pre className="example-code">{cmd.example}</pre>
                            </div>
                            <div className="command-category">{cmd.category}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
