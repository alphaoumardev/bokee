import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import moment from "moment";
import { AuthContext } from "../context/authContext";
import Breadcrumb from "./../component/breadcrumb";

function Single()
{
  const [post, setPost] = useState({});
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  // console.log(post)
  useEffect( () =>
  {
    async function getPost()
    {
      try
      {
        await axios.get(`/posts/${postId}`).then((res)=>
        {
          console.log(res.data);
          setPost(res.data.post[0]);
          setPosts(res.data.relatedPost);
        });
      } catch (error)
      {
        // console.log(error);
      }
    }
     getPost().then(r => {})

  }, [postId]);

  let splitSearch =
    location.search && location.search.includes("cat")
      ? location.search.split("=")[1]
      : location.search.split("&")[0].split("=")[1];

  const deleteHandler = async (e, postId, userId) =>
  {
    if (window.confirm("Are you sure you want to delete this post?"))
    {
      await axios.delete(`/posts/${postId}`);
      navigate(`/?author=${currentUser.username}&authorId=${userId}`);
    }
  };

  const getText = (html) =>
  {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <>
      <Breadcrumb
        posts={posts}
        splitSearch={splitSearch}
        search={location.search}
      />

      {
        <div className="singlePagePost">
          <div className="singlePost">
            <div className="content">
              <div>
                <img
                  src={`../../upload/${post.img}`}
                  alt={post.title}
                  className="image"
                  height="500px"
                  style={{ objectFit: "contain" }}
                />

                <span className="articleInfo">
                  <img
                    src={`../../user/${post.userImg}`}
                    alt={post.username}
                    width={30}
                    className="user"
                  />

                  <div className="info">
                    <Link
                      className="link"
                      to={`/?author=${post.username}&authorId=${post.uid}`}
                    >
                      <div className={"authorname"}>{post.username}</div>
                    </Link>{" "}
                    <span>Posted {moment(post.date).fromNow()}</span>
                  </div>

                  {currentUser?.username === post?.username && (
                    <span className="editInfo">
                      <Link to={`/write/${post.id}`} state={post}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/32/32355.png"
                          alt="Edit Post"
                          width={20}
                        />
                      </Link>
                      <img
                        src=" https://cdn-icons-png.flaticon.com/512/6861/6861362.png"
                        alt="Delete Post"
                        width={20}
                        onClick={(e) =>
                          deleteHandler(e, Number(postId), post.uid)
                        }
                      />
                    </span>
                  )}
                </span>
              </div>
              <h3>{post.title}</h3>
              <p>{getText(post.descs)}</p>
            </div>
          </div>
          <div className="relatedPost">
            {posts.length !== 0 ? (
              <h3>Other post you may like...</h3>
            ) : (
              <h3>There is no related post</h3>
            )}
            {posts.map((post) => (
              <div className="content" key={post.id}>
                <Link
                  to={`/post/${post.id}/?cat=${post.cat}`}
                  className="link "
                >
                  <img
                    src={`../../upload/${post.img}`}
                    alt={post.title}
                    height="300"
                    className="image"
                    style={{ objectFit: "contain" }}
                  />
                </Link>
                <Link
                  to={`/post/${post.id}/?cat=${post.cat}`}
                  className="link "
                >
                  <h3>{post.title}</h3>
                </Link>

                <Link
                  to={`/post/${post.id}/?cat=${post.cat}`}
                  className="link btn"
                >
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
}

export default Single;
