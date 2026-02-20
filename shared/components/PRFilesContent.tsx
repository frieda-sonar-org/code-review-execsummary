'use client';

import { FileChange } from '../types/PRFileTypes';
import AddCommentButton from './AddCommentButton';
import CoverageIndicator from './CoverageIndicator';
import InlineComment from './InlineComment';
import { useState } from 'react';

interface PRFilesContentProps {
  fileChanges: FileChange[];
  expandedFileChanges: Record<string, boolean>;
  onToggleFileChange: (groupId: string) => void;
  onFileChecked?: (groupId: string, fileIndex: number) => void;
}

export default function PRFilesContent({
  fileChanges,
  expandedFileChanges,
  onToggleFileChange,
  onFileChecked
}: PRFilesContentProps) {
  const [activeCommentLine, setActiveCommentLine] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  const handleLineClick = (lineId: string) => {
    setActiveCommentLine(lineId);
    setNewCommentText('');
  };

  const handleCommentSubmit = () => {
    if (newCommentText.trim()) {
      console.log(`Submitting comment for line ${activeCommentLine}:`, newCommentText);
      setActiveCommentLine(null);
      setNewCommentText('');
    }
  };

  const handleCommentCancel = () => {
    setActiveCommentLine(null);
    setNewCommentText('');
  };

  return (
    <div className="files-content">
      {fileChanges.map((change) => {
        const isExpanded = expandedFileChanges[change.groupId] !== false; // Default to expanded

        return (
          <div key={change.groupId} className="file-change-card" id={`group-${change.groupId}`}>
            <div className="file-change-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <h3 style={{ margin: 0 }}>{change.groupName}</h3>
                {change.needsReview && <span className="needs-review-badge">Needs review</span>}
                <div className="file-change-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                  <span className="file-count">{change.fileCount} files</span>
                  <span className="additions">+{change.additions}</span>
                  <span className="deletions">-{change.deletions}</span>
                </div>
              </div>
              <button
                className="pin-button"
                onClick={() => onToggleFileChange(change.groupId)}
                style={{ marginLeft: '12px' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  style={{
                    transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                    transition: 'transform 0.2s'
                  }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </button>
            </div>

            {isExpanded && (
              <>
                <div className="file-change-description">
                  <p>{change.description}</p>
                  <p className="review-focus">
                    <strong>Review Focus:</strong> {change.reviewFocus}
                  </p>
                </div>

                {/* Individual File Diffs */}
                {change.files.map((file, fileIndex) => {
                  const [fileExpanded, setFileExpanded] = useState(true); // Default to expanded
                  const [fileChecked, setFileChecked] = useState(file.checked || false);

                  return (
                    <div key={file.filename} className="code-diff-container">
                      <div className="code-diff-header" id={`diff-${change.groupId}-${fileIndex}`}>
                        <div className="code-diff-toggle" onClick={() => setFileExpanded(!fileExpanded)} style={{ cursor: 'pointer' }}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            style={{
                              transform: fileExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                              transition: 'transform 0.2s ease'
                            }}
                          >
                            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                          </svg>
                          <span className="code-file-path" title={file.filename}>
                            {file.filename.includes('/') ? `\u2026${file.filename.split('/').pop()}` : file.filename}
                          </span>
                          <button className="copy-button">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                              <rect x="2" y="2" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              <rect x="4" y="4" width="8" height="8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                          </button>
                        </div>
                        <div className="code-diff-stats">
                          {file.additions > 0 && <span className="additions">+{file.additions}</span>}
                          {file.deletions > 0 && <span className="deletions">-{file.deletions}</span>}
                          {(file.coverage !== undefined || file.duplications !== undefined || file.issues !== undefined) && (
                            <>
                              <span className="separator">•</span>
                              {file.coverage !== undefined && (
                                <span className="coverage-badge">
                                  <CoverageIndicator percentage={file.coverage} size={14} />
                                  Coverage: {file.coverage.toFixed(1)}%
                                </span>
                              )}
                              {file.duplications !== undefined && (
                                <>
                                  <span className="separator">•</span>
                                  <span className="duplication">Duplications: {file.duplications.toFixed(1)}%</span>
                                </>
                              )}
                              {file.issues !== undefined && (
                                <>
                                  <span className="separator">•</span>
                                  <span className="issues">Issues: {file.issues}</span>
                                </>
                              )}
                            </>
                          )}
                          <button
                            className="check-button"
                            onClick={() => {
                              setFileChecked(!fileChecked);
                              if (!fileChecked) setFileExpanded(false);
                              if (onFileChecked) {
                                onFileChecked(change.groupId, fileIndex);
                              }
                            }}
                            style={{ color: fileChecked ? '#4CAF50' : 'var(--color-text-muted)' }}
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                              <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {fileExpanded && file.changes.length > 0 && (
                        <div className="code-diff-content">
                          <table className="code-table">
                            <tbody>
                              {file.changes.filter(codeChange => codeChange.type !== 'header').map((codeChange, changeIndex) => {
                                const lineClass = codeChange.type === 'add' ? 'added' : codeChange.type === 'delete' ? 'removed' : '';
                                const lineSign = codeChange.type === 'add' ? '+' : codeChange.type === 'delete' ? '-' : ' ';
                                const lineId = `${change.groupId}-${fileIndex}-${changeIndex}`;

                                return (
                                  <>
                                    <tr
                                      key={`line-${lineId}`}
                                      className={`code-line ${lineClass}`}
                                      onClick={() => handleLineClick(lineId)}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <td className="line-number">{codeChange.lineNumber}</td>
                                      <td className="line-comment-toggle">
                                        <AddCommentButton />
                                      </td>
                                      <td className="line-sign">{lineSign}</td>
                                      <td className="line-content">
                                        <pre style={{ margin: 0, fontFamily: 'inherit' }}>{codeChange.content}</pre>
                                      </td>
                                    </tr>
                                    {activeCommentLine === lineId && (
                                      <InlineComment
                                        lineId={lineId}
                                        commentText={newCommentText}
                                        onCommentChange={setNewCommentText}
                                        onSubmit={handleCommentSubmit}
                                        onCancel={handleCommentCancel}
                                      />
                                    )}
                                  </>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
