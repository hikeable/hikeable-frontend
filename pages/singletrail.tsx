import { useRouter } from "next/router";
import { useEffect, useRef, useState,forwardRef } from "react";
import { Trail } from "../global";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "../styles/singletrail.module.css";
import { Likes } from "../components/Likes";
import { CompletedTrails } from "../components/CompletedTrails";
import { Weather } from "../components/Weather";
import { useAuthContext } from "../components/context/UseAuthContext";
import axios from "axios";
import { Button } from "@mui/material";
import { Map } from "../components";
import MessageForm from "../components/MessageForm";
import { CldImage, CldUploadButton } from 'next-cloudinary';
import SingleProduct from "../components/photoGallery";
import PhotoGallery from "../components/photoGallery";
import Link from "next/link";


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
  const userNameTag = user?.displayName
  const trailName = trail?.name
  // console.log ("testId =",trailName)
  // const trailId =useRef(trail?.id)
  const trailId = trail?.id.toString()
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
  
      <div style={{ width: "100%" }}>
          <Button variant="contained" onClick={() => {router.back()}}>Back</Button>

        <Box
          sx={{
            display: "flex",
            m: 1,
            p: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            {/* <Image src={""} alt="Placeholder" width={250} height={200} /> */}
            <Box
              sx={{
                flexDirection: "column",
              }}
            >
              <Typography variant="h1">{trail.name}</Typography>
              <Typography>{trail.prefecture}</Typography>
              <Typography>{trail.length}</Typography>
              <Typography>{difficultyObj[trail.difficulty]}</Typography>
              <Likes userID={userId} trailID={trail.id} />
              <CompletedTrails userID={userId} trailID={trail.id} />
            </Box>
          </Box>
          <Box>
            <Typography>5 Day Weather at {trail.name}</Typography>
            <Weather
              lat={trail.latitude}
              lon={trail.longitude}
              name={trail.name}
            />
          </Box>
          <Box>
            <Map lat={trail.latitude} lon={trail.longitude} trailID={trail.id}/>
            <MessageForm userID={userId} trailID={trail.id} />
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
        </Box>
        <CldUploadButton 
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPPLOAD_PRESET}
        onUpload={function (error, result, widget) { console.log("error =",error,"result =",result, "widget =", widget)}}
        options={{folder:trail.name, tags:[trail.id, userNameTag]}}
        />
        <p className={styles.p}>
        <Link href={{
          pathname: '/trailphotos',
          query: {
            id: trailId,
            name:trailName
          }
        }}
  >check all photos in this trail</Link>
      </p>
      </div>
    )
  );
};

export default SingleTrail;
