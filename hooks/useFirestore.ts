import * as firebase from 'firebase'
import 'firebase/firestore'
import { env } from '../env'

export const useFirestore = () => {
    if (!firebase.apps.length) {
        const firebaseConfig = {
            projectId: env.projectId,
            apiKey: env.apiKey,
            authDomain: env.authDomain
        }
        firebase.initializeApp(firebaseConfig)
    }
    return firebase.firestore()
}