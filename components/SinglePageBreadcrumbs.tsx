import * as React from "react";
import Link from "next/link";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import MapIcon from "@mui/icons-material/Map";
import HikingIcon from "@mui/icons-material/Hiking";
import LandscapeIcon from "@mui/icons-material/Landscape";
import styles from "../styles/singlebreadcrumbs.module.css";

const _ = require("lodash");

interface BreadcrumbsProps {
  name: string;
  prefecture: string;
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(4),
    color: theme.palette.text.primary,
    fontSize: "large",
    fontFamily: "Montserrat",
    fontWeight: theme.typography.fontWeightRegular,
    padding: "0.3rem",
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export const SinglePageBreadcrumbs = ({
  name,
  prefecture,
}: BreadcrumbsProps) => {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/prefectures" className={styles.bc__link}>
          <StyledBreadcrumb
            component="a"
            label="Prefecture Map"
            icon={<MapIcon fontSize="small" />}
          />
        </Link>
        <Link href={`trails/${prefecture}`} className={styles.bc__link}>
          <StyledBreadcrumb
            component="a"
            label={`All ${_.capitalize(prefecture)} Trails`}
            icon={<HikingIcon fontSize="small" />}
          />
        </Link>
        <StyledBreadcrumb
          label={`${name}`}
          icon={<LandscapeIcon fontSize="small" />}
        />
      </Breadcrumbs>
    </div>
  );
};
