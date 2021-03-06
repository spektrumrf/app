import * as firebase from 'firebase'
import 'firebase/firestore'

import env from '../env.json'

export function useFirestore () {
    if (!firebase.apps.length) {
        const firebaseConfig = {
            projectId: env.firebase.projectId,
            apiKey: env.firebase.apiKey,
            authDomain: env.firebase.authDomain
        }
        firebase.initializeApp(firebaseConfig)
    }
    return firebase.firestore()
}
