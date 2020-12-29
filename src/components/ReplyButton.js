import styled from 'styled-components';

import { Button } from '../styled/Button';

const ReplyText = styled.span`
  color: var(--color-off-white);
  font-weight: 700;
  border-left: 1px dotted grey;
  padding-left: 10px;
`;

export const ReplyButton = ({ handleReplies, hasViewedReplies }) => {
  return (
    <>
      {!hasViewedReplies && (
        <Button onClick={handleReplies} margin={'8px 0 0 0'}>
          <ReplyText>view reply(s)</ReplyText>
        </Button>
      )}
    </>
  );
};
