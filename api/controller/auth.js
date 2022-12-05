import { db } from "../db.js";
import bcriptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerController = (req, res) =>
{
  try
  {
    const q = "SELECT * FROM users WHERE `email`=? OR `username`=?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.json(err.message);
      if (data.length)
        return res
          .status(409)
          .json("User already exists with the provided username or email");

      // const shah = bcriptjs.genSaltSync(10);
      // const hash = bcriptjs.hashSync(req.body.password, shah);

      const q = "INSERT INTO users (username,password,email, userImg, created ) VALUES(?)";

      const values = [
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.userImg,
        req.body.created
      ];

      db.query(q, [values], (err, data) =>
      {
        if (err) return res.json(err.message);
        const { password, ...others } = values;
        return res.status(201).json({
          msg: "Registration Successfull",
          userInfo: {
            data: others,
            status: data,
          },
        });
      });
    });
  } catch (error)
  {
    return res.status(500).json({ msg: error.message });
  }
};

export const loginController = (req, res) =>
{
  try
  {
    const q = "SELECT * from users WHERE username=?";
    const vlaues = [req.body.username];

    db.query(q, [vlaues], (err, data) =>
    {
      if (err) return res.json(err.message);
      if (data.length === 0) return res.status(404).json("User not found");

      // const matchPassword = bcriptjs.compareSync(
      //   req.body.password,
      //   data[0].password
      // );

      // if (!matchPassword)
      // {
      //   return res.status(400).json("Wrong username or password");
      // }

      const token = jwt.sign({ id: data[0].id }, "maryamKey");
      const { password, ...others } = data[0];

      res.cookie("access_token", token, {httpOnly: true,})
        .status(200)
        .json(others);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const logoutController = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logout successfully");
};
