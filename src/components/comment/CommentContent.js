import styled from 'styled-components';

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

export const CommentContent = ({ data }) => {
  return (
    <>
      <CommentAuthor>{data.deleted ? '[deleted]' : data.by}</CommentAuthor>
      {!data.deleted && (
        <CommentDescription dangerouslySetInnerHTML={{ __html: data.text }} />
      )}
    </>
  );
};
