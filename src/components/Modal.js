import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import ApiService from '../api-service';

const animateBackground = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 8px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  animation-name: ${animateBackground};
  animation-duration: .5s;
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
  margin: auto;
  padding: 0;
  
  width: 300px;
  min-height: 170px;
  max-height: 98%;
  overflow: auto;

  background-color: var(--color-background-dark);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  word-wrap: break-word;

  animation-name: ${animationTop};
  animation-duration: 0.5s;

  @media (min-width: 411px) {
    width: 360px;
  }

  @media (min-width: 768px) {
    width: 560px;
  }
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

export const Modal = ({ userId, show, handleModal }) => {
  const [user, setUser] = useState({});
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
                    <p>Loading user...</p>
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
