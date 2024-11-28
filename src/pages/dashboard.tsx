import TaskForm from '@/components/forms/taskForm'
import Loader from '@/components/shared/loader'
import PlansItems from '@/components/shared/plansItems'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { db } from '@/firebase/fb_init'
import { taskSchema } from '@/lib/validation'
import { PlansService } from '@/service/plan.service'
import { useUserState } from '@/stores/user.store'
import { IPlan } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { addMilliseconds, addMinutes, format } from 'date-fns'
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	updateDoc,
} from 'firebase/firestore/lite'
import { useState } from 'react'
import { RiAlertLine } from 'react-icons/ri'
import { toast } from 'sonner'
import { z } from 'zod'
//
export default function Dashboard() {
	const [deleting, setDeleting] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [current, setCurrent] = useState<IPlan | null>(null)
	const [open, setOpen] = useState(false)
	const { user } = useUserState()

	const { isPending, data, error, refetch } = useQuery({
		queryKey: ['plans'],
		queryFn: PlansService.getPlans,
	})

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		try {
			taskSchema.parse({ title })
			if (!user) return null

			await addDoc(collection(db, 'plans'), {
				title,
				createdAt: new Date(),
				startTime: null,
				endTime: null,
				userId: user.uid,
				status: 'un_started',
			})
			refetch()
			setOpen(false)
		} catch (error) {
			console.error('Validation failed', error)
		}
	}
	const onUpdate = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user || !current) return null

		return updateDoc(doc(db, 'plans', current.id), { title })
			.then(() => refetch())
			.then(() => setIsEditing(false))
			.then(() => setCurrent(null))
			.finally(() => setOpen(false))
	}

	const onEdit = (plan: IPlan) => {
		setIsEditing(true)
		setCurrent(plan)
	}
	const onDelete = async (id: string) => {
		setDeleting(true)
		const promise = deleteDoc(doc(db, 'plans', id))
			.then(() => {
				refetch()
			})
			.finally(() => setDeleting(false))

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Plan deleted successfully!',
			error: 'Failed to delete plan!',
		})
	}
	const formatData = (time: number) => {
		const data = addMilliseconds(new Date(0), time)
		const formattedData = format(
			addMinutes(data, data.getTimezoneOffset()),
			'HH:mm:ss'
		)

		return formattedData
	}

	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center'>
				<div className='grid grid-cols-2 w-full gap-8 items-center'>
					<div className='flex flex-col rounded-md space-y-3 border border-black'>
						<div className='w-full p-4 flex justify-between'>
							<div className='text-2xl font-bold'>Planning</div>
							<Button size='icon' onClick={() => setOpen(true)}>
								+
							</Button>
						</div>
						<Separator />
						<div className='w-full p-4 rounded-md flex justify-between'>
							{(isPending || deleting) && <Loader />}
							{error && (
								<Alert variant='destructive' className='w-full'>
									<RiAlertLine className='h-4 w-4' />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										{
											'Something went wrong. Please check your login and try again.'
										}
									</AlertDescription>
								</Alert>
							)}
							{data && (
								<div className='flex flex-col space-y-3 w-full'>
									{!isEditing &&
										data.plans.map(plan => (
											<PlansItems
												refetch={refetch}
												key={plan.id}
												plan={plan}
												onEdit={() => onEdit(plan)}
												onDelete={() => onDelete(plan.id)}
											/>
										))}
									{isEditing && (
										<TaskForm
											title={current?.title}
											isEdit
											onClose={() => setIsEditing(false)}
											handler={
												onUpdate as (
													values: z.infer<typeof taskSchema>
												) => Promise<void | null>
											}
										/>
									)}
								</div>
							)}
						</div>
					</div>

					<div className='flex flex-col rounded-md space-y-3 relative w-full'>
						{data && (
							<div className='p-4 h-24 relative rounded-md border border-black'>
								<div className='text-2xl font-bold'>TotalWeek</div>
								<div className='text-2xl'>{formatData(data.weekTotal)}</div>
							</div>
						)}{' '}
						{data && (
							<div className='p-4 h-24 relative rounded-md border border-black'>
								<div className='text-2xl font-bold'>TotalMonth</div>
								<div className='text-2xl'>{formatData(data.monthTotal)}</div>
							</div>
						)}{' '}
						{data && (
							<div className='p-4 h-24 relative rounded-md border border-black'>
								<div className='text-2xl font-bold'>TotalTime</div>
								<div className='text-2xl'>{formatData(data.total)}</div>
							</div>
						)}
					</div>
				</div>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger />
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create New Plan</DialogTitle>
					</DialogHeader>
					<Separator />
					<TaskForm handler={onAdd} />
				</DialogContent>
			</Dialog>
		</>
	)
}
