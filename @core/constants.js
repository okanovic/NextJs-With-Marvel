import md5 from "js-md5";

export const PUBLIC_KEY = "a3352827a7f8007a1a6a6abfe54fca5d";
export const PRIVATE_KEY = "1d073ef58db06206c2816841dca2775d27ba3e7f";
export const BASE_URL = "https://gateway.marvel.com/";

//request header config
export const REQ_HEADER_CONFIG = (method) => {
  let config = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return config;
};

//request url convert to query string
export const REQ_URL = (
  url = null,
  limit = 10,
  characterName = null,
  offset = null
) => {
  const ts = Number(new Date());
  const hash = md5.create();
  hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);

  var params = {
    apikey: PUBLIC_KEY,
    hash: hash,
    ts: ts,
  };
  if (limit != null) {
    params.limit = limit;
  }
  if (characterName != null) {
    params.nameStartsWith = characterName;
  }
  if (offset != null) {
    params.offset = offset;
  }
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  return url;
};
