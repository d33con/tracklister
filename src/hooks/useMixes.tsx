import { authModalState } from "@/atoms/authModalAtom";
import { Mix, mixState } from "@/atoms/mixesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useAtom, useSetAtom } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";
import useUser from "./useUser";

const useMixes = () => {
  const [mixStateValue, setMixStateValue] = useAtom(mixState);
  const { getLoggedInUser, currentUser } = useUser();
  const setAuthModalState = useSetAtom(authModalState);
  const [user] = useAuthState(auth);

  const onFavouriteMix = async (mix: Mix) => {
    // if user not logged in show login modal
    if (!user) {
      setAuthModalState({
        open: true,
        view: "login",
      });
      return;
    }

    try {
      await getLoggedInUser();

      const mixDocRef = doc(firestore, "mixes", mix.id);

      const mixDocRefSnap = await getDoc(mixDocRef);

      const currentMix = mixDocRefSnap.data();

      const hasAlreadyFavourited = currentMix?.favouritedByUsers.includes(
        user?.uid
      );

      // user hasn't already favourited mix
      if (!hasAlreadyFavourited) {
        // update mix's favouriteCount and add user to favouritedBy array
        updateDoc(mixDocRef, {
          favouriteCount: increment(1),
          favouritedByUsers: arrayUnion(user?.uid),
        });
        // create new favouriteMixes doc on user collection
        await setDoc(
          doc(
            firestore,
            "users",
            `${currentUser?.creatorSlug}/favouriteMixes/${currentMix?.id}`
          ),
          { id: currentMix?.id }
        );
      } else {
        // user has already favourited mix
        // decrement the count and remove the user
        updateDoc(mixDocRef, {
          favouriteCount: increment(-1),
          favouritedByUsers: arrayRemove(user?.uid),
        });
        // delete the item from user's favouriteMixes collection
        const usersFavouriteMixesDoc = doc(
          firestore,
          `users/${currentUser?.creatorSlug}/favouriteMixes/`,
          mix.id
        );
        await deleteDoc(usersFavouriteMixesDoc);
      }
      // get updated mix doc from db
      const updatedMixRef = await getDoc(mixDocRef);
      const updatedMix = { ...updatedMixRef.data() };

      // update mixes state
      if (
        mixStateValue.currentlyPlayingMix?.id === mixStateValue.selectedMix?.id
      ) {
        // mix is also selected in player
        setMixStateValue((prevState) => ({
          ...prevState,
          selectedMix: updatedMix as Mix,
          currentlyPlayingMix: {
            ...prevState.currentlyPlayingMix,
            favouriteCount: updatedMix.favouriteCount,
            favouritedByUsers: updatedMix.favouritedByUsers,
          } as Mix,
          mixes: prevState.mixes.map((mix) =>
            mix.id === updatedMix.id
              ? {
                  ...mix,
                  favouriteCount: updatedMix.favouriteCount,
                  favouritedByUsers: updatedMix.favouritedByUsers,
                }
              : mix
          ),
        }));
      } else {
        setMixStateValue((prevState) => ({
          ...prevState,
          selectedMix: updatedMix as Mix,
          mixes: prevState.mixes.map((mix) =>
            mix.id === updatedMix.id
              ? {
                  ...mix,
                  favouriteCount: updatedMix.favouriteCount,
                  favouritedByUsers: updatedMix.favouritedByUsers,
                }
              : mix
          ),
        }));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onDeleteMix = async (mix: Mix): Promise<boolean> => {
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
    // increment mix playCount
    const mixDocRef = doc(firestore, "mixes", mix.id);
    updateDoc(mixDocRef, {
      playCount: increment(1),
    });

    setMixStateValue((prevState) => ({
      ...prevState,
      currentlyPlayingMix: mix,
      audioPlaying: true,
    }));
  };

  const onPauseMix = () => {
    setMixStateValue((prevState) => ({
      ...prevState,
      audioPlaying: false,
    }));
  };

  return {
    mixStateValue,
    setMixStateValue,
    onFavouriteMix,
    onDeleteMix,
    onPlayMix,
    onPauseMix,
  };
};

export default useMixes;
