import { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { IconButton, Tooltip } from "@mui/material";

import { TTrailCompletion, TTrailMetrics } from "../global";
import { updateBadgeStreak, updateBadgeLength } from "../src/UpdateBadges";
import API from "../src/API";

export const CompletedTrails = ({ userID, trailID }: TTrailMetrics) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [recordExists, setRecordExists] = useState<boolean>(false);
  const [recordID, setRecordID] = useState<number>(0);
  const [data, setData] = useState<TTrailCompletion[]>([]);

  useEffect(() => {
    for (const object of data) {
      if (object.user === userID) {
        setRecordExists(true);
        setRecordID(object.id);

        if (object.completion === true) setCompleted(true);
      }
    }
  }, [data, userID]);

  const handleCompletion = async () => {
    const current = new Date();
    const payload = {
      user: userID,
      trail_id: trailID,
      completion: true,
      date: `${current.getFullYear()}-${
        current.getMonth() + 1
      }-${current.getDate()}`,
    };

    if (!recordExists) {
      await API("trails/completions", "post", payload);

      fetchCompletionData();
    } else if (completed && recordExists) {
      payload.completion = false;

      await API(`trails/completions/${recordID}`, "put", payload);

      setCompleted(false);
    } else if (!completed && recordExists) {
      payload.completion = true;

      await API(`trails/completions/${recordID}`, "put", payload);

      setCompleted(true);
    }
    updateBadgeStreak(userID);
    updateBadgeLength(userID);
  };

  const fetchCompletionData = async () => {
    const fetchedCompletionData = await API(
      `trails/${trailID}/completions`,
      "get"
    );
    setData(fetchedCompletionData?.data);
  };

  fetchCompletionData();

  return (
    <>
      {userID !== undefined &&
        (completed === true ? (
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
        ))}
    </>
  );
};
