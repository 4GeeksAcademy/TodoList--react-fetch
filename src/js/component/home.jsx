import React, { useState, useEffect } from "react";


const Home = () => {

	const [list, setList] = useState([{ label: '', done: false }])

	const [task, setTask] = useState("")



	const createUser = async () => {

		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad', {
			method: 'POST',
			body: JSON.stringify([]),
			headers: {
				'Content-Type': 'application/json'
			},
		})
		if (response.ok) {
			getTasks()
		}
	}



	const getTasks = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad')
			const data = await response.json()
			if (response.ok) {
				setList(data)
			} else {
				//crear user
				createUser()
			}

		}
		catch (error) {
			console.log(error);
		}
	}

	const handleSubmit = async (evt) => {

		if (evt.key == "Enter") {
			const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad', {
				method: 'PUT',
				body: JSON.stringify([...list, { label: task, done: false }]),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			if (response.ok) {
				getTasks()
				setTask("")

			}
		}

	};

	const deleteAll = async () => {
		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});
		if (response.ok) {
			createUser()
		}
	};

	const deleteItems = async (label) => {
		const taskFiltered = list.filter(item => item.label != label)

		const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Jean-abiad', {
			method: 'PUT',
			body: JSON.stringify(taskFiltered),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (response.ok) {
			setList(taskFiltered)

		} console.log(taskFiltered);
	};




	useEffect(() => {

		getTasks()

	}, [])


	return <>

		<div className="box" style={{ width: "55%", margin: "auto", maxHeight: "auto" }}>
			<form className="d-flex justify-content-center mt-2" onSubmit={(evt) => { evt.preventDefault() }}>

				<input placeholder="Write a Task" className="border border-0 caja py-3 px-3" type="text"
					onKeyUp={handleSubmit}
					value={task}
					onChange={(e) => setTask(e.target.value)}

				/>


			</form>
			<button
				onClick={() => deleteAll()}
				className="btn btn-secondary mx-3">Delete All</button>


			{list && list.map((task, index) => <div className="caja d-flex justify-content-between border-top gap-2 m-3" key={index}>
				<div className="d-flex mt-4 align-content-center caja ">
					<h5 className="">{task.label}</h5></div>
				<div className="delete">
					<button className="bg-danger btn d-flex align-items-center m-3 borde anm delete" onClick={() => deleteItems(task.label)}>🗑️</button></div>

			</div>

			)}
			<div className="border-top px-4 py-3 m-0 ">

			</div>
		</div>

	</>



}
export default Home; 
