import { GuessRow } from "./GuessRow";
import { STAT_LABELS, COMPARISON_FIELDS } from "../utils/constants";

export function GuessHistory({ guesses }) {
	if (guesses.length === 0) {
		return null;
	}

	return (
		<div className="guess-history">
			<div className="guess-header">
				<div className="header-golfer">Golfer</div>
				<div className="header-stats">
					<div className="header-stat">{STAT_LABELS[COMPARISON_FIELDS.AGE]}</div>
					<div className="header-stat">{STAT_LABELS[COMPARISON_FIELDS.COUNTRY]}</div>
					<div className="header-stat">{STAT_LABELS[COMPARISON_FIELDS.TURNED_PRO]}</div>
					<div className="header-stat">{STAT_LABELS[COMPARISON_FIELDS.EDUCATION]}</div>
					<div className="header-stat">{STAT_LABELS[COMPARISON_FIELDS.IS_ACTIVE]}</div>
				</div>
			</div>

			<div className="guess-list">
				{guesses.map((guess, index) => (
					<GuessRow key={index} guess={guess} />
				))}
			</div>
		</div>
	);
}
