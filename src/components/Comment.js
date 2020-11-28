import styled from 'styled-components';

const CommentContainer = styled.div`
  margin-bottom: 10px;
  font-size: 15px;
`;

const CommentAuthor = styled.p`
  font-weight: 700;
  margin-block-start: 8px;
  margin-block-end: 8px;
`;

const CommentDescription = styled.div`
  p {
    margin-block-start: 8px;
    margin-block-end: 8px;
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
