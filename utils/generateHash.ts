/* eslint-disable */
function makeSalt(length: number) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function generateHash(s: string) {
  let randomSalt = makeSalt(6);
  let finalString = randomSalt + s;
  let hash = 0,
    i,
    chr;

  if (finalString.length === 0) return hash;
  for (i = 0; i < finalString.length; i++) {
    chr = finalString.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
