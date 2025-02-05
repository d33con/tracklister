import { uploadMixState } from "@/atoms/uploadMixAtom";
import { firestore } from "@/firebase/clientApp";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type MixTagsAndDescriptionProps = {
  setMixGenres: (
    newValue: MultiValue<{ value: string; label: string }>
  ) => void;
};

const MixTagsAndDescription: React.FC<MixTagsAndDescriptionProps> = ({
  setMixGenres,
}) => {
  const [uploadMix, setUploadMix] = useAtom(uploadMixState);
  const [mixGenreOptions, setMixGenreOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);

  useEffect(() => {
    const loadGenreOptions = async () => {
      const mixGenresQuery = query(collection(firestore, "mixGenres"));

      const mixGenresDocs = await getDocs(mixGenresQuery);

      const options = mixGenresDocs.docs.map((doc) => ({ ...doc.data() }));

      setMixGenreOptions(options as Array<{ value: string; label: string }>);
    };
    loadGenreOptions();
  }, [setMixGenreOptions]);

  return (
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
          onChange={setMixGenres}
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
  );
};
export default MixTagsAndDescription;
