import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "utils/firebaseAdmin";
import { parseCookies } from "nookies";
import { createFolder } from "utils/storage";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = parseCookies({ req });
    const { uid } = await auth.verifyIdToken(token);
    res.status(200).json("");
  } catch (err) {
    res.status(403).json(err);
  }
};
