import * as React from "react";
import { Trail } from "../global";
import Link from "next/link";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";
import styles from "../styles/trailcardmobile.module.css";

const _ = require("lodash");

interface TrailCardProps {
  trail: Trail;
}

const difficultyObj = {
  1: "Easy",
  2: "Moderate",
  3: "Hard",
};

export const TrailCardMobile = ({ trail }: TrailCardProps) => {
  const { id, length, name, prefecture, difficulty, photo_url } = trail;
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
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet={photo_url}
          loading="lazy"
          alt=""
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
            sx={{ fontWeight: 600, backgroundColor: "pink" }}
            component="a"
          >
            View
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
