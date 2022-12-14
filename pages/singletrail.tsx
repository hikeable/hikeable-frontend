import { useRouter } from "next/router";
import { useEffect, useRef, useState, forwardRef } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Link from "next/link";
import Image from "next/image";
import { CldImage, CldUploadButton } from "next-cloudinary";
import axios from "axios";
import { Trail } from "../global";
import styles from "../styles/singletrail.module.css";
import { Likes } from "../components/Likes";
import { CompletedTrails } from "../components/CompletedTrails";
import { Weather } from "../components/Weather";
import { useAuthContext } from "../components/context/UseAuthContext";
import { TrailMap } from "../components";
import MessageForm from "../components/MessageForm";
import SingleProduct from "../components/photoGallery";
import PhotoGallery from "../components/photoGallery";
import Mountain2 from "../public/mountain_2.svg";
import { Box, Container, Button } from "@mui/material";
import { Typography } from "@mui/joy";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";

const _ = require("lodash");

const difficultyObj = {
  1: "Easy",
  2: "Moderate",
  3: "Hard",
};

type CurrentPositionObject = {
  latitude: number;
  longitude: number;
};

const SingleTrail = () => {
  const router = useRouter();
  const [trail, setTrail] = useState<Trail | undefined>(undefined);
  const { user, userId } = useAuthContext();
  const [currentPosition, setCurrentPosition] = useState<
    CurrentPositionObject[]
  >([]);

  // const userNameTag =useRef(JSON.stringify(user?.displayName))
  const userNameTag = user?.displayName;
  const trailName = trail?.name;
  // console.log ("testId =",trailName)
  // const trailId =useRef(trail?.id)
  const trailId = trail?.id.toString();
  // console.log ("trail = ",trail, "trailId =",trailId)
  // console.log (userNameTag)

  useEffect(() => {
    if (router.query.trail !== undefined) {
      setTrail(JSON.parse(router.query.trail as string));
    } else {
      return;
    }
  }, []);

  return (
    trail && (
      <Container>
        <Button
          variant="contained"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>

        {/* <Box
          sx={{
            display: "flex",
            m: 1,
            p: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        > */}
        {/* <Box
          sx={{
            display: "flex",
          }}
        > */}
        <BrowserView>
          <div className={styles.container__top}>
            <Image
              src={trail.photo_url}
              alt={trail.name}
              width={250}
              height={200}
            />
            <div className={styles.container__name}>
              <Mountain2 />
              <Typography sx={{ fontSize: "6vw", ml: 3 }}>
                {trail.name}
              </Typography>
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Container
              sx={{
                width: "65%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                startDecorator={<LocationOn />}
                sx={{ fontSize: "3vw" }}
              >
                {_.capitalize(trail.prefecture)}
              </Typography>
              <Typography
                startDecorator={<Straighten />}
                sx={{ fontSize: "3vw" }}
              >
                {`${Number(trail.length).toString()} km`}
              </Typography>
              <Typography sx={{ fontSize: "3vw" }} startDecorator={<Speed />}>
                {difficultyObj[trail.difficulty]}
              </Typography>
            </Container>
            <Container
              sx={{
                width: "35%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Likes userID={userId} trailID={trail.id} />
              <CompletedTrails userID={userId} trailID={trail.id} />
            </Container>
          </Box>
        </BrowserView>
        <MobileView>
          <div className={styles.container__top__mobile}>
            <div className={styles.container__name__mobile}>
              <Mountain2 />
              <Typography sx={{ fontSize: "6vw", ml: 3 }}>
                {trail.name}
              </Typography>
            </div>
            <Image
              src={trail.photo_url}
              alt={trail.name}
              width={250}
              height={200}
            />
          </div>
          <Box
            sx={{
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ fontSize: "3vw" }}
              startDecorator={<LocationOn />}
            >
              {_.capitalize(trail.prefecture)}
            </Typography>
            <Typography
              sx={{ fontSize: "3vw" }}
              startDecorator={<Straighten />}
            >{`${Number(trail.length).toString()} km`}</Typography>
            <Typography startDecorator={<Speed />} sx={{ fontSize: "3vw" }}>
              {difficultyObj[trail.difficulty]}
            </Typography>
            <Likes userID={userId} trailID={trail.id} />
            <CompletedTrails userID={userId} trailID={trail.id} />
          </Box>
        </MobileView>
        {/* </Box> */}
        {/* <Box> */}
        {/* <Typography>5 Day Weather at {trail.name}</Typography> */}
        {/* <div className={styles.container__weather}> */}
        <Weather lat={trail.latitude} lon={trail.longitude} name={trail.name} />
        {/* </div> */}
        {/* </Box> */}
        {/* <Box> */}
        <TrailMap
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          lat={trail.latitude}
          lon={trail.longitude}
          trailID={trail.id}
        />
        <MessageForm
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          userID={userId}
          trailID={trail.id}
        />
        {/* </Box> */}
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
            {/* </Box> */}
          </Box>
        </Box>
        <CldUploadButton
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
          options={{ folder: trail.name, tags: [trail.id, userNameTag] }}
        />
        <p className={styles.p}>
          <Link
            href={{
              pathname: "/trailphotos",
              query: {
                id: trailId,
                name: trailName,
              },
            }}
          >
            check all photos in this trail
          </Link>
        </p>
      </Container>
    )
  );
};

export default SingleTrail;
