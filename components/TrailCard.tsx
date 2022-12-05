import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import AspectRatio from "@mui/joy/AspectRatio";
import { Link as MuiLink } from "@mui/joy";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { LocationOn, Straighten, Speed } from "@mui/icons-material";
import styles from "../styles/trailcard.module.css";

export const TrailCard = () => {
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
            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </div>
      </AspectRatio>
      <div>
        <Typography level="h2" fontSize="lg" id="card-description" mb={3}>
          Yosemite Park
        </Typography>

        <Typography
          fontSize="lg"
          aria-describedby="card-description"
          mb={1}
          startDecorator={<LocationOn />}
        >
          <MuiLink
            overlay
            underline="none"
            href=""
            sx={{ color: "text.tertiary" }}
          >
            California, USA
          </MuiLink>
        </Typography>
        <Typography
          fontSize="lg"
          aria-describedby="card-description"
          mb={1}
          startDecorator={<Straighten />}
        >
          10km
        </Typography>
        <Typography
          fontSize="lg"
          aria-describedby="card-description"
          mb={1}
          startDecorator={<Speed />}
        >
          Easy
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
