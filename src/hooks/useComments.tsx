import { authModalState } from "@/atoms/authModalAtom";
import { Comments, Mix, mixState } from "@/atoms/mixesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useSetAtom } from "jotai";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import useUser from "./useUser";

const useComments = () => {
  const setMixStateValue = useSetAtom(mixState);
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetAtom(authModalState);
  const { getLoggedInUser, currentUser } = useUser();

  const onAddMixComment = async (mixId: string, comment: string) => {
    if (!user) {
      setAuthModalState({
        open: true,
        view: "login",
      });
      return;
    }

    try {
      await getLoggedInUser();

      const mixDocRef = doc(firestore, "mixes", mixId);

      await updateDoc(mixDocRef, {
        comments: arrayUnion({
          createdAt: Date.now(),
          id: uuidv4(),
          text: comment,
          user: {
            userId: currentUser?.uid,
            creatorName: currentUser?.creatorName,
            creatorSlug: currentUser?.creatorSlug,
            photoURL: currentUser?.photoURL,
          },
        }),
      });

      // get updated mix doc from db
      const updatedMixRef = await getDoc(mixDocRef);
      const updatedMix = { ...updatedMixRef.data() };

      // update mixes state
      setMixStateValue((prevState) => ({
        ...prevState,
        selectedMix: updatedMix as Mix,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onDeleteMixComment = async (mixId: string, comment: Comments) => {
    try {
      const mixDocRef = doc(firestore, "mixes", mixId);

      updateDoc(mixDocRef, {
        comments: arrayRemove(comment),
      });

      const updatedMixRef = await getDoc(mixDocRef);
      const updatedMix = { ...updatedMixRef.data() };

      setMixStateValue((prevState) => ({
        ...prevState,
        selectedMix: updatedMix as Mix,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    onAddMixComment,
    onDeleteMixComment,
  };
};

export default useComments;
