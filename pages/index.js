import Head from "next/head";
import Characters from "../components/characters";
import { BASE_URL, REQ_HEADER_CONFIG, REQ_URL } from "../@core/constants";

export default function Home({ characters }) {
  return (
    <>
      <Head>
        <title>Marvel Character List</title>
      </Head>
      <div>
        <Characters characters={characters} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  let url = new URL(BASE_URL + "v1/public/characters");
  
  const request = await fetch(
    REQ_URL(url, 10, null, null),
    REQ_HEADER_CONFIG("GET")
  );
  console.log('request:',request)
  const characters = await request.json();
  return {
    props: {
      characters,
    },
  };
}
