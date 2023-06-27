import { Creator, mixState } from "@/atoms/mixesAtom";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
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

  return {
    getCreator,
  };
};

export default useCreator;
