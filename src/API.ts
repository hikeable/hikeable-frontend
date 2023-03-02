import axios from "axios";

export default async function API(url: string, method: string, data: object) {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

    const payload = await axios({
        method: method,
        url: `${backend}${url}`,
        data: data
    })

    return payload;
}