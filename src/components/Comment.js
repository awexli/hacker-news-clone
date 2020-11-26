import styled from 'styled-components';

const CommentContainer = styled.div`
  padding: 0 1rem 1rem 1rem;
  border: 1px solid black;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 5px 5px 5px grey;
  font-size: 15px;
`;

const CommentAuthor = styled.p`
  font-weight: 700;
`;

const CommentDescription = styled.div`
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
