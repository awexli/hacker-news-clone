import {
  Box,
  Button,
  Divider,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Client, { Item } from '../api/client';
import { Comments } from './comments';
import { UserModal } from './user-modal';

export const Article = (props: { id: number }) => {
  const [article, setArticle] = useState<Item>();
  const [articleKids, setArticleKids] = useState<number[]>();
  const [renderedComments, setRenderedComments] = useState<Item[]>([]);

  const { data: articleData, isLoading: isArticleLoading } = useQuery(
    ['article', props.id],
    async () => {
      const item = await Client.getArticleFromId(props.id);
      const splicedKids = item.kids.splice(0, 5);
      const modifiedItem = { ...item, kids: splicedKids };

      setArticleKids(item.kids);
      setArticle(modifiedItem);
      return modifiedItem;
    }
  );

  const {
    data,
    isLoading: isCommentsLoading,
    isFetching,
  } = useQuery(
    ['comments', article],
    async () => {
      const result = await Client.getAllComments(article);
      setRenderedComments([...renderedComments, ...result.newKids]);
      return result;
    },
    { enabled: Boolean(articleData), keepPreviousData: true }
  );

  if (
    isArticleLoading ||
    isCommentsLoading ||
    !data ||
    !article ||
    !articleKids
  ) {
    return (
      <Stack paddingTop={'2rem'}>
        <Skeleton height="20px" startColor="hn.background_dark" />
        <br></br>
        <SkeletonText
          startColor="hn.background_dark"
          noOfLines={4}
          spacing="4"
        />
      </Stack>
    );
  }

  const handleLoadMore = () => {
    const tempKids = articleKids;
    const splicedKids = tempKids.splice(0, 5);
    setArticleKids(tempKids);
    setArticle({ ...article, kids: splicedKids });
  };

  return (
    <Box padding="1em 1em 10em 1em">
      <Box paddingBottom="1rem">
        <Heading as="h1" color="hn.off_white">
          {data.title}
        </Heading>
        <Box paddingTop="0.5rem">
          {data.score} points | {data.descendants} comments | by&nbsp;
          <UserModal item={data} />
        </Box>
      </Box>
      <Box
        marginBottom="1rem"
        dangerouslySetInnerHTML={{ __html: data.text }}
      />
      <Heading as="h2" color="hn.off_white">
        Comments
      </Heading>
      <Divider margin="1rem 0" />
      <Comments comments={renderedComments} isReplyComment={false} indent={0} />
      {articleKids.length ? (
        <Button
          isLoading={isFetching}
          colorScheme="hn"
          loadingText="loading"
          onClick={handleLoadMore}
        >
          Load more comments
        </Button>
      ) : null}
    </Box>
  );
};
