import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CircularIndeterminate = ({ size }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "1rem",
      }}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default CircularIndeterminate;
