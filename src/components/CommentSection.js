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

const numOfCommentsToAdd = 25;
const CommentSection = ({ initialComments, allComments }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentBoundary, setCurrentBoundary] = useState(numOfCommentsToAdd);
  const [isMoreComments, setIsMoreComments] = useState(false);

  const handleMoreComments = async () => {
    setLoading(true);
    try {
      const nextBoundary = currentBoundary + numOfCommentsToAdd;
      const newCommentBatch = allComments.slice(currentBoundary, nextBoundary);
      const newCommentsPromises = newCommentBatch.map((commentId) => {
        return ApiService.getCommentFromId(commentId);
      });
      const newComments = await Promise.all(newCommentsPromises);
      setCurrentBoundary(nextBoundary);
      setComments([...comments, ...newComments]);
      if (newCommentBatch.length < numOfCommentsToAdd || nextBoundary >= allComments.length) {
        setIsMoreComments(true);
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (initialComments.length < numOfCommentsToAdd) {
      setIsMoreComments(true);
    }
    setComments(initialComments);
  }, [initialComments]);

  return (
    <>
      <CommentHeading>Comments</CommentHeading>
      <HorizontalLine />
      {comments.map((comment, i) => {
        return <Comment key={i} data={comment.data} />;
      })}
      <HorizontalLine />
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        !isMoreComments && <Button onClick={handleMoreComments}>More</Button>
      )}
    </>
  );
};

export default CommentSection;
