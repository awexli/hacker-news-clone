import styled, { keyframes } from 'styled-components';

const flash = keyframes`
  from {
    background-color: #fff0d6;
  }

  to {
    background-color: hsl(230, 17%, 14%);
  }
`;

const CommentContainer = styled.div`
  font-size: 14px;
  //animation: ${flash} 1s ease;
`;

const CommentAuthor = styled.p`
  color: rgb(218, 218, 218);
  font-weight: 700;
  margin: 0;
  padding: 1em 0 4px 0;
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

const Comment = ({ data }) => {
  return(
    <CommentContainer>
      <CommentAuthor>by {data.by}</CommentAuthor>
      <CommentDescription dangerouslySetInnerHTML={{ __html: data.text }} />
    </CommentContainer>
  )
}

export default Comment;
