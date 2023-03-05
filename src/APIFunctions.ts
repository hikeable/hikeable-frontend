import axios, { AxiosResponse } from "axios";
const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

// Comments

export class Comment {
  user: number | undefined;
  userName: string;
  trail_id: number;
  comment: string;
  date: string;

  constructor(
    user: number | undefined,
    userName: string,
    trailID: number,
    comment: string,
    date: string
  ) {
    this.user = user;
    this.userName = userName;
    this.trail_id = trailID;
    this.comment = comment;
    this.date = date;
  }

  static async getAllByID(trailID: number) {
    return await backendReq(`trails/${trailID}/comments`, "get");
  }

  static async post(newComment: Comment) {
    return await backendReq("trails/comments", "post", newComment);
  }
}

// Likes

export class Like {
  user: number | undefined;
  trail_id: number;
  like: boolean;

  constructor(user: number | undefined, trailID: number, like: boolean) {
    this.user = user;
    this.trail_id = trailID;
    this.like = like;
  }

  static async getAllByID(trailID: number) {
    return await backendReq(`trails/${trailID}/likes`, "get");
  }

  static async post(newLike: Like) {
    return await backendReq("trails/likes", "post", newLike);
  }

  static async put(updatedLike: Like, recordID: number) {
    return await backendReq(`trails/likes/${recordID}`, "put", updatedLike);
  }
}

// Completed Trails

export class CompletedTrail {
  user: number | undefined;
  trail_id: number;
  completion: boolean;
  date: string;

  constructor(
    user: number | undefined,
    trailID: number,
    completion: boolean,
    date: string
  ) {
    this.user = user;
    this.trail_id = trailID;
    this.completion = completion;
    this.date = date;
  }

  static async getAllByID(trailID: number) {
    return await backendReq(`trails/${trailID}/completions`, "get");
  }

  static async post(newCompletedTrail: CompletedTrail) {
    return await backendReq("trails/completions", "post", newCompletedTrail);
  }

  static async put(updatedCompletedTrail: CompletedTrail, recordID: number) {
    return await backendReq(
      `trails/completions/${recordID}`,
      "put",
      updatedCompletedTrail
    );
  }
}

// API Call Wrapper

export async function backendReq(path: string, method: string, data?: object) {
  const url = `${backend}api/${path}`;

  let res: AxiosResponse<any, any>;

  try {
    switch (method) {
      case "get":
        res = await axios({
          method: "get",
          url: url,
        });
        return res;

      case "post":
        res = await axios({
          method: "post",
          url: url,
          data: data,
        });
        return res;

      case "put":
        res = await axios({
          method: "put",
          url: url,
          data: data,
        });
        return res;
    }
  } catch (error) {
    console.error(error);
  }
}
