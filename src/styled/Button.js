import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  background: transparent;
  color: wheat;
  font-size: 12px;
  margin: 8px 0 0 0;
  padding: 0;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  :focus {
    outline: none;
  }
`;
