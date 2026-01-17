export interface GitCommand {
    id: number;
    command: string;
    description: string;
    example: string;
    importance: 'high' | 'medium' | 'low';
    category: string;
}

export const GIT_COMMANDS: GitCommand[] = [
    // 超重要（毎日使う）
    {
        id: 1,
        command: 'git status',
        description: '現在の状態を確認する。変更されたファイルや、コミット待ちのファイルを表示。',
        example: 'git status',
        importance: 'high',
        category: '基本操作'
    },
    {
        id: 2,
        command: 'git add',
        description: 'ファイルをステージング（コミット準備）する。',
        example: 'git add .\ngit add ファイル名',
        importance: 'high',
        category: '基本操作'
    },
    {
        id: 3,
        command: 'git commit',
        description: '変更を記録（セーブ）する。',
        example: 'git commit -m "コミットメッセージ"',
        importance: 'high',
        category: '基本操作'
    },
    {
        id: 4,
        command: 'git push',
        description: 'ローカルの変更をリモート（GitHub）に送る。',
        example: 'git push origin ブランチ名',
        importance: 'high',
        category: '基本操作'
    },
    {
        id: 5,
        command: 'git pull',
        description: 'リモート（GitHub）の最新版を取得する。',
        example: 'git pull origin main',
        importance: 'high',
        category: '基本操作'
    },
    {
        id: 6,
        command: 'git clone',
        description: 'リモートリポジトリを自分のPCにコピーする。',
        example: 'git clone https://github.com/ユーザー名/リポジトリ名.git',
        importance: 'high',
        category: '基本操作'
    },
    {
        id: 7,
        command: 'git branch',
        description: 'ブランチ一覧を表示、または新しいブランチを作成。',
        example: 'git branch\ngit branch ブランチ名',
        importance: 'high',
        category: 'ブランチ操作'
    },
    {
        id: 8,
        command: 'git checkout',
        description: 'ブランチを切り替える、またはブランチを作成して切り替える。',
        example: 'git checkout ブランチ名\ngit checkout -b 新ブランチ名',
        importance: 'high',
        category: 'ブランチ操作'
    },
    {
        id: 9,
        command: 'git merge',
        description: 'ブランチを現在のブランチに統合（マージ）する。',
        example: 'git merge ブランチ名',
        importance: 'high',
        category: 'ブランチ操作'
    },

    // 重要（よく使う）
    {
        id: 10,
        command: 'git log',
        description: 'コミット履歴を表示する。',
        example: 'git log\ngit log --oneline',
        importance: 'medium',
        category: '履歴確認'
    },
    {
        id: 11,
        command: 'git diff',
        description: '変更内容の差分を表示する。',
        example: 'git diff\ngit diff ファイル名',
        importance: 'medium',
        category: '履歴確認'
    },
    {
        id: 12,
        command: 'git fetch',
        description: 'リモートの情報を取得（マージはしない）。',
        example: 'git fetch origin',
        importance: 'medium',
        category: '同期操作'
    },
    {
        id: 13,
        command: 'git stash',
        description: '作業中の変更を一時的に退避する。',
        example: 'git stash\ngit stash pop',
        importance: 'medium',
        category: '便利機能'
    },
    {
        id: 14,
        command: 'git remote',
        description: 'リモートリポジトリの設定を確認・追加する。',
        example: 'git remote -v\ngit remote add origin URL',
        importance: 'medium',
        category: '設定'
    },

    // 知っておくと便利
    {
        id: 15,
        command: 'git reset',
        description: 'コミットを取り消す（注意が必要）。',
        example: 'git reset --soft HEAD~1\ngit reset --hard HEAD~1',
        importance: 'low',
        category: '高度な操作'
    },
    {
        id: 16,
        command: 'git revert',
        description: '特定のコミットを打ち消す新しいコミットを作成。',
        example: 'git revert コミットID',
        importance: 'low',
        category: '高度な操作'
    },
    {
        id: 17,
        command: 'git cherry-pick',
        description: '特定のコミットだけを別ブランチに適用する。',
        example: 'git cherry-pick コミットID',
        importance: 'low',
        category: '高度な操作'
    },
    {
        id: 18,
        command: 'git rebase',
        description: 'コミット履歴を整理する（上級者向け）。',
        example: 'git rebase main',
        importance: 'low',
        category: '高度な操作'
    },
    {
        id: 19,
        command: 'git tag',
        description: 'バージョンなどのタグを付ける。',
        example: 'git tag v1.0.0\ngit push origin v1.0.0',
        importance: 'low',
        category: 'その他'
    },
    {
        id: 20,
        command: 'git config',
        description: 'Gitの設定を行う。',
        example: 'git config --global user.name "名前"\ngit config --global user.email "メール"',
        importance: 'medium',
        category: '設定'
    }
];
