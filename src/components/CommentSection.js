import { useEffect, useState } from 'react';
import ApiService from '../api-service';
import styled from 'styled-components';

import Comment from './Comment';

const CommentHeading = styled.h2`
  margin: 0;
`;

const HorizontalLine = styled.hr`
  height: 1px;
  background-color: #D9DBDB;
  border: none;
`;

const CommentSection = ({ incomingComments, ButtonMore }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const newCommentsPromises = incomingComments.map((commentId) => {
          return ApiService.getCommentFromId(commentId);
        });

        const newComments = await Promise.all(newCommentsPromises);
        
        setComments(comments => [...comments, ...newComments]);
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    })();
  }, [incomingComments]);

  if (comments.length < 1) {
    return <div>Gathering comments...</div>;
  }

  return (
    <>
      <CommentHeading>Comments</CommentHeading>
      <HorizontalLine />
      {comments.map((comment, i) => {
        return <Comment key={i} data={comment.data} />;
      })}
      <HorizontalLine />
      {loading ? <p>Loading...</p> : ButtonMore}
    </>
  );
};

export default CommentSection;
