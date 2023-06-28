import { Mix, mixState } from "@/atoms/mixesAtom";
import { currentUserState } from "@/atoms/userAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import { deleteDoc, doc, increment, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState, useRecoilValue } from "recoil";
import useUser from "./useUser";

const useMixes = () => {
  const [mixStateValue, setMixStateValue] = useRecoilState(mixState);
  const currentUser = useRecoilValue(currentUserState);
  const { getLoggedInUser } = useUser();

  const onFavouriteMix = async (mix: Mix, user: User) => {
    // if user not logged in show login modal
    try {
      if (user) {
        // const { favouritedByUsers } = mixStateValue;
        getLoggedInUser();
        const hasAlreadyFavourited = mix.favouritedByUsers?.includes(
          currentUser!.creatorSlug
        );

        const updatedMix = { ...mix };
        const updatedMixes = [...mixStateValue.mixes];
        // const updatedFavouritedUsers = [...mixStateValue.favouritedByUsers];
        const mixDocRef = doc(firestore, "mixes", mix.id);
        // user hasn't already favourited mix
        if (!hasAlreadyFavourited) {
          // update mix's favouriteCount
          await updateDoc(mixDocRef, {
            favouriteCount: increment(1),
            // favouritedByUsers: arrayUnion(currentUser.user?.creatorSlug),
          });
          // create new favouriteMixes doc on user collection

          // update mixes state
        }
        // user has already favourited mix
        await updateDoc(mixDocRef, {
          favouriteCount: increment(-1),
          // favouritedByUsers: arrayRemove(currentUser.user?.creatorSlug),
        });
      }

      // update mix's favouriteCount
      // remove mix from user's favouriteMixes doc
      // update mixes state
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
    onDeleteMix,
    onPlayMix,
  };
};
export default useMixes;
