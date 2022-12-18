import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import * as React from "react";

const About = () => {
  const staffCardInfo = [
    {
      name: "Cris A.",
      title: "Product Owner",
      github: "https://github.com/Loose37",
    },
    {
      name: "Kamil B.",
      title: "Tech Lead",
      github: "https://github.com/Tricole",
    },
    {
      name: "Haruna K.",
      title: "Full-Stack Engineer",
      github: "https://github.com/harunakawakami",
    },
    {
      name: "Chad G.",
      title: "Full-Stack Engineer",
      github: "https://github.com/chadgrover",
      li: "https://www.linkedin.com/in/chadgrover/",
    },
  ];

  return (
    <>
      <Box
        sx={{ width: "100vw", height: "40vh", minHeight: "300px" }}
        bgcolor={"white"}
        marginLeft={"auto"}
        marginRight={"auto"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="caption">About us</Typography>
        <Typography variant="h4" my={2}>
          Built by adventurers, for adventurers.
        </Typography>
        <Typography variant="subtitle1">
          In a country where 80% of its landmass is mountainous, our mission is
          to provide a platform for both new and experienced hikers in Japan.
        </Typography>
      </Box>
      <Box
        p={4}
        bgcolor={"white"}
        marginLeft={"auto"}
        marginRight={"auto"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="subtitle2">Hikeable was built using:</Typography>
        <Box></Box>
      </Box>
      <Box bgcolor={"lightgray"} p={4}>
        <Typography variant="h4">Our Team</Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
          {staffCardInfo.map((staff) => (
            <Grid item xs={3}>
              <Card variant="outlined">
                <CardMedia component="img" alt="Staff Picture" />
                <Typography fontSize={24} textAlign="center">
                  {staff.name}
                </Typography>
                <Typography fontSize={16} textAlign={"center"}>
                  {staff.title}
                </Typography>
                <IconButton href={staff.github}>
                  <GitHubIcon />
                </IconButton>
                <IconButton href={staff.li}>
                  <LinkedInIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default About;
