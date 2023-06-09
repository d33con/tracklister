import { Mix, mixState } from "@/atoms/mixesAtom";
import { useRecoilState } from "recoil";

const useMixes = () => {
  const [mixStateValue, setMixStateValue] = useRecoilState(mixState);

  const onFavouriteMix = async () => {};

  const onSelectMix = () => {};

  const onDeleteMix = async () => {};

  const onPlayMix = (mix: Mix) => {
    setMixStateValue((prevState) => ({
      ...prevState,
      currentlyPlayingMix: mix,
    }));
  };

  return {
    mixStateValue,
    setMixStateValue,
    onFavouriteMix,
    onSelectMix,
    onDeleteMix,
    onPlayMix,
  };
};
export default useMixes;
