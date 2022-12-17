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

  // const userNameTag =useRef(JSON.stringify(user?.displayName))
  const userNameTag = user?.displayName;
  let firstName;
  if (userNameTag){
    const split =userNameTag.split(" ")
    firstName =  split[0]
  };
  const trailName = trail?.name;
  // console.log ("testId =",trailName)
  // const trailId =useRef(trail?.id)
  const trailId = trail?.id.toString();

  // console.log ("trail = ",trail, "trailId =",trailId)
  // console.log (userNameTag)
  const userID = userId?.toString();

  const current = new Date()  
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}  ${current.getHours()}:${current.getMinutes()}`;

  useEffect(() => {
    if (router.query.trail !== undefined) {
      setTrail(JSON.parse(router.query.trail as string));
    } else {
      return;
    }
  }, []);

  return (
    trail && (
      <Container sx={{ mb: 5, mt: 10 }}>
        <BrowserView>
          <SinglePageBreadcrumbs
            name={trail.name}
            prefecture={trail.prefecture}
          />
          <Box sx={{ display: "flex", flexDirection: "row", mt: 4, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ mb: 2 }}>
                <img
                  src={trail.photo_url}
                  alt={trail.name}
                  className={styles.img__wrapper}
                />
              </Box>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
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
                    context: {name:firstName, date:date}
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
                    sx={{ fontWeight: 600, backgroundColor: "pink", mt: 2 }}
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
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Mountain2 />
                <Typography sx={{ fontSize: "5vw", ml: 3 }}>
                  {trail.name}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  mb: 3,
                }}
              >
                <Typography
                  startDecorator={<LocationOn />}
                  sx={{ fontSize: "2.5vw" }}
                >
                  {_.capitalize(trail.prefecture)}
                </Typography>
                <Typography
                  startDecorator={<Straighten />}
                  sx={{ fontSize: "2.5vw" }}
                >
                  {`${Number(trail.length).toString()} km`}
                </Typography>
                <Typography
                  sx={{ fontSize: "2.5vw" }}
                  startDecorator={<Speed />}
                >
                  {difficultyObj[trail.difficulty]}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Likes userID={userId} trailID={trail.id} />
                <CompletedTrails userID={userId} trailID={trail.id} />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          ></Box>
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
              <Mountain2 />
              <Typography sx={{ fontSize: "7vw", fontWeight: "600", ml: 3 }}>
                {trail.name}
              </Typography>
            </Box>
            <img
              src={trail.photo_url}
              alt={trail.name}
              className={styles.img__wrapper}
            />
            <Box
              sx={{ display: "flex", flexDirection: "column", mt: 2, mb: 3 }}
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
                  context: {name:firstName, date:date}
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
                  sx={{ fontWeight: 600, backgroundColor: "pink" }}
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
            href={{
              pathname: "/mapview",
              query: {
                lat: trail.latitude,
                lon: trail.longitude,
                trailID: trail.id,
                userID: userId,
              },
            }}
          >
            Interactive Mode
          </Link>
        </Box>

        <Box
          sx={{
            flexDirection: "column",
            width: "40%",
            border: "solid",
            borderRadius: "4px",
            m: 1,
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>Tips for Trails</Typography>
            <Typography>Add Tips</Typography>
          </Box>
          <Box
            sx={{
              marginTop: "1",
              border: "solid",
              borderRadius: "4px",
            }}
          >
            <Typography>From Haruna</Typography>
            <Typography>
              Stone stairs, and very slippery while and after raining!
            </Typography>
          </Box>
        </Box>
      </Container>
    )
  );
};

export default SingleTrail;
