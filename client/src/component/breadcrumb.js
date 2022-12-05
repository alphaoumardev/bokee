import React from "react";

function Breadcrumb({ posts, splitSearch, search }) {
  return (
    <div className="bredcrumb">
      {posts.length > 0 ? (
        <h1>
          {splitSearch !== undefined && search.includes("cat")
            ? `All Post of category ${splitSearch} `
            : splitSearch !== undefined && search.includes("author")
            ? `All Post of author ${splitSearch} `
            : "All Post"}
        </h1>
      ) : (
        <h1>
          {splitSearch !== undefined && search.includes("cat")
            ? `There is no post for category ${splitSearch}`
            : splitSearch !== undefined && search.includes("author")
            ? `There is no post for author ${splitSearch}`
            : "There is no post found"}
        </h1>
      )}
    </div>
  );
}

export default Breadcrumb;
