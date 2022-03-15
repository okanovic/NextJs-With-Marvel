import Image from "next/image";
import Link from "next/link";

export default function Characters({ characters }) {
  console.log(characters.data.results);
  return (
    <div className="character-list">
      <h2 style={{ color: "red", textAlign: "center" }}>Character List</h2>
      <div className="characters">
        {characters.data.results.map((character) => (
          <Link href={`/character/${character.id}`}>
            <a>
              <h5>{character.name}</h5>
              <Image
                src={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
                alt="Picture of the author"
                width={350}
                height={400}
              />
            </a>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .character-list {
          width: 1200px;
          margin: 0 auto;
          padding: 20px 0;
        }
        h2 {
          font-size: 40px;
          margin-bottom: 20px;
        }
        .characters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        a {
          width: calc(25% - 10px);
          position: relative;
        }

        img {
          width: 100%;
        }
        h3 {
          font-size: 20px;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          color: #fff;
          background: linear-gradient(to top, #000, transparent);
          padding: 50px 20px 20px 20px;
        }
      `}</style>
    </div>
  );
}
