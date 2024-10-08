import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const SECS_PER_QUESTION = 20;

const initialState = {
	questions: [],

	//"loading", "error", "ready", "active", "finished"
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secondsRemaining: null,
};

function reducer(state, action) {
	const question = state.questions.at(state.index);
	switch (action.type) {
		case "dataRecieved":
			return {
				...state,
				questions: action.payload,
				status: "ready",
			};

		case "dataFailed":
			return {
				...state,
				status: "error",
			};
		case "start":
			return {
				...state,
				status: "active",
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
			};
		case "newAnswer": {
			return {
				...state,
				answer: action.payload,
				points:
					action.payload === question.correctOption
						? state.points + question.points
						: state.points,
			};
		}
		case "nextQuestion":
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		case "finish":
			return {
				...state,
				status: "finish",
				highScore:
					state.points > state.highScore ? state.points : state.highScore,
			};
		case "reset":
			return { ...initialState, questions: state.questions, status: "ready" };
		case "tick":
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? "finish" : state.status,
			};
		default:
			throw new Error("Action unknown");
	}
}

export default function App() {
	const [
		{ questions, status, index, answer, points, highScore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, curr) => prev + curr.points,
		0
	);

	useEffect(function () {
		fetch("http://localhost:9000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataRecieved", payload: data }))
			.catch((err) => dispatch({ type: "dataFailed" }));
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === "active" && (
					<>
						<Progress
							index={index}
							points={points}
							answer={answer}
							numQuestions={numQuestions}
							maxPossiblePoints={maxPossiblePoints}
						/>
						<Question
							question={questions[index]}
							answer={answer}
							dispatch={dispatch}
						/>
						<NextButton
							dispatch={dispatch}
							answer={answer}
							numQuestions={numQuestions}
							index={index}
						/>
						<Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
					</>
				)}
				{status === "finish" && (
					<FinishScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highScore={highScore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
