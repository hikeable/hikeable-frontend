import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./context/UseAuthContext";

interface LikesProps {
  trailID: number;
  userID: number | undefined;
}

type trailLikeObject = {
  id: number;
  user: number;
  trail_id: number;
  like: boolean;
};

export const Likes = ({ userID, trailID }: LikesProps) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [recordID, setRecordID] = useState<number>(0);
  const [data, setData] = useState<trailLikeObject[]>([]);

  const handleFavorite = async () => {
    if (!recordExists) {
      await axios({
        method: "post",
        url: "https://hikeable-backend.herokuapp.com/api/trails/likes",
        data: {
          user: userID,
          trail_id: trailID,
          like: true,
        },
      });

      fetchLikeData();
    } else if (favorited && recordExists) {
      await axios({
        method: "put",
        url: `https://hikeable-backend.herokuapp.com/api/trails/likes/${recordID}`,
        data: {
          user: userID,
          trail_id: trailID,
          like: false,
        },
      });
      setFavorited(false);
    } else if (!favorited && recordExists) {
      await axios({
        method: "put",
        url: `https://hikeable-backend.herokuapp.com/api/trails/likes/${recordID}`,
        data: {
          user: userID,
          trail_id: trailID,
          like: true,
        },
      });
      setFavorited(true);
    }
  };

  const fetchLikeData = async () => {
    const fetchedLikeData = await axios.get(
      `https://hikeable-backend.herokuapp.com/api/trails/${trailID}/likes`
    );
    setData(fetchedLikeData.data);
  };

  useEffect(() => {
    fetchLikeData();
  }, []);

  useEffect(() => {
    for (let object of data) {
      if (object.user === userID) {
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
