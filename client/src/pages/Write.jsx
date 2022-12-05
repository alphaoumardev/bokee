import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import { useLocation, } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Write()
{
  const state = useLocation().state;

  const [title, setTitle] = useState( "");
  const [descs, setDescs] = useState("");
  const [file, setFile] = useState("");
  const [cat, setCat] = useState("");
  const postId = location.pathname.split("/")[2];

  const fromData = new FormData();
  fromData.append("file", file);

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    try
    {
      await axios.post("/upload", fromData)

      if(postId)
      {
        await axios.post(`/posts/${postId}`, {
          title,
          descs,
          img: file?.name? file?.name:null,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          cat,
        }).then((res)=>
        {
          console.log(res.data)
          if (res.data === "success")
          {
            toast("Post Successfully Updated");
          }
        })
      }else
      {
        await axios.post("/posts/", {
          title,
          descs,
          cat,
          img: file?.name,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        }).then((res)=>
        {
          if (res.data === "inserted")
          {
            toast("Post Successfully Inserted");
          }
        });
      }
    } catch (error)
    {
      toast(error.message);
      console.log(error)
    }
  };
  console.log(file.name)

  return (
    <div className="addarticle">
      <div className="content">
        <ToastContainer />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            defaultValue={descs}
            value={descs}
            placeholder="Description"
            onChange={(e) => setDescs(e)}
          />
        </div>
      </div>
      <div className="settings">
        <div className="item">
          <h3>Publish</h3>
          <span>
            <b>Status</b> : publish
          </span>
          <span>
            <b>Visibility</b> : Public
          </span>
          <input
            type="file"
            id="file"
            required
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            <span style={{ fontWeight: "normal", textDecoration: "underline" }}>
              Upload Image
            </span>{" "}
            <span className="imagename">
              {file.name ? file.name : state?.img}
            </span>
          </label>

          <div className="btn">
            <button className="draft" onClick={handleSubmit}>
              Save as Draft
            </button>
            <button className="update" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
        <div className="item">
          <h3>Category</h3>
          <label htmlFor="Art">
            <input
              id="Art"
              type="radio"
              name="cat"
              checked={cat === "art"}
              value="art"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Art
          </label>
          <label htmlFor="Science">
            <input
              id="Science"
              type="radio"
              name="cat"
              checked={cat === "science"}
              value="science"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Science
          </label>

          <label htmlFor="Technology">
            <input
              id="Technology"
              type="radio"
              name="cat"
              checked={cat === "technology"}
              value="technology"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Technology
          </label>
          <label htmlFor="Cinema">
            <input
              id="Cinema"
              type="radio"
              name="cat"
              checked={cat === "cinema"}
              value="cinema"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Cinema
          </label>
          <label htmlFor="Design">
            <input
              id="Design"
              type="radio"
              name="cat"
              checked={cat === "design"}
              value="design"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Design
          </label>
          <label htmlFor="Food">
            <input
              id="Food"
              type="radio"
              name="cat"
              checked={cat === "food"}
              value="food"
              onChange={(e) => setCat(e.target.value)}
            />{" "}
            Food
          </label>
        </div>
      </div>
    </div>
  );
}

export default Write;
