import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useState } from "react";

export const Likes = () => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const handleFavorite = () => {
    if (!favorite) setFavorite(true);
    else setFavorite(false);
  };

  return (
    <>
      {favorite === true ? (
        <>
          <IconButton aria-label="favorite" onClick={handleFavorite}>
            <FavoriteIcon></FavoriteIcon>
          </IconButton>
        </>
      ) : (
        <>
          <IconButton aria-label="favorite-outline" onClick={handleFavorite}>
            <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
          </IconButton>
        </>
      )}
    </>
  );
};
