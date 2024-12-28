import { Zodios } from "@zodios/core";
import { z } from "zod";

const numberOrUnknownSchema = z.union([z.number({ coerce: true }), z.literal("unknown")]);

export const personSchema = z.object({
    name: z.string(),
    height: z.string(),
    mass: z.string(),
    hair_color: z.string(),
    gender: z.string(),
    homeworld: z.string().url(),
    films: z.array(z.string().url()),
    species: z.array(z.string().url()),
    vehicles: z.array(z.string().url()),
    starships: z.array(z.string().url()),
    url: z.string().url(),
})
export type Person = z.infer<typeof personSchema>;

export const planetSchema = z.object({
    name: z.string(),
    rotation_period: numberOrUnknownSchema,
    orbital_period: numberOrUnknownSchema,
    diameter: numberOrUnknownSchema,
    climate: z.string(),
    gravity: z.string(),
    terrain: z.string(),
    // surface_water: z.number(),
    // population: z.number(),
    residents: z.array(z.string().url()),
    films: z.array(z.string().url()),
    created: z.string(),
    edited: z.string(),
    url: z.string().url(),
});
export type Planet = z.infer<typeof planetSchema>;

export const filmSchema = z.object({
  title: z.string(),
  episode_id: z.number(),
  opening_crawl: z.string(),
  director: z.string(),
  producer: z.string(),
  release_date: z.string(),
  characters: z.array(z.string().url()),
  planets: z.array(z.string().url()),
  starships: z.array(z.string().url()),
  vehicles: z.array(z.string().url()),
  species: z.array(z.string().url()),
  url: z.string().url(),
});
export type Film = z.infer<typeof filmSchema>;

export const speciesSchema = z.object({
  name: z.string(),
  classification: z.string(),
  designation: z.string(),
  average_height: z.string(),
  skin_colors: z.string(),
  hair_colors: z.string(),
  eye_colors: z.string(),
  average_lifespan: z.string(),
  homeworld: z.string().url().nullable(),
  language: z.string(),
  people: z.array(z.string().url()),
  films: z.array(z.string().url()),
  url: z.string().url(),
});
export type Species = z.infer<typeof speciesSchema>;

export const starshipSchema = z.object({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: numberOrUnknownSchema,
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.number({coerce: true}),
  consumables: z.string(),
  hyperdrive_rating : z.number({coerce: true}),
  MGLT: z.number({coerce: true}),
  starship_class: z.string(),
  pilots: z.array(z.string().url()),
  films: z.array(z.string().url()),
  // created: z.string().date(),
  // edited: z.string().date(),
  url: z.string().url(),
});
export type Starship = z.infer<typeof starshipSchema>;


const searchQueryParam = {
    name:"search",
    type:"Query",
    description:"search text",
    schema: z.string().optional(),            
} as const;

const pageQueryParam = {
    name:"page",
    type:"Query",
    description:"page number",
    schema: z.number().optional(),            
} as const


export const startWarsClient = new Zodios(
  "https://swapi.py4e.com/api",
  [
    {
      method: "get",
      path: "/people",
      alias: "getPeople",
      description: "Get people from Star Wars",
      parameters: [
        searchQueryParam,
        pageQueryParam
      ],
      response: z.object({
        count: z.number(),
        next: z.string().url().nullable(),
        previous: z.string().url().nullable(),
        results: z.array(personSchema)
      }),
    },
    {
        method: "get",
        path: "/people/:personId",
        alias: "getPerson",
        description: "Get person from Star Wars",
        parameters: [
            {
                name: "personId",
                type: "Path",
                description: "person id",
                schema: z.string(),
            },
        ],
        response: personSchema
        ,
      },
    {
      method: "get",
      path: "/planets", 
      alias: "getPlanets",
      description: "Get planets from Star Wars",
      parameters: [
          searchQueryParam,
          pageQueryParam
      ],
      response: z.object({
        count: z.number(),
        next: z.string().url().nullable(),
        previous: z.string().url().nullable(),
        results: z.array(planetSchema)
      }),
    },
    {
      method: "get",
      path: "/planets/:planetId",
      alias: "getPlanet",
      description: "Get planet from Star Wars",
      parameters: [
          {
              name: "planetId",
              type: "Path",
              description: "planet id",
              schema: z.string(),
          },
      ],
      response: planetSchema
      ,
    },
    {
      method: "get",
      path: "/films", 
      alias: "getFilms",
      description: "Get Star Wars Films",
      parameters: [
          searchQueryParam,
          pageQueryParam
      ],
      response: z.object({
        count: z.number(),
        next: z.string().url().nullable(),
        previous: z.string().url().nullable(),
        results: z.array(filmSchema)
      }),
    },
    {
      method: "get",
      path: "/films/:filmId",
      alias: "getFilm",
      description: "Get planet from Star Wars",
      parameters: [
          {
              name: "filmId",
              type: "Path",
              description: "film id",
              schema: z.string(),
          },
      ],
      response: filmSchema
      ,
    },
    {
      method: "get",
      path: "/species", 
      alias: "getSpeciesList",
      description: "Get Star Wars Species",
      parameters: [
          searchQueryParam,
          pageQueryParam
      ],
      response: z.object({
        count: z.number(),
        next: z.string().url().nullable(),
        previous: z.string().url().nullable(),
        results: z.array(speciesSchema)
      }),
    },
    {
      method: "get",
      path: "/species/:speciesId",
      alias: "getSpecies",
      description: "Get a species from Star Wars",
      parameters: [
          {
              name: "speciesId",
              type: "Path",
              description: "species id",
              schema: z.string(),
          },
      ],
      response: speciesSchema
      ,
    },
    {
      method: "get",
      path: "/starships", 
      alias: "getStarship",
      description: "Get Star Wars Starships",
      parameters: [
          searchQueryParam,
          pageQueryParam
      ],
      response: z.object({
        count: z.number(),
        next: z.string().url().nullable(),
        previous: z.string().url().nullable(),
        results: z.array(starshipSchema)
      }),
    },
    {
      method: "get",
      path: "/starships/:starshipsId",
      alias: "getStarships",
      description: "Get a starship from Star Wars",
      parameters: [
          {
              name: "starshipsId",
              type: "Path",
              description: "starships id",
              schema: z.string(),
          },
      ],
      response: starshipSchema
      ,
    },
  ],
);

function urlToPersonId(urlString: string): string {
  const url = new URL(urlString);
  const result = url.pathname.split(`people/`)[1].replace(`/`,'')
  return result;
}
function urlToPlanetId(urlString: string): string {
  const url = new URL(urlString);
  const result = url.pathname.split(`planets/`)[1].replace(`/`,'')
  return result;
}

function urlToFilmId(urlString: string): string {
  const url = new URL(urlString);
  const result = url.pathname.split(`films/`)[1].replace(`/`,'')
  return result;
}

function urlToSpeciesId(urlString: string): string {
  const url = new URL(urlString);
  const result = url.pathname.split(`species/`)[1].replace(`/`,'')
  return result;
}

function urlToStarshipId(urlString: string): string {
  const url = new URL(urlString);
  const result = url.pathname.split(`species/`)[1].replace(`/`,'')
  return result;
}

export const utils = { 
  urlToPersonId,
  urlToPlanetId,
  urlToFilmId,
  urlToSpeciesId,
  urlToStarshipId
 }