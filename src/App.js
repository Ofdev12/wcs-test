import React, { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Form } from './components/Form'
import { Members } from './components/Members'
import { db } from './firebase/index'

const App = () => {
	const [memberList, setMemberList] = useState()
	const [status, setStatus] = useState({})

	useEffect(() => {
		// Subscribe to the members collections.
		db.members.subToAll(setMemberList)
	}, [])

	const handleStatus = (data) => {
		setStatus(data)
		setTimeout(() => {
			setStatus({})
		}, 3000)
	}

	// The saveMember method in the parent, to avoid passing the memberList to the child.
	const saveMember = (v, e) => {
		if (!v.name) {
			console.error('Argonaute should have a name.')
			handleStatus({
				status: 'errorStatus',
				message: 'Argonaute should have a name',
			})
			return
		}
		// standardization of the name
		const prepare = v.name.toLowerCase().split('')
		const name = [prepare[0].toUpperCase(), ...prepare.slice(1)].join('')

		// Check if member already exist.
		// /!\ Only check in the memberList array, should be more secure to tcheck in DB.
		if (memberList.find((el) => el.name === name)) {
			handleStatus({
				status: 'errorStatus',
				message: 'This user is already in database',
			})
			return
		} else {
			db.members
				.add({ name: name })
				.then(() => {
					e.target.reset()
					handleStatus({
						status: 'succesStatus',
						message: `${name} added !`,
					})
				})
				.catch((err) => {
					console.error('Error adding member document: ', err)
					handleStatus({
						status: 'errorStatus',
						message:
							'Error during save the member contact: jasonLePlagiste@soleil.com',
					})
				})
		}
		return
	}

	return (
		<div className='App'>
			<Header />
			<main>
				<Form saveMember={saveMember} status={status} />
				<Members memberList={memberList} />
			</main>
			<Footer />
		</div>
	)
}

export default App
