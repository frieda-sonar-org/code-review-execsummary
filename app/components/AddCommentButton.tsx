/**
 * AddCommentButton Component
 *
 * A reusable button with a white filled speech bubble icon and black plus symbol.
 * Used in code diff views to add inline comments.
 */

interface AddCommentButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
}

export default function AddCommentButton({
  onClick,
  ariaLabel = "Add comment"
}: AddCommentButtonProps) {
  return (
    <button className="add-comment-btn" aria-label={ariaLabel} onClick={onClick}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="white"/>
        <path d="M12 8v8M8 12h8" stroke="black" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  );
}
