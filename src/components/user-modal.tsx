import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SkeletonText,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Client, { Item } from '../api/client';
import { formatCreatedDate, getRelativeDate } from '../common/utils';

export const UserModal = ({ item }: { item: Item }) => {
  const [author, setAuthor] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isFetching } = useQuery(
    ['user', author],
    () => Client.getUser(author),
    {
      enabled: !!author,
    }
  );

  const handleAuthorClick = async () => {
    if (item.deleted) return;
    onOpen();
    setAuthor(item.by);
  };

  return (
    <>
      {isFetching ? (
        <Button
          color="hn.off_white"
          variant="link"
          colorScheme="hn"
          spinnerPlacement="end"
          isLoading={isFetching}
          loadingText={`${item.by} ${getRelativeDate(item.time)}`}
        />
      ) : (
        <>
          <Button
            color="hn.off_white"
            variant="link"
            colorScheme="hn"
            onClick={handleAuthorClick}
          >
            {item.deleted ? '[deleted]' : item.by}
            <Box as="span" marginLeft="0.3rem" color="hn.grey">
              {getRelativeDate(item.time)}
            </Box>
          </Button>

          {isOpen && (
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent color="hn.off_white" bgColor="hn.background_dark">
                <ModalHeader>{item.by}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <>
                    <li>created: {formatCreatedDate(data.created)}</li>
                    <li>karma: {data.karma}</li>
                    {data.about && (
                      <li>
                        about:{' '}
                        <span
                          dangerouslySetInnerHTML={{ __html: data.about }}
                        />
                      </li>
                    )}
                  </>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </>
  );
};
