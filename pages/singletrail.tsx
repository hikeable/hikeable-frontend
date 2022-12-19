import { useRouter } from "next/router";
import { useEffect, useRef, useState, forwardRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Link from "next/link";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { Trail } from "../global";
import styles from "../styles/singletrail.module.css";
import {
  Likes,
  CompletedTrails,
  Weather,
  SinglePageBreadcrumbs,
} from "../components";
import { useAuthContext } from "../components/context/UseAuthContext";
import axios from "axios";
import { SmallMap } from "../components";
import MessageForm from "../components/MessageForm";
import SingleProduct from "../components/photoGallery";
import PhotoGallery from "../components/photoGallery";
import Mountain2 from "../public/mountain_2.svg";
import { Box, Container } from "@mui/material";
import { Button } from "@mui/joy";
import { Typography } from "@mui/joy";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";
import ScrollableText from "../components/CommentsComponent";
import Head from "next/head";

const _ = require("lodash");

const difficultyObj = {
  1: "Easy",
  2: "Moderate",
  3: "Hard",
};

const SingleTrail = () => {
  const router = useRouter();
  const [trail, setTrail] = useState<Trail | undefined>(undefined);
  const { user, userId } = useAuthContext();
  const userNameTag = user?.displayName;

  let firstName;
  if (userNameTag) {
    const split = userNameTag.split(" ");
    firstName = split[0];
  }

  const trailName = trail?.name;
  const trailId = trail?.id.toString();
  const userID = userId?.toString();

  let photoUrl;
  if (trail?.photo_url.length) {
    photoUrl = trail.photo_url;
  } else {
    photoUrl =
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
  }

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()}`;

  useEffect(() => {
    if (router.query.trail !== undefined) {
      setTrail(JSON.parse(router.query.trail as string));
    } else {
      return;
    }
  }, []);

  // console.log (trailId)
  
  return (
    trail && (
        <>
     
      <Container sx={{ mb: 5, mt: 10 }}>
        <BrowserView>
          <SinglePageBreadcrumbs
            name={trail.name}
            prefecture={trail.prefecture}
          />
          <Box sx={{ display: "flex", flexDirection: "column", mt: 4, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  width: "100%",
                  height: "70vh",
                  position: "relative",
                  backgroundColor: "black",
                  borderRadius: "1rem",
                }}
              >
                <img
                  src={photoUrl}
                  alt={trail.name}
                  className={styles.img__wrapper}
                />
                <Box
                  sx={{
                    width: "95%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    mb: 3,
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "5vw",
                      ml: 3,
                      color: "white",
                    }}
                  >
                    {trail.name}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography
                        startDecorator={<LocationOn />}
                        sx={{ fontSize: "2.5vw", color: "white", mr: 2 }}
                      >
                        {_.capitalize(trail.prefecture)}
                      </Typography>
                      <Typography
                        startDecorator={<Straighten />}
                        sx={{ fontSize: "2.5vw", color: "white", mr: 2 }}
                      >
                        {`${Number(trail.length).toString()} km`}
                      </Typography>
                      <Typography
                        sx={{ fontSize: "2.5vw", color: "white", mr: 2 }}
                        startDecorator={<Speed />}
                      >
                        {difficultyObj[trail.difficulty]}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Likes userID={userId} trailID={trail.id} />
                      <CompletedTrails userID={userId} trailID={trail.id} />
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Container
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
                >
                <CldUploadButton
                  className={styles.btn__cloudinary}
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPPLOAD_PRESET
                  }
                  onUpload={function (error, result, widget) {
                    console.log(
                      "error =",
                      error,
                      "result =",
                      result,
                      "widget =",
                      widget
                    );
                  }}
                  options={{
                    folder: trail.name,
                    tags: [trail.id],
                    context: { name: firstName, date: date },
                  }}
                >
                  Upload {trail.name} photo
                </CldUploadButton>
                <Link
                  className={styles.card__link}
                  href={{
                    pathname: "/trailphotos",
                    query: {
                      id: trailId,
                      name: trailName,
                    },
                  }}
                  passHref
                  >
                  <Button
                    variant="soft"
                    size="lg"
                    aria-label={`View ${trail.name} trail`}
                    sx={{
                      color: "white",
                      fontWeight: 600,
                      background: "#304b35",
                      "&:hover": {
                        background: "#64801a",
                      },
                    }}
                    component="a"
                    >
                    View all photos in this trail
                  </Button>
                </Link>
              </Container>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: "auto",
                alignItems: "center",
              }}
            ></Box>
          </Box>
        </BrowserView>
        <MobileView>
          <div className={styles.container__top__mobile}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: "7vw", fontWeight: "600", ml: 3 }}>
                {trail.name}
              </Typography>
            </Box>
            <img
              src={photoUrl}
              alt={trail.name}
              className={styles.img__wrapper__mobile}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 2,
                mb: 3,
              }}
            >
              <CldUploadButton
                className={`${styles.btn__cloudinary} ${styles.btn__cloudinary__mobile}`}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPPLOAD_PRESET}
                onUpload={function (error, result, widget) {
                  console.log(
                    "error =",
                    error,
                    "result =",
                    result,
                    "widget =",
                    widget
                    );
                  }}
                options={{
                  folder: trail.name,
                  tags: [trail.id],

                  context: { name: firstName, date: date },
                }}
                >
                Upload {trail.name} photo
              </CldUploadButton>
              <Link
                className={styles.card__link}
                href={{
                  pathname: "/trailphotos",
                  query: {
                    id: trailId,
                    name: trailName,
                  },
                }}
                passHref
                >
                <Button
                  variant="soft"
                  size="lg"
                  aria-label={`View ${trail.name} trail`}
                  sx={{
                    padding: "0 2rem",
                    color: "white",
                    fontWeight: 600,
                    background: "#304b35",
                    "&:hover": {
                      background: "#64801a",
                    },
                  }}
                  component="a"
                  >
                  View all photos in this trail
                </Button>
              </Link>
            </Box>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
            >
            <Typography
              sx={{ fontSize: "5vw" }}
              startDecorator={<LocationOn />}
              >
              {_.capitalize(trail.prefecture)}
            </Typography>
            <Typography
              sx={{ fontSize: "5vw" }}
              startDecorator={<Straighten />}
              >{`${Number(trail.length).toString()} km`}</Typography>
            <Typography startDecorator={<Speed />} sx={{ fontSize: "5vw" }}>
              {difficultyObj[trail.difficulty]}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
            >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              >
              <Likes userID={userId} trailID={trail.id} />
              <Typography>I like this trail</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              >
              <CompletedTrails userID={userId} trailID={trail.id} />
              <Typography>Completed</Typography>
            </Box>
          </Box>
        </MobileView>
        <Weather lat={trail.latitude} lon={trail.longitude} name={trail.name} />

        <Box>
          <SmallMap lat={trail.latitude} lon={trail.longitude} />
          <Link
            className={styles.link__interactive}
            href={{
              pathname: "/mapview",
              query: {
                lat: trail.latitude,
                lon: trail.longitude,
                trailID: trail.id,
              },
            }}
            passHref
          >
            {/* <Typography
              sx={{
                mt: 2,
                fontSize: "1.5rem",
                textAlign: "center",
                fontWeight: "600",
                color: "#0e2424",
              }}
            > */}
            <Button
              variant="outlined"
              sx={{
                mt: 3,
                fontWeight: 600,
                fontFamily: "Montserrat",
                color: "white",
                textTransform: "none",
                width: "100%",
                background: "#304b35",
                "&:hover": {
                  background: "#64801a",
                },
              }}
            >
              Interactive Mode
            </Button>
            {/* </Typography> */}
          </Link>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography sx={{ fontSize: "2rem", fontWeight: 600, mb: 1 }}>
            Reviews / Comments
          </Typography>
          <ScrollableText trailID={trail?.id} />
        </Box>
      </Container>
      </>
    )
  );
};

export default SingleTrail;
