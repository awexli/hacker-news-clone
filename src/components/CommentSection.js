import { useEffect, useState } from 'react';
import ApiService from '../api-service';

import Comment from './Comment';
import { Button } from '../styled/Button'

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

        setComments([...comments, ...newComments]);
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
      {comments.map((comment, i) => {
        return <Comment key={i} data={comment.data} />;
      })}
      <hr />
      {loading ? <Button disabled>Loading...</Button> : ButtonMore}
    </>
  );
};

export default CommentSection;
