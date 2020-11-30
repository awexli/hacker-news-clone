import styled from 'styled-components';

import { Button } from '../../styled/Button';
import { ReplyButton } from '../ReplyButton';

const CommentContentContainer = styled.div`
  margin: 0 0 10px 0;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 4px 0;
  font-style: ${(props) => !props.show && 'italic'};

  p {
    color: ${(props) => !props.show && 'grey'};
  }
`;

const CommentAuthor = styled.p`
  color: rgb(218, 218, 218);
  font-weight: 700;
  margin: 0;
`;

const CommentDescription = styled.div`
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
}) => {
  return (
    <CommentContentContainer>
      <CommentHeader show={show}>
        {!data.deleted && (
          <Button onClick={toggleCollapse} margin={'0 4px 0 0'}>
            {show ? '[ - ]' : '[ + ]'}
          </Button>
        )}
        <CommentAuthor>{data.deleted ? '[deleted]' : data.by}</CommentAuthor>
      </CommentHeader>
      {show && (
        <CommentDescription
          dangerouslySetInnerHTML={{ __html: !data.deleted ? data.text : null }}
        />
      )}
      {data.kids && (
        <ReplyWrapper show={show}>
          <ReplyButton
            handleReplies={handleReplies}
            hasViewedReplies={hasViewedReplies}
            numOfReplies={data.kids.length}
          />
        </ReplyWrapper>
      )}
    </CommentContentContainer>
  );
};
