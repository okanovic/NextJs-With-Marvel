import Head from "next/head";
import Image from "next/image";
import { BASE_URL, REQ_HEADER_CONFIG, REQ_URL } from "../../@core/constants";
export default function CharacterDetail({ character }) {
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

//we fetch character detail its to id
export async function getServerSideProps({ params }) {
  let url = new URL(`${BASE_URL}` + "v1/public/characters/" + params.url);
  const request = await fetch(REQ_URL(url, null, null, null), REQ_HEADER_CONFIG("GET"));
  const character = await request.json();
  return {
    props: {
      character,
    },
  };
}
