import styled from 'styled-components';

export const Button = styled.button`
  min-width: 80px;
  height: 25px;
  border: 1px solid #D9DBDB;
  border-radius: 3px;
  background: #FAFBFC;
  font-weight: 600;
  box-shadow: 0px 1px 2px rgba(0,0,0,0.15);

  :hover {
    cursor: pointer;
    background: #F2F3F4;
  }

  :focus {
    outline: none;
    background: #EBECED;
  }
`;
