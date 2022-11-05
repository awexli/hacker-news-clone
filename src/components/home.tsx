import { useState } from 'react';
import { ArticleList } from './article-list';


export const Home = () => {
  const [tempData, setTempData] = useState([
    {
      id: 1,
      title: "1Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae",
      time: "2 weeks ago",
      by: "Jaysteez",
      score: "707",
      descendants: "808"
    },
    {
      id: 2,
      title: "2Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae",
      time: "2 weeks ago",
      by: "Jaysteez",
      score: "707",
      descendants: "808"
    },
    {
      id: 3,
      title: "3Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae",
      time: "2 weeks ago",
      by: "Jaysteez",
      score: "707",
      descendants: "808"
    },
    {
      id: 4,
      title: "4Lorem ipsum dolor sit amet et delectus accommodare his consul copiosae",
      time: "2 weeks ago",
      by: "Jaysteez",
      score: "707",
      descendants: "808"
    },
  ]);

  return (
    <div>
      <h1>Hacker News Clone Homepage</h1>
      <ArticleList tempData={tempData} />
    </div>
  )
}