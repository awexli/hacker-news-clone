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

const PostedDate = styled.span`
  margin-left: 8px;
  color: #A6A6A6;
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
  // https://www.geeksforgeeks.org/get-the-relative-timestamp-difference-between-dates-in-javascript/
  const getRelativeDate = () => {
    const min = 60 * 1000;
    const hour = min * 60; 
    const day = hour * 24; 
    const week = day * 7; 
    const month = day * 30; 
    const year = day * 365; 
    const currDate = Date.now(); // milliseconds in today's date
    const prevDate = data.time * 1000; // milliseconds in previous date
    const difference = currDate - prevDate;

    if (difference < min) {
      return Math.round(difference / 1000) + ' seconds ago';
    } else if (difference < hour) {
      return Math.round(difference / min) + ' minutes ago';
    } else if (difference < day) {
      return difference / hour + ' hours ago';
    } else if (difference < week) {
      return Math.round(difference / day) + ' days ago';
    } else if (difference < month) {
      return Math.round(difference / week) + ' weeks ago';
    } else if (difference < year) {
      return Math.round(difference / month) + ' months ago';
    } else {
      return Math.round(difference / year) + ' years ago';
    }
  };

  return (
    <CommentContentContainer>
      <CommentHeader show={show}>
        {!data.deleted && (
          <Button onClick={toggleCollapse} margin={'0 4px 0 0'}>
            {show ? '[ - ]' : '[ + ]'}
          </Button>
        )}
        <CommentAuthor>{data.deleted ? '[deleted]' : data.by}</CommentAuthor>
        <PostedDate>{getRelativeDate()}</PostedDate>
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
