import { Box } from '@chakra-ui/react';
import { TriangleUpIcon } from '@chakra-ui/icons';

export const ArticleCard = () => {
  const tempArticleData = {
    title: "Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae",
    time: "2 weeks ago",
    by: "Jaysteez",
    score: "707",
    descendants: "808"
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">

      <Box display="flex" p="6">

        <Box mr="3">
          <TriangleUpIcon />
        </Box>

        <Box>
          <Box
            fontWeight="bold"
            letterSpacing="wide"
            as="h4"
            lineHeight="tight"
            fontSize="lg"
            mb="3"
          >
            {tempArticleData.title}
          </Box>

          <Box>
            {tempArticleData.time}
          </Box>

          <Box>
            {tempArticleData.score} points | {tempArticleData.descendants} comments | by&nbsp;{tempArticleData.by}
          </Box>
        </Box>
      </Box>
    </Box>
  )
};