import * as React from "react";
import Link from "next/link";
import { Trail } from "../global";
import AspectRatio from "@mui/joy/AspectRatio";
import { Link as MuiLink } from "@mui/joy";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";
import styles from "../styles/trailcard.module.css";

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
        boxShadow: "8px 5px 20px 0px rgba(172,172,172,0.43)",
        borderColor: "#9e9e9e",
        m: "3rem",
        width: "50%",
        minHeight: "50%",
        gap: 2,
        "&:hover": {
          boxShadow: "8px 5px 20px 0px rgba(152,152,152,0.43)",
          borderColor: "#9e9e9e",
        },
      }}
    >
      <AspectRatio
        ratio="16/9"
        sx={{
          width: "350px",
          objectFit: "cover",
          overflow: "hidden",
          borderRadius: "20px",
        }}
      >
        <div>
          <img
            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
            src={photo_url}
            loading="lazy"
            alt={`${name} photo`}
          />
        </div>
      </AspectRatio>
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={3}>
          {name}
        </Typography>

        <Typography
          fontSize="lg"
          aria-describedby="card-description"
          mb={1}
          startDecorator={<LocationOn />}
        >
          {prefecture}

          <Link
            href={{
              pathname: "/singletrail",
              query: { trail: JSON.stringify(trail) },
            }}
            as={`/singletrail/${id}`}
          >
            <MuiLink
              overlay
              underline="none"
              sx={{ color: "text.tertiary" }}
            ></MuiLink>
          </Link>
        </Typography>
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
        <Chip
          variant="outlined"
          color="primary"
          size="sm"
          sx={{ pointerEvents: "none" }}
        >
          Cool weather all day long
        </Chip>
      </div>
    </Card>
  );
};