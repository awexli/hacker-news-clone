import { useQuery } from '@tanstack/react-query';
import { ArticleCard } from './article-card';
import Client from '../api/client';

export const ArticleList = () => {
  const { data: articles } = useQuery(
    ["articles"],
    async () => {
      const tempArticleData = await Client.getTempArticleData();

      return tempArticleData;
    }
  );

  return (
    <div data-testid="article-list">
      {articles?.map((articleData) => <ArticleCard key={articleData.id} articleData={articleData} />)}
    </div>
  )
}