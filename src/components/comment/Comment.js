import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Comments from './Comments';
import { CommentContent } from './CommentContent';

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
  margin-left: ${(props) => props.indent !== 1 && 8 + props.indent}px;
  padding-left: ${(props) => props.isReply && '10px'};
  border-left: ${(props) => props.isReply && '1px dotted var(--color-grey)'};
`;

const ChildrenContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Comment = ({ data, indent, isReply }) => {
  const [hasViewedReplies, setHasViewedReplies] = useState(false);
  const [show, setShow] = useState(true);

  const handleReplies = () => {
    setHasViewedReplies(true);
  };

  // document this and where show state and toggle needs to be passed
  const toggleCollapse = () => {
    setShow(!show);
  };

  return (
    <>
      <CommentContainer indent={indent} isReply={isReply}>
        {/* starting to pass in too many props */}
        <CommentContent
          data={data}
          toggleCollapse={toggleCollapse}
          show={show}
          handleReplies={handleReplies}
          hasViewedReplies={hasViewedReplies}
        />
        {/* document why we want show being passed in as a prop to display block/none */}
        <ChildrenContainer show={show}>
          {hasViewedReplies && (
            <Comments
              allComments={data.kids}
              indent={indent + 1}
              isReply={true}
            />
          )}
        </ChildrenContainer>
      </CommentContainer>
    </>
  );
};

export default Comment;
