import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import CommentSection from './CommentSection';

const ArticleContainer = styled.div`
  padding: 0 1rem;
  border: 1px solid black;
  border-radius: 4px;
  margin: 8px auto;
  box-shadow: 5px 5px 5px grey;
  max-width: 800px;
`;

const ArticleTitle = styled.h1`
  font-size: 1.5rem;
`;

const Description = styled.div``;

const Article = ({ id }) => {
  const [article, setArticle] = useState();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        setArticle(response.data);
      } catch (error) {
        // what is a better way to handle errors instead of alerting?
        alert(error);
      }
    };

    getArticle();
    // why do we pass the prop id into useffect [id]?
    // what happens if it's a different id?
    // does useEffect need a dependency to rerender?
  }, [id]);

  if (!article) {
    // why do we want to show loading?
    // any other ways to show a loading state?
    return <div>Loading...</div>;
  }
  return (
    <ArticleContainer>
      <ArticleTitle>{article.title}</ArticleTitle>
      <Description dangerouslySetInnerHTML={{ __html: article.text }} />
      <h2>Comments</h2>
      {/* why do we want to paginate? */}
      {/* loading a batch of comments first VS loading independently in a comment component */}
      <CommentSection commentBatch={article.kids.slice(0, 5)}/>
    </ArticleContainer>
  );
};

export default Article;
