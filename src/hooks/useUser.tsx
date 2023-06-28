import { currentUserState } from "@/atoms/userAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useUser = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [user] = useAuthState(auth);

  const getLoggedInUser = async () => {
    try {
      // maybe refactor to intially store users using their uid as db collection id and do a doc(firestore, "users", user.uid) here
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
        creatorName: users[0].creatorName,
        uid: users[0].uid,
        creatorSlug: users[0].creatorSlug,
        email: users[0].email,
        photoURL: users[0].photoURL,
      });
      return true;
    } catch (error) {}
    return false;
  };

  return {
    currentUser,
    setCurrentUser,
    getLoggedInUser,
  };
};
export default useUser;
