import { render, screen } from '@testing-library/react';
import { ArticleList } from './article-list';

const tempData = [
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
];

it('should render an ArticleCard component', () => {
  render(<ArticleList tempData={[tempData[0]]} />);
  const articleCardComponent = screen.getByTestId('article-card');
  expect(articleCardComponent).toBeInTheDocument();
});

it('should render 4 ArticleCard components', () => {
  render(<ArticleList tempData={tempData} />);
  const articleCardList = screen.getAllByTestId('article-card');
  expect(articleCardList).toHaveLength(4);
});