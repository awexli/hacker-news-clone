import { Box, Divider } from '@chakra-ui/react';
import { Item } from '../api/client';
import { Comment } from './comment';

export const Comments = (props: {
  comments: Item[];
  isReplyComment: boolean;
  indent: number;
  levelsToRecurse?: number;
}) => {
  return (
    <Box>
      {props.comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            isReplyComment={props.isReplyComment}
            indent={props.indent + 1}
          />
        );
      })}
      {!props.isReplyComment && <Divider margin="1rem 0" />}
    </Box>
  );
};
