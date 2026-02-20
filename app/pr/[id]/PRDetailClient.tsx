'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import CoverageIndicator from '@/app/components/CoverageIndicator';
import PRSidebar from '@/shared/components/PRSidebar';
import PRFilesView from '@/shared/components/PRFilesView';
import { pr35FileGroups, pr35FileChanges } from '@/shared/data/pr35-file-groups';
import { pr34FileGroups, pr34FileChanges } from '@/shared/data/pr34-file-groups';
import { pr33FileGroups, pr33FileChanges } from '@/shared/data/pr33-file-groups';
import { getPRInfo, getAllPRs } from '@/shared/data/pr-info';

// basePath for subdirectory in code-review-demos
const basePath = process.env.NODE_ENV === 'production' ? '/v2-public' : '';

export default function PRDetailClient() {
  const params = useParams();
  const prId = params.id as string;
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewType, setReviewType] = useState('comment');
  const [reviewComment, setReviewComment] = useState('');
  const [activeCommentLine, setActiveCommentLine] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const commentInputRef = useRef<HTMLDivElement>(null);

  // Author's Note panel state
  const [showAuthorNote, setShowAuthorNote] = useState(false);
  const [isClosingAuthorNote, setIsClosingAuthorNote] = useState(false);
  const [authorNoteTab, setAuthorNoteTab] = useState('context'); // 'context' or 'conversation'
  // const [currentGroupIndex, setCurrentGroupIndex] = useState(0); // Hidden for future use

  // PR Selector dropdown state
  const [showPRSelector, setShowPRSelector] = useState(false);

  // Open Author's Note panel on page load with slide-in animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAuthorNote(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleLineClick = (lineId: string) => {
    setActiveCommentLine(lineId);
    setNewCommentText('');
    // Auto-focus will be handled by the input component
  };

  const handleCommentSubmit = (lineId: string) => {
    if (newCommentText.trim()) {
      // TODO: Submit comment to API
      console.log(`Submitting comment for line ${lineId}:`, newCommentText);
      setActiveCommentLine(null);
      setNewCommentText('');
    }
  };

  const handleCommentCancel = () => {
    setActiveCommentLine(null);
    setNewCommentText('');
  };

  // Handle Author's Note close with animation
  const handleCloseAuthorNote = () => {
    setIsClosingAuthorNote(true);
    setTimeout(() => {
      setShowAuthorNote(false);
      setIsClosingAuthorNote(false);
    }, 300); // Match animation duration
  };

  // Click outside handler to close PR selector dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showPRSelector && !target.closest('.pr-selector-container')) {
        setShowPRSelector(false);
      }
    };

    if (showPRSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPRSelector]);

  // Click outside handler to cancel comment input
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeCommentLine && commentInputRef.current && !commentInputRef.current.contains(event.target as Node)) {
        handleCommentCancel();
      }
    };

    if (activeCommentLine) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeCommentLine]);

  // Render new comment input row
  const renderNewCommentInput = (lineId: string) => {
    if (activeCommentLine !== lineId) return null;

    return (
      <tr className="inline-comment-row new-comment-row">
        <td className="line-number"></td>
        <td className="line-comment-toggle"></td>
        <td colSpan={2}>
          <div className="inline-comment-container" ref={commentInputRef}>
            <div className="inline-comment new-comment-input">
              <div className="inline-comment-avatar">F</div>
              <div className="inline-comment-content">
                <textarea
                  className="new-comment-textarea"
                  placeholder="Add a comment..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                      handleCommentSubmit(lineId);
                    } else if (e.key === 'Escape') {
                      handleCommentCancel();
                    }
                  }}
                />
                <button
                  className="submit-comment-btn"
                  onClick={() => handleCommentSubmit(lineId)}
                  disabled={!newCommentText.trim()}
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
  };

  // Get PR data from shared source
  const prData = getPRInfo(prId) || {
    id: prId,
    number: parseInt(prId),
    title: 'Pull Request',
    version: 'unknown',
    description: 'No description available',
    status: 'unknown',
    author: 'unknown',
    timestamp: 'unknown'
  };

  return (
    <div>
      {/* Top Navigation */}
      <header className="top-nav">
        <div className="top-nav-left">
          <button className="menu-toggle">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="logo">
            <img src={`${basePath}/Sonar Qube Cloud.svg`} alt="SonarQube Cloud" width="157" height="36" />
          </div>
          <nav className="top-nav-center">
            <a href="#" className="nav-link">My Projects</a>
            <a href="#" className="nav-link">My Issues</a>
            <a href="#" className="nav-link nav-dropdown">
              My Portfolios
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L2 4h8L6 8z"/>
              </svg>
            </a>
            <a href="#" className="nav-link">Explore</a>
          </nav>
        </div>

        <div className="top-nav-right">
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 14l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="icon-btn notification-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3l-2 2v1h16v-1l-2-2V8a6 6 0 00-6-6zM8 16a2 2 0 104 0"/>
            </svg>
            <span className="notification-badge">1</span>
          </button>
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <circle cx="10" cy="10" r="8"/>
            </svg>
          </button>
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="6" height="6" fill="currentColor"/>
              <rect x="11" y="3" width="6" height="6" fill="currentColor"/>
              <rect x="3" y="11" width="6" height="6" fill="currentColor"/>
              <rect x="11" y="11" width="6" height="6" fill="currentColor"/>
            </svg>
          </button>
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect x="2" y="2" width="7" height="7" rx="1"/>
              <rect x="11" y="2" width="7" height="7" rx="1"/>
              <rect x="2" y="11" width="7" height="7" rx="1"/>
              <rect x="11" y="11" width="7" height="7" rx="1"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="layout">
        {/* Sidebar - using shared component */}
        <PRSidebar prId={prId} activeSection="review" />

        {/* Main Content */}
        <main className="main-content">
          {/* Page Header - unified breadcrumb and title section */}
          <div className="page-header">
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <a href="#" className="breadcrumb-link">SonarSource</a>
              <span className="breadcrumb-separator">/</span>
              <a href="#" className="breadcrumb-link">asast-scanner-pipeline</a>
              <span className="breadcrumb-separator">/</span>
              <Link href="/" className="breadcrumb-link">Pull Requests</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{prData.number} - {prData.title}</span>
            </div>

            {/* Two-column layout: Left (title/metadata) and Right (call-to-actions) */}
            <div className="page-header-content">
              {/* Left column: Title + Dropdown, then Metadata */}
              <div className="page-header-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <h1 className="pr-detail-title">Pull Request Review</h1>

                  {/* PR Selector Dropdown */}
                  <div className="pr-selector-container" style={{ position: 'relative' }}>
                  <button
                    className="pr-selector-button"
                    onClick={() => setShowPRSelector(!showPRSelector)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                      <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
                    </svg>
                    <span className="pr-selector-text">
                      {prData.number} -{prData.title}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                      <path d="M6 8L2 4h8L6 8z"/>
                    </svg>
                  </button>

                  {/* PR Selector Dropdown Menu */}
                  {showPRSelector && (
                    <div className="pr-selector-dropdown">
                      {getAllPRs().map((pr) => (
                        <div key={pr.id} className={`pr-selector-item ${prId === pr.id ? 'active' : ''}`} onClick={() => {
                          if (prId !== pr.id) {
                            setShowPRSelector(false);
                            window.location.href = `${basePath}/pr/${pr.id}`;
                          }
                        }}>
                          <div className="pr-selector-item-content">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ flexShrink: 0 }}>
                              <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
                            </svg>
                            <span className="pr-selector-item-text">{pr.number} - {pr.title}</span>
                          </div>
                          <span className="pr-selector-item-status passed">Passed</span>
                        </div>
                      ))}
                    </div>
                  )}
                  </div>
                </div>

                <div className="page-metadata">
                  <span className="metadata-item">Private</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">0 New Lines</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">Last analysis 2 hours ago</span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item metadata-commit">
                    {prData.avatar && (
                      prData.avatar.type === 'image' ? (
                        <img src={prData.avatar.src} alt="Author" className="commit-avatar" />
                      ) : (
                        <div className="commit-avatar-letter">{prData.avatar.letter}</div>
                      )
                    )}
                    {prData.githubUrl ? (
                      <a href={prData.githubUrl} target="_blank" rel="noopener noreferrer" className="commit-link">
                        {prData.version}
                      </a>
                    ) : (
                      <span>{prData.version}</span>
                    )}
                  </span>
                  <span className="metadata-separator"></span>
                  <span className="metadata-item">
                    felix/fixMise2 → master
                  </span>
                </div>
              </div>

              {/* Right column: Call-to-actions */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Submit Review Button Container */}
                <div style={{ position: 'relative' }}>
                  <button className="btn-review-changes" onClick={() => setShowReviewModal(!showReviewModal)}>
                    Submit Review
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" style={{ marginLeft: '6px' }}>
                      <path d="M6 8L2 4h8L6 8z"/>
                    </svg>
                  </button>

                  {/* Review Dropdown Panel */}
                  {showReviewModal && (
                    <>
                      <div className="review-dropdown-overlay" onClick={() => setShowReviewModal(false)} />
                      <div className="review-dropdown-panel">
                  <div className="review-modal-body">
                    <textarea
                      className="review-textarea"
                      placeholder="Add a comment"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                    />

                    <div className="review-options">
                      <div className="review-option" onClick={() => setReviewType('comment')}>
                        <div className={`review-option-radio ${reviewType === 'comment' ? 'selected' : ''}`}></div>
                        <div className="review-option-content">
                          <div className="review-option-label">
                            <span className="review-option-title">Comment</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="review-option-icon">
                              <path d="M2 2h12v10H4l-2 2V2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="review-option" onClick={() => setReviewType('request-changes')}>
                        <div className={`review-option-radio ${reviewType === 'request-changes' ? 'selected' : ''}`}></div>
                        <div className="review-option-content">
                          <div className="review-option-label">
                            <span className="review-option-title">Request changes</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="review-option-icon">
                              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="review-option" onClick={() => setReviewType('approve')}>
                        <div className={`review-option-radio ${reviewType === 'approve' ? 'selected' : ''}`}></div>
                        <div className="review-option-content">
                          <div className="review-option-label">
                            <span className="review-option-title">Approve</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="review-option-icon">
                              <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="review-modal-footer">
                    <div className="review-modal-actions">
                      <button className="btn-review-submit">
                        Submit review
                      </button>
                      <button
                        className="btn-review-cancel"
                        onClick={() => setShowReviewModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                    </>
              )}
                </div>

                {/* PR Info Button */}
                <button
                  className="btn-author-note"
                  onClick={() => setShowAuthorNote(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  PR Info
                </button>

                {/* View on GitHub Button */}
                <button
                  className="btn-view-github"
                  title="This project is bound to GitHub"
                  onClick={() => window.open(prData.githubUrl || 'https://github.com', '_blank')}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  View on GitHub
                </button>

                {/* Star Button */}
                <button
                  className="btn-star"
                  title="Add this project to favorites"
                  onClick={() => console.log('Add to favorites')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="files-tab-container">
              {/* Quality Gate Summary - Full Width at Top */}
              <div className="files-quality-gate">
                <div className="quality-gate-header-row">
                  <h3 className="files-quality-gate-title">Quality Gate:</h3>
                  <div className="quality-gate-badge">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M4 10l4 4 8-8" stroke="#4caf50" strokeWidth="2" fill="none"/>
                    </svg>
                    <span>Passed</span>
                  </div>
                </div>
                <div className="quality-metrics-inline">
                  <div className="metric-inline">
                    <CoverageIndicator percentage={100} size={16} />
                    <span>Reliability Rating</span>
                    <span className="metric-required">Rating required B</span>
                  </div>
                  <div className="metric-inline">
                    <CoverageIndicator percentage={0} size={16} inverted={true} />
                    <span>0.0% Duplicated Lines (%)</span>
                    <span className="metric-required">≤ 3.0% required</span>
                  </div>
                  <div className="metric-inline">
                    <CoverageIndicator percentage={100} size={16} />
                    <span>100% Security Hotspots Reviewed</span>
                    <span className="metric-required">≥ 100% required</span>
                  </div>
                  <div className="metric-inline">
                    <span className="metric-number">0</span>
                    <span>Issues</span>
                    <span className="metric-required">≤ 0 required</span>
                  </div>
                </div>
              </div>

              {/* Two Column Layout: Groups on left, File changes on right */}
              <div id="files-view-section">
                {prId === '33' && (
                  <PRFilesView
                    fileGroups={pr33FileGroups}
                    fileChanges={pr33FileChanges}
                  />
                )}

                {prId === '34' && (
                  <PRFilesView
                    fileGroups={pr34FileGroups}
                    fileChanges={pr34FileChanges}
                  />
                )}

                {prId === '35' && (
                  <PRFilesView
                    fileGroups={pr35FileGroups}
                    fileChanges={pr35FileChanges}
                  />
                )}
              </div>

              {prId !== '33' && prId !== '34' && prId !== '35' && (
              <div className="files-view">
                <div className="files-groups">
                  <div className="files-groups-header">
                  <span>Groups</span>
                  <span className="groups-count">0 / 0</span>
                </div>
                <div style={{ padding: '20px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                  No file groups available for this PR
                </div>
                </div>
                <div className="files-content">
                  <div style={{ padding: '20px', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                    No files to display
                  </div>
                </div>
              </div>
              )}
          </div>
        </main>
      </div>

      {/* Author's Note Slide-in Panel */}
      {showAuthorNote && (
        <>
          {/* Overlay */}
          <div
            className={`author-note-overlay ${isClosingAuthorNote ? 'closing' : ''}`}
            onClick={handleCloseAuthorNote}
          />

          {/* Slide-in Panel */}
          <div className={`author-note-panel-slide ${isClosingAuthorNote ? 'closing' : ''}`}>
            <div className="author-note-panel-header">
              <h3 className="author-note-panel-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>PR Info</span>
              </h3>
              <button
                className="author-note-close"
                onClick={handleCloseAuthorNote}
                title="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="author-note-panel-content">
              {/* PR Header: Title + Author */}
              <div style={{ paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 10px 0', lineHeight: '1.4', color: 'var(--color-text-primary)' }}>
                  {prData.title}
                </h1>
                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Author</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {prData.avatar && prData.avatar.type === 'image' ? (
                    <img src={prData.avatar.src} alt="Author" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                  ) : (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600 }}>
                      {prData.avatar?.letter || 'A'}
                    </div>
                  )}
                  <span style={{ fontWeight: 500 }}>{prData.author}</span>
                </div>
              </div>
              {/* Tab Navigation */}
              <div className="author-note-tabs">
                <button
                  className={`author-note-tab ${authorNoteTab === 'context' ? 'active' : ''}`}
                  onClick={() => setAuthorNoteTab('context')}
                >
                  Description
                </button>
                <button
                  className={`author-note-tab ${authorNoteTab === 'conversation' ? 'active' : ''}`}
                  onClick={() => setAuthorNoteTab('conversation')}
                >
                  Conversations
                </button>
              </div>

              {/* Description Tab Content */}
              {authorNoteTab === 'context' && (
                <>
                  <div className="reviewer-note-section">
                    {/* Author's description - no label */}
                    <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      {prData.descriptionBlocks?.map((block, index) => (
                        block.type === 'image'
                          ? <img key={index} src={`${basePath}${block.content}`} alt="" style={{ maxWidth: '100%', display: 'block', margin: '8px 0', borderRadius: '4px' }} />
                          : <p key={index} style={{ margin: '8px 0 4px 0', whiteSpace: 'pre-line' }}>{block.content}</p>
                      )) ?? prData.summary?.map((item, index) => (
                        <p key={index} style={{ margin: '0 0 8px 0' }}>{item}</p>
                      ))}
                    </div>

                    {/* What's Next Section */}
                    {prData.groups && prData.groups.length > 0 && (
                      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '8px' }}>What's Next</div>
                        <div style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                          We've grouped this PR into themes for you.
                        </div>
                        <button
                          style={{
                            backgroundColor: 'var(--color-btn-primary-bg)',
                            color: 'var(--color-btn-primary-text)',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-btn-primary-hover)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-btn-primary-bg)';
                          }}
                          onClick={() => {
                            const filesViewSection = document.getElementById('files-view-section');
                            if (filesViewSection) {
                              filesViewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                            handleCloseAuthorNote();
                          }}
                        >
                          Click here to start reviewing &gt;
                        </button>
                      </div>
                    )}

                    {/* HIDDEN FOR FUTURE USE: Groups Pagination Section
                    {prData.groups && prData.groups.length > 0 && (
                      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Groups</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => setCurrentGroupIndex(prev => Math.max(0, prev - 1))}
                              disabled={currentGroupIndex === 0}
                              style={{
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: currentGroupIndex === 0 ? 'not-allowed' : 'pointer',
                                opacity: currentGroupIndex === 0 ? 0.5 : 1,
                                color: 'var(--color-text-primary)'
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                <path d="M8 2L4 6l4 4V2z"/>
                              </svg>
                            </button>
                            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                              {currentGroupIndex + 1} / {prData.groups.length}
                            </span>
                            <button
                              onClick={() => setCurrentGroupIndex(prev => Math.min(prData.groups.length - 1, prev + 1))}
                              disabled={currentGroupIndex === prData.groups.length - 1}
                              style={{
                                background: 'transparent',
                                border: '1px solid var(--color-border)',
                                borderRadius: '4px',
                                width: '24px',
                                height: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: currentGroupIndex === prData.groups.length - 1 ? 'not-allowed' : 'pointer',
                                opacity: currentGroupIndex === prData.groups.length - 1 ? 0.5 : 1,
                                color: 'var(--color-text-primary)'
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                <path d="M4 2l4 4-4 4V2z"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                          <div style={{ fontWeight: 500, marginBottom: '8px' }}>
                            {prData.groups[currentGroupIndex].name}
                          </div>
                          <div style={{ color: 'var(--color-text-secondary)' }}>
                            {prData.groups[currentGroupIndex].description}
                          </div>
                        </div>
                      </div>
                    )}
                    */}
                  </div>
                </>
              )}

              {/* Conversations Tab Content */}
              {authorNoteTab === 'conversation' && (
                <div className="conversation-thread">
                  {/* Comment 1 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">TL</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">api-integration-team</div>
                        <div className="comment-timestamp">3 hours ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>This PR implements the GitHub PR review comments API integration. Key components:</p>
                      <ul>
                        <li>New DTOs matching GitHub API specifications</li>
                        <li>HTTP client with retry logic and error handling</li>
                        <li>Service layer for posting and fetching comments</li>
                        <li>Comprehensive test coverage (469 lines of tests)</li>
                        <li>Controller refactoring using resolver pattern</li>
                      </ul>
                      <p>Ready for review!</p>
                    </div>
                  </div>

                  {/* Comment 2 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">SR</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">sravikumar</div>
                        <div className="comment-timestamp">2 hours ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>Great work on the test coverage! Question about the GitHubPrClient - are we handling GitHub API rate limits? Should we add rate limit headers tracking?</p>
                    </div>
                  </div>

                  {/* Comment 3 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">TL</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">api-integration-team</div>
                        <div className="comment-timestamp">1 hour ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>Good point! Added a TODO in GitHubPrClient.java to track rate limit implementation. We should handle X-RateLimit-* headers in a follow-up PR.</p>
                    </div>
                  </div>

                  {/* Comment 4 */}
                  <div className="conversation-comment">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <div className="comment-avatar-text">JM</div>
                      </div>
                      <div className="comment-meta">
                        <div className="comment-author">jmartinez</div>
                        <div className="comment-timestamp">45 minutes ago</div>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>The PrInfoResolver abstraction looks clean. Should we add caching to avoid repeated database queries for the same PR?</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
