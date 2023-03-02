import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Tooltip } from "@mui/material";

import { TTrailMetrics } from "../global";
import API from "../src/API";

type TLikes = {
  id: number;
  user: number;
  trail_id: number;
  like: boolean;
};

export const Likes = ({ userID, trailID }: TTrailMetrics) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [recordID, setRecordID] = useState<number>(0);
  const [data, setData] = useState<TLikes[]>([]);

  useEffect(() => {
    fetchLikeData();
  }, []);

  useEffect(() => {
    for (const object of data) {
      if (object.user === userID) {
        setRecordExists(true);
        setRecordID(object.id);

        if (object.like === true) setFavorited(true);
      }
    }
  }, [data, userID]);

  const handleFavorite = async () => {
    const payload = {
      user: userID,
      trail_id: trailID,
      like: true,
    };

    if (!recordExists) {
      await API("trails/likes", "post", payload);

      fetchLikeData();
    } else if (favorited && recordExists) {
      payload.like = false;

      await API(`trails/likes/${recordID}`, "put", payload);

      setFavorited(false);
    } else if (!favorited && recordExists) {
      payload.like = true;

      await API(`trails/likes/${recordID}`, "put", payload);

      setFavorited(true);
    }
  };

  const fetchLikeData = async () => {
    const fetchedLikeData = await API(`trails/${trailID}/likes`, "get");

    setData(fetchedLikeData?.data);
  };

  return (
    <>
      {userID !== undefined &&
        (favorited === true ? (
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
        ))}
    </>
  );
};
