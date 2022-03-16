import Head from "next/head";
import Characters from "./components/characters";
import md5 from "js-md5";
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
  let PUBLIC_KEY  = "a3352827a7f8007a1a6a6abfe54fca5d";
  let PRIVATE_KEY = "1d073ef58db06206c2816841dca2775d27ba3e7f"
  let BASE_URL = "https://gateway.marvel.com/"

  let url = new URL(BASE_URL + "v1/public/characters");

  const ts = Number(new Date());
  const hash = md5.create();
  hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);

  var params = { limit: 10, apikey: PUBLIC_KEY, hash: hash, ts: ts };
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
