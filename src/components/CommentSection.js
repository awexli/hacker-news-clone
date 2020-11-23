import { useEffect, useState } from 'react';
import axios from 'axios';

import Comment from './Comment';

const CommentSection = ({ commentBatch }) => {
  const [comments, setComments] = useState();

  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = commentBatch.map((commentId) => {
          return axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${commentId}.json`
          );
        });
        setComments(await Promise.all(comments));
      } catch (error) {
        return alert(error);
      }
    };

    getComments();
  }, [commentBatch]);

  if (!comments) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {comments.map((comment, i) => {
        return <Comment key={i} data={comment.data} />;
      })}
    </>
  );
};

export default CommentSection;
