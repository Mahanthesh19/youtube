import React, { useContext ,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import categoryIcon from "../icons/category.svg";

const categories = {
  Trending: null,
  Music: "10",
  Gaming: "20",
  Technology: "28",
};

const LeftSidebar = ({ category, setCategory }) => {
  const { user } = useContext(AuthContext);
  const subscribedChannels = user ? JSON.parse(localStorage.getItem(`subscriptions-${user.email}`)) || [] : [];
  const uniquesubscribedChannels = [...new Map(subscribedChannels.map((v) => [v.id, v])).values()];

  return (
    <div className="left-sidebar">
      <h4><img src={categoryIcon} alt="Categories" className="sidebar-icon" /> Categories</h4>
      {Object.keys(categories).map((cat) => (
        <p key={cat} className={category === cat ? "active" : ""} onClick={()=>setCategory(cat)}>
          {cat}
        </p>
      ))}
      <br></br>
      <br></br>

      {/* Subscribed Channels */}
      {user && (
        <>
          <h4>Subscribed Channels</h4>
          <ul className="subscribed-list">
            {uniquesubscribedChannels.length > 0 ? (
              uniquesubscribedChannels.map((channel) => (
                <li key={channel.id}>
                  <Link to={`/channel/${channel.id}`}>{channel.title}</Link>
                </li>
              ))
            ) : (
              <p>No Subscriptions</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default LeftSidebar;
