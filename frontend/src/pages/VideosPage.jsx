import React, { useEffect, useState } from 'react';
import "./VideosPage.css"
import ReactPlayer from 'react-player/lazy'
const VideosPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentVideoSrc, setCurrentVideoSrc] = useState("");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/face/get_videos');
                const data = await response.json();
                const sortedVideos = data.videos.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));
                setVideos(sortedVideos);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const handleVideoClick = (fileId) => {
        const videoUrl = `http://127.0.0.1:5000/face/video/${fileId}`; // Use backticks for string interpolation
        console.log(videoUrl);
        const anchor = document.createElement('a');
        anchor.href = videoUrl;
        anchor.download = "recorded.mp4"; // Optional: specify a default filename
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };



    if (loading) {
        return <div>Loading videos...</div>;
    }

    return (
        <div className="videos-container">
            <h1>Your Recordings</h1>
            <div className="videos-list">
                {videos.length === 0 ? (
                    <p>No videos found.</p>
                ) : (
                    videos.map((video) => (
                        <div key={video.file_id} className="video-item">
                            <h3
                                style={{ cursor: 'pointer', color: 'blue' }}
                            >
                                {video.filename}
                            </h3>
                            <p>Uploaded on: {new Date(video.upload_date).toLocaleString()}</p>

                            {/* Download Button */}
                            <button onClick={() => handleVideoClick(video.file_id)}>
                                Download Video
                            </button>


                        </div>

                    ))
                )}

            </div>
        </div>
    );
};


export default VideosPage;