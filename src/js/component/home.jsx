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
	// createUser()



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
	// getTasks()

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
				// getTasks()

			}
		}
	};


	useEffect(() => {

		getTasks()

	}, [])


	return <>
		<form onSubmit={(evt) => { evt.preventDefault() }}>

			<input placeholder="Write a Task" className="m-3" type="text"
				onKeyUp={handleSubmit}
				onChange={(e) => setTask(e.target.value)}
			/>
		</form>

		{list && list.map((task, index) => <div className="d-flex gap-2 m-3" key={index}>
			<h2>- {task.label} -</h2>
			<button className="btn btn-danger">Delete</button>
		</div>

		)}

	</>



}
export default Home; 
