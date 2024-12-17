import * as React from 'react';
import { render } from '@testing-library/react-native';

import { Loader } from "./Loader";

it(`renders correctly <Loader />`, async () => {
    const { findByText } = render(<Loader />);
    
    expect(findByText('Loading...')).toBeTruthy();
  });


