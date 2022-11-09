import { Box, Text } from '@chakra-ui/react';

export const ArticleCard = ({ articleData }: {articleData: Record<string, any>}) => {

  return (
    <Box data-testid="article-card" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box display="flex" p="6">
        <Box>
          <Box
            fontWeight="bold"
            letterSpacing="wide"
            as="h4"
            lineHeight="tight"
            fontSize="lg"
            mb="3"
            color="hn.off_white"
          >
            {articleData.title}
          </Box>

          <Box>
            {articleData.score} points | {articleData.descendants} comments | by&nbsp;<Text as="span" color="hn.off_white" fontWeight="bold">{articleData.by}&nbsp;</Text>
            <Text as="span" color="hn.grey" fontWeight="bold">{articleData.time}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};