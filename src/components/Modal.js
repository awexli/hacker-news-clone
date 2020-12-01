import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import ApiService from '../api-service';

const ModalContainer = styled.div`
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;

const animationTop = keyframes`
  from {
    top: -300px; 
    opacity: 0;
  }

  to { 
    top: 0; 
    opacity: 1
  }
`;

const ModalContent = styled.div`
  position: relative;
  background-color: var(--color-background-dark);
  margin: auto;
  padding: 0;
  width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: ${animationTop};
  animation-duration: 0.4s;
  border-radius: 10px;
  word-wrap: break-word;
`;

const ModalHeader = styled.div`
  padding: 16px 16px 0 16px;
  background-color: var(--color-background-dark);
  color: white;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
`;

const ModalClose = styled.button`
  color: white;
  font-size: 16px;
  font-weight: bold;
  background: var(--color-off-white);
  border: 1px solid var(--color-grey);
  border-radius: 2px;
  color: var(--color-background-dark);

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    opacity: 0.85;
  }
`;

const ModalBody = styled.div`
  padding: 0 16px 16px 0;
`;

const UserList = styled.ul`
  list-style: none;
`;
// const ModalFooter = styled.div`
//   padding: 2px 16px;
//   background-color: var(--color-background-dark);
//   color: white;
// `;

export const Modal = ({ userId, show, handleModal }) => {
  const [user, setUser] = useState();
  const [userCreated, setUserCreated] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (show) {
        setLoading(true);
        try {
          const response = await ApiService.getUserFromId(userId);
          const user = response.data;
          const unixTime = user.created;
          const date = new Date(unixTime * 1000);
          const month = date.toLocaleString('en-US', { month: 'long' });
          const day = date.toLocaleString('en-US', { day: 'numeric' });
          const year = date.toLocaleString('en-US', { year: 'numeric' });
          const formattedDate = month + ' ' + day + ', ' + year;
          setUser(user);
          setUserCreated(formattedDate);
        } catch (error) {
          alert(error);
        }
        setLoading(false);
      }
    })();
  }, [show, userId]);

  if (show && !user) {
    return <p>loading...</p>;
  }

  return (
    <>
      {show && (
        <ModalContainer id="modal">
          <ModalContent>
            <ModalHeader>
              <ModalClose onClick={() => handleModal()}>close</ModalClose>
            </ModalHeader>
            <ModalBody>
              <UserList>
                {loading ? (
                  <p>loading...</p>
                ) : (
                  <>
                    <li>user: {user.id}</li>
                    <li>created: {userCreated}</li>
                    <li>karma: {user.karma}</li>
                    {user.about && (
                      <li>
                        about:{' '}
                        <span
                          dangerouslySetInnerHTML={{ __html: user.about }}
                        />
                      </li>
                    )}
                    <a href="#">submissions</a>
                  </>
                )}
              </UserList>
            </ModalBody>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};
