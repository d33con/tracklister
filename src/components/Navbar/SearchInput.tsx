import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {
  searchFocused: boolean;
  setSearchFocused: (arg0: boolean) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  searchFocused,
  setSearchFocused,
}) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" fontSize="18px">
        <SearchIcon color="whiteAlpha.900" />
      </InputLeftElement>
      <Input
        type="search"
        placeholder="Search"
        htmlSize={searchFocused ? 125 : 10}
        width="auto"
        color="whiteAlpha.900"
        outlineColor="rgb(99, 102, 116)"
        focusBorderColor="rgb(99, 102, 116)"
        backgroundColor="rgb(99, 102, 116)"
        _placeholder={{ color: "whiteAlpha.900", opacity: 1, fontSize: "18px" }}
        onFocus={() => setSearchFocused(true)}
      />
    </InputGroup>
  );
};

export default SearchInput;
