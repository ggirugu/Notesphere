import { Box, Paper, Stack, Typography, TypographyProps } from "@mui/material";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <Box textAlign="center">
      <Box
        display="flex"
        flexDirection="column"
        gap="2rem"
        alignItems="center"
        mt="-4rem"
        pt="4rem"
        justifyContent="center"
        height="80vh"
      >
        <Box
          component={Paper}
          elevation={5}
          bgcolor="transparent"
          padding="5rem"
        >
          <TitleTypography>Add Your Notes            Anytime, Anywhere</TitleTypography>
          <Typography
            fontSize="3rem"
            fontWeight={400}
            color="#000039"
            sx={{
              WebkitTextStroke: "0.6px",  // Adding black border around text
              WebkitTextStrokeColor: "white", // Black stroke color
            }}
          >
            Keep track of your thoughts, to-dos, and ideas with our NotesSphere app.
          </Typography>
        </Box>
        <Stack direction="row" gap="1rem">
          {/* <Button variant="contained" color="secondary">
            Explore our store
          </Button> */}
          {/* <Button color="inherit" variant="outlined">
            About Us &rarr;
          </Button> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;

/**
 * ============ CUSTOM TYPOGRAPHY ==========
 */

export const TitleTypography: React.FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="h3"
      fontSize="7rem"
      fontWeight={600}
      color="#000039"  // Text color
      sx={{
        WebkitTextStroke: "2px",  // Adding black border around text
        WebkitTextStrokeColor: "white", // Black stroke color for better visibility
      }}
      {...props}
    >
      {props.children}
    </Typography>
  );
};
