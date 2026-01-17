export type BranchName = 'main' | 'feature' | string;

export interface Commit {
    id: string;
    message: string;
    branch: BranchName;
    parentId: string | null;
    secondParentId?: string | null; // For merge commits
    author?: string;
    timestamp: number;
}

export interface GitState {
    commits: Commit[];
    branches: Record<BranchName, string>; // branch name -> commit id
    activeBranch: BranchName;
    head: string | null; // current checked out commit id
    forkedFrom: boolean; // リポジトリがForkされたものかどうか
}

export interface GitAction {
    type: 'INIT' | 'COMMIT' | 'BRANCH' | 'CHECKOUT' | 'MERGE' | 'FORK';
    payload?: any;
}
