import React from 'react'
import { Box } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export default ({ children }: Props) => {
  return (<Box w="100%" h="200px" bgGradient="linear(to-r, green.200, pink.500)">{ children }</Box>)
};
