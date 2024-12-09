import { MdQuiz, MdAssignment } from "react-icons/md";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { BsCheckAll } from "react-icons/bs";
import { useState } from "react";
import { putMarkComplete, validateToken } from "../../api/canvas";
import { useNavigate, Link } from "react-router-dom";
export default function ToDoCard({ item }) {
	const [complete, setComplete] = useState(item.marked_complete);
	const navigate = useNavigate();
	const icon = {
		quiz: <MdQuiz className="text-2xl" />,
		assignment: <MdAssignment className="text-2xl" />,
		discussion_topic: <RiQuestionAnswerFill className="text-2xl" />,
	};

	const markComplete = () => {
		validateToken(
			() => putMarkComplete({ id: item.id, complete: !complete }),
			(data) => {
				setComplete(!complete);
			},
			() => {
				navigate("/");
			},
		);
	};

	return (
		<Link
			to={`https://canvas.vt.edu${item.html_url}`}
			className={`mb-4 flex w-full items-center justify-between rounded-lg p-4 shadow-md ${complete ? "bg-gray-200 line-through" : "bg-gray-100"} hover:bg-gray-200`}
		>
			<div>
				{icon[item.type]}
				<h2 className="font-semibold">{item.name}</h2>
				<div className="text-sm text-gray-600">
					Due: {new Date(item.due_at).toLocaleString()}
				</div>
			</div>
			<button
				className="rounded-lg p-1 transition duration-200 hover:bg-gray-200"
				onClick={() => markComplete}
			>
				<BsCheckAll className="text-2xl" />
			</button>
		</Link>
	);
}
