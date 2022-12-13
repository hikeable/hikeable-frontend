import * as React from "react";
import { Trail } from "../global";
import Link from "next/link";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";

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
    <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {name}
      </Typography>
      {/* <Typography level="body2">April 24 to May 02, 2021</Typography> */}
      {/* <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
      >
        <BookmarkAdd />
      </IconButton> */}
      <Typography
        fontSize="lg"
        aria-describedby="card-description"
        mb={1}
        startDecorator={<LocationOn />}
      >
        {prefecture}
      </Typography>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
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
            {`${length} km`}
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
          href={{
            pathname: "/singletrail",
            query: { trail: JSON.stringify(trail) },
          }}
          as={`/singletrail/${id}`}
          passHref
        >
          <Button
            variant="solid"
            size="sm"
            color="primary"
            aria-label={`View ${name} trail`}
            sx={{ ml: "auto", fontWeight: 600 }}
          >
            View
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
