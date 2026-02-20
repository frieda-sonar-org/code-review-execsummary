'use client';

import { FileGroup } from '../types/PRFileTypes';

interface PRFileGroupsProps {
  fileGroups: FileGroup[];
  expandedGroups: Record<string, boolean>;
  reviewedCount: number;
  onToggleGroup: (groupId: string) => void;
  onScrollToGroup: (groupId: string) => void;
}

export default function PRFileGroups({
  fileGroups,
  expandedGroups,
  reviewedCount,
  onToggleGroup,
  onScrollToGroup
}: PRFileGroupsProps) {
  return (
    <div className="files-groups">
      <div className="files-groups-header">
        <span>Groups</span>
        <span className="groups-count">{reviewedCount} / {fileGroups.length}</span>
      </div>

      {fileGroups.map((group) => {
        const isExpanded = expandedGroups[group.id];

        return (
          <div key={group.id} className="file-group">
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                style={{
                  marginRight: '8px',
                  marginTop: '2px',
                  flexShrink: 0,
                  color: group.reviewed ? '#4CAF50' : 'var(--color-text-muted)'
                }}
              >
                <path d="M2 3h5l2 2h5v8H2V3z" stroke="currentColor" strokeWidth="1" fill="none"/>
              </svg>

              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div
                  className="file-group-name"
                  style={{
                    fontWeight: 500,
                    marginBottom: isExpanded ? '8px' : '0',
                    cursor: 'pointer',
                    color: group.reviewed ? '#4CAF50' : 'inherit'
                  }}
                  onClick={() => onScrollToGroup(group.id)}
                >
                  {group.name}
                </div>

                {isExpanded && (
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', paddingLeft: '8px' }}>
                    {group.files.map((file, idx) => (
                      <button
                        key={idx}
                        className="file-group-file-name"
                        style={{
                          marginBottom: idx < group.files.length - 1 ? '4px' : '0',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          direction: 'rtl',
                          textAlign: 'left',
                          cursor: 'pointer',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          color: 'inherit',
                          font: 'inherit',
                          width: '100%',
                          display: 'block',
                          ...(file.deleted && {
                            textDecoration: 'line-through',
                            opacity: 0.6
                          })
                        }}
                        onClick={() => {
                          const diffElement = document.getElementById(`diff-${group.id}-${idx}`);
                          if (diffElement) {
                            diffElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                      >
                        {file.path}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="file-group-toggle"
                onClick={() => onToggleGroup(group.id)}
                style={{ marginLeft: '8px', flexShrink: 0, marginTop: '2px' }}
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
          </div>
        );
      })}
    </div>
  );
}
