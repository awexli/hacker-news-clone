import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Comments from './comments';
import { LoadingText } from './loading-text';
import { UserModal } from './user-modal';

import ApiService from '../api-service';
import { getRelativeDate } from '../util';

const ArticleContainer = styled.article`
  padding: 1em 1em 10em 1em;
`;

const ArticleHeading = styled.div`
  margin-bottom: 10px;
`;

const ArticleTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-off-white);
`;

const ArticleMeta = styled.div`
  font-size: 14px;

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

const ArticleDescription = styled.div`
  font-size: 16px;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

const CommentHeading = styled.h2`
  margin: 0;
  color: var(--color-off-white);
`;

const HorizontalLine = styled.hr`
  height: 1px;
  background-color: var(--color-grey);
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

  if (!article) {
    return <LoadingText />;
  }

  return (
    <ArticleContainer>
      <ArticleHeading>
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleMeta>
          {article.score} points | by <UserModal data={article} /> | {getRelativeDate(article.time)} |{' '}
          {article.descendants} comments
        </ArticleMeta>
      </ArticleHeading>
      <ArticleDescription dangerouslySetInnerHTML={{ __html: article.text }} />
      <CommentHeading>Comments</CommentHeading>
      <HorizontalLine />
      <Comments allComments={article.kids} indent={0} isReply={false} />
    </ArticleContainer>
  );
};

export default Article;
