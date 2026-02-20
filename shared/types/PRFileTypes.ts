export interface FileInfo {
  path: string;
  deleted?: boolean;
}

export interface FileGroup {
  id: string;
  name: string;
  files: FileInfo[];
  reviewed: boolean;
}

export interface FileChange {
  groupId: string;
  groupName: string;
  fileCount: number;
  additions: number;
  deletions: number;
  description: string;
  reviewFocus: string;
  needsReview: boolean;
  files: FileChangeDetail[];
}

export interface FileChangeDetail {
  filename: string;
  additions: number;
  deletions: number;
  changes: CodeChange[];
  expanded: boolean;
  checked: boolean;
  coverage?: number;
  duplications?: number;
  issues?: number;
}

export interface CodeChange {
  lineNumber: number | string;
  type: 'add' | 'delete' | 'context' | 'header';
  content: string;
  coverage?: 'covered' | 'uncovered' | 'partial';
}
