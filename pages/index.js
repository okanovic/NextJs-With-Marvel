import Head from "next/head";
import Characters from "./components/characters";
import md5 from "js-md5";
import { Constans } from "./constants";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

export default function Home({ characters }) {
  const [charactersList, setCharactersList] = useState(characters.data.results);
  const [hasMore, setHasMore] = useState(true);

  return (
    <>
      <Head>
        <title>Marvel Character List</title>
      </Head>
      <div>
        <InfiniteScroll
          dataLength={20}
          next={getMoreCharacter}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          <Characters characters={charactersList} />
        </InfiniteScroll>
      </div>
    </>
  );

  async function getMoreCharacter() {
    let url = new URL(Constans.BASE_URL + "v1/public/characters");

    const ts = Number(new Date());
    const hash = md5.create();
    hash.update(ts + Constans.PRIVATE_KEY + Constans.PUBLIC_KEY);

    var params = {
      limit: 20,
      apikey: Constans.PUBLIC_KEY,
      hash: hash,
      ts: ts,
    };
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
    const newCharacters = await request.json();
    setCharactersList((character) => {
      [...character, ...newCharacters.data.results];
    });
  }

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
