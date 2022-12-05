import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

type TrailLike = {
  id: number;
  user: number;
  trail_id: number;
  like: boolean;
};

export const Likes = () => {
  const [favorite, setFavorite] = useState<boolean>(false);
  const [data, setData] = useState<TrailLike[]>([]);

  const handleFavorite = async () => {
    if (favorite) {
      await axios({
        method: "put",
        url: "https://hikeable-backend.herokuapp.com/api/trails/likes/1",
        data: {
          id: 1,
          user: 1,
          trail_id: 1,
          like: false,
        },
      });
      setFavorite(false);
    } else if (!favorite) {
      await axios({
        method: "put",
        url: "https://hikeable-backend.herokuapp.com/api/trails/likes/1",
        data: {
          id: 1,
          user: 1,
          trail_id: 1,
          like: true,
        },
      });
      setFavorite(true);
    }
  };

  const fetchLikeData = async () => {
    const fetchedLikeData = await axios.get(
      "https://hikeable-backend.herokuapp.com/api/trails/1/likes"
    );
    setData(fetchedLikeData.data);
  };

  useEffect(() => {
    fetchLikeData();
  }, []);

  useEffect(() => {
    for (let object of data) {
      if (object.user === 1 && object.like === true) setFavorite(true);
    }
  }, [data]);

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
