import axios, { AxiosResponse } from "axios";

export default async function API(url: string, method: string, data?: object) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
  const path = `${backend}api/${url}`;
  let res: AxiosResponse<any, any>;

  switch (method) {
    case "get":
      res = await axios({
        method: "get",
        url: path,
      });
      return res.data;

    case "post":
      res = await axios({
        method: "post",
        url: path,
        data: data,
      });
      return res;
  }

  return null;
}
