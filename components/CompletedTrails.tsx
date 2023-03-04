import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import axios from "axios";
import { useAuthContext } from "./context/UseAuthContext";
import { TTrailCompletion } from "../global";
import { updateBadgeStreak, updateBadgeLength } from "../src/UpdateBadges";
import { TTrailMetrics } from "../global";
import React from "react";

export const CompletedTrails = ({ userID, trailID }: TTrailMetrics) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [recordID, setRecordID] = useState<number>(0);
  const [data, setData] = useState<TTrailCompletion[]>([]);

  const { userId } = useAuthContext();

  const handleCompletion = async () => {
    const current = new Date();

    if (!recordExists) {
      await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/completions`,
        data: {
          user: userID,
          trail_id: trailID,
          completion: true,
          date: `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()}`,
        },
      });

      fetchCompletionData();
    } else if (completed && recordExists) {
      await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/completions/${recordID}`,
        data: {
          user: userID,
          trail_id: trailID,
          completion: false,
          date: `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()}`,
        },
      });
      setCompleted(false);
    } else if (!completed && recordExists) {
      await axios({
        method: "put",
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/completions/${recordID}`,
        data: {
          user: userID,
          trail_id: trailID,
          completion: true,
          date: `${current.getFullYear()}-${
            current.getMonth() + 1
          }-${current.getDate()}`,
        },
      });
      setCompleted(true);
    }
    updateBadgeStreak(userId);
    updateBadgeLength(userId);
  };

  const fetchCompletionData = async () => {
    const fetchedCompletionData = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/trails/${trailID}/completions`
    );
    setData(fetchedCompletionData.data);
  };

  useEffect(() => {
    fetchCompletionData();
  }, []);

  useEffect(() => {
    for (let object of data) {
      if (object.user === userID) {
        setRecordExists(true);
        setRecordID(object.id);

        if (object.completion === true) setCompleted(true);
      }
    }
  }, [data, userID]);

  return (
    <>
      {userID !== undefined ? (
        completed === true ? (
          <>
            <Tooltip title="Mark as incomplete">
              <IconButton aria-label="favorite" onClick={handleCompletion}>
                <BrowserView>
                  <CheckBoxIcon
                    sx={{ fontSize: "2.5rem", fill: "white" }}
                  ></CheckBoxIcon>
                </BrowserView>
                <MobileView>
                  <CheckBoxIcon sx={{ fontSize: "2.5rem" }}></CheckBoxIcon>
                </MobileView>
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Mark as complete">
              <IconButton
                aria-label="favorite-outline"
                onClick={handleCompletion}
              >
                <BrowserView>
                  <CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "2.5rem", fill: "white" }}
                  ></CheckBoxOutlineBlankIcon>
                </BrowserView>
                <MobileView>
                  <CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "2.5rem" }}
                  ></CheckBoxOutlineBlankIcon>
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
