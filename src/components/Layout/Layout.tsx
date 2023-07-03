import { Mix } from "@/atoms/mixesAtom";
import { firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Pathway_Extreme } from "next/font/google";
import React, { useEffect } from "react";
import Player from "../AudioPlayer/Player";
import Navbar from "../Navbar/Navbar";

const font = Pathway_Extreme({ subsets: ["latin"] });

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setMixStateValue } = useMixes();

  useEffect(() => {
    const getLatestMix = async () => {
      try {
        // get latest mixes on initial load
        const mixesQuery = query(
          collection(firestore, "mixes"),
          orderBy("createdAt", "desc")
        );

        const mixDocs = await getDocs(mixesQuery);

        const mixes = mixDocs.docs.map((mix) => ({ ...mix.data() }));
        setMixStateValue((prevState) => ({
          ...prevState,
          currentlyPlayingMix: mixes[0] as Mix,
        }));
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getLatestMix();
  }, [setMixStateValue]);

  return (
    <div className={font.className}>
      <Navbar />
      <main>{children}</main>
      <Player />
    </div>
  );
};

export default Layout;
