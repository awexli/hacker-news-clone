import { Box, Text } from '@chakra-ui/react';

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
            {tempArticleData.title}
          </Box>

          <Box>
            {tempArticleData.score} points | {tempArticleData.descendants} comments | by&nbsp;<Text as="span" color="hn.off_white" fontWeight="bold">{tempArticleData.by}&nbsp;</Text>
            <Text as="span" color="hn.grey" fontWeight="bold">{tempArticleData.time}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
};