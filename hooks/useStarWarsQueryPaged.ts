import {
    useInfiniteQuery,
  } from '@tanstack/react-query'
  

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