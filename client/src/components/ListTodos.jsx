import React, {Fragment, useEffect, useState} from 'react';

const ListTodos = () => {

	const [todos, setTodos] = useState([]);

	const getTodos = async () => {
		try {
			const response = await fetch("http://localhost:5000/todos")
			const jsonData = await response.json();

			setTodos(jsonData)
 		} catch (err) {
			console.error(err.message)
		}
	}

	useEffect(() => {
		getTodos();
	})

	
  return(
		<Fragment>
				<h1>List Todos</h1>
				<table class="table mt-5 text-center">
					<thead>
						<tr>
							<th>Description</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{/*<tr>
							<td>John</td>
							<td>Doe</td>
							<td>john@example.com</td>
						</tr> */}
						{todos && todos.map(el=> <Todo data={el}/>)}
					</tbody>
				</table>
		</Fragment>
    
  )
}

export default ListTodos;