import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Comments from './comments';

import { UserModal } from './user-modal';
import { ViewRepliesButton } from './view-replies-button';

import { Button } from '../styled/Button';
import { getRelativeDate } from '../util';

const CommentContentContainer = styled.div`
  margin: 1px 0;
  padding: 8px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  font-style: ${(props) => !props.show && 'italic'};

  p {
    color: ${(props) => !props.show && 'var(--color-grey);'};
  }
`;

const CommentDate = styled.span`
  color: var(--color-grey);
  margin-left: 8px;
`;

const CommentDescription = styled.div`
  line-height: 1.4;

  p {
    margin-top: 8px;
    margin-bottom: 0;
  }

  a {
    max-width: 300px;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

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

const ReplyWrapper = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

export const CommentContent = ({ data, isReply, indent }) => {
  const [hasViewedReplies, setHasViewedReplies] = useState(false);
  const [show, setShow] = useState(true);

  const handleReplies = () => {
    setHasViewedReplies(true);
  };

  const toggleCollapse = () => {
    setShow(!show);
  };

  return (
    <CommentContainer indent={indent} isReply={isReply}>
      <CommentContentContainer>
        {/* Comment Header */}
        <CommentHeader show={show}>
          {!data.deleted && (
            <Button onClick={toggleCollapse} margin={'0 4px 0 0'}>
              {show ? '[ - ]' : '[ + ]'}
            </Button>
          )}
          <UserModal data={data} />
          <CommentDate>{getRelativeDate(data.time)}</CommentDate>
        </CommentHeader>

        {/* Comment Description */}
        {show && <CommentDescription dangerouslySetInnerHTML={{ __html: !data.deleted ? data.text : null }} />}

        {/* View Replies Button */}
        {data.kids && (
          <ReplyWrapper show={show}>
            <ViewRepliesButton handleReplies={handleReplies} hasViewedReplies={hasViewedReplies} numOfReplies={data.kids.length} />
          </ReplyWrapper>
        )}

        {/* Comment Replies */}
        <ChildrenContainer show={show}>
          {hasViewedReplies && <Comments allComments={data.kids} isReply={true} indent={indent + 1} />}
        </ChildrenContainer>
      </CommentContentContainer>
    </CommentContainer>
  );
};
