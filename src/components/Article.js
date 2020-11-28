import { useEffect, useState } from 'react';
import ApiService from '../api-service';
import styled from 'styled-components';

import CommentSection from './CommentSection';

const MainContainer = styled.main`
  background-color: #f7f7f7;
  margin: 0 auto;
  max-width: 1440px;
  min-height: 100vh;
`;

const ArticleContainer = styled.article`
  padding: 1em 1em 10em 1em;
`;

const ArticleTitle = styled.h1`
  font-size: 1.5rem;
  margin-top: 0;
`;

const Description = styled.div`
  font-size: 14px;
  max-width: 60em;
`;

const Article = ({ id }) => {
  const [article, setArticle] = useState();
  const [initialComments, setInitialComments] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiService.getArticleFromId(id);
        const newCommentBatch = response.data.kids.slice(0, 25);
        const newCommentsPromises = newCommentBatch.map((commentId) => {
          return ApiService.getCommentFromId(commentId);
        });
        const newComments = await Promise.all(newCommentsPromises);
        setInitialComments(newComments);
        setArticle(response.data);
      } catch (error) {
        alert(error);
      }
    })();
    // why do we pass the prop id into useEffect [id]?
    // what happens if it's a different id?
    // does useEffect need a dependency to re-render?
  }, [id]);

  if (!article || initialComments.length < 1) {
    // why do we want to show loading?
    // any other ways to show a loading state?
    return <div>Loading Article...</div>;
  }

  return (
    <MainContainer>
      <ArticleContainer>
        <ArticleTitle>{article.title}</ArticleTitle>
        <Description dangerouslySetInnerHTML={{ __html: article.text }} />
        {/* why do we want to paginate? */}
        {/* loading a batch of comments first VS loading independently in a comment component */}
        <CommentSection
          initialComments={initialComments}
          allComments={article.kids}
        />
      </ArticleContainer>
    </MainContainer>
  );
};

export default Article;
