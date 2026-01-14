import React, { useRef, useEffect } from 'react';
import type { GitState } from '../types/git';
import './GitGraph.css';

interface GitGraphProps {
    state: GitState;
}

export const GitGraph: React.FC<GitGraphProps> = ({ state }) => {
    const { commits, branches } = state;
    const containerRef = useRef<HTMLDivElement>(null);

    // Layout constants
    const SPACING_X = 100;
    const START_X = 50;
    const MAIN_Y = 60;
    const FEATURE_Y = 140;
    const PADDING_RIGHT = 100;

    // Calculate node positions
    const nodes = commits.map((commit, index) => {
        let y = MAIN_Y;

        if (commit.branch !== 'main') {
            y = FEATURE_Y;
        }

        if (commit.secondParentId) {
            y = MAIN_Y;
        }

        return {
            ...commit,
            x: START_X + index * SPACING_X,
            y,
        };
    });

    // Calculate total width required
    const totalWidth = Math.max(800, START_X + (nodes.length * SPACING_X) + PADDING_RIGHT);

    // Auto-scroll to right when commits change
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = containerRef.current.scrollWidth;
        }
    }, [commits.length]);

    return (
        <div className="git-graph-container" ref={containerRef}>
            <div className="world-label main-label">みんなの世界 (Main)</div>
            <div className="world-label feature-label">自分だけの世界 (Feature)</div>

            <svg width={totalWidth} height="100%" className="graph-svg">
                {/* Draw connections */}
                {nodes.map(node => {
                    const parent = nodes.find(n => n.id === node.parentId);
                    if (!parent) return null;

                    return (
                        <line
                            key={`link-${node.id}`}
                            x1={parent.x}
                            y1={parent.y}
                            x2={node.x}
                            y2={node.y}
                            className="commit-line"
                            strokeWidth="4"
                        />
                    );
                })}

                {/* Draw merge connections */}
                {nodes.map(node => {
                    if (!node.secondParentId) return null;
                    const parent2 = nodes.find(n => n.id === node.secondParentId);
                    if (!parent2) return null;

                    return (
                        <line
                            key={`merge-${node.id}`}
                            x1={parent2.x}
                            y1={parent2.y}
                            x2={node.x}
                            y2={node.y}
                            className="commit-line merge-line"
                            strokeWidth="4"
                            strokeDasharray="5,5"
                        />
                    );
                })}

                {/* Draw nodes */}
                {nodes.map(node => (
                    <g key={node.id} className="node-group">
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r="15"
                            className={`commit-node ${node.branch === 'main' ? 'is-main' : 'is-feature'}`}
                        />

                        {/* Ghost Author "Sketch" */}
                        {node.author && node.author !== 'You' && (
                            <g className="ghost-avatar" transform={`translate(${node.x - 10}, ${node.y - 45})`} opacity="0.4">
                                <text x="10" y="-5" textAnchor="middle" fontSize="10" fill="#cbd5e1">{node.author}</text>
                                {/* Rough Stick Figure */}
                                {/* Head */}
                                <circle cx="10" cy="10" r="8" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                                {/* Body */}
                                <path d="M10 18 L10 32" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                                {/* Arms (Different based on author for variance) */}
                                {node.author === 'Alice' && <path d="M10 22 L4 28 M10 22 L16 18" stroke="#94a3b8" strokeWidth="1.5" fill="none" />}
                                {node.author === 'Bob' && <path d="M10 22 L4 18 M10 22 L16 18" stroke="#94a3b8" strokeWidth="1.5" fill="none" />}
                                {node.author === 'Charlie' && <path d="M10 22 L4 18 M10 22 L16 28" stroke="#94a3b8" strokeWidth="1.5" fill="none" />}
                            </g>
                        )}

                        <text x={node.x} y={node.y + 35} textAnchor="middle" className="node-msg">
                            {node.message}
                        </text>
                        {/* Show branch label if head */}
                        {Object.entries(branches).map(([name, headId]) => {
                            if (headId === node.id) {
                                return (
                                    <g key={name}>
                                        <rect
                                            x={node.x - 30}
                                            y={node.y - 45}
                                            width="60"
                                            height="24"
                                            rx="12"
                                            className={`branch-tag ${name === 'main' ? 'tag-main' : 'tag-feature'}`}
                                        />
                                        <text
                                            x={node.x}
                                            y={node.y - 28}
                                            textAnchor="middle"
                                            className="branch-tag-text"
                                        >
                                            {name}
                                        </text>
                                    </g>
                                )
                            }
                            return null;
                        })}
                    </g>
                ))}
            </svg>
        </div>
    );
};
