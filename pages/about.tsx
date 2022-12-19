import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  IconButton,
  Button,
} from "@mui/material";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import * as React from "react";
import ContactForm from "../components/ContactForm";

const About = () => {
  const techStackPictures = [
    "/about/nextjs.svg",
    "/about/typescript.svg",
    "/about/mui.svg",
    "/about/reactleaflet.svg",
    "/about/django.svg",
    "/about/firebase.svg",
  ];

  const staffCardInfo = [
    {
      name: "Cris A.",
      title: "Product Owner",
      github: "https://github.com/Loose37",
      linkedin: "https://www.linkedin.com/in/cristian-armbruster",
    },
    {
      name: "Kamil B.",
      title: "Tech Lead",
      github: "https://github.com/Tricole",
      linkedin: "https://www.linkedin.com/in/kamil-bayri",
    },
    {
      name: "Haruna K.",
      title: "Full-Stack Engineer",
      github: "https://github.com/harunakawakami",
      linkedin: "https://www.linkedin.com/in/haruna-kawakami-9a2330228/",
    },
    {
      name: "Chad G.",
      title: "Full-Stack Engineer",
      github: "https://github.com/chadgrover",
      linkedin: "https://www.linkedin.com/in/chadgrover/",
    },
  ];

  return (
    <>
      <Box
        sx={{ width: "100vw", height: "60vh", minHeight: "300px" }}
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
          Built by <strong>adventurers</strong>, for{" "}
          <strong>adventurers</strong>
        </Typography>
        <Typography variant="subtitle1" my={2}>
          In a country where 80% of its landmass is mountainous, our mission is
          to provide a platform for both new and experienced hikers in Japan.
        </Typography>
        <Typography variant="subtitle1" my={2}>
          Find trails in each prefecture tailored to your experience level, read
          reviews, and view photos from previous travelers.
        </Typography>
        <Typography variant="subtitle1" my={2}>
          When you arrive at the trailhead, launch the{" "}
          <strong>interactive map</strong> from your mobile device to see and
          interact with geolocated messages left by other users.
        </Typography>
        <Typography variant="subtitle1" mt={2} mb={4}>
          Hiking in Japan. Simplified.
        </Typography>
      </Box>
      <Box
        bgcolor={"white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="subtitle2">
          <strong>Hikeable</strong> is built using:
        </Typography>
      </Box>
      <Box
        p={4}
        bgcolor={"white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"center"}
      >
        <Grid container rowSpacing={1} columnSpacing={4}>
          {techStackPictures.map((picture) => (
            <Grid item xs={2} margin={"auto"}>
              <Image src={picture} alt="Badge" width="75" height="75"></Image>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{ width: "100vw", height: "60vh", minHeight: "300px" }}
        bgcolor={"lightgray"}
        p={4}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h4" my={2}>
          Our Team
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={{ md: 4 }}>
          {staffCardInfo.map((staff) => (
            <Grid item xs={3} sx={{ textAlign: "center" }}>
              <Card variant="outlined">
                <CardMedia
                  sx={{
                    height: "24vh",
                    width: "24vh",
                    p: 2,
                    borderRadius: "50%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  component="img"
                  alt="Profile Picture"
                  image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                />
                <Typography fontSize={24}>{staff.name}</Typography>
                <Typography fontSize={16}>{staff.title}</Typography>
                <CardActions>
                  <IconButton href={staff.github}>
                    <GitHubIcon style={{ color: "black" }} />
                  </IconButton>
                  <IconButton href={staff.linkedin}>
                    <LinkedInIcon style={{ color: "#0072b1" }} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{ width: "100vw", height: "60vh", minHeight: "300px" }}
        bgcolor={"white"}
        marginLeft={"auto"}
        marginRight={"auto"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h4" my={2}>
          Contact
        </Typography>
        <Typography variant="subtitle1" my={2}>
          For all inquiries, please email us using the form below.
        </Typography>
        <Box
          bgcolor={"white"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"50vw"}
        >
          <ContactForm />
        </Box>
      </Box>
    </>
  );
};

export default About;
