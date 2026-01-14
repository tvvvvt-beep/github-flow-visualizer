import React from 'react';
import type { StoryStep } from '../data/story';
import './StoryGuide.css';

interface StoryGuideProps {
    step: StoryStep;
}

export const StoryGuide: React.FC<StoryGuideProps> = ({ step }) => {
    return (
        <div className="story-guide">
            <div className="step-indicator">
                STEP {step.id + 1}
            </div>

            <h2 className="step-title">{step.title}</h2>

            <div className="step-description">
                {step.description.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
            </div>

            <div className="step-hint">
                <span className="hint-icon">💡</span>
                {step.hint}
            </div>
        </div>
    );
};
