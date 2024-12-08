import {
    useInfiniteQuery,
    useQuery,
    useQueryClient,
  } from '@tanstack/react-query'
  
import {startWarsClient,utils} from '@/clients/starwars';
import type { Person, Planet } from '@/clients/starwars';

const { urlToPersonId,urlToPlanetId } = utils;

export function useStarWarsQueryPaged({
    queryCallback,
    queryKey
  }:{ 
    queryCallback: (queryParams: number) => Promise<any>
    queryKey: string[]
  }) {
  const  results = useInfiniteQuery({ 
    queryKey,
    queryFn: async (queryParams) => {
      const nextPage = Number(queryParams.pageParam);
      const result = await  queryCallback(nextPage)
      return result;
    },
    initialPageParam: "1",
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get('page') ;
      }
      return undefined;
    }
  });
  return results
}

export function useStarWarsQuery<T>({queryKey,queryCallback}: {queryKey: string[],queryCallback: () => Promise<T>}) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const personCached = queryClient.getQueryData<T>(queryKey)
      if (personCached) {
        return personCached;
      }
      const result = await queryCallback();
      queryClient.setQueryData(queryKey, result);
      return result;
    }
  });
}


export function useStarWarsGetPeople() {
  const queryClient = useQueryClient();
  return useStarWarsQueryPaged({
    queryKey: ['people'], 
    queryCallback: async (nextPage )=> {
      const result = await startWarsClient.getPeople({
        queries:{
          page: nextPage,
        }
      })
      result.results.forEach((person) => {
        const personToCache:Person = person;
        const personId = urlToPersonId(personToCache.url);
        queryClient.setQueryData(['people', personId], personToCache);
      });  
      return result;
    }
  });
}

export function useStarWarsGetPerson({personId}: {personId: string}) {
  return useStarWarsQuery<Person>({
    queryKey: ['people', personId],
    queryCallback: () => {
      return startWarsClient.getPerson({
        params: {
          personId
        }
      });
    }
  })
}


export function useStarWarsGetPlanets() {
  const queryClient = useQueryClient();
  return useStarWarsQueryPaged({
    queryKey: ['planets'], 
    queryCallback: async (nextPage )=> {
      const result = await startWarsClient.getPlanets({
        queries:{
          page: nextPage,
        }
      })
      
      //add planets to cache
      result.results.forEach((planet) => {
        const planetToCache:Planet = planet;
        const planetId = urlToPlanetId(planetToCache.url);
        queryClient.setQueryData(['planets', planetId], planetToCache);
      });  
      return result;
    }
  });
}

export function useStarWarsGetPlanet({planetId}: {planetId: string}) {
  return useStarWarsQuery<Planet>({
    queryKey: ['planets', planetId],
    queryCallback: () => {
      return startWarsClient.getPlanet({
        params: {
          planetId
        }
      });
    }
  })
}