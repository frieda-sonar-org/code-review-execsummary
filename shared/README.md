# Shared Components for Code Review Concepts

This directory contains reusable "sticky" components that provide cohesive navigation and layout across different code review concept implementations.

## Components

### `PRSidebar.tsx`
Left-hand side navigation component for Pull Request pages.

**Source of Truth**: `code-review-fab/app/pr/[id]/PRDetailClient.tsx` (lines 220-366)

**Usage**:
```tsx
import PRSidebar from '@/shared/components/PRSidebar';

<PRSidebar prId="35" activeSection="review" />
```

**Props**:
- `prId` (optional): Pull request ID for dynamic links
- `activeSection` (optional): Which section is currently active
  - Options: `'overview' | 'review' | 'summary' | 'issues' | 'pull-requests'`
  - Default: `'review'`

### `PRFilesView.tsx`
Complete files-view section with both file groups sidebar and file content display.

**Source of Truth**: `code-review-fab/app/pr/[id]/PRDetailClient.tsx` (lines 545-1075+)

**Usage**:
```tsx
import PRFilesView from '@/shared/components/PRFilesView';
import { pr35FileGroups, pr35FileChanges } from '@/shared/data/pr35-file-groups';

<PRFilesView
  fileGroups={pr35FileGroups}
  fileChanges={pr35FileChanges}
  onGroupReviewed={(groupId) => console.log('Reviewed:', groupId)}
  onFileChecked={(groupId, fileIndex) => console.log('Checked:', groupId, fileIndex)}
/>
```

**Props**:
- `fileGroups`: Array of file group data (left sidebar)
- `fileChanges`: Array of file change data (right content)
- `onGroupReviewed` (optional): Callback when a group is marked as reviewed
- `onFileChecked` (optional): Callback when a file is checked/unchecked

### `PRFileGroups.tsx`
Left sidebar showing file groups (used internally by PRFilesView).

### `PRFilesContent.tsx`
Right content area showing file changes (used internally by PRFilesView).

## Types

### `PRFileTypes.ts`
TypeScript types for file groups and changes:
- `FileInfo`: Individual file metadata
- `FileGroup`: Group of related files
- `FileChange`: File change details with diffs
- `FileChangeDetail`: Individual file diff data
- `CodeChange`: Line-by-line code changes

## Data

### `pr35-file-groups.ts`
Pre-configured data for PR 35 with 6 file groups:
1. GitHub PR Comment DTOs & Data Models (3 files)
2. GitHub Client Implementation & Service Logic (4 files)
3. GitHub Client Tests & Mock Implementation (6 files)
4. PR Info Resolution Service Layer (3 files)
5. Analysis Service & SCM Webhook Processing (6 files)
6. Integration Tests & E2E Workflow Tests (5 files)

## Structure

```
shared/
├── components/
│   ├── PRSidebar.tsx           # Left navigation sidebar
│   ├── PRFilesView.tsx         # Main files view container
│   ├── PRFileGroups.tsx        # File groups sidebar
│   └── PRFilesContent.tsx      # File content display
├── types/
│   └── PRFileTypes.ts          # TypeScript type definitions
├── data/
│   └── pr35-file-groups.ts     # PR 35 file group data
└── README.md                   # This file
```

## Projects Using Shared Components

### ✅ code-review-fab (Source of Truth)
- Uses: PRSidebar component
- Uses: PRFilesView data structure
- Button text: "Submit review"
- Status: Primary implementation

### ✅ code-review-persistent
- Uses: PRSidebar component (linked from shared/)
- Uses: PRFilesView components
- Button text: "Submit Review"
- Status: Successfully integrated

## How to Integrate Into New Concepts

### 1. Copy the shared folder to your project:
```bash
cp -r ../shared ./
```

### 2. Import and use PRSidebar:
```tsx
import PRSidebar from '@/shared/components/PRSidebar';

// In your component:
<PRSidebar prId={prId} activeSection="review" />
```

### 3. Import and use PRFilesView:
```tsx
import PRFilesView from '@/shared/components/PRFilesView';
import { pr35FileGroups, pr35FileChanges } from '@/shared/data/pr35-file-groups';

// In your component:
<PRFilesView
  fileGroups={pr35FileGroups}
  fileChanges={pr35FileChanges}
/>
```

### 4. Use consistent styling:
Ensure you have the CSS classes from code-review-fab:
- `app/styles.css`
- `app/design-system.css`

Required CSS classes:
- `.files-view` - Main container
- `.files-groups` - Left sidebar
- `.files-groups-header` - Groups header
- `.file-group` - Individual group
- `.file-group-name` - Group name
- `.file-group-toggle` - Expand/collapse button
- `.files-content` - Right content area
- `.file-change-card` - File change container
- `.file-change-header` - Change header
- `.file-change-description` - Description text
- `.needs-review-badge` - Review status badge
- `.file-count`, `.additions`, `.deletions` - Stat badges

## Design Decisions

- **"Submit review"** is the standardized CTA button text (not "Review changes")
- All navigation uses the SonarQube-inspired design system
- Components are client-side rendered (`'use client'`)
- Sidebar navigation is consistent across all concept implementations
- File grouping is data-driven for easy customization
- Files-view uses TypeScript for type safety
- Deleted files are marked with `deleted: true` and styled with strikethrough

## Creating Custom File Groups

To create your own file groups for a different PR:

```typescript
import { FileGroup, FileChange } from '@/shared/types/PRFileTypes';

export const myFileGroups: FileGroup[] = [
  {
    id: 'my-group',
    name: 'My File Group',
    reviewed: false,
    files: [
      { path: 'src/my/file.ts' },
      { path: 'src/deleted/file.ts', deleted: true },
    ]
  },
  // ... more groups
];

export const myFileChanges: FileChange[] = [
  {
    groupId: 'my-group',
    groupName: 'My File Group',
    fileCount: 2,
    additions: 100,
    deletions: 50,
    needsReview: true,
    description: 'Description of changes',
    reviewFocus: 'What reviewers should focus on',
    files: []
  },
  // ... more changes
];
```

## Notes

- The shared folder is copied into each project (not symlinked) to maintain build independence
- All SVG icons and styling match the source of truth in code-review-fab
- TypeScript types are included for better developer experience
- File groups support expand/collapse functionality
- Groups can be marked as reviewed
- Clicking a group name scrolls to its content in the right panel
