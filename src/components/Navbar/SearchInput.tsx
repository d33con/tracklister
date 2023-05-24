import { PhoneIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <PhoneIcon color="gray.300" />
      </InputLeftElement>
      <Input type="tel" placeholder="Phone number" />
    </InputGroup>
  );
};

export default SearchInput;
