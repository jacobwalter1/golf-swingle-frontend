import { useState, useRef, useEffect } from "react";
import { filterGolfers, debounce } from "../utils/helpers";

export function GolferAutocomplete({ golfers, onSelect, disabled }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const inputRef = useRef(null);

	useEffect(() => {
		const debouncedFilter = debounce(() => {
			if (searchTerm.length >= 2) {
				const filtered = filterGolfers(golfers, searchTerm);
				setSuggestions(filtered);
				setShowSuggestions(true);
			} else {
				setSuggestions([]);
				setShowSuggestions(false);
			}
		}, 300);

		debouncedFilter();
	}, [searchTerm, golfers]);

	const handleSelect = (golfer) => {
		onSelect(golfer);
		setSearchTerm("");
		setSuggestions([]);
		setShowSuggestions(false);
		setSelectedIndex(-1);
		inputRef.current?.focus();
	};

	const handleKeyDown = (e) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prev) => Math.max(prev - 1, -1));
		} else if (e.key === "Enter" && selectedIndex >= 0) {
			e.preventDefault();
			handleSelect(suggestions[selectedIndex]);
		} else if (e.key === "Escape") {
			setShowSuggestions(false);
		}
	};

	return (
		<div className="golfer-autocomplete">
			<input
				ref={inputRef}
				type="text"
				className="golfer-input"
				placeholder="Type a golfer's name..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				onKeyDown={handleKeyDown}
				disabled={disabled}
			/>

			{showSuggestions && suggestions.length > 0 && (
				<div className="suggestions">
					{suggestions.map((golfer, index) => (
						<div
							key={golfer.playerId}
							className={`suggestion ${index === selectedIndex ? "selected" : ""}`}
							onClick={() => handleSelect(golfer)}
							onMouseEnter={() => setSelectedIndex(index)}
						>
							<img
								src={golfer.headshotUrl}
								alt={golfer.fullName}
								className="suggestion-avatar"
								onError={(e) => {
									e.target.style.display = "none";
								}}
							/>
							<span className="suggestion-name">{golfer.fullName}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
