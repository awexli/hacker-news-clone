import { Button } from '../styled/Button';

export const ReplyButton = ({
  handleReplies,
  hasViewedReplies,
  numOfReplies,
}) => {
  return (
    <>
      {!hasViewedReplies && (
        <Button onClick={handleReplies}>
          {numOfReplies} more {numOfReplies > 1 ? 'replies' : 'reply'}
        </Button>
      )}
    </>
  );
};
