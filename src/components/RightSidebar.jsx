import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import watchLaterIcon from "../icons/watchlater.svg";

const RightSidebar = () => {
  const { user } = useContext(AuthContext);
  const watchLaterVideos = user ? JSON.parse(localStorage.getItem(`watchLater-${user.email}`)) || [] : [];
  const uniqueWatchLater = [...new Map(watchLaterVideos.map((v) => [v.id, v])).values()];

  return (
    <div className="right-sidebar">
      <h4><img src={watchLaterIcon} alt="Watch Later" className="sidebar-icon" /> Watch Later</h4>
      {uniqueWatchLater.length > 0 ? (
        <ul className="watch-later-list">
          {uniqueWatchLater.map((video) => (
            <li key={video.id} className="watch-later-item">
              <Link to={`/video/${video.id}`} className="watch-later-link">
                <img src={video.thumbnail} alt={video.title} className="watch-later-thumbnail" />
                <span>{video.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : user ? ( <p>No videos saved</p>) :
        (<p>Login/create account to watch later and subscribe</p>
      )}
    </div>
  );
};

export default RightSidebar;
