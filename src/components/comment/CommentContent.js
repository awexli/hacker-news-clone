import styled from 'styled-components';

import { Button } from '../../styled/Button';
import { UserModal } from '../user-modal';
import { ReplyButton } from '../ReplyButton';
import { getRelativeDate } from '../../util';

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

const PostedDate = styled.span`
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

const ReplyWrapper = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

export const CommentContent = ({
  data,
  toggleCollapse,
  show,
  handleReplies,
  hasViewedReplies,
  levelViewed,
}) => {
  return (
    <CommentContentContainer>
      <CommentHeader show={show}>
        {!data.deleted && (
          <Button onClick={toggleCollapse} margin={'0 4px 0 0'}>
            {show ? '[ - ]' : '[ + ]'}
          </Button>
        )}
        <UserModal data={data} />
        <PostedDate>{getRelativeDate(data.time)}</PostedDate>
      </CommentHeader>
      {show && (
        <CommentDescription
          dangerouslySetInnerHTML={{ __html: !data.deleted ? data.text : null }}
        />
      )}
      {data.kids && !levelViewed && (
        <ReplyWrapper show={show}>
          <ReplyButton handleReplies={handleReplies} hasViewedReplies={hasViewedReplies} />
        </ReplyWrapper>
      )}
    </CommentContentContainer>
  );
};
