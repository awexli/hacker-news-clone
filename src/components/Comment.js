import styled, { keyframes } from 'styled-components';
import CommentSection from './CommentSection';

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
  padding-left: ${props => 8*props.indent}px;
  background-color: ${props => props.indent === 1 ? 'black' : ''};
`;

const CommentAuthor = styled.p`
  color: rgb(218, 218, 218);
  font-weight: 700;
  margin: 0;
  padding: 4px 0;
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
  border-left: 1px dotted red;
  padding-left: 8px;
`;
const Comment = ({ data, indent }) => {
  return(
    <>
      <CommentContainer indent={indent}>
        <CommentAuthor>by {data.by}</CommentAuthor>
        <CommentDescription dangerouslySetInnerHTML={{ __html: data.text }} />
      </CommentContainer>
      <CommentSection allComments={data.kids} indent={indent + 1}/>
    </>
  )
}

export default Comment;
