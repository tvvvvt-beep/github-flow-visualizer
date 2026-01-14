import { useState, useCallback, useEffect } from 'react';
import type { GitState, Commit, BranchName } from '../types/git';

const INITIAL_STATE: GitState = {
    commits: [
        {
            id: 'c1',
            message: '最初の世界',
            branch: 'main',
            parentId: null,
            author: 'You',
            timestamp: Date.now(),
        },
    ],
    branches: {
        main: 'c1',
    },
    activeBranch: 'main',
    head: 'c1',
};

export const useGitSim = () => {
    const [gitState, setGitState] = useState<GitState>(INITIAL_STATE);
    const [isTeamMode, setIsTeamMode] = useState(false);

    // Ghost activity effect
    useEffect(() => {
        if (!isTeamMode) return;

        const interval = setInterval(() => {
            setGitState((prev) => {
                // Only add commits to main if main is present
                const mainHeadId = prev.branches['main'];
                if (!mainHeadId) return prev;

                const ghosts = ['Bob', 'Alice', 'Charlie'];
                const randomGhost = ghosts[Math.floor(Math.random() * ghosts.length)];

                const ghostMsg = [
                    'Fix typo',
                    'Update deps',
                    'Refactor logic',
                    'Merge PR #123'
                ];
                const randomMsg = ghostMsg[Math.floor(Math.random() * ghostMsg.length)];
                const newCommitId = `g${Date.now()}`; // Unique ID based on time

                const newCommit: Commit = {
                    id: newCommitId,
                    message: `${randomMsg}`,
                    branch: 'main',
                    parentId: mainHeadId,
                    author: randomGhost,
                    timestamp: Date.now(),
                };

                return {
                    ...prev,
                    commits: [...prev.commits, newCommit],
                    branches: {
                        ...prev.branches,
                        main: newCommitId,
                    },
                    // If user is on main, move head too. If on feature, stay there.
                    head: prev.activeBranch === 'main' ? newCommitId : prev.head,
                };
            });
        }, 4000); // New commit every 4 seconds

        return () => clearInterval(interval);
    }, [isTeamMode]);

    const toggleTeamMode = useCallback(() => {
        setIsTeamMode(prev => !prev);
    }, []);

    const createCommit = useCallback((message: string) => {
        setGitState((prev) => {
            const newCommitId = `c${prev.commits.length + 1}`;
            const parentId = prev.branches[prev.activeBranch];

            const newCommit: Commit = {
                id: newCommitId,
                message,
                branch: prev.activeBranch,
                parentId,
                author: 'You',
                timestamp: Date.now(),
            };

            return {
                ...prev,
                commits: [...prev.commits, newCommit],
                branches: {
                    ...prev.branches,
                    [prev.activeBranch]: newCommitId,
                },
                head: newCommitId,
            };
        });
    }, []);

    const createBranch = useCallback((branchName: string) => {
        setGitState((prev) => {
            // Create branch pointer at current head
            return {
                ...prev,
                branches: {
                    ...prev.branches,
                    [branchName]: prev.head!,
                },
                activeBranch: branchName, // Auto checkout for simplicity in this app
            };
        });
    }, []);

    const checkout = useCallback((branchName: BranchName) => {
        setGitState((prev) => {
            if (!prev.branches[branchName]) return prev;
            return {
                ...prev,
                activeBranch: branchName,
                head: prev.branches[branchName],
            };
        });
    }, []);

    const mergeBranch = useCallback((sourceBranch: BranchName, targetBranch: BranchName) => {
        setGitState((prev) => {
            const sourceHead = prev.branches[sourceBranch];
            const targetHead = prev.branches[targetBranch];
            const newCommitId = `c${prev.commits.length + 1} `;

            const mergeCommit: Commit = {
                id: newCommitId,
                message: `${sourceBranch} を ${targetBranch} に合体！`,
                branch: targetBranch,
                parentId: targetHead,
                secondParentId: sourceHead,
                author: 'You',
                timestamp: Date.now(),
            };

            return {
                ...prev,
                commits: [...prev.commits, mergeCommit],
                branches: {
                    ...prev.branches,
                    [targetBranch]: newCommitId,
                },
                activeBranch: targetBranch,
                head: newCommitId,
            }
        });
    }, []);

    const reset = useCallback(() => {
        setGitState(INITIAL_STATE);
        setIsTeamMode(false);
    }, []);

    return {
        gitState,
        isTeamMode,
        toggleTeamMode,
        createCommit,
        createBranch,
        checkout,
        mergeBranch,
        reset
    };
};
