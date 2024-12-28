import * as React from 'react';
import { render } from '@testing-library/react-native';

import { FilmTitle } from "./FilmTitle";

it(`renders correctly <FilmTitle />`, async () => {
    const { findByText } = render(<FilmTitle url='' />);
    
    expect(findByText('Loading...')).toBeTruthy();
  });


