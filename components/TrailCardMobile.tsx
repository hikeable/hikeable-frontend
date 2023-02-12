import * as React from "react";

import Link from "next/link";
import Image from "next/image";

import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";

import styles from "../styles/trailcardmobile.module.css";
import { TTrailCard } from "../global";

const placeholderImage = "/placeholder.avif";

const _ = require("lodash");

const difficultyObj = {
  1: "Easy",
  2: "Moderate",
  3: "Hard",
};

export const TrailCardMobile = ({ trail }: TTrailCard) => {
  const { id, length, name, prefecture, difficulty, photo_url } = trail;
  const trailCardMobileImage = photo_url || placeholderImage;

  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        mb: 3,
        borderColor: "#9e9e9e",
        backgroundColor: "white",
      }}
    >
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5, fontWeight: 600 }}>
        {name}
      </Typography>
      <Typography
        fontSize="lg"
        aria-describedby="card-description"
        mb={1}
        startDecorator={<LocationOn />}
      >
        {_.capitalize(prefecture)}
      </Typography>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <Image
          src={trailCardMobileImage}
          width="100"
          height="100"
          loading="lazy"
          alt={`Photo of ${name}`}
        />
      </AspectRatio>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography
            fontSize="lg"
            aria-describedby="card-description"
            mb={1}
            startDecorator={<Straighten />}
          >
            {`${Number(length).toString()} km`}
          </Typography>
          <Typography
            fontSize="lg"
            aria-describedby="card-description"
            mb={1}
            startDecorator={<Speed />}
          >
            {difficultyObj[difficulty]}
          </Typography>
        </div>
        <Link
          className={styles.card__link}
          href={{
            pathname: "/singletrail",
            query: { trail: JSON.stringify(trail) },
          }}
          as={`/singletrail/${id}`}
          passHref
        >
          <Button
            variant="soft"
            size="sm"
            aria-label={`View ${name} trail`}
            sx={{
              fontWeight: 600,
              background: "#304b35",
              "&:hover": {
                background: "#64801a",
              },
            }}
            component="a"
          >
            View
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
