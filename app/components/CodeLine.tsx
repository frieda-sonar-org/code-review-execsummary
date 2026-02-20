/**
 * CodeLine Component
 *
 * Represents a single line of code in a diff view.
 * Supports added/removed/unchanged states and inline comments.
 */

import { ReactNode } from 'react';
import AddCommentButton from './AddCommentButton';

interface CodeLineProps {
  lineId: string;
  lineNumber: number;
  type?: 'added' | 'removed' | 'unchanged';
  hasComment?: boolean;
  children: ReactNode;
  onLineClick: (lineId: string) => void;
}

export default function CodeLine({
  lineId,
  lineNumber,
  type = 'unchanged',
  hasComment = false,
  children,
  onLineClick
}: CodeLineProps) {
  const classNames = ['code-line'];
  if (type === 'added') classNames.push('added');
  if (type === 'removed') classNames.push('removed');
  if (hasComment) classNames.push('has-comment');

  const sign = type === 'added' ? '+' : type === 'removed' ? '-' : ' ';

  return (
    <tr className={classNames.join(' ')}>
      <td className="line-number" onClick={() => onLineClick(lineId)}>
        {lineNumber}
      </td>
      <td className="line-comment-toggle" onClick={() => onLineClick(lineId)}>
        <AddCommentButton />
      </td>
      <td className="line-sign">{sign}</td>
      <td className="line-content">{children}</td>
    </tr>
  );
}
