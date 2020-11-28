import { useEffect, useState } from 'react';
import ApiService from '../api-service';
import styled from 'styled-components';

import CommentSection from './CommentSection';

const ArticleContainer = styled.div`
  padding: 0 1rem;
  margin: 8px auto;
  max-width: 800px;
`;

const ArticleTitle = styled.h1`
  font-size: 1.5rem;
`;

const Description = styled.div``;

const numOfCommentsToAdd = 5;

const Article = ({ id }) => {
  const [article, setArticle] = useState();
  const [allComments, setAllComments] = useState([]);
  const [currentBoundary, setCurrentBoundary] = useState(numOfCommentsToAdd);
  const [isMoreDisabled, setIsMoreDisabled] = useState(false);

  const handleMoreComments = () => {
    const articleKids = article.kids;
    const nextBoundary = currentBoundary + numOfCommentsToAdd;
    const newCommentBatch = articleKids.slice(currentBoundary, nextBoundary);

    setCurrentBoundary(nextBoundary);

    // Better to do this in CommentSection component instead?
    setAllComments([...allComments, ...newCommentBatch]);

    if (newCommentBatch.length < 5 || nextBoundary >= articleKids.length) {
      setIsMoreDisabled(true);
      return;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await ApiService.getArticleFromId(id);
        setArticle(response.data);

        const newCommentBatch = response.data.kids.slice(0, numOfCommentsToAdd);
        setAllComments(newCommentBatch);

        if (response.data.kids.length <= newCommentBatch.length) {
          setIsMoreDisabled(true);
        }
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
        {/* why do we want to paginate? */}
        {/* loading a batch of comments first VS loading independently in a comment component */}
        <CommentSection
          ButtonMore={
            <button disabled={isMoreDisabled} onClick={handleMoreComments}>
              More
            </button>
          }
          allComments={allComments}
        />
        {/* <button disabled={isPrevDisabled} onClick={handlePrevComments}>Prev</button> */}
      </ArticleContainer>
    </>
  );
};

export default Article;
