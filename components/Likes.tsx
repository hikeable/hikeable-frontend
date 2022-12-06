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
  const [favorited, setFavorited] = useState<boolean>(false);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [recordID, setRecordID] = useState<number>(0);
  const [data, setData] = useState<TrailLike[]>([]);

  // note: trail id, user id need to be passed down as props

  const handleFavorite = async () => {
    if (!recordExists) {
      await axios({
        method: "post",
        url: "https://hikeable-backend.herokuapp.com/api/trails/likes",
        data: {
          user: 1, // update this later
          trail_id: 1, // update this later
          like: true,
        },
      });
      setFavorited(true);
      setRecordExists(true);
      fetchLikeData();
    } else if (favorited && recordExists) {
      await axios({
        method: "put",
        url: `https://hikeable-backend.herokuapp.com/api/trails/likes/${recordID}`,
        data: {
          id: recordID,
          user: 1, // update this later
          trail_id: 1, // update this later
          like: false,
        },
      });
      setFavorited(false);
    } else if (!favorited && recordExists) {
      await axios({
        method: "put",
        url: `https://hikeable-backend.herokuapp.com/api/trails/likes/${recordID}`,
        data: {
          id: recordID,
          user: 1, // update this later
          trail_id: 1, // update this later
          like: true,
        },
      });
      setFavorited(true);
    }
  };

  const fetchLikeData = async () => {
    const fetchedLikeData = await axios.get(
      // trail id needs to be implemented in url here
      "https://hikeable-backend.herokuapp.com/api/trails/1/likes"
    );
    setData(fetchedLikeData.data);
  };

  useEffect(() => {
    fetchLikeData();
  }, []);

  useEffect(() => {
    for (let object of data) {
      // user id needs to be implemented here
      if (object.user === 1) {
        setRecordExists(true);
        setRecordID(object.id);

        if (object.like === true) setFavorited(true);
      }
    }
  }, [data]);

  return (
    <>
      {favorited === true ? (
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
