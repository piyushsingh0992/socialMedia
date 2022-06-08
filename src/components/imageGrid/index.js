import * as React from "react";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useNavigate } from "react-router-dom";

export default function ImageGrid({ postArray }) {
  const navigate = useNavigate();
  return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {postArray.map((post, index) => (
        <ImageListItem
          key={index}
          onClick={() => {
            navigate(`/post/${post._id}`);
          }}
        >
          <img
            className="clickable"
            src={post.img.url}
            alt={post.caption}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
