import { useState, useCallback } from 'react';
import './App.css';
import './components/TeamMode.css';
import { useGitSim } from './hooks/useGitSim';
import { STORY_STEPS } from './data/story';
import { GitGraph } from './components/GitGraph';
import { ControlPanel } from './components/ControlPanel';
import { StoryGuide } from './components/StoryGuide';
import { NotificationOverlay } from './components/NotificationOverlay';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CommandDictionary } from './components/CommandDictionary';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [notification, setNotification] = useState<{ type: 'slack' | 'github', message: string } | null>(null);

  // Lift toggleTeamMode and isTeamMode to be controlled by WelcomeScreen
  const { gitState, createBranch, createCommit, mergeBranch, handleFork, reset, isTeamMode, toggleTeamMode } = useGitSim();

  const handleStart = useCallback((enableTeamMode: boolean) => {
    setHasStarted(true);
    if (enableTeamMode && !isTeamMode) {
      toggleTeamMode();
    } else if (!enableTeamMode && isTeamMode) {
      toggleTeamMode();
    }
  }, [isTeamMode, toggleTeamMode]);

  const currentStep = STORY_STEPS[currentStepIndex];

  const handleNext = useCallback(() => {
    if (currentStepIndex < STORY_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex]);

  const handleReset = useCallback(() => {
    reset();
    setCurrentStepIndex(0);
    setNotification(null);
    setHasStarted(false); // Return to welcome screen
    setShowDictionary(false); // Close dictionary if open
  }, [reset]);

  const handleBranch = useCallback(() => {
    createBranch('feature-login');
    handleNext();
  }, [createBranch, handleNext]);

  const handleCommit = useCallback(() => {
    const messages = ['レイアウト作成', 'ボタン追加', '色調整', 'バグ修正'];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    createCommit(randomMsg);
    handleNext();
  }, [createCommit, handleNext]);

  const handleSlack = useCallback(() => {
    // Show Slack notification
    setNotification({ type: 'slack', message: '@channel PRを出しました！確認お願いします🙏' });

    // Simulate finding a bug / review comment after a delay
    setTimeout(() => {
      setNotification({ type: 'github', message: 'お疲れ様！\nボタンの色ですが、もう少し明るい色にできますか？🔴' });
    }, 2500);

    handleNext();
  }, [handleNext]);

  const handleFix = useCallback(() => {
    setNotification(null); // Clear github notification
    handleNext();
  }, [handleNext]);

  const handleMerge = useCallback(() => {
    mergeBranch('feature-login', 'main');
    handleNext();
  }, [mergeBranch, handleNext]);

  const handleForkAction = useCallback(() => {
    handleFork();
    handleNext();
  }, [handleFork, handleNext]);

  const handleShowDictionary = useCallback(() => {
    setShowDictionary(true);
  }, []);

  const handleCloseDictionary = useCallback(() => {
    setShowDictionary(false);
  }, []);

  if (showDictionary) {
    return <CommandDictionary onBack={handleCloseDictionary} />;
  }

  if (!hasStarted) {
    return <WelcomeScreen onSelectMode={handleStart} onShowDictionary={handleShowDictionary} />;
  }

  return (
    <div className="app-container">
      <NotificationOverlay
        type={notification?.type || null}
        message={notification?.message || ''}
        onClose={() => setNotification(null)}
      />

      <header className="app-header">
        <h1>GitHub Flow Visualizer</h1>
        <p className="subtitle">〜 並行世界（ブランチ）の冒険 〜</p>
        {isTeamMode && <div className="team-badge">👥 Team Activity Mode</div>}
      </header>

      <main className="main-layout">
        <section className="guide-panel">
          <StoryGuide step={currentStep} />
        </section>

        <div className="visualizer-container">
          <section className="graph-view">
            <GitGraph state={gitState} />
          </section>

          <section className="control-panel">
            <ControlPanel
              step={currentStep}
              onBranch={handleBranch}
              onCommit={handleCommit}
              onMerge={handleMerge}
              onNext={handleNext}
              onReset={handleReset}
              onSlack={handleSlack}
              onFix={handleFix}
              onFork={handleForkAction}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
