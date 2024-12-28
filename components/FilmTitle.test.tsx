import * as React from 'react';
import { render } from '@testing-library/react-native';

import { FilmTitle } from "./FilmTitle";

it.skip(`renders correctly <FilmTitle />`, async () => {
    const { findByText } = render(<FilmTitle url='https://swapi.py4e.com/api/films/1/' />);
    
    expect(findByText('Loading...')).toBeTruthy();
  });


