import { mixState } from "@/atoms/mixesAtom";
import useMixes from "@/hooks/useMixes";
import useUser from "@/hooks/useUser";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

const AddCommentForm = () => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { selectedMix } = useRecoilValue(mixState);
  const { onAddMixComment } = useMixes();
  const toast = useToast();
  const { currentUser } = useUser();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setComment(evt.target.value);
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsLoading(true);
    await onAddMixComment(selectedMix?.id as string, comment);
    setComment("");
    setIsLoading(false);

    toast({
      title: "Comment added!",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Stack mb={8} mt={8}>
      <Heading mb={8}>Comments</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <Input
            size="lg"
            placeholder="Add comment"
            name="comment"
            value={comment}
            type="text"
            onChange={handleChange}
          />
        </FormControl>
        <Box textAlign="end">
          <Button
            width="25%"
            backgroundColor="blackAlpha.800"
            color="whiteAlpha.900"
            _hover={{ bg: "blackAlpha.900" }}
            textTransform="uppercase"
            isLoading={isLoading}
            isDisabled={comment.length === 0 || !currentUser}
            type="submit"
          >
            Post comment
          </Button>
        </Box>
      </form>
    </Stack>
  );
};

export default AddCommentForm;
