import { Zodios } from "@zodios/core";
import { z } from "zod";

export const startWarsClient = new Zodios(
  "https://swapi.dev/api",
  // API definition
  [
    {
      method: "get",
      path: "/people", // auto detect :id and ask for it in apiClient get params
      alias: "getPeople", // optional alias to call this endpoint with it
      description: "Get people from Star Wars",
      parameters: [
        {
            name:"search",
            type:"Query",
            description:"A search term",
            schema: z.string().optional(),            
        },
        {
            name:"page",
            type:"Query",
            description:"page number",
            schema: z.number().optional(),            
        }
      ],
      response: z.object({
        count: z.number(),
        next: z.string().url().nullable(),
        previous: z.string().url().nullable(),
        results: z.array(z.object({
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

        }))
      }),
    },
  ],
);