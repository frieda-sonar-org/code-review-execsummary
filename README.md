# Code Review POC - Persistent Data Concept

> **Proof of Concept**: This version explores implementing persistent data and real integrations for the code review experience.

## 🎯 Purpose

This POC demonstrates an enhanced code review experience that helps reviewers understand and assess pull requests more effectively. By providing rich context, quality metrics, and an intuitive review interface, we aim to:

- **Reduce cognitive load** for reviewers by surfacing relevant information upfront
- **Improve review quality** through better visibility into code changes and quality metrics
- **Streamline the review workflow** with focused, file-centric review capabilities
- **Provide actionable insights** via quality gates, coverage indicators, and inline metrics

## 🚀 Current State

This prototype currently implements:

### ✅ Pull Request List View
- Browse all pull requests in a project
- Visual quality gate status indicators (Passed/Failed)
- Quick access to PR metadata (commit hashes, timestamps, branch info)
- Search bar and filter controls (UI only)

### ✅ Pull Request Files View
- **Quality Gate Summary**: Full-width section showing overall quality metrics
  - Pass/fail status with visual indicators
  - Key metrics: Reliability Rating, Duplicated Lines %, Security Hotspots, Coverage

- **File Grouping**: Organized file changes by logical groups
  - Collapsible group headers
  - File count and change statistics per group
  - Visual indicators for reviewed/unreviewed status

- **Code Diff Viewer**:
  - Syntax-highlighted code diffs
  - Line-by-line code display with add/remove indicators
  - Expandable/collapsible file sections
  - Inline comment buttons (hover to reveal)

- **Coverage Indicators**:
  - Visual donut charts for percentage metrics
  - Color-coded (green = good, red = bad)
  - Inverted mode for metrics where lower is better

- **Review Workflow**:
  - Mark individual files as reviewed (green checkmark)
  - Mark entire groups as reviewed
  - Review state synchronized across UI
  - "Review changes" modal (Comment, Request Changes, Approve)

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **Styling**: Custom CSS Design System + Tailwind CSS v4
- **Typography**: Echoes Design System (Inter + Ubuntu Mono)
- **TypeScript**: v5
- **Deployment**: GitHub Pages (static export)

## 🎨 Design Philosophy

### Context-First Approach
- **Quality metrics upfront**: Show quality gate results immediately
- **Visual hierarchy**: Important information is visually prominent
- **Progressive disclosure**: Collapse details until needed
- **Focused interface**: Removed distractions (no separate tabs, streamlined UI)

### Review-Centric Design
- **File-based workflow**: Review files one at a time or by group
- **Clear status tracking**: Visual indicators show what's been reviewed
- **Inline actions**: Comment and review without leaving context
- **Persistent state**: Review progress is maintained across the session

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) to view the prototype.

### Build for Production

```bash
# Create static export for GitHub Pages
npm run build

# Preview production build locally
npm start
```

### Cleanup

```bash
# Remove build cache to reduce project size
rm -rf .next out
```

## 📂 Project Structure

```
code-review-fab/
├── app/
│   ├── components/
│   │   ├── PullRequestsPage.tsx    # Main PR list component
│   │   ├── CoverageIndicator.tsx   # Donut chart coverage indicator
│   │   └── AddCommentButton.tsx    # Inline comment button
│   ├── pr/
│   │   └── [id]/
│   │       ├── page.tsx            # PR detail page (server component)
│   │       └── PRDetailClient.tsx  # PR detail client component
│   ├── design-system.css           # Color palette and design tokens
│   ├── design-system-typography.css # Typography tokens
│   ├── styles.css                  # Component styles
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout with font config
│   └── page.tsx                    # Homepage
├── public/
│   └── Sonar Qube Cloud.svg        # Logo
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages deployment
└── CLAUDE.md                       # Detailed technical documentation
```

## 🧭 User Journey

### 1. **Discover** - Pull Requests List
- Land on homepage showing all PRs
- Scan quality gate status at a glance
- Click any PR to dive into details

### 2. **Review** - Files View
- See quality gate summary immediately
- Browse files organized by logical groups
- Expand/collapse file diffs as needed
- View quality metrics per file (coverage, duplications, issues)
- Add inline comments on specific lines
- Mark files/groups as reviewed

### 3. **Decide** - Submit Review
- Click "Review changes" button
- Choose review type (Comment / Request Changes / Approve)
- Submit feedback with context from your review

## 🎯 Design Decisions

### Why Files-Only View?
We removed the Context tab (Description + Discussion) to focus solely on **code review**. Rationale:
- **Reduces context switching**: Everything needed for review is in one place
- **Minimizes cognitive load**: No need to toggle between tabs
- **Emphasizes code**: The files and quality metrics are the primary focus
- **Streamlines workflow**: Faster path from viewing to reviewing

### Why Quality Gate First?
- **Sets expectations**: Reviewers see overall quality status immediately
- **Guides attention**: Failed metrics highlight what needs focus
- **Provides context**: Quality trends inform review priorities

### Why Group Files?
- **Logical organization**: Related files grouped together (e.g., "CI/CD Workflow", "API Changes")
- **Batch operations**: Review entire groups at once
- **Better overview**: Understand scope of changes at a glance

## 📊 What's Currently Dummy Data

- All PR data (titles, descriptions, authors)
- All file changes and diffs
- Quality gate metrics
- Comments and discussions
- User avatars and profiles

## 🚧 Current Limitations

This is a **prototype POC**, not a production application:
- ❌ No real SonarQube API integration
- ❌ No authentication/authorization
- ❌ No persistent storage (all state is in-memory)
- ❌ Search and filters are UI-only (non-functional)
- ❌ Inline comments don't persist
- ❌ Review submissions aren't saved

## 🔮 Next Steps & Exploration Areas

This POC is the **starting point** for exploring:

### Phase 1: Contextualization Enhancements
- [ ] Integrate real SonarQube API data
- [ ] Add AI-generated PR summaries
- [ ] Show historical quality trends
- [ ] Highlight risky/complex file changes
- [ ] Display test coverage impact

### Phase 2: Reviewer Intelligence
- [ ] Suggest relevant reviewers based on file expertise
- [ ] Show reviewer workload/availability
- [ ] Estimate review time based on PR complexity
- [ ] Surface related PRs and prior changes

### Phase 3: Interactive Features
- [ ] Functional inline commenting
- [ ] Comment threading and discussions
- [ ] Real-time collaboration (multiple reviewers)
- [ ] Review checklist templates
- [ ] Keyboard shortcuts for power users

### Phase 4: Integration & Polish
- [ ] GitHub/GitLab integration
- [ ] Notification system
- [ ] Mobile responsive design
- [ ] Accessibility improvements (WCAG AA)
- [ ] Performance optimizations

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Comprehensive technical documentation
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - GitHub Pages deployment guide

## 🤝 Feedback & Collaboration

This is an evolving POC. We welcome:
- Feedback on the review experience
- Suggestions for contextualization improvements
- Ideas for reducing reviewer cognitive load
- Usability observations

## 📝 Notes

- **Dark mode only**: Optimized for developer workflows
- **Prototype fidelity**: Intentionally high-fidelity to test realistic interactions
- **SonarQube inspired**: UI patterns borrowed from SonarQube Cloud
- **Static export**: Can be deployed to GitHub Pages or any static host

---

**Last Updated**: February 10, 2026
**Status**: Active POC Development
**Version**: v1.0-prototype
# turbo-garbanzo
