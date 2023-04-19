import React from "react";

import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Date format
import { format } from "date-fns";

const JoinedAtComponent = ({ joinedAt }) => {
  return (
    <Box sx={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
      <Typography
        variant="body2"
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
          textAlign: "center",
          marginRight: "0.5rem",
        }}
      >
        <CalendarMonthIcon sx={{ marginRight: "0.2rem" }} />
        Joined:
      </Typography>
      <Typography
        variant="body1"
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        {format(new Date(joinedAt), "MMM yyyy")}
      </Typography>
    </Box>
  );
};

export default JoinedAtComponent;
