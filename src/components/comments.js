import { useEffect, useState } from 'react';
import ApiService from '../api-service';
import styled from 'styled-components';

import { CommentContent } from './comment-content';
import { LoadingText } from './loading-text';

import { Button } from '../styled/Button';

const CommentsContainer = styled.div``;

const numOfCommentsToAdd = 10;

const Comments = ({ allComments, indent, isReply, levelsToRecurse }) => {
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [hasMoreComments, setHasMoreComments] = useState(levelsToRecurse < 1 ? false : true);

  useEffect(() => {
    (async () => {
      if (!allComments) return;
      await handleFetchComments(allComments, currentIndex, numOfCommentsToAdd);
    })();
    // eslint-disable-next-line
  }, [allComments]);

  const handleFetchComments = async (commentIds, currentIndex, nextIndex) => {
    try {
      const fetchedComments = await ApiService.getComments({
        commentIds,
        from: currentIndex,
        to: nextIndex,
      });

      if (fetchedComments.length < numOfCommentsToAdd) {
        setHasMoreComments(false);
      }

      setCurrentIndex(nextIndex);
      setComments([...comments, ...fetchedComments]);
    } catch (error) {
      alert(`Something went wrong fetching comments: ${error}`);
    }
  };

  const handleFetchMoreComments = async () => {
    setIsLoadingMoreComments(true);
    await handleFetchComments(allComments, currentIndex, currentIndex + numOfCommentsToAdd);
    setIsLoadingMoreComments(false);
  };

  if (!comments.length || !allComments) {
    return <LoadingText />;
  }

  return (
    <>
      <CommentsContainer>
        {comments.map((comment) => {
          if (!comment.data) {
            return <></>;
          }

          return <CommentContent key={comment.data.id} data={comment.data} isReply={isReply} indent={indent + 1} />;
        })}
      </CommentsContainer>
      {isLoadingMoreComments ? (
        <LoadingText />
      ) : (
        hasMoreComments && (
          <Button onClick={handleFetchMoreComments} margin={'4px 0'}>
            load more comments
          </Button>
        )
      )}
    </>
  );
};

export default Comments;
