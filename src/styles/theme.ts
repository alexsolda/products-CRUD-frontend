import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    gray: {
      "900": "#1A1D23",
      "600": "#282A2F",
      "50": "#DDDDDD",
    },
    white: {
      "900": "#FFFFFF",
    },
    yellow: {
      "500": "#FBFF48",
    },
    red: {
      "500": "#FF4848",
    },
  },
  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "white.900",
      },
    },
  },
});
