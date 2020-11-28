import { useEffect, useState } from 'react';
import ApiService from '../api-service';

import Comment from './Comment';

const CommentSection = ({ allComments, ButtonMore }) => {
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const comments = allComments.map((commentId) => {
          return ApiService.getCommentFromId(commentId);
        });
        setComments(await Promise.all(comments));
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    })();
  }, [allComments]);

  if (!comments) {
    return <div>Gathering comments...</div>;
  }

  return (
    <>
      {comments.map((comment, i) => {
        return <Comment key={i} data={comment.data} />;
      })}
      {loading ? <button disabled>Loading...</button> : ButtonMore}
    </>
  );
};

export default CommentSection;
