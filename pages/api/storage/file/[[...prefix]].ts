import nc from "next-connect";
import multer from "multer";
import { createFolder, getFiles, getRecentFiles } from "utils/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import { auth } from "utils/firebaseAdmin";

const upload = multer();

const apiRoute = nc<NextApiRequest & { files: any[] }, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array("files[]"));

apiRoute.post((req, res) => {
  const blob = req.files[0];
  console.log(blob);
  res.status(200).json(`File has benn uploaded`);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
