import { Link } from 'expo-router';
import {  useStarWarsGetFilms } from '@/hooks/starwarsapi';
import { utils } from '@/clients/starwars';
import { ScrollableList } from '@/components/ScrallableList';
import React from 'react';
import { FilmListItem } from '@/components/FilmListItem';
// const { urlToFilmId } = utils;


export default function FilmsScreen() {
  const  {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useStarWarsGetFilms()

  const results = data?.pages.flatMap((page) => page.results) ?? [];
  return (
    <ScrollableList 
      error={error}
      hasNextPage={hasNextPage}
      headerSource={require('@/assets/images/sw-films.png')}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      >
        {results.map((film) => {
          return (
              <FilmListItem film={film} />
          )
        })}
    </ScrollableList>
  )
}

