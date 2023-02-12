import * as React from "react";

import Link from "next/link";
import Image from "next/image";

import AspectRatio from "@mui/joy/AspectRatio";
import { Button } from "@mui/joy";
import Card from "@mui/joy/Card";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";
import Typography from "@mui/joy/Typography";

import styles from "../styles/trailcard.module.css";

import { TTrailCard } from "../global";

const placeholderImage = "/placeholder.avif";

const _ = require("lodash");

const difficultyObj = {
  1: "Easy",
  2: "Moderate",
  3: "Hard",
};

export const TrailCard = ({ trail }: TTrailCard) => {
  const { id, length, name, prefecture, difficulty, photo_url } = trail;
  const trailCardImage = photo_url || placeholderImage;

  return (
    <Card
      variant="outlined"
      row
      sx={{
        borderRadius: "25px",
        backgroundColor: "white",
        borderColor: "#9e9e9e",
        mr: 6,
        mb: 4,
        minWidth: "40vw",
        maxHeight: "270px",
        gap: 3,
      }}
    >
      <AspectRatio
        ratio="1"
        sx={{
          width: "50%",
          objectFit: "contain",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <div>
          <Image
            src={trailCardImage}
            width="100"
            height="100"
            loading="lazy"
            alt={`Photo of ${name}`}
          />
        </div>
      </AspectRatio>
      <div className={styles.card__info}>
        <Typography
          level="h2"
          fontSize="1.5rem"
          id="card-description"
          mb={3}
          sx={{ fontWeight: "600" }}
        >
          {name}
        </Typography>

        <Typography
          fontSize="lg"
          aria-describedby="card-description"
          mb={2}
          startDecorator={<LocationOn />}
        >
          {_.capitalize(prefecture)}
        </Typography>
        <Typography
          fontSize="lg"
          aria-describedby="card-description"
          mb={2}
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
            size="lg"
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
            View this trail
          </Button>
        </Link>
      </div>
    </Card>
  );
};
