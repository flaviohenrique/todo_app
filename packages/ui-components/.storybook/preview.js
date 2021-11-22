import {
  ChakraProvider
} from "@chakra-ui/react"
import * as React from "react"

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: "Direction",
    description: "Direction for layout",
    defaultValue: "LTR",
    toolbar: {
      icon: "globe",
      items: ["LTR", "RTL"],
    },
  },
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withChakra = (StoryFn, context) => {
  const { direction } = context.globals
  const dir = direction.toLowerCase()

  React.useEffect(() => {
    document.documentElement.dir = dir
  }, [dir])

  return (
    <ChakraProvider resetCSS >
      <div dir={dir} id="story-wrapper" style={{ minHeight: "100vh" }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  )
}

export const decorators = [withChakra]
