import { Mix } from "@/atoms/mixesAtom";
import { tracklistState } from "@/atoms/tracklistAtom";
import { uploadMixState } from "@/atoms/uploadMixAtom";
import PageNotFound from "@/components/Error/PageNotFound";
import HeadMetatags from "@/components/Layout/HeadMetatags";
import DiscogsModal from "@/components/Modals/Discogs/DiscogsModal";
import TracklistTable from "@/components/Upload/TracklistTable";
import UploadMixImage from "@/components/Upload/UploadMixImage";
import { auth, firestore, storage } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Spacer,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useAtom } from "jotai";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select/dist/declarations/src/types";

type EditMixProps = {
  slug: string;
};

const EditMix: React.FC<EditMixProps> = ({ slug }) => {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMix, setUploadMix] = useAtom(uploadMixState);
  const [tracklist, setTracklist] = useAtom(tracklistState);
  const [mixGenreOptions, setMixGenreOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [selectedGenres, setSelectedGenres] = useState<
    MultiValue<{ value: string; label: string }>
  >([]);
  const [deletingMix, setDeletingMix] = useState(false);
  const { onDeleteMix } = useMixes();

  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const getSelectedMix = async () => {
      setIsLoading(true);
      try {
        // get the mix with this slug
        const singleMixQuery = query(
          collection(firestore, "mixes"),
          where("slug", "==", slug)
        );

        const singleMixDocs = await getDocs(singleMixQuery);

        const currentMix = singleMixDocs.docs[0].data();

        setUploadMix((prevState) => ({
          ...prevState,
          mix: currentMix as Mix,
        }));
        setTracklist(currentMix.tracklist);
      } catch (error: any) {
        console.log(error.message);
      }
      setIsLoading(false);
    };

    getSelectedMix();
  }, [slug, setUploadMix, setTracklist]);

  useEffect(() => {
    const loadSelectedGenreOptions = async () => {
      const mixGenresQuery = query(collection(firestore, "mixGenres"));

      const mixGenresDocs = await getDocs(mixGenresQuery);

      const options = mixGenresDocs.docs.map((doc) => ({ ...doc.data() }));

      const alreadySelectedGenres = [] as Array<{
        value: string;
        label: string;
      }>;
      uploadMix.mix.genres?.forEach((genre) => {
        options.map((option) => {
          if (option.label === genre) {
            alreadySelectedGenres.push(
              option as { value: string; label: string }
            );
          }
        });
      });
      setSelectedGenres(alreadySelectedGenres);
    };

    loadSelectedGenreOptions();
  }, [uploadMix.mix.genres]);

  useEffect(() => {
    const loadGenreOptions = async () => {
      const mixGenresQuery = query(collection(firestore, "mixGenres"));

      const mixGenresDocs = await getDocs(mixGenresQuery);

      const options = mixGenresDocs.docs.map((doc) => ({ ...doc.data() }));

      setMixGenreOptions(options as Array<{ value: string; label: string }>);
    };

    loadGenreOptions();
  }, []);

  const handleEditCancel = () => {
    router.back();
  };

  const handleDeleteMix = async () => {
    try {
      setDeletingMix(true);
      const success = await onDeleteMix(uploadMix.mix);
      // delete mix image
      if (!success) {
        throw new Error("Failed to delete mix");
      }
      // success toast
      toast({
        title: "Mix deleted.",
        description: "Your mix has succesfully been deleted",
        status: "success",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      // fail toast
      toast({
        title: "Your mix could not be deleted.",
        description: "Please try again.",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
    setDeletingMix(false);
    router.push("/dashboard/my-dashboard");
  };

  const handleMixGenreCreation = () => {
    if (selectedGenres.length > 0) {
      selectedGenres.map(async (genre) => {
        const kebabCaseGenre = genre.value.replace(/\s+/g, "-").toLowerCase();
        const mixGenresDocRef = doc(firestore, "mixGenres", kebabCaseGenre);
        const mixGenreDoc = await getDoc(mixGenresDocRef);

        if (mixGenreDoc.exists()) {
          return;
        }

        // create the mixGenre
        await setDoc(mixGenresDocRef, {
          value: kebabCaseGenre,
          label: genre.label,
        });
      });
    }
  };

  const saveMix = async (evt: React.FormEvent<HTMLFormElement>) => {
    setUploadMix((prevState) => ({
      ...prevState,
      isPublishing: true,
    }));
    evt.preventDefault();

    // check if mix genres exist for any newly selected / created genres
    handleMixGenreCreation();

    try {
      // get the current mix object from the db
      const mixDocRef = doc(firestore, "mixes", uploadMix.mix.id);

      // upload the new image
      let mixImageDownloadURL = "";
      if (uploadMix.newImageSelected) {
        console.log("new img");
        const mixImageRef = ref(
          storage,
          `mixes/${user?.uid}/images/${uploadMix.mix.id}`
        );
        await uploadString(
          mixImageRef,
          uploadMix.selectedImageFile as string,
          "data_url"
        );
        mixImageDownloadURL = await getDownloadURL(mixImageRef);
      }

      // create a new 'mix' object with the updated fields
      const newMix = {
        title: uploadMix.mix.title,
        slug: uploadMix.mix.title.replace(/\s+/g, "-").toLowerCase(),
        description: uploadMix.mix.description,
        genres: selectedGenres.map((genre) => genre.label),
        imageURL: mixImageDownloadURL || uploadMix.mix.imageURL || "",
        tracklist,
      };

      // update it
      await updateDoc(mixDocRef, newMix);
    } catch (error: any) {
      console.log(error.message);
    }
    setUploadMix((prevState) => ({
      ...prevState,
      isPublishing: false,
    }));

    toast({
      title: "Show updated.",
      description: "Redirecting to your dashboard.",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
    // redirect back to dashboard
    router.push("/dashboard/my-shows");
  };

  if (!user) {
    return <PageNotFound />;
  }

  return user?.uid === uploadMix.mix.creatorId ? (
    <Flex width="100%" flexDirection="column" py={24} px={48}>
      <HeadMetatags
        title={`Editing ${uploadMix.mix.title} by ${uploadMix.mix.creatorName}`}
      />
      <form onSubmit={saveMix}>
        <HStack mb={6}>
          <Heading textAlign="left">Editing {uploadMix.mix.title}</Heading>
          <Spacer />
          <Button
            onClick={handleEditCancel}
            variant="ghost"
            textTransform="uppercase"
          >
            Cancel
          </Button>
          <Button
            isLoading={uploadMix.isPublishing}
            size="lg"
            backgroundColor="blue.500"
            color="whiteAlpha.900"
            _hover={{ bg: "blue.600" }}
            type="submit"
          >
            Save
          </Button>
        </HStack>
        <Flex pt={8} pb={8}>
          <UploadMixImage />
          <Box>
            <FormControl ml={12} mb={4}>
              <FormLabel fontWeight="bold">Title</FormLabel>
              <Input
                placeholder="Choose a title for your upload"
                size="lg"
                htmlSize={50}
                width="auto"
                name="title"
                value={uploadMix.mix.title}
                type="text"
                onChange={(evt) =>
                  setUploadMix((prevState) => ({
                    ...prevState,
                    mix: {
                      ...prevState.mix,
                      title: evt.target.value,
                    },
                  }))
                }
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold" ml={12}>
                Genres / tags
              </FormLabel>
              <Flex
                width="100%"
                flexDirection="column"
                alignItems="start"
                pt={4}
                pb={4}
                pl={12}
              >
                <Box mb={4}>
                  <CreatableSelect
                    isMulti
                    options={mixGenreOptions}
                    onChange={(newValue) => setSelectedGenres(newValue)}
                    value={selectedGenres}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Genres / tags. Select from list or create your own"
                  />
                </Box>
                <Textarea
                  value={uploadMix.mix.description}
                  onChange={(evt) =>
                    setUploadMix((prevState) => ({
                      ...prevState,
                      mix: {
                        ...prevState.mix,
                        description: evt.target.value,
                      },
                    }))
                  }
                  placeholder="Description"
                  size="lg"
                  rows={8}
                />
              </Flex>
            </FormControl>
          </Box>
        </Flex>
        <Flex pt={8} pb={8} width="100%">
          <Accordion width="100%" allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <Heading>Tracklist</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <TracklistTable />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <DiscogsModal />
        </Flex>
      </form>
      <Box>
        <Button
          onClick={handleDeleteMix}
          variant="ghost"
          textTransform="uppercase"
          isDisabled={deletingMix}
          color="red.700"
          size="lg"
        >
          Delete upload
        </Button>
      </Box>
    </Flex>
  ) : (
    <Center mt={16}>
      <Spinner />
    </Center>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    return {
      props: {
        slug: context.query.mixSlug,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default EditMix;
