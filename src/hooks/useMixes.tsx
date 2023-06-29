import { Mix, mixState } from "@/atoms/mixesAtom";
import { currentUserState } from "@/atoms/userAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { User } from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
        await getLoggedInUser();

        const mixDocRef = doc(firestore, "mixes", mix.id);

        const mixDocRefSnap = await getDoc(mixDocRef);

        const currentMix = mixDocRefSnap.data();

        let updatedMix = { ...currentMix };

        const hasAlreadyFavourited = currentMix?.favouritedByUsers.includes(
          user.uid
        );

        // user hasn't already favourited mix
        if (!hasAlreadyFavourited) {
          // update mix's favouriteCount and add user to favouritedBy array
          updateDoc(mixDocRef, {
            favouriteCount: increment(1),
            favouritedByUsers: arrayUnion(user.uid),
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
            favouritedByUsers: arrayRemove(user.uid),
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
        updatedMix = { ...updatedMixRef.data() };

        // update mixes state
        setMixStateValue((prevState) => ({
          ...prevState,
          selectedMix: updatedMix as Mix,
        }));
      }
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
