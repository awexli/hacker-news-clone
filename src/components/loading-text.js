import styled from 'styled-components';

const Text = styled.p`
  margin: 8px 0 10px 0;
  font-size: 12px;
  font-weight: 700;
  border-left: 1px dotted grey;
  padding-left: 10px;
`;

export const LoadingText = () => {
  return <Text>loading...</Text>;
};
