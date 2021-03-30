import nc from "next-connect";
import multer from "multer";
import { dowloadFile, uploadFiles } from "utils/storage";
import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import { auth } from "utils/firebaseAdmin";

const upload = multer();

const fileRoute = nc<NextApiRequest & { files: any[] }, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

fileRoute.use(upload.array("files[]"));

fileRoute.get(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { path } = req.query;

  const data = await dowloadFile(`${uid}/${path}`);
  const contents = data[0];

  res.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
  res.setHeader("Content-Length", contents.length);
  res.write(contents, "binary");
  res.end();
});

fileRoute.post(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const {
    files,
    query: { folderPath },
  } = req;

  const path = folderPath ? `${uid}/${folderPath}` : uid;
  await uploadFiles(files, path);

  const uploadedFiles = files.map((file) => file.originalname);
  res.status(200).json({ uploadedFiles });
});

export default fileRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
