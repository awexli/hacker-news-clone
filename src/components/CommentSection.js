import { useEffect, useState } from 'react';
import ApiService from '../api-service';
import styled from 'styled-components';

import Comment from './Comment';
import { Button } from '../styled/Button';

const CommentHeading = styled.h2`
  margin: 0;
`;

const HorizontalLine = styled.hr`
  height: 1px;
  background-color: #d9dbdb;
  border: none;
`;



// isReply? show replies 'button'
// rename this component to 'Comments'
const CommentSection = ({ allComments, indent, isReply }) => {
  const [comments, setComments] = useState();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [toAdd, setToAdd] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      if (!allComments) return;
      try {
        const numOfCommentsToAdd = 15;
        const newComments = await ApiService.getNewCommentBatch({
          allComments: allComments,
          currentIndex: 0,
          nextIndex: numOfCommentsToAdd,
        });
        if (newComments.length < numOfCommentsToAdd) {
          setHasMore(false);
        }
        setComments(newComments);
        setToAdd(numOfCommentsToAdd);
      } catch (error) {
        alert(error);
      }
    })();
  }, [allComments]);

  const handleMoreComments = async () => {
    setLoading(true);
    try {
      const nextIndex = currentIndex + toAdd;
      const newComments = await ApiService.getNewCommentBatch({
        allComments,
        currentIndex,
        nextIndex,
      });

      if (
        newComments.length < toAdd ||
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
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* <CommentHeading>Comments</CommentHeading> */}
      {/* <HorizontalLine /> */}
      {comments.map((comment, i) => (
        <Comment
          key={i}
          data={comment.data}
          indent={indent + 1}
        />
      ))}
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        hasMore && <Button onClick={handleMoreComments}>More</Button>
      )}
    </>
  );
};

export default CommentSection;
