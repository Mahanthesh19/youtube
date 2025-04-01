import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const API_KEY = "API_KEY";

const VideoDetails = () => {
  const { videoId } = useParams();
  const { user } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [watchLater, setWatchLater] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchVideoDetails().then(fetchComments);
  }, [videoId]);

  useEffect(() => {
      if (video && video.snippet) {
        fetchRelatedVideos();
      }
    }, [video]);

  const fetchVideoDetails = async () => {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`);
    const data = await res.json();
    setVideo(data.items[0]);
  };

  const fetchRelatedVideos = async () => {
    const categoryId = video.snippet.categoryId;
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=${categoryId}&maxResults=5&key=${API_KEY}`);
    const data = await res.json();
    setRelatedVideos(data.items || []);
  };

  const fetchComments = async () => {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=10&order=relevance&key=${API_KEY}`);
    const data = await res.json();
    setComments(
      data.items.map((item) => ({
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        text: item.snippet.topLevelComment.snippet.textDisplay,
      })) || []
    );
  };

  const handleWatchLater = () => {
    if (!user) alert("Login to watch later");
    setWatchLater(!watchLater);
    const savedVideos = JSON.parse(localStorage.getItem(`watchLater-${user.email}`)) || [];
    localStorage.setItem(`watchLater-${user.email}`, JSON.stringify([...savedVideos, { id: videoId, title: video.snippet.title, thumbnail: video.snippet.thumbnails.medium.url }]));
  };

  const handleSubscribe = () => {
    if (!user) return alert("login to subscribe");
    setSubscribed(!subscribed);
    const subscriptions = JSON.parse(localStorage.getItem(`subscriptions-${user.email}`)) || [];
    localStorage.setItem(`subscriptions-${user.email}`, JSON.stringify([...subscriptions, { id: video.snippet.channelId, title: video.snippet.channelTitle }]));
  };

  if (!video) return <h3>Loading...</h3>;

  return (
    <div className="video-details-container">
      <Navbar />
      <div className="content-wrapper">
        <LeftSidebar />
        <div className="video-content">
          <iframe width="100%" height="400" src={`https://www.youtube.com/embed/${video.id}`} title={video.snippet.title} allowFullScreen></iframe>
          <h2>{video.snippet.title}</h2>
          <p>{video.statistics.viewCount} views</p>
          <p><b>👍 {video.statistics.likeCount} Likes</b> | <b>👎 {video.statistics.dislikeCount || "0"} Dislikes</b></p>
          <p>{video.snippet.description}</p>

          <button className={`btn ${liked ? "btn-success" : "btn-outline-success"}`} onClick={() => setLiked(!liked)}>👍</button>
          <button className={`btn ${watchLater ? "btn-warning" : "btn-outline-warning"} ms-2`} onClick={handleWatchLater}>Watch Later</button>
          <button className={`btn ${subscribed ? "btn-danger" : "btn-primary"} ms-2`} onClick={handleSubscribe}>
            {subscribed ? "Unsubscribe" : "Subscribe"}
          </button>

          {/* Comments Section */}
          <h3>Comments</h3>
          {comments.length > 0 ? (
            <ul className="list-group mt-3">
              {comments.map((comment, index) => (
                <li key={index} className="list-group-item">
                  <b>{comment.author}</b>: {comment.text}
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments available.</p>
          )}

          {/* Related Videos */}
          <div className="related-videos">
            <h4>Suggested Videos</h4>
            {relatedVideos.map((video) => (
              <Link key={video.id.videoId} to={`/video/${video.id.videoId}`} className="d-block mb-3">
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="related-video-thumbnail" />
                <p className="related-video-title">{video.snippet.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
