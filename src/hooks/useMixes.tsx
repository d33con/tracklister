import { mixState } from "@/atoms/mixesAtom";
import React from "react";
import { useRecoilState } from "recoil";

const useMixes = () => {
  const [mixStateValue, setMixStateValue] = useRecoilState(mixState);

  const onFavouriteMix = async () => {};

  const onSelectMix = () => {};

  const onDeleteMix = async () => {};
  return {
    mixStateValue,
    setMixStateValue,
    onFavouriteMix,
    onSelectMix,
    onDeleteMix,
  };
};
export default useMixes;
