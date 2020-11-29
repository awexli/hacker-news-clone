import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import CommentSection from './CommentSection';

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
  margin-left: ${(props) => 8 + props.indent}px;
  padding-left: 10px;
  border-left: 1px dotted grey;
`;

const CommentAuthor = styled.p`
  color: rgb(218, 218, 218);
  font-weight: 700;
  margin: 0;
  margin: 8px 0;
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

const RepliesLink = styled.p`
  color: wheat;
  text-decoration: underline;
  cursor: pointer;
  margin: 0;
  padding-top: 8px;
`;
const Comment = ({ data, indent }) => {
  const [viewReplies, setViewReplies] = useState(false);
  const handleReplies = () => {
    setViewReplies(true);
  };
  return (
    <>
      <CommentContainer indent={indent}>
        <CommentAuthor>by {data.by}</CommentAuthor>
        <CommentDescription dangerouslySetInnerHTML={{ __html: data.text }} />
        {data.kids &&
          (viewReplies ? (
            <></>
          ) : (
            <RepliesLink onClick={handleReplies}>
              replies ({data.kids.length})
            </RepliesLink>
          ))}
        {viewReplies && (
          <CommentSection
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
