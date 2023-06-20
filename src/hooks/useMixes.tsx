import { Mix, mixState } from "@/atoms/mixesAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";

const useMixes = () => {
  const [mixStateValue, setMixStateValue] = useRecoilState(mixState);

  const onFavouriteMix = async (mix: Mix, user: User) => {
    // if user not logged in show login modal

    if (user) {
      const mixDocRef = doc(firestore, "mixes", mix.id);
      // user hasn't already favourited mix

      // update mix's favouriteCount
      // updateDoc(mixDocRef, {
      //   favouritedUsers: [user.uid],
      //   favouriteCount: increment(1),
      // });
      // create new favouriteMixes doc on user collection
      // update mixes state

      // user has already favourited mix

      // update mix's favouriteCount
      // remove mix from user's favouriteMixes doc
      // update mixes state
    }
  };

  const onSelectMix = () => {};

  const onDeleteMix = async (mix: Mix, user: User): Promise<boolean> => {
    try {
      // check if there is a mix image and if so delete the mix image
      if (mix.imageURL) {
        const mixImageFileRef = ref(
          storage,
          `mixes/${user?.uid}/images/${mix.id}`
        );
        await deleteObject(mixImageFileRef);
      }
      // delete the audio file
      const audioFileRef = ref(
        storage,
        `mixes/${user?.uid}/audio/${mix.filename}`
      );
      await deleteObject(audioFileRef);

      // delete the mix in the db
      const mixDocRef = doc(firestore, "mixes", mix.id);
      await deleteDoc(mixDocRef);

      // update mixStateValue
      setMixStateValue((prevState) => ({
        ...prevState,
        mixes: prevState.mixes.filter((item) => item.id !== mix.id),
      }));

      return true;
    } catch (error) {
      return false;
    }
  };

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
