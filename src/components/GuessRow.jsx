import { StatCell } from "./StatCell";
import { COMPARISON_FIELDS } from "../utils/constants";

export function GuessRow({ guess }) {
	const { golfer, comparison, correct } = guess;

	return (
		<div className={`guess-row ${correct ? "correct-guess" : ""}`}>
			<div className="guess-golfer">
				<img
					src={golfer.headshotUrl}
					alt={golfer.fullName}
					className="golfer-avatar"
					onError={(e) => {
						e.target.style.display = "none";
					}}
				/>
				<span className="golfer-name">{golfer.fullName}</span>
			</div>

			<div className="guess-stats">
				<StatCell field={COMPARISON_FIELDS.AGE} value={golfer.age} comparison={comparison.age} />
				<StatCell field={COMPARISON_FIELDS.COUNTRY} value={golfer.country} comparison={comparison.country} />
				<StatCell field={COMPARISON_FIELDS.TURNED_PRO} value={golfer.turnedPro} comparison={comparison.turnedPro} />
				<StatCell field={COMPARISON_FIELDS.EDUCATION} value={golfer.education} comparison={comparison.education} />
				<StatCell field={COMPARISON_FIELDS.IS_ACTIVE} value={golfer.isActive} comparison={comparison.isActive} />
			</div>
		</div>
	);
}
