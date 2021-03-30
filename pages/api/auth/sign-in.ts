import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "utils/firebaseAdmin";
import { parseCookies } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = parseCookies({ req });
    await auth.verifyIdToken(token);

    res.status(200).json("Successful sign-in");
  } catch (err) {
    res.status(403).json(err);
  }
};
