import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const API_KEY = "API_KEY";

const ChannelDetails = () => {
  const { channelId } = useParams();
  const { user } = useContext(AuthContext);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetchChannelDetails();
    fetchChannelVideos();
    checkSubscriptionStatus();
  }, [channelId]);

  const fetchChannelDetails = async () => {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`);
    const data = await res.json();
    setChannel(data.items[0]);
  };

  const fetchChannelVideos = async () => {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${API_KEY}`);
    const data = await res.json();
    setVideos(data.items || []);
  };

  const checkSubscriptionStatus = () => {
    if (!user) return;
    const savedSubscriptions = JSON.parse(localStorage.getItem(`subscriptions-${user.email}`)) || [];
    setSubscribed(savedSubscriptions.some((sub) => sub.id === channelId));
  };

  const handleSubscribe = () => {
    if (!user) return alert("login to subscribe");
    const savedSubscriptions = JSON.parse(localStorage.getItem(`subscriptions-${user.email}`)) || [];

    if (subscribed) {
      const updatedSubscriptions = savedSubscriptions.filter((sub) => sub.id !== channelId);
      localStorage.setItem(`subscriptions-${user.email}`, JSON.stringify(updatedSubscriptions));
      setSubscribed(false);
    } else {
      const newSubscription = { id: channelId, title: channel.snippet.title };
      localStorage.setItem(`subscriptions-${user.email}`, JSON.stringify([...savedSubscriptions, newSubscription]));
      setSubscribed(true);
    }
  };

  if (!channel) return <h3>Loading...</h3>;

  return (
    <div className="channel-details-container">
      <Navbar />
      <div className="content-wrapper">
        <LeftSidebar />
        <div className="channel-content">
          <h2>{channel.snippet.title}</h2>
          <p>{channel.statistics.subscriberCount} subscribers</p>
          <p>{channel.snippet.description}</p>
          <button className={`btn ${subscribed ? "btn-danger" : "btn-primary"}`} onClick={handleSubscribe}>
            {subscribed ? "Unsubscribe" : "Subscribe"}
          </button>
          
          {/*Channel videos*/}
          <h3 className="mt-4">Uploaded Videos</h3>
          <div className="video-grid">
            {videos.map((video) => (
              <Link key={video.id.videoId} to={`/video/${video.id.videoId}`} className="video-card">
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="video-thumbnail" />
                <h5>{video.snippet.title}</h5>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
