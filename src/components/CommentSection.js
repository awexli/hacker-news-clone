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

const numOfCommentsToAdd = 2;
const CommentSection = ({ allComments, indent }) => {
  const [comments, setComments] = useState();
  const [currentIndex, setCurrentIndex] = useState(numOfCommentsToAdd);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    (async () => {
      if (!allComments) return;

      try {
        const newComments = await ApiService.getNewCommentBatch({
          allComments: allComments,
          currentIndex: 0,
          nextIndex: numOfCommentsToAdd,
        });
        if (newComments.length < numOfCommentsToAdd) {
          setHasMore(false);
        }
        setComments(newComments);
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
    return <></>
  }

  return (
    <>
      {/* <CommentHeading>Comments</CommentHeading> */}
      {/* <HorizontalLine /> */}
      {comments.map((comment, i) => <Comment key={i} data={comment.data} indent={indent + 1} />)}
      {/* <HorizontalLine /> */}
      {/* {loading ? (
        <p>Loading comments...</p>
      ) : (
        hasMore && <Button onClick={handleMoreComments}>More</Button>
      )} */}
    </>
  );
};

export default CommentSection;
