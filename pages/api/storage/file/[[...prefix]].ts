import nc from "next-connect";
import multer from "multer";
import { dowloadFile, uploadFile } from "utils/storage";
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

apiRoute.get(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { prefix = [] } = req.query as { prefix: string[] };

  const path = `${uid}/${prefix.join("/")}`;
  const fileName = prefix.pop();
  console.log(fileName);
  const data = await dowloadFile(path, fileName);
  const contents = data[0];
  res.setHeader("Content-Type", "application/octet-stream; charset=utf-8");
  res.setHeader("Content-Length", contents.length);
  res.write(contents, "binary");
  res.end();
});

apiRoute.post(async (req, res) => {
  const { token } = parseCookies({ req });
  const { uid } = await auth.verifyIdToken(token);
  const { prefix = [] } = req.query as { prefix: string[] };

  const file = req.files[0];
  prefix.push(file.originalname);
  const path = `${uid}/${prefix.join("/")}`;
  await uploadFile(file.buffer, path);

  res.status(200).json("File uploaded successfully");
});

apiRoute.delete;

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
