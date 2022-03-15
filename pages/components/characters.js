import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Constans } from "../constants";
import md5 from "js-md5";

export default function Characters({ characters }) {
  console.log(characters);
  const [characterName, setCharacterName] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState(
    characters
  );

   async function searchCharacter(characterName) {
 
    let url = new URL(Constans.BASE_URL + "v1/public/characters");

    const ts = Number(new Date());
    const hash = md5.create();
    hash.update(ts + Constans.PRIVATE_KEY + Constans.PUBLIC_KEY);

    var params = {
      nameStartsWith: characterName,
      apikey: Constans.PUBLIC_KEY,
      hash: hash,
      ts: ts,
    };
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key])
    );
    const request = await fetch(url, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const characters = await request.json();

    setFilteredCharacters(characters.data.results)
  }

  const filter = (e) => {
    console.log(e);
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = characters.data.results.filter((character) => {
        return character.name.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      console.log({ results: results });
      if (results.length == 0) {
        searchCharacter(keyword)
      }
      setFilteredCharacters(results);
    } else {
      setFilteredCharacters(characters.data.results);
    }

    setCharacterName(keyword);
  };
  console.log(filteredCharacters.length);
  return (
    <div className="character-list">
      <h2 style={{ color: "red", textAlign: "center" }}>Character List</h2>
      <input
        type="search"
        value={characterName}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />
      
      <div className="characters">
        {filteredCharacters && filteredCharacters.length > 0 ? (
          filteredCharacters.map((character) => (
            <div key={character.id}>
              <Link href={`/character/${character.id.toString()}`}>
                <a key={character.id}>
                  <h5>{character.name}</h5>
                  <Image
                    src={
                      character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    }
                    alt="Picture of the author"
                    width={350}
                    height={400}
                  />
                </a>
              </Link>
            </div>
          ))
        ) : (
          <h2>No item found</h2>
        )}
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
        input {
          padding: 10px 17.5px;
          min-width: 250px;
        }
      `}</style>
    </div>
  );
}
