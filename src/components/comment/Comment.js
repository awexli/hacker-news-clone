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
  font-size: 16px;
  animation: ${flash} 0.3s ease-in;
  margin-left: ${(props) => props.indent !== 1 && 8 + props.indent}px;
  padding-left: ${(props) => props.isReply && '10px'};
  border-left: ${(props) => props.isReply && '1px dotted var(--color-grey)'};

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const ChildrenContainer = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Comment = ({ data, indent, isReply, levelsToRecurse }) => {
  const [hasViewedReplies, setHasViewedReplies] = useState(false);
  const [show, setShow] = useState(true);

  const handleReplies = () => {
    setHasViewedReplies(true);
  };

  // document this and where show state and toggle needs to be passed
  const toggleCollapse = () => {
    setShow(!show);
  };

  if (levelsToRecurse > 0) {
    return (
      <CommentContainer indent={indent} isReply={isReply}>
        <CommentContent
          data={data}
          toggleCollapse={toggleCollapse}
          show={show}
          handleReplies={handleReplies}
          hasViewedReplies={hasViewedReplies}
          levelViewed={levelsToRecurse}
        />
        <ChildrenContainer show={show}>
          {data.kids && (
            <Comments
              allComments={data.kids}
              indent={indent + 1}
              isReply={true}
              levelsToRecurse={levelsToRecurse - 1}
            />
          )}
        </ChildrenContainer>
      </CommentContainer>
    );
  }

  return (
    <CommentContainer indent={indent} isReply={isReply}>
      {/* starting to pass in too many props */}
      <CommentContent
        data={data}
        toggleCollapse={toggleCollapse}
        show={show}
        handleReplies={handleReplies}
        hasViewedReplies={hasViewedReplies}
        levelViewed={levelsToRecurse}
      />
      {/* document why we want show being passed in as a prop to display block/none */}
      <ChildrenContainer show={show}>
        {hasViewedReplies && (
          <Comments
            allComments={data.kids}
            indent={indent + 1}
            isReply={true}
            levelsToRecurse={1}
          />
        )}
      </ChildrenContainer>
    </CommentContainer>
  );
};

export default Comment;
