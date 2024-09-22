function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
	const precentage = (points / maxPossiblePoints) * 100;
	return (
		<>
			<p className="result">
				You Scored <strong>{points}</strong> out of {maxPossiblePoints} (
				{Math.ceil(precentage)}%)
			</p>
			<p className="highscore">HighScore: {highScore} Points</p>
			<button
				onClick={() => dispatch({ type: "reset" })}
				className="btn btn-reset"
			>
				Reset!
			</button>
		</>
	);
}

export default FinishScreen;
