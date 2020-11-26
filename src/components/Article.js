import { useEffect, useState } from 'react';
import ApiService from '../api-service';
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
  const [commentBatch, setCommentBatch] = useState([]);
  const [leftBoundary, setLeftBoundary] = useState(0);
  const [rightBoundary, setRightBoundary] = useState(5);
  const [isMoreDisabled, setIsMoreDisabled] = useState(false);
  const [isPrevDisabled, setIsPrevDisabled] = useState(false);

  const handlePrevComments = () => {
    const articleKids = article.kids;
    const indexToSubtract = leftBoundary - 5;
    const newCommentBatch = articleKids.slice(indexToSubtract, leftBoundary);

    setCommentBatch(newCommentBatch);
    setLeftBoundary(indexToSubtract);
    setRightBoundary(leftBoundary);

    if (isMoreDisabled) {
      setIsMoreDisabled(false);
    }

    if (indexToSubtract <= 0) {
      setIsPrevDisabled(true);
      return;
    }
  }

  const handleMoreComments = () => {
    const articleKids = article.kids;
    const indexToAdd = rightBoundary + 5;
    const newCommentBatch = articleKids.slice(rightBoundary, indexToAdd);

    setCommentBatch(newCommentBatch);
    setLeftBoundary(rightBoundary);
    setRightBoundary(indexToAdd);
    
    if (isPrevDisabled) {
      setIsPrevDisabled(false);
    }
    
    if (newCommentBatch.length < 5 || indexToAdd >= articleKids.length) {
      setIsMoreDisabled(true);
      return;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiService.getArticleFromId(id);
        setArticle(response.data);

        const newCommentBatch = response.data.kids.slice(0, 5);
        setCommentBatch(newCommentBatch);

        
        if (response.data.kids.length <= newCommentBatch.length) {
          setIsMoreDisabled(true);
        }

        setIsPrevDisabled(true);
      } catch (error) {
        alert(error);
      }
    })();
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
    <>
      <ArticleContainer>
        <ArticleTitle>{article.title}</ArticleTitle>
        <Description dangerouslySetInnerHTML={{ __html: article.text }} />
        <h2>Comments</h2>
        <button disabled={isPrevDisabled} onClick={handlePrevComments}>Prev</button>
        <button disabled={isMoreDisabled} onClick={handleMoreComments}>More</button>
        {/* why do we want to paginate? */}
        {/* loading a batch of comments first VS loading independently in a comment component */}
        <CommentSection commentBatch={commentBatch} />
      </ArticleContainer>
    </>
  );
};

export default Article;
