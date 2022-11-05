import { render, screen } from '@testing-library/react';
import { Home } from './home';

it('should render the title for the home page to the screen', () => {
  render(<Home />);
  const h1Element = screen.getByText('Hacker News Clone Homepage');
  expect(h1Element).toBeInTheDocument();
});

it('should render the ArticleCard component', () => {
  render(<Home />);
  const articleListComponent = screen.getByTestId('article-list');
  expect(articleListComponent).toBeInTheDocument();
});