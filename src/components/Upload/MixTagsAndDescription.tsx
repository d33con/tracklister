import { uploadMixState } from "@/atoms/uploadMixAtom";
import { genres } from "@/helpers/genreTags";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import React from "react";
import Select, { MultiValue } from "react-select";
import { useRecoilState } from "recoil";

type MixTagsAndDescriptionProps = {
  setMixGenres: (
    newValue: MultiValue<{ value: string; label: string }>
  ) => void;
};

const MixTagsAndDescription: React.FC<MixTagsAndDescriptionProps> = ({
  setMixGenres,
}) => {
  const [uploadMix, setUploadMix] = useRecoilState(uploadMixState);

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
        <Select
          isMulti
          name="genres"
          options={genres}
          className="basic-multi-select"
          classNamePrefix="select"
          isSearchable
          placeholder="Genres / tags. Select from list or create your own"
          onChange={setMixGenres}
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
