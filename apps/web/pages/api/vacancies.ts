import type { NextApiRequest, NextApiResponse } from "next";

import { getVacancies } from "api";

interface Query {
  keyword?: string;
  catalogues?: string;
  payment_from?: string;
  payment_to?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { keyword, catalogues, payment_from, payment_to } =
      req.query as Query;
    try {
      const data = await getVacancies(
        keyword,
        catalogues,
        payment_from,
        payment_to
      );
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
