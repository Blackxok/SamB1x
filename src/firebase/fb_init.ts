import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
	apiKey: 'AIzaSyA1L927PXdASaV8siI_Ej7JNw0zAcfNfT4',
	authDomain: 'samb1x-ba555.firebaseapp.com',
	projectId: 'samb1x-ba555',
	storageBucket: 'samb1x-ba555.firebasestorage.app',
	messagingSenderId: '471105810445',
	appId: '1:471105810445:web:a15c2abac9a612be34e544',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }
