import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import TracklistTable from "@/components/TracklistTable/TracklistTable";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedOutHomepage from "@/components/LoggedOut/LoggedOutHomepage";
import { Container, Grid, GridItem } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <section>
      <Container>
        {user ? (
          <Grid>
            <GridItem>{/* <AudioPlayer /> */}</GridItem>
            <GridItem>{/* <TracklistTable /> */}</GridItem>
          </Grid>
        ) : (
          <LoggedOutHomepage />
        )}
      </Container>
    </section>
  );
}
