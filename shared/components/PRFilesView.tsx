'use client';

import { useState } from 'react';
import { FileGroup, FileChange } from '../types/PRFileTypes';
import PRFileGroups from './PRFileGroups';
import PRFilesContent from './PRFilesContent';

interface PRFilesViewProps {
  fileGroups: FileGroup[];
  fileChanges: FileChange[];
  onGroupReviewed?: (groupId: string) => void;
  onFileChecked?: (groupId: string, fileIndex: number) => void;
}

export default function PRFilesView({
  fileGroups,
  fileChanges,
  onGroupReviewed,
  onFileChecked
}: PRFilesViewProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [expandedFileChanges, setExpandedFileChanges] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const toggleFileChange = (groupId: string) => {
    setExpandedFileChanges(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const scrollToGroup = (groupId: string) => {
    const element = document.getElementById(`group-${groupId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const reviewedCount = fileGroups.filter(g => g.reviewed).length;

  return (
    <div className="files-view">
      <PRFileGroups
        fileGroups={fileGroups}
        expandedGroups={expandedGroups}
        reviewedCount={reviewedCount}
        onToggleGroup={toggleGroup}
        onScrollToGroup={scrollToGroup}
      />

      <PRFilesContent
        fileChanges={fileChanges}
        expandedFileChanges={expandedFileChanges}
        onToggleFileChange={toggleFileChange}
        onFileChecked={onFileChecked}
      />
    </div>
  );
}
