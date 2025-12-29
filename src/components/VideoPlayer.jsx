import { useEffect, useRef, useState } from "react";
import { getVideoUrl } from "../utils/helpers";
import { VIDEO_LEVELS } from "../utils/constants";

export function VideoPlayer({ golferPlayerId, level, gameOver }) {
	const videoRef = useRef(null);
	const [error, setError] = useState(false);

	// Show original video when game is over
	const displayLevel = gameOver ? VIDEO_LEVELS.ORIGINAL : level;
	const videoUrl = getVideoUrl(golferPlayerId, displayLevel);

	useEffect(() => {
		setError(false);
		if (videoRef.current) {
			videoRef.current.load();
		}
	}, [videoUrl]);

	const handleError = () => {
		setError(true);
	};

	return (
		<div className="video-player">
			{error ? (
				<div className="video-error">
					<p>Unable to load video</p>
					<p className="video-error-details">Level {displayLevel}</p>
				</div>
			) : (
				<video ref={videoRef} className="video" controls autoPlay loop muted playsInline onError={handleError}>
					<source src={videoUrl} type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			)}
			<div className="video-info">
				<span className="video-level">{gameOver ? "🏆 Original Video" : `📹 Level ${level}`}</span>
			</div>
		</div>
	);
}
