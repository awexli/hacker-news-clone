import { render, screen } from '@testing-library/react';
import { ArticleCard } from './article-card';

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

it('should render ArticleCard component to the screen', () => {
  render(<ArticleCard articleData={tempData[0]} />);
  const linkElement = screen.getByText(/Jaysteez/i);
  expect(linkElement).toBeInTheDocument();
});
