export interface IPlanData {
	weekTotal: number
	monthTotal: number
	total: number
	plans: IPlan[]
}

export interface IPlan {
	id: string
	title: string
	startTime: number
	totalTime: number
	endTime: number
	userId: string
	status: IPlanStatus
}
export type IPlanStatus = 'success' | 'in_progress' | 'un_started'
