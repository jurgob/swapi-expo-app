
## Welcome

this is a simple app visualizer for the start wars api: https://swapi.dev/

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```



## Tech Choices

- `zodios`: (https://www.zodios.org/) strongly typed HTTP client (axios)
- `@tanstack/react-query`: for managing the asynchronous state
- `expo-router`: for routing


## some notes:

The Star Wars API (SWAPI) follows a typical REST structure, often requiring multiple API requests to retrieve and display related data. This app leverages the powerful caching capabilities of react-query (see [hooks/starwarsapi.ts](/hooks/starwarsapi.ts)) to minimize redundant HTTP requests and enhance performance.

Data fetching is component-driven, with components like /components/PlanetName handling specific requests as needed, ensuring only the necessary data is fetched and cached efficiently.
