import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Container, Grid } from "semantic-ui-react";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import TracklistTable from "@/components/TracklistTable/TracklistTable";
import { auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import LoggedOutHomepage from "@/components/LoggedOut/LoggedOutHomepage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <section>
      <Container fluid>
        {user ? (
          <Grid columns={2}>
            <Grid.Column>
              <AudioPlayer />
            </Grid.Column>
            <Grid.Column>
              <TracklistTable />
            </Grid.Column>
          </Grid>
        ) : (
          <LoggedOutHomepage />
        )}
      </Container>
    </section>
  );
}
