import { currentUserState } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const useUser = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserState);
  const [user] = useAuthState(auth);

  const getLoggedInUser = useCallback(async () => {
    try {
      const userQuery = query(
        collection(firestore, "users"),
        where("uid", "==", user?.uid)
      );

      const userDocs = await getDocs(userQuery);
      let users = [] as Array<DocumentData>;
      userDocs.forEach((doc) => {
        users.push(doc.data());
      });
      setCurrentUser({
        uid: users[0].uid,
        creatorName: users[0].creatorName,
        creatorSlug: users[0].creatorSlug,
        photoURL: users[0].photoURL,
        email: users[0].email,
        biography: users[0].biography,
        location: users[0].location,
        website: users[0].website,
      });
      return true;
    } catch (error) {}
    return false;
  }, [user?.uid, setCurrentUser]);

  return {
    currentUser,
    setCurrentUser,
    getLoggedInUser,
  };
};
export default useUser;
