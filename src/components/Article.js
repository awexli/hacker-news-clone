import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ApiService from '../api-service';
import Comments from './comment/Comments';
import { LoadingText } from './LoadingText';

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
  color: rgb(218, 218, 218);
`;

const Description = styled.div`
  font-size: 14px;
`;

const CommentHeading = styled.h2`
  margin: 0;
  color: rgb(218, 218, 218);
`;

const HorizontalLine = styled.hr`
  height: 1px;
  background-color: #d9dbdb;
  border: none;
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
  }, [id]);

  return (
    <MainContainer>
      <ArticleContainer>
        {!article ? (
          <LoadingText />
        ) : (
          <>
            <ArticleTitle>{article.title}</ArticleTitle>
            <Description dangerouslySetInnerHTML={{ __html: article.text }} />
            <CommentHeading>Comments</CommentHeading>
            <HorizontalLine />
            <Comments allComments={article.kids} indent={0} isReply={false} />
          </>
        )}
      </ArticleContainer>
    </MainContainer>
  );
};

export default Article;
