import { Box, Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { Item } from '../api/client';
import { Comments } from './comments';
import { UserModal } from './user-modal';

export const Comment = (props: {
  comment: Item;
  isReplyComment: boolean;
  indent: number;
}) => {
  const { comment } = props;
  const [show, setShow] = useState(true);

  return (
    <>
      {!comment.dead ? (
        <Box
          marginLeft={`${props.indent !== 1 && 8 + props.indent}px`}
          paddingLeft={`${props.isReplyComment && '1rem'}`}
          borderLeft={`${props.isReplyComment && '1px dotted grey'}`}
          paddingBottom="1rem"
        >
          <Flex alignItems="center">
            {!comment.deleted && (
              <Button
                variant="link"
                onClick={() => setShow(!show)}
                margin={'0 4px 0 0'}
                padding="0"
                color={'hn.wheat'}
              >
                {show ? '[ - ]' : '[ + ]'}
              </Button>
            )}
            <UserModal item={comment} />
          </Flex>
          {show && (
            <Box
              margin="1px 0"
              padding="8px"
              dangerouslySetInnerHTML={{ __html: comment.text }}
            />
          )}
          {comment.newKids && comment.newKids.length ? (
            <Box display={`${show ? 'block' : 'none'}`}>
              <Comments
                comments={comment.newKids}
                isReplyComment={true}
                indent={props.indent + 1}
              />
            </Box>
          ) : null}
        </Box>
      ) : null}
    </>
  );
};
