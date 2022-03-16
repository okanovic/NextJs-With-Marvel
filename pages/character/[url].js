import Head from "next/head";
import Constans from "../constants";
import md5 from "js-md5";
import Image from "next/image";
export default function CharacterDetail({ character }) {
  console.log(character);
  return (
    <div className="character">
      <Head>
        <title>{character.data.results[0].name}</title>
      </Head>
      <h3>{character.data.results[0].name}</h3>
      <h5 style={{ maxWidth: "500px" }}>
        {character.data.results[0].description}
      </h5>
      <Image
        src={
          character.data.results[0].thumbnail.path +
          "." +
          character.data.results[0].thumbnail.extension
        }
        alt="Picture of the author"
        width={350}
        height={400}
      />
      <style jsx>{`
        .character {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  console.log(params);
  let url = new URL(
    `${Constans.BASE_URL}` + "v1/public/characters/" + params.url
  );

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
  const character = await request.json();
  return {
    props: {
      character,
    },
  };
}
