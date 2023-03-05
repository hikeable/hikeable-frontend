import axios, { AxiosResponse } from "axios";
const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

export class Comment {
  user: number | undefined;
  userName: string;
  trail_id: number;
  comment: string;
  date: string;

  constructor(
    user: number | undefined,
    userName: string,
    trail_id: number,
    comment: string,
    date: string
  ) {
    this.user = user;
    this.userName = userName;
    this.trail_id = trail_id;
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
