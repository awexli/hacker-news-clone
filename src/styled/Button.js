import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  background: transparent;
  color: ${({isAuthor})=> isAuthor ? 'var(--color-off-white)' : 'var(--color-wheat)'};
  margin: ${props => props.margin || '0'};
  padding: 0;
  cursor: pointer;
  font-weight: 700;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
  }
`;
