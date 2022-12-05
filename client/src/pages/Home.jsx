import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Breadcrumb from "./../component/breadcrumb";

function Home() {
  const [posts, setPosts] = useState([]);
  const search = useLocation().search;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/posts/${search}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts().then(r => {});
  }, [search]);
  let splitSearch =
    search && search.includes("cat")
      ? search.split("=")[1]
      : search.split("&")[0].split("=")[1];

  //For HTML to redable text
  const getText = (html) =>
  {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <>
      <Breadcrumb posts={posts} splitSearch={splitSearch} search={search} />
      <div className="home">
        <div className="posts">
          {posts?.map((post) => (
            <div className="single" key={post.id}>
              <div className="right">
                <img
                  src={`../upload/${post.img}`}
                  height="300px"
                  style={{ objectFit: "contain" }}
                  alt={post.title}
                />
              </div>
              <div className="left">
                <div>
                  <span>Published Date: {moment(post.date).fromNow()}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="shotDesc">{getText(post.descs)}</p>
                <div>
                  <Link
                    className="link btn"
                    to={`/post/${post.id}/?cat=${post.cat}`}
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
