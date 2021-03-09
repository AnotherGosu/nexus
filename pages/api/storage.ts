// import nc from "next-connect";
// import multer from "multer";
import { createFolder, getFiles } from "utils/storage";
import { NextApiRequest, NextApiResponse } from "next";

type GetQuery = {
  userId: string;
  prefix: string;
};

// const storagePath = path.join(process.cwd(), "public", "storage");

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/storage",
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });

// const apiRoute = nc<NextApiRequest, NextApiResponse>({
//   onError(error, req, res) {
//     res.status(501).json({ error: error.message });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.use(upload.array("files[]"));

// apiRoute.post((req, res) => {
//   res.status(200).send("Uploaded succsessfully");
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const query = req.query as GetQuery;
      const { userId, prefix: prefixString } = query;
      const prefix = prefixString ? prefixString.split(",") : [];
      const files = await getFiles(userId, prefix);
      res.status(200).json(files);
    } else if (req.method === "POST") {
      const folderName = req.body.folderName;
      await createFolder(folderName);
      res.status(200).json(`Folder ${folderName} has been created`);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
