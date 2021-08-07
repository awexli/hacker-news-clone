import { useEffect, useState } from 'react';
import ApiService from '../../api-service';
import styled from 'styled-components';

import Comment from './Comment';
import { Button } from '../../styled/Button';
import { LoadingText } from '../LoadingText';

const CommentsContainer = styled.div``;

const numOfCommentsToAdd = 10;

const Comments = ({
  allComments,
  indent,
  isReply,
  levelsToRecurse,
}) => {
  const [comments, setComments] = useState(
    levelsToRecurse < 1 ? allComments : undefined
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(levelsToRecurse < 1 ? false : true);

  useEffect(() => {
    if (!allComments) return;

    if (levelsToRecurse < 1) return;

    (async () => {
      const comments = await ApiService.getComments({
        allComments: allComments,
        currentIndex: 0,
        nextIndex: numOfCommentsToAdd,
      });

      if (comments.length < numOfCommentsToAdd) {
        setHasMore(false);
      }

      setCurrentIndex(numOfCommentsToAdd);
      setComments(comments);
    })();
  }, [allComments, levelsToRecurse]);

  const handleMoreComments = async () => {
    setLoading(true);
    const nextIndex = currentIndex + numOfCommentsToAdd;
    const newComments = await ApiService.getComments({
      allComments,
      currentIndex,
      nextIndex,
    });

    if (
      newComments.length < numOfCommentsToAdd ||
      nextIndex >= allComments.length
    ) {
      setHasMore(false);
    }

    setCurrentIndex(nextIndex);
    setComments([...comments, ...newComments]);
    setLoading(false);
  };

  if (!comments || !allComments) {
    return <LoadingText />;
  }

  return (
    <>
      <CommentsContainer>
        {comments.map((comment, i) => (
          <Comment
            key={i}
            data={comment.data}
            indent={indent + 1}
            isReply={isReply}
            levelsToRecurse={levelsToRecurse}
          />
        ))}
      </CommentsContainer>
      {loading ? (
        <LoadingText />
      ) : (
        hasMore && (
          <Button onClick={handleMoreComments} margin={'4px 0'}>
            load more comments
          </Button>
        )
      )}
    </>
  );
};

export default Comments;
