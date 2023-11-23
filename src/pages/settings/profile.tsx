import { CurrentUser } from "@/atoms/userAtom";
import PageNotFound from "@/components/Error/PageNotFound";
import { firestore, storage } from "@/firebase/clientApp";
import useUser from "@/hooks/useUser";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import NextLink from "next/link";
import React, { useEffect, useRef, useState } from "react";

const Profile = () => {
  const { getLoggedInUser, currentUser, setCurrentUser } = useUser();
  const [imageToUpload, setImageToUpload] = useState("");
  const [profileForm, setProfileForm] = useState({ ...currentUser });
  const toast = useToast();
  const selectedImageRef = useRef<HTMLInputElement>(null);

  const onSelectImageToUpload = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();

    if (evt.target.files?.[0]) {
      fileReader.readAsDataURL(evt.target.files[0]);
    }

    fileReader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setImageToUpload(readerEvent.target?.result as string);
      }
    };
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm((prevState) => ({
      ...prevState,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleRemoveImage = () => {
    setImageToUpload("");
    setProfileForm((prevState) => ({
      ...prevState,
      photoURL: "",
    }));
  };

  const handleBiographyChange = (
    evt: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfileForm((prevState) => ({
      ...prevState,
      biography: evt.target.value,
    }));
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      const userDocRef = doc(
        firestore,
        "users",
        currentUser?.creatorSlug as string
      );

      const profileImageRef = ref(
        storage,
        `users/${currentUser?.uid}/images/${currentUser?.creatorSlug}`
      );
      if (imageToUpload) {
        // if there is an image get a ref to store the mix's image in the users/image collection
        await uploadString(profileImageRef, imageToUpload, "data_url");
        const profileImageDownloadURL = await getDownloadURL(profileImageRef);
        // update the mix doc ref and add the download URL
        await updateDoc(userDocRef, {
          photoURL: profileImageDownloadURL,
        });
        setCurrentUser(
          (prevState) =>
            ({
              ...prevState,
              photoURL: profileImageDownloadURL,
            } as CurrentUser)
        );
      } else if (!profileForm.photoURL && !imageToUpload) {
        // no image or current image removed
        await updateDoc(userDocRef, {
          photoURL: "",
        });
        setCurrentUser(
          (prevState) =>
            ({
              ...prevState,
              photoURL: "",
            } as CurrentUser)
        );
      }
      await updateDoc(userDocRef, {
        location: profileForm.location || "",
        biography: profileForm.biography || "",
        website: profileForm.website || "",
      });
      toast({
        title: "Profile updated.",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      // handle error
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  if (!currentUser) {
    return <PageNotFound />;
  }

  return (
    <Flex
      px={24}
      my={16}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Heading mb={8}>Your profile settings</Heading>
      <Box bg="blackAlpha.300" p={3} mb={8}>
        <Link
          as={NextLink}
          color="blackAlpha.900"
          href={`/${currentUser?.creatorSlug}`}
          textAlign="center"
        >
          View your profile
        </Link>
      </Box>
      <Stack>
        <form onSubmit={handleSubmit}>
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Creator name</FormLabel>
            <Input
              type="text"
              name="creatorName"
              value={profileForm.creatorName}
              placeholder="Creator name"
              onChange={handleChange}
            />
          </FormControl>
          <Divider mb={4} />
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Biography</FormLabel>
            <Textarea
              name="biography"
              value={profileForm.biography}
              placeholder="Biography"
              size="lg"
              rows={4}
              onChange={handleBiographyChange}
            />
          </FormControl>
          <Divider mb={4} />
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Website</FormLabel>
            <InputGroup>
              {/* eslint-disable-next-line react/no-children-prop */}
              <InputLeftAddon children="https://" />
              <Input
                name="website"
                type="text"
                value={profileForm.website}
                placeholder="Website"
                onChange={handleChange}
              />
            </InputGroup>
          </FormControl>
          <Divider mb={4} />
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={profileForm.location}
              placeholder="Location"
              onChange={handleChange}
            />
          </FormControl>
          <Divider mb={4} />
          <FormControl mb={4}>
            <FormLabel fontWeight="bold">Profile picture</FormLabel>
            <Stack direction="row">
              <Stack direction="column">
                <Button
                  size="lg"
                  onClick={() => selectedImageRef.current?.click()}
                >
                  Choose file
                </Button>
                {(imageToUpload || profileForm.photoURL) && (
                  <Button
                    onClick={handleRemoveImage}
                    variant="ghost"
                    textTransform="uppercase"
                    color="red.700"
                    size="lg"
                  >
                    Remove image
                  </Button>
                )}
              </Stack>
              <input
                type="file"
                ref={selectedImageRef}
                accept="image/*"
                onChange={onSelectImageToUpload}
                hidden
              />{" "}
              {(imageToUpload || profileForm.photoURL) && (
                <Image
                  mt={2}
                  boxSize="200px"
                  src={imageToUpload || profileForm.photoURL || "/headshot.png"}
                  alt={profileForm.creatorName}
                  textAlign="center"
                />
              )}
            </Stack>
          </FormControl>
          <Divider mb={4} />
          <Box textAlign="center" mt={4}>
            <Button
              size="lg"
              backgroundColor="blue.500"
              color="whiteAlpha.900"
              _hover={{ bg: "blue.600" }}
              textTransform="uppercase"
              type="submit"
            >
              Save profile settings
            </Button>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
};
export default Profile;
