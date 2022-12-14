import * as React from "react";
import Link from "next/link";
import { Trail } from "../global";
// import { Likes, CompletedTrails } from "../components";
import AspectRatio from "@mui/joy/AspectRatio";
import { Button } from "@mui/joy";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";
import styles from "../styles/trailcard.module.css";

const _ = require("lodash");

interface TrailCardProps {
  trail: Trail;
}

const difficultyObj = {
  1: "Easy",
  2: "Moderate",
  3: "Hard",
};

export const TrailCard = ({ trail }: TrailCardProps) => {
  const { id, length, name, prefecture, difficulty, photo_url } = trail;

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
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            srcSet={photo_url}
            loading="lazy"
            alt={`${name} photo`}
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

          {/* <Link
            href={{
              pathname: "/singletrail",
              query: { trail: JSON.stringify(trail) },
            }}
            as={`/singletrail/${id}`}
            passHref
          >
            <MuiLink
              overlay
              underline="none"
              sx={{ color: "text.tertiary" }}
            ></MuiLink>
          </Link> */}
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
            sx={{ fontWeight: 600, backgroundColor: "pink" }}
            component="a"
          >
            View this trail
          </Button>
        </Link>
      </div>
    </Card>
  );
};
