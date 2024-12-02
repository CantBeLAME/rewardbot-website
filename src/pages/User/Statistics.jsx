import React, { useEffect, useState } from "react";
import { getAssignmentsTimeRange, validateToken } from "../../api/canvas";
import { useAuth } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import ToDoList from "../../components/Statistics/ToDoList";
import { AssignmentType } from "../../const/assignments";
import DataHandle from "../../components/Statistics/DataHandle";
import { Main, Sidebar } from "../../components/Sidebar";

export default function Statistics() {
	const { loading } = useAuth();
	const navigate = useNavigate();
	const [planner, setPlanner] = useState([]);

	useEffect(() => {
		validateToken(
			getAssignmentsTimeRange,
			(data) => {
				setPlanner(data?.filter(({ type }) => (type === AssignmentType.ASSIGNMENT || type === AssignmentType.QUIZ || type === AssignmentType.DISCUSSION)) ?? []);
			},
			() => {
				navigate("/");
			},
		);
	}, []);

	const sortedData = [...planner].sort((a, b) =>
		new Date(a.due_at) - new Date(b.due_at)
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-row w-full h-full">
			<Sidebar>
				<ToDoList data={sortedData} />
			</Sidebar>
			<Main>
				<DataHandle data={planner} />
			</Main>
		</div>
	);
}
