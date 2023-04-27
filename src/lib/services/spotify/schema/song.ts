import { z } from "zod";
import type { SpotifyTrack } from "./track";
import type { Qualities } from "../../openai/schema/qualities";

type Song = SpotifyTrack & Qualities;

export type { Song };
