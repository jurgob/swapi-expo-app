import { Zodios } from "@zodios/core";
import { z } from "zod";

const personSchema = z.object({
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

const planetSchema = z.object({
    name: z.string(),
    rotation_period: z.union([z.number({ coerce: true }), z.literal("unknown")]),
    orbital_period: z.union([z.number({ coerce: true }), z.literal("unknown")]),
    diameter: z.union([z.number({ coerce: true }), z.literal("unknown")]),
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
  "https://swapi.dev/api",
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

  ],
);