import { useEffect, useState } from 'react';
import ApiService from '../../api-service';
import styled from 'styled-components';

import Comment from './Comment';
import { Button } from '../../styled/Button';
import { LoadingText } from '../LoadingText';

const CommentsContainer = styled.div``;

const numOfCommentsToAdd = 25;

const Comments = ({ allComments, indent, isReply }) => {
  const [comments, setComments] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      if (!allComments) return;
      try {
        const newCommentBatch = await ApiService.getNewCommentBatch({
          allComments: allComments,
          currentIndex: 0,
          nextIndex: numOfCommentsToAdd,
        });

        if (newCommentBatch.length < numOfCommentsToAdd) {
          setHasMore(false);
        }

        setCurrentIndex(numOfCommentsToAdd);
        setComments(newCommentBatch);
      } catch (error) {
        alert(error);
      }
    })();
  }, [allComments]);
  

  const handleMoreComments = async () => {
    setLoading(true);
    try {
      const nextIndex = currentIndex + numOfCommentsToAdd;
      const newComments = await ApiService.getNewCommentBatch({
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
    } catch (error) {
      alert(error);
    }
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
          />
        ))}
      </CommentsContainer>
      {loading ? (
        <LoadingText />
      ) : (
        hasMore && (
          <Button onClick={handleMoreComments}>load more comments</Button>
        )
      )}
    </>
  );
};

export default Comments;
