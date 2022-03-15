import Head from "next/head";
import Characters from "./components/characters";
import md5 from "js-md5";
import { Constans } from "./constants";

export default function Home({ characters }) {
  console.log(characters)
  const setSearchedCharacterName = (value) => {
    console.log(value)
  }
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
  let url = new URL(Constans.BASE_URL + "v1/public/characters");

  const ts = Number(new Date());
  const hash = md5.create();
  hash.update(ts + Constans.PRIVATE_KEY + Constans.PUBLIC_KEY);

  var params = { limit: 10, apikey: Constans.PUBLIC_KEY, hash: hash, ts: ts };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const request = await fetch(url, {
    method: "GET",

    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const characters = await request.json();
  return {
    props: {
      characters,
    },
  };
}