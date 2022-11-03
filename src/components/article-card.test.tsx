import { render, screen } from '@testing-library/react';
import { ArticleCard } from './article-card';

it('should render ArticleCard component to the screen', () => {
  render(<ArticleCard />);
  const linkElement = screen.getByText(/Jaysteez/i);
  expect(linkElement).toBeInTheDocument();
});
