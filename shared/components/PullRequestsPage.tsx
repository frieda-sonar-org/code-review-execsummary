import Link from 'next/link';
import { getAllPRs } from '@/shared/data/pr-info';

interface PullRequestsPageProps {
  basePath?: string;
}

export default function PullRequestsPage({ basePath = '' }: PullRequestsPageProps) {
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
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="project-selector">
            <div className="project-icon">A</div>
            <div className="project-info">
              <div className="project-name">asast-scanner-pipe...</div>
              <div className="project-label">Project</div>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8L2 4h8L6 8z"/>
            </svg>
          </div>

          <nav className="sidebar-nav">
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="12" height="12" rx="1"/>
              </svg>
              Overview
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="5" height="5"/>
                <rect x="9" y="2" width="5" height="5"/>
                <rect x="2" y="9" width="5" height="5"/>
                <rect x="9" y="9" width="5" height="5"/>
              </svg>
              Dashboards
              <span className="badge-new">New</span>
              <svg className="chevron" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M4 2l4 4-4 4V2z"/>
              </svg>
            </a>

            <div className="sidebar-section">Analysis</div>

            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="10" width="3" height="4"/>
                <rect x="6" y="6" width="3" height="8"/>
                <rect x="10" y="2" width="3" height="12"/>
              </svg>
              Summary
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12v12H2V2zm2 2v8h8V4H4z"/>
              </svg>
              Issues
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="6"/>
              </svg>
              Security Hotspots
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2L6 6H2l4 4-2 6 4-3 4 3-2-6 4-4h-4l-2-4z"/>
              </svg>
              Dependency Risks
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12l-6 12L2 2z"/>
              </svg>
              Security Reports
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <rect x="2" y="2" width="4" height="4"/>
                <rect x="7" y="2" width="4" height="4"/>
                <rect x="12" y="2" width="2" height="4"/>
                <rect x="2" y="7" width="4" height="7"/>
                <rect x="7" y="7" width="4" height="7"/>
                <rect x="12" y="7" width="2" height="7"/>
              </svg>
              Architecture
              <span className="badge-beta">Beta</span>
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 6h12v2H2V6zm0 4h12v2H2v-2z"/>
              </svg>
              Measures
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12v12H2V2zm2 2v8h8V4H4z"/>
                <path d="M6 6h4v4H6V6z"/>
              </svg>
              Code
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="5" cy="5" r="2"/>
                <circle cx="11" cy="5" r="2"/>
                <circle cx="8" cy="11" r="2"/>
                <path d="M5 7l3 4m3-4l-3 4"/>
              </svg>
              Dependencies
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2v12M2 8h12"/>
              </svg>
              Activity
            </a>

            <div className="sidebar-section">Information</div>

            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 2L2 6v4l6 4 6-4V6l-6-4z"/>
              </svg>
              Agent activity
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="6"/>
                <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              Project Information
            </a>
            <a href="#" className="sidebar-link sidebar-link-active">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
              </svg>
              Pull Requests
              <span className="count-badge">5</span>
            </a>
            <a href="#" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 2h12v2H2V2zm0 4h8v2H2V6zm0 4h10v2H2v-2z"/>
              </svg>
              Branches
              <span className="count-badge">1</span>
            </a>
          </nav>
        </aside>

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
              <span className="breadcrumb-current">Pull Requests</span>
            </div>

            {/* Title section */}
            <div className="page-header-title-section">
              <div>
                <h1 className="page-title">Pull Requests</h1>
                {/* <div className="warning-badge">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 2l6 12H2L8 2z"/>
                    <path d="M8 7v3M8 11h.01" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Last analysis had warnings
                </div> */}
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="search-bar">
            <div className="pr-count">5 Pull Requests</div>
            <div className="search-input-wrapper">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input type="text" className="search-input" placeholder="Search for Pull Requests..."/>
            </div>
            <button className="btn-filters">Filters</button>
          </div>

          {/* Pull Requests List */}
          <div className="pr-list">
            {getAllPRs().map((pr) => (
              <Link key={pr.id} href={`/pr/${pr.id}`} className="pr-item">
                <div className="pr-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
                  </svg>
                </div>
                <div className="pr-title">{pr.number} - {pr.title}</div>
                <div className="pr-status">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 8l4 4 8-8" stroke="#4caf50" strokeWidth="2" fill="none"/>
                  </svg>
                  Passed
                </div>
                <div className="pr-icon-small">
                  {pr.avatar?.type === 'image' ? (
                    <img src={pr.avatar.src} alt="Avatar" className="pr-avatar-image" />
                  ) : (
                    <div className="pr-avatar-letter">{pr.avatar?.letter}</div>
                  )}
                </div>
                <div className="pr-date">{pr.timestamp}</div>
                <div className="pr-commit">{pr.version}</div>
              </Link>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}
