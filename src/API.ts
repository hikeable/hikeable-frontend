import axios, { AxiosResponse } from "axios";

export default async function API(path: string, method: string, data?: object) {
  const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
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
