import firebase from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from './config'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const fb = firebase.firestore()

const members = {
	add: (data) => fb.collection('members').add(data),
	subToAll: (setState) =>
		fb.collection('members').onSnapshot(async (snap) => {
			const data = await snap.docs.map((doc) => {
				return { docID: doc.id, ...doc.data() }
			})
			data.sort((a, b) => {
				if (a.name < b.name) {
					return -1
				}
				if (a.name > b.name) {
					return 1
				}
				return 0
			})
			setState(data)
		}),
}

export const db = {
	members,
}
