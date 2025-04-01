import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";

const API_KEY = "API_KEY";
const categories = {
  Trending: null,
  Music: "10",
  Gaming: "20",
  Technology: "28",
};

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("Trending");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, [category, searchQuery]);

  const fetchVideos = (searchQuery) => {
    let url = searchQuery
      ? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&maxResults=20&type=video&key=${API_KEY}`
      : `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular${category !== "Trending" ? `&videoCategoryId=${categories[category]}` : ""}&regionCode=US&maxResults=20&key=${API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setVideos(data.items);
        } else {
          setError("No videos found.");
        }
      })
      .catch(() => setError("Failed to load videos. Please try again."));
  };

  return (
    <div className="home-container">
      <Navbar fetchVideos={fetchVideos}/>
      <div className="content-wrapper">
        <LeftSidebar category={category} setCategory={setCategory}/>
        <div className="video-feed">
          <h2>{searchQuery ? `Search Results for "${searchQuery}"` : `${category} Videos`}</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="video-grid">
            {videos.map((video) => (
              <Link key={video.id.videoId || video.id} to={`/video/${video.id.videoId || video.id}`} className="video-card">
                <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="video-thumbnail" />
                <div className="video-info">
                  <h5>{video.snippet.title}</h5>
                  <p>{video.snippet.channelTitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
