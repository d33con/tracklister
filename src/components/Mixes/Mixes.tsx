import { Mix } from "@/atoms/mixesAtom";
import { firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type MixesProps = {};

const Mixes: React.FC<MixesProps> = () => {
  const [loading, isLoading] = useState(false);
  const { mixStateValue, setMixStateValue } = useMixes();
  const getMixes = async () => {
    try {
      // get all mixes
      const mixesQuery = query(collection(firestore, "mixes"));

      const mixDocs = await getDocs(mixesQuery);

      const mixes = mixDocs.docs.map((mix) => ({ ...mix.data() }));
      setMixStateValue((prevState) => ({
        ...prevState,
        mixes: mixes as Mix[],
      }));

      /* 
      get genre filtered mixes
      const genreMixes = query(
        collection(firestore, "mixes"),
        where("genres", "==", queryFromRouter),
        orderBy("createdAt", "desc")
      );
      */
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getMixes();
  }, []);
  return <div>Have a good coding</div>;
};
export default Mixes;
