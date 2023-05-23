import type { NextApiRequest, NextApiResponse } from "next";

import { getFavorites } from "api";

interface Query {
  ids?: string[] | string;
  page?: string;
}

const transformIds = (ids: string[]) => {
  let res = "";
  ids.map((id, index) => {
    res += `ids[]=${id}`;
    if (index != ids.length - 1) res += "&";
  });
  return res;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { ids, page } = req.query as Query;
    try {
      let param = "";
      if (Array.isArray(ids))
        param = transformIds(ids); //  if we have multiple ids
      else if (ids && ids.length > 0) param = `ids[]=${ids}`; //  if we have only one id

      const data = await getFavorites(param, page || "0");
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  } else {
    res.status(403);
  }
}
