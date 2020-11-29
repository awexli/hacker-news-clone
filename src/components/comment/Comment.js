import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Comments from './Comments';
import { CommentContent } from './CommentContent';
import { ReplyButton } from '../ReplyButton';

const flash = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 1;
  }
`;

const CommentContainer = styled.div`
  font-size: 14px;
  animation: ${flash} 0.3s ease-in;
  margin-left: ${(props) => {
    if (props.indent !== 1) {
      return 8 + props.indent;
    }
  }}px;
  padding-left: 10px;
  border-left: 1px dotted grey;
`;

const Comment = ({ data, indent }) => {
  const [hasViewedReplies, setHasViewedReplies] = useState(false);

  const handleReplies = () => {
    setHasViewedReplies(true);
  };

  return (
    <>
      <CommentContainer indent={indent}>
        <CommentContent data={data} />
        {data.kids && (
          <ReplyButton
            handleReplies={handleReplies}
            hasViewedReplies={hasViewedReplies}
            numOfReplies={data.kids.length}
          />
        )}
        {hasViewedReplies && (
          <Comments
            allComments={data.kids}
            indent={indent + 1}
            isReply={true}
          />
        )}
      </CommentContainer>
    </>
  );
};

export default Comment;
