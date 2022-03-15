import Head from "next/head";
import { Constans } from "../constants";
import md5 from "js-md5";
export default function CharacterDetail({ character }) {
  console.log(character);
  return (
    <div className="movie">
      <Head>
        <title>{character.name}</title>
      </Head>
      <h3>{character.name}</h3>
      <style jsx>{`
        .movie {
          width: 1200px;
          margin: 0 auto;
          position: relative;
          padding: 20px;
        }
        h3 {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .summary {
          font-size: 18px;
          color: #666;
          line-height: 1.7;
        }
        .cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 600px;
          background-size: cover;
          opacity: 0.3;
          z-index: -1;
        }
        .cover ::before {
          content: "";
          background: linear-gradient(to bottom, transparent, #ddd);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  console.log(params);
  let url = new URL(Constans.BASE_URL + "v1/public/characters/" + params.id);

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
