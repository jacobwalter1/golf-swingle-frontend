import { COMPARISON } from "../utils/constants";
import { formatStatValue } from "../utils/helpers";

export function StatCell({ field, value, comparison }) {
	const displayValue = formatStatValue(field, value);

	const getClassName = () => {
		const base = "stat-cell";
		if (comparison === COMPARISON.CORRECT) return `${base} correct`;
		if (comparison === COMPARISON.HIGHER) return `${base} higher`;
		if (comparison === COMPARISON.LOWER) return `${base} lower`;
		return `${base} wrong`;
	};

	const getArrow = () => {
		if (comparison === COMPARISON.HIGHER) return "↑";
		if (comparison === COMPARISON.LOWER) return "↓";
		return "";
	};

	return (
		<div className={getClassName()}>
			<span className="stat-value">{displayValue}</span>
			{getArrow() && <span className="stat-arrow">{getArrow()}</span>}
		</div>
	);
}
