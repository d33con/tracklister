import { mixState } from "@/atoms/mixesAtom";
import useComments from "@/hooks/useComments";
import useUser from "@/hooks/useUser";
import { Avatar, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import toDate from "date-fns/toDate";
import NextLink from "next/link";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useRecoilValue } from "recoil";

const MixComments = () => {
  const { selectedMix } = useRecoilValue(mixState);
  const { currentUser } = useUser();
  const { onDeleteMixComment } = useComments();

  return (
    <Stack>
      {selectedMix?.comments?.length ? (
        selectedMix?.comments.map((comment) => (
          <Flex key={comment.id} direction="column">
            <Flex alignItems="center">
              <Flex
                as={NextLink}
                href={`/${comment.user.creatorSlug}`}
                alignItems="center"
              >
                <Avatar
                  src={comment.user.photoURL || "/headshot.png"}
                  size="xs"
                />
                <Text ml={2} color="blackAlpha.900" fontSize="14px">
                  {comment.user.creatorName}
                </Text>
              </Flex>
              <Text ml={2} color="blackAlpha.800" fontSize="12px">
                {formatDistanceToNow(toDate(comment.createdAt))} ago
              </Text>
              {currentUser?.uid === comment.user.userId && (
                <IconButton
                  aria-label="delete"
                  icon={<RiDeleteBin7Line />}
                  color="red.700"
                  variant="warn"
                  size="sm"
                  ml={2}
                  onClick={() => onDeleteMixComment(selectedMix.id, comment)}
                  _hover={{
                    color: "red.900",
                    bg: "blackAlpha.100",
                  }}
                />
              )}
            </Flex>
            <Flex mt={2}>
              <Text ml={10} color="blackAlpha.700" fontSize="14px">
                {comment.text}
              </Text>
            </Flex>
          </Flex>
        ))
      ) : (
        <Text color="blackAlpha.800">No comments added</Text>
      )}
    </Stack>
  );
};

export default MixComments;
