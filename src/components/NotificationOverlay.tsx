import React, { useEffect, useState } from 'react';
import './NotificationOverlay.css';

interface NotificationOverlayProps {
    type: 'slack' | 'github' | null;
    message: string;
    onClose: () => void;
}

export const NotificationOverlay: React.FC<NotificationOverlayProps> = ({ type, message, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (type) {
            setVisible(true);
            if (type === 'slack') {
                const timer = setTimeout(() => {
                    setVisible(false);
                    setTimeout(onClose, 300);
                }, 4000); // Slightly longer for reading
                return () => clearTimeout(timer);
            }
        } else {
            setVisible(false);
        }
    }, [type, onClose]);

    if (!type && !visible) return null;

    const isSlack = type === 'slack';

    // Custom sender details
    const avatar = isSlack ? '😎' : 'review-bot'; // Use a class for github avatar
    const name = isSlack ? 'Me' : 'Senior Dev';
    const action = isSlack ? 'APP 12:30 PM' : 'commented 1 minute ago';

    return (
        <div className={`notification-container ${visible ? 'visible' : ''} ${type}`}>
            {isSlack ? (
                <>
                    <div className="avatar-circle">{avatar}</div>
                    <div className="speech-bubble">
                        <div className="bubble-sender">{name} <span className="timestamp">{action}</span></div>
                        <div className="bubble-body">{message}</div>
                    </div>
                </>
            ) : (
                /* GitHub Style Comment Box */
                <div className="github-comment-box">
                    <div className="gh-header">
                        <div className="gh-avatar-small">👩‍💻</div>
                        <div className="gh-meta">
                            <span className="gh-username">{name}</span> {action}
                        </div>
                        <div className="gh-badge">Member</div>
                    </div>
                    <div className="gh-body">
                        {message}
                    </div>
                    <div className="gh-footer">
                        <button className="bubble-action-btn" onClick={() => { setVisible(false); setTimeout(onClose, 300); }}>
                            確認しました
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
