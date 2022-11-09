import { ArticleCard } from './article-card';

export const ArticleList = ({ tempData }: {tempData: Record<string, any>[]}) => {

  return (
    <div data-testid="article-list">
      {tempData.map((articleData) => <ArticleCard key={articleData.id} articleData={articleData} />)}
    </div>
  )
}