import React, { useEffect, useState } from 'react';
import './VideosPage.css';
import { useNavigate } from 'react-router-dom';

const VideosPage = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentVideoSrc, setCurrentVideoSrc] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Perform authentication check before fetching videos
        const checkAuthAndFetchVideos = async () => {
            try {
                // Check for a valid token in localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/signin');
                    return;
                }

                // If the token exists, check its validity by making an API request
                const authResponse = await fetch('http://localhost:3000/assessment', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Send token in the request header
                    }
                });

                if (!authResponse.ok) {
                    throw new Error('Authentication failed');
                }

                // If authentication succeeds, fetch the video data
                const videoResponse = await fetch('http://127.0.0.1:5000/face/get_videos');
                const data = await videoResponse.json();

                // Sort videos by upload date in descending order
                const sortedVideos = data.videos.sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date));
                setVideos(sortedVideos);
                setLoading(false);

            } catch (error) {
                console.error('Error during authentication or video fetch:', error);
                setLoading(false);
                navigate('/signin'); // Redirect to sign-in on error
            }
        };

        checkAuthAndFetchVideos(); // Trigger the function on initial render
    }, [navigate]);

    const handleVideoClick = (fileId) => {
        const videoUrl = `http://127.0.0.1:5000/face/video/${fileId}`;
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
