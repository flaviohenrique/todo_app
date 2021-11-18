import React from "react";

import { Box, FormControl, Input, Button } from "@chakra-ui/react";

import { VFC } from "react";

const Form: VFC<unknown> = () => {
  return (
    <Box p={5} mx={4} my={2} shadow="md" borderWidth="1px">
      <FormControl as="fieldset">
        <Input placeholder="Description..." mb={3} />
        <Button colorScheme="teal">Save</Button>
      </FormControl>
    </Box>
  );
};

export default Form;
