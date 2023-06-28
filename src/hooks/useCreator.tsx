import { Creator, mixState } from "@/atoms/mixesAtom";
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
import { useRecoilState } from "recoil";

const useCreator = () => {
  const [mixStateValue, setMixStateValue] = useRecoilState(mixState);

  const getCreator = async (creator: string) => {
    try {
      const creatorDocRef = doc(firestore, "users", creator);
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
      setMixStateValue((prevState) => ({
        ...prevState,
        selectedMixCreator: users[0] as Creator,
      }));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return {
    getCreator,
    setCreatorFromUserUid,
  };
};

export default useCreator;
