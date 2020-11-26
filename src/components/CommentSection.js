import { useEffect, useState } from 'react';
import ApiService from '../api-service';

import Comment from './Comment';

const CommentSection = ({ commentBatch }) => {
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const comments = commentBatch.map((commentId) => {
          return ApiService.getCommentFromId(commentId);
        });
        setComments(await Promise.all(comments));
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    })();
  }, [commentBatch]);

  if (!comments) {
    return <div>Gathering comments...</div>;
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        comments.map((comment, i) => {
          return <Comment key={i} data={comment.data} />;
        })
      )}
    </>
  );
};

export default CommentSection;
