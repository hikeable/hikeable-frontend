import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import { useAuthContext } from "./context/UseAuthContext";
import { TMetricsProp, TTrailLike } from "../global";

export const Likes = ({ trailID }: TMetricsProp) => {
  const { userId } = useAuthContext();
  const [favorited, setFavorited] = useState<boolean>(false);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [recordID, setRecordID] = useState<number>(0);
  const [data, setData] = useState<TTrailLike[]>([]);

  useEffect(() => {
    for (let object of data) {
      if (object.user === userId) {
        setRecordExists(true);
        setRecordID(object.id);

        if (object.like === true) setFavorited(true);
      }
    }
  }, [data, userId]);

  const handleFavorite = async () => {
    if (!recordExists) {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/likes`,
        data: {
          user: userId,
          trail_id: trailID,
          like: true,
        },
      });

      fetchLikeData();
    } else if (favorited && recordExists) {
      await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/likes/${recordID}`,
        data: {
          user: userId,
          trail_id: trailID,
          like: false,
        },
      });
      setFavorited(false);
    } else if (!favorited && recordExists) {
      await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/likes/${recordID}`,
        data: {
          user: userId,
          trail_id: trailID,
          like: true,
        },
      });
      setFavorited(true);
    }
  };

  const fetchLikeData = async () => {
    const fetchedLikeData = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/${trailID}/likes`
    );
    setData(fetchedLikeData.data);
  };

  fetchLikeData();

  return (
    <>
      {userId !== undefined ? (
        favorited === true ? (
          <>
            <Tooltip title="Unlike">
              <IconButton aria-label="favorite" onClick={handleFavorite}>
                <BrowserView>
                  <FavoriteIcon
                    sx={{ fontSize: "2.5rem", fill: "white" }}
                  ></FavoriteIcon>
                </BrowserView>
                <MobileView>
                  <FavoriteIcon sx={{ fontSize: "2.5rem" }}></FavoriteIcon>
                </MobileView>
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="I like this trail">
              <IconButton
                aria-label="favorite-outline"
                onClick={handleFavorite}
              >
                <BrowserView>
                  <FavoriteBorderOutlinedIcon
                    sx={{ fontSize: "2.5rem", fill: "white" }}
                  ></FavoriteBorderOutlinedIcon>
                </BrowserView>
                <MobileView>
                  <FavoriteBorderOutlinedIcon
                    sx={{ fontSize: "2.5rem" }}
                  ></FavoriteBorderOutlinedIcon>
                </MobileView>
              </IconButton>
            </Tooltip>
          </>
        )
      ) : (
        <></>
      )}
    </>
  );
};
