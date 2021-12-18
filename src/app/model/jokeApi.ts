import { Joke } from "./joke";

export interface JokeApi {
    jokes: Joke[];
    amount: number;
    error: boolean;
  }