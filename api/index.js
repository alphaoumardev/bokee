import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import multer from "multer";

const app = express();

app.use(cookieParser());

app.use(express.json());

//middleware used to enable cors
app.use(cors());

//middleware used to enable cors
app.use(
  "http://localhost:8800/api/",
  createProxyMiddleware({
    target: "http://localhost:3000/", //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res)
    {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

/**
 * multer upload image with disk storage start for Post
 * For Unique file name
 * Date.now() + "-" + file.originalname;
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb)
  {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb)
  {
    const uniquePreffix = file.originalname;
    cb(null, uniquePreffix);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res)
{
  const file = req.file ? req.file : "";
  res.status(200).json(file.filename);
});

/**
 * multer upload image with disk storage end //
 */

/**
 * multer upload image with disk storage start for User Image
 */
const storage2 = multer.diskStorage({
  destination: function (req, file, cb)
  {
    cb(null, "../client/public/user");
  },
  filename: function (req, file, cb)
  {
    const uniquePreffix = file.originalname;
    cb(null, uniquePreffix);
  },
});

const uploadUserImg = multer({ storage: storage2 });

app.post(
  "/api/uploaduserimg",
  uploadUserImg.single("file"),
  function (req, res)
  {
    const file = req.file ? req.file : "";
    res.status(200).json(file.filename);
  }
);

/**
 * multer upload image with disk storage end //
 */

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(8800, () =>
{
  console.log("port listning... 8800");
});
