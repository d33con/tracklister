import LoggedOutHomepage from "@/components/LoggedOut/LoggedOutHomepage";
import Mixes from "@/components/Mixes/Mixes";
import { auth } from "@/firebase/clientApp";
import { Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <section>
      {user ? <Text>Logged in as {user.email}</Text> : <LoggedOutHomepage />}
      <Mixes />
    </section>
  );
}
