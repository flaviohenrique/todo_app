import React from 'react'
import {ChakraProvider } from '@chakra-ui/react'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

// export const decorators = [(Story) => (
//   <ChakraProvider resetCSS>
//     <div style={{ margin: '3em' }}><h1>teste teste teste</h1><Story/></div>
//   </ChakraProvider>
// )];
