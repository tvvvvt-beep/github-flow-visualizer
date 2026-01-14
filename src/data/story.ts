export type ActionType = 'NEXT' | 'BRANCH' | 'COMMIT' | 'MERGE' | 'SLACK_MSG' | 'FIX_CODE' | 'APPROVE';

export interface StoryStep {
    id: number;
    title: string;
    description: string;
    hint: string;
    actionRequired: ActionType;
    buttonText?: string;
}

export const STORY_STEPS: StoryStep[] = [
    {
        id: 0,
        title: 'ようこそ！GitHubの世界へ',
        description: 'ここはみんなで一つの作品（プログラム）を作る場所です。\n真ん中にあるのが「みんなの世界（Main）」です。\n\nでも、いきなりこの世界をいじると、失敗したときにみんなに迷惑がかかってしまいます。\nどうすればいいでしょう？',
        hint: '「次へ」を押して、安全な作業方法を学びましょう！',
        actionRequired: 'NEXT',
        buttonText: '冒険を始める'
    },
    {
        id: 1,
        title: '分身の術！ (Branch)',
        description: '安全に作業するために、自分だけの**「パラレルワールド（Branch）」**を作りましょう！\n\nここなら何をしても、元の世界（Main）には影響しません。\nさあ、新しい世界を作ってみましょう。',
        hint: '下のボタンから「新しいブランチを作る」を選んでください。',
        actionRequired: 'BRANCH',
    },
    {
        id: 2,
        title: 'セーブポイント作成 (Commit)',
        description: '自分だけの世界ができました！\nここで自由に作業を進めます。\n\n区切りのいいところで**「セーブ（Commit）」**をしましょう。\nゲームのセーブポイントと同じで、失敗してもここまで戻れます。',
        hint: '「変更をコミット（セーブ）」ボタンを押してみましょう。',
        actionRequired: 'COMMIT',
    },
    {
        id: 3,
        title: 'もう一回セーブ',
        description: '作業が進んできましたね。\nこまめにセーブするのは良い習慣です。\n\nもう一つ機能を追加して、セーブしてみましょう。',
        hint: 'もう一度「変更をコミット」を押して、履歴を増やしましょう。',
        actionRequired: 'COMMIT',
    },
    {
        id: 4,
        title: '合体のお願い (Pull Request)',
        description: '作業が完了しました！\nでも、黙って置いておいても誰も気づきません。\n\n「私の変更を混ぜてもいいですか？」とお願い（Pull Request）を出しましょう。',
        hint: '「Pull Request（PR）」を作成ボタンを押します。',
        actionRequired: 'NEXT',
        buttonText: 'PRを作成（お願いする）'
    },
    {
        id: 5,
        title: 'みんなに知らせよう (Slack)',
        description: 'PRを作っただけでは、忙しいチームのみんなは気づかないかもしれません。\n\nチャットツール（Slackなど）で「PR見てください！」とアピールするのが大切です。\nこれをすることで、スムーズに確認してもらえます。',
        hint: '「Slackで通知」ボタンを押して、みんなを呼びましょう！',
        actionRequired: 'SLACK_MSG',
    },
    {
        id: 6,
        title: '先輩からのコメント (Review)',
        description: '「お疲れ様！でもここの色がちょっと変かも？」\n\n先輩からGitHub上でコメント（レビュー）が届きました。\n落ち込むことはありません！より良い作品にするためのアドバイスです。',
        hint: 'コメントを確認して、「修正する（Fix）」に進みましょう。',
        actionRequired: 'FIX_CODE',
    },
    {
        id: 7,
        title: '修正して再セーブ (Fix Commit)',
        description: 'アドバイス通りに直しました！\n\n修正したら、また「セーブ（Commit）」をしてGitHubに送ります。\nPRは自動的に最新版に更新されるので、作り直す必要はありません。',
        hint: '「修正をコミット」ボタンを押しましょう。',
        actionRequired: 'COMMIT',
    },
    {
        id: 8,
        title: '承認されました！ (Approve)',
        description: '「バッチリだね！これならOK！」\n\n修正を確認してもらい、無事に**承認 (Approve)** をもらいました！\nこれでようやく合体の準備が整いました。',
        hint: '「次へ」を押して、いよいよ合体です。',
        actionRequired: 'NEXT',
        buttonText: 'いざ、合体へ！'
    },
    {
        id: 9,
        title: '合体！ (Merge)',
        description: '承認をもらったので、あなたのパラレルワールドを元の世界に**「合体（Merge）」**させます！\n\nこれであなたの作業が、みんなの作品の一部になります。',
        hint: '「マージ（合体）」ボタンを押して、世界を一つにしましょう！',
        actionRequired: 'MERGE',
    },
    {
        id: 10,
        title: '完了！',
        description: 'おめでとうございます！\nこれが「GitHub Flow」の基本サイクルです。\n\n1. 分身作成 & 作業\n2. PR作成 & **Slack通知**\n3. **レビュー & 修正**\n4. 承認 & 合体\n\nこの「会話」こそが、良いチーム開発の秘訣です！',
        hint: '最初からやり直したい場合はリセットボタンを押してください。',
        actionRequired: 'NEXT',
        buttonText: '最初に戻る'
    }
];
