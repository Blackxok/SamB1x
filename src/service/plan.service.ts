import { auth, db } from '@/firebase/fb_init'
import { IPlan, IPlanData } from '@/types/types'
import {
	endOfMonth,
	endOfWeek,
	isWithinInterval,
	startOfMonth,
	startOfWeek,
} from 'date-fns'
import { collection, getDocs, query, where } from 'firebase/firestore/lite'

export const PlansService = {
	getPlans: async (): Promise<IPlanData> => {
		let weekTotal = 0
		let monthTotal = 0
		let total = 0

		const now = new Date()
		const weekStart = startOfWeek(now)
		const weekEnd = endOfWeek(now)
		const monthStart = startOfMonth(now)
		const monthEnd = endOfMonth(now)

		try {
			const plansQuery = query(
				collection(db, 'plans'),
				where('userId', '==', auth.currentUser?.uid)
			)

			const querySnapshot = await getDocs(plansQuery)

			querySnapshot.docs.forEach(doc => {
				const data = doc.data()
				const planDate = new Date(data.startTime)
				const planTime = data.totalTime || 0

				if (isWithinInterval(planDate, { start: weekStart, end: weekEnd })) {
					weekTotal += planTime
				}
				if (isWithinInterval(planDate, { start: monthStart, end: monthEnd })) {
					monthTotal += planTime
				}
				total += planTime
			})

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
