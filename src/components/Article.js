import { useEffect, useState } from 'react';
import ApiService from '../api-service';
import styled from 'styled-components';

import CommentSection from './CommentSection';

const MainContainer = styled.main`
  background-color: hsl(230, 17%, 14%);
  margin: 0 auto;
  max-width: 60em;
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
`;

const Article = ({ id }) => {
  const [article, setArticle] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiService.getArticleFromId(id);
        setArticle(response.data);
      } catch (error) {
        alert(error);
      }
    })();
    // why do we pass the prop id into useEffect [id]?
    // what happens if it's a different id?
    // does useEffect need a dependency to re-render?
  }, [id]);

  if (!article) {
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
        <CommentSection allComments={article.kids} indent={0} isReply={false} />
      </ArticleContainer>
    </MainContainer>
  );
};

export default Article;
