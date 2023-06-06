import { mixState } from "@/atoms/mixesAtom";
import React from "react";
import { useRecoilState } from "recoil";

const useMixes = () => {
  const [mixStateValue, setMixStateValue] = useRecoilState(mixState);

  const onFavouriteMix = () => {};

  const onSelectMix = () => {};

  const onDeleteMix = async () => {};
  return {
    mixStateValue,
    setMixStateValue,
  };
};
export default useMixes;
