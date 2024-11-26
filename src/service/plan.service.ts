import { db } from '@/firebase/fb_init'
import { IPlan, IPlanData } from '@/types/types'
import { collection, getDocs, query } from 'firebase/firestore/lite'

export const PlansService = {
	getPlans: async (): Promise<IPlanData> => {
		let weekTotal = 0
		let monthTotal = 0
		let total = 0

		try {
			const plansQuery = query(collection(db, 'plans'))
			const querySnapshot = await getDocs(plansQuery)

			const plans: IPlan[] = querySnapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			})) as IPlan[]

			const planData: IPlanData = {
				plans,
				weekTotal,
				monthTotal,
				total,
			}

			return planData
		} catch (error) {
			console.error('Error fetching plans:', error)
			throw new Error('Failed to fetch plans. Please try again later.')
		}
	},
}
