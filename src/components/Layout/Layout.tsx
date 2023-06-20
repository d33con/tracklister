import { Mix } from "@/atoms/mixesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import useMixes from "@/hooks/useMixes";
import useUser from "@/hooks/useUser";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { Pathway_Extreme } from "next/font/google";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Player from "../AudioPlayer/Player";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const font = Pathway_Extreme({ subsets: ["latin"] });

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    mixStateValue,
    setMixStateValue,
    onFavouriteMix,
    onSelectMix,
    onDeleteMix,
  } = useMixes();
  const { getLoggedInUser } = useUser();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getLatestMix = async () => {
      try {
        // get latest mixes on initial load
        const mixesQuery = query(
          collection(firestore, "mixes"),
          orderBy("createdAt", "desc"),
          limit(4)
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

  useEffect(() => {
    getLoggedInUser();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className={font.className}>
      <Navbar />
      <main>{children}</main>
      <Player />
      <Footer />
    </div>
  );
};

export default Layout;
