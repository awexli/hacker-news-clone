import { ArticleCard } from './article-card';

// Syntactically, how do I find out and assign the proper type to the destructured props?
// Tried googling things like "typescript how to assign array of objects type to props", but do I really need to define an interface to do this? Is there not some short undetailed way to do this?
// https://stackoverflow.com/questions/57876506/typescript-types-for-react-component-where-prop-is-an-array-of-objects
export const ArticleList = ({ tempData }: {tempData: Record<string, any>[]}) => {

  return (
    <div>
      {tempData.map((articleData: any) => <ArticleCard key={articleData.id} articleData={articleData} />)}
    </div>
  )
}