import styled from 'styled-components';

import { Button } from '../styled/Button';

const ReplyText = styled.span`
  color: rgb(218, 218, 218);
  font-weight: 700;
  border-left: 1px dotted grey;
  padding-left: 10px;
`;

export const ReplyButton = ({
  handleReplies,
  hasViewedReplies,
  numOfReplies,
}) => {
  return (
    <>
      {!hasViewedReplies && (
        <Button onClick={handleReplies} margin={'8px 0 0 0'}>
          <ReplyText>
            {numOfReplies} more {numOfReplies > 1 ? 'replies' : 'reply'}
          </ReplyText>
        </Button>
      )}
    </>
  );
};
