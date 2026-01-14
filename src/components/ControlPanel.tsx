import React from 'react';
import type { StoryStep, ActionType } from '../data/story';
import './ControlPanel.css';

interface ControlPanelProps {
    step: StoryStep;
    onBranch: () => void;
    onCommit: () => void;
    onMerge: () => void;
    onNext: () => void;
    onReset: () => void;
    onSlack?: () => void;
    onFix?: () => void;
}

const getCommandText = (action: ActionType, branchName = 'feature-new'): string => {
    switch (action) {
        case 'BRANCH': return `git checkout -b ${branchName}`;
        case 'COMMIT': return 'git commit -m "update work"';
        case 'MERGE': return `git merge ${branchName}`;
        case 'SLACK_MSG': return '@channel PR出しました！';
        case 'FIX_CODE': return 'git commit -m "fix based on review"';
        default: return '';
    }
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
    step,
    onBranch,
    onCommit,
    onMerge,
    onNext,
    onReset,
    onSlack,
    onFix
}) => {
    const currentCommand = getCommandText(step.actionRequired);

    return (
        <div className="control-panel-content">
            <div className="terminal-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span className="terminal-title">Mission Control / Terminal</span>
            </div>

            {/* Big Command Display Area */}
            <div className="command-display-area">
                {currentCommand ? (
                    <>
                        <div className="cmd-label">NEXT COMMAND:</div>
                        <div className="cmd-text typing-effect">
                            <span className="prompt">$</span> {currentCommand}
                        </div>
                    </>
                ) : (
                    <div className="cmd-placeholder">待機中...</div>
                )}
            </div>

            <div className="actions-container">
                {step.actionRequired === 'BRANCH' && (
                    <button className="btn btn-primary" onClick={onBranch}>
                        <span className="icon">🌿</span> 新しいブランチを作る
                    </button>
                )}

                {step.actionRequired === 'COMMIT' && (
                    <button className="btn btn-action" onClick={onCommit}>
                        <span className="icon">💾</span> 変更をコミット（セーブ）
                    </button>
                )}

                {step.actionRequired === 'SLACK_MSG' && (
                    <button className="btn btn-slack" onClick={onSlack}>
                        <span className="icon">📢</span> Slackで通知する
                    </button>
                )}

                {step.actionRequired === 'FIX_CODE' && (
                    <button className="btn btn-warning" onClick={onFix}>
                        <span className="icon">🔧</span> コードを修正する
                    </button>
                )}

                {step.actionRequired === 'MERGE' && (
                    <button className="btn btn-purple" onClick={onMerge}>
                        <span className="icon">🔀</span> マージ（合体）
                    </button>
                )}

                {step.actionRequired === 'NEXT' && (
                    <button className="btn btn-next" onClick={step.id === 10 ? onReset : onNext}>
                        {step.buttonText || '次へ進む'}
                    </button>
                )}
            </div>

            <div className="decoration-grid"></div>
        </div>
    );
};
