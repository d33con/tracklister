import Head from "next/head";

const HeadMetatags: React.FC<{ title?: string }> = ({ title }) => (
  <Head>
    <title>{title && `${title} | `}Tracklister</title>
  </Head>
);

export default HeadMetatags;
