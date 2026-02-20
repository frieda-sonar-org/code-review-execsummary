'use client';

import { useRef, useEffect } from 'react';

interface InlineCommentProps {
  lineId: string;
  commentText: string;
  onCommentChange: (text: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  autoFocus?: boolean;
}

export default function InlineComment({
  lineId,
  commentText,
  onCommentChange,
  onSubmit,
  onCancel,
  autoFocus = true
}: InlineCommentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside handler - delay to prevent immediate close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onCancel();
      }
    };

    // Delay adding the listener to prevent closing on the same click that opened it
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <tr className="inline-comment-row new-comment-row">
      <td className="line-number"></td>
      <td className="line-comment-toggle"></td>
      <td colSpan={2}>
        <div className="inline-comment-container" ref={containerRef}>
          <div className="inline-comment new-comment-input">
            <div className="inline-comment-avatar">F</div>
            <div className="inline-comment-content">
              <textarea
                className="new-comment-textarea"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => onCommentChange(e.target.value)}
                autoFocus={autoFocus}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    onSubmit();
                  } else if (e.key === 'Escape') {
                    onCancel();
                  }
                }}
              />
              <button
                className="submit-comment-btn"
                onClick={onSubmit}
                disabled={!commentText.trim()}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 3l5 5-5 5V9H3V7h5V3z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
