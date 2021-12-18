export interface Joke {
  category: string;
  joke: string;
  hidden: boolean;
  flags: {
    "nsfw": boolean,
    "religious": boolean,
    "political": boolean,
    "racist": boolean,
    "sexist": boolean,
    "explicit": boolean
  };
}