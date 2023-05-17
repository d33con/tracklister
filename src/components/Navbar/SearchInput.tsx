import React from "react";
import { Input } from "semantic-ui-react";

type SearchInputProps = {};

const SearchInput: React.FC<SearchInputProps> = () => {
  return (
    <>
      <Input icon="search" placeholder="Search..." />
    </>
  );
};

export default SearchInput;
