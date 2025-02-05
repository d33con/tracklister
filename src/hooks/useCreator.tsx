import { Creator, mixState } from "@/atoms/mixesAtom";
import { uploadMixState } from "@/atoms/uploadMixAtom";
import { firestore } from "@/firebase/clientApp";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useSetAtom } from "jotai";

const useCreator = () => {
  const setMixStateValue = useSetAtom(mixState);
  const setUploadMix = useSetAtom(uploadMixState);

  const getCreatorFromSlug = async (creatorSlug: string) => {
    try {
      const creatorDocRef = doc(firestore, "users", creatorSlug);
      const creatorDoc = await getDoc(creatorDocRef);

      if (creatorDoc.exists()) {
        setMixStateValue((prevState) => ({
          ...prevState,
          selectedMixCreator: creatorDoc.data() as Creator,
        }));
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const setCreatorFromUserUid = async (userUid: string) => {
    try {
      const userQuery = query(
        collection(firestore, "users"),
        where("uid", "==", userUid)
      );

      const userDocs = await getDocs(userQuery);
      let users = [] as Array<DocumentData>;
      userDocs.forEach((doc) => {
        users.push(doc.data());
      });

      setUploadMix((prevState) => ({
        ...prevState,
        selectedMixCreator: users[0] as Creator,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    getCreatorFromSlug,
    setCreatorFromUserUid,
  };
};

export default useCreator;
