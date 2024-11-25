import TaskForm from '@/components/forms/taskForm'
import PlansItems from '@/components/shared/plansItems'
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
import { useUserState } from '@/stores/user.store'
import { addDoc, collection } from 'firebase/firestore/lite'
import { useState } from 'react'
import { z } from 'zod'

export default function Dashboard() {
	const [open, setOpen] = useState(false)
	const { user } = useUserState()

	const onAdd = async ({ title }: z.infer<typeof taskSchema>) => {
		if (!user) return null

		return addDoc(collection(db, 'plans'), {
			title,
			createdAt: new Date(),
			startTime: null,
			endTime: null,
			userId: user.uid,
			status: 'unstarted',
		}).then(() => setOpen(false))
	}

	return (
		<>
			<div className='h-screen max-w-6xl mx-auto flex items-center'>
				<div className='grid grid-cols-2 w-full gap-8 items-center'>
					{/* Left Section (Plan list) */}
					<div className='flex flex-col rounded-md space-y-3 border border-black'>
						<div className='w-full p-4 flex justify-between'>
							<div className='text-2xl font-bold'>Planning</div>
							<Button size='icon' onClick={() => setOpen(true)}>
								+
							</Button>
						</div>
						<Separator />
						<div className='w-full p-4 rounded-md flex justify-between'>
							<div className='flex flex-col space-y-3 w-full'>
								{Array.from({ length: 3 }).map((_, index) => (
									<PlansItems key={index} /> // Add unique key for each item
								))}
							</div>
						</div>
					</div>

					{/* Right Section (Some other items) */}
					<div className='flex flex-col rounded-md space-y-3 relative w-full'>
						{['Some', 'Some', 'Some'].map((title, index) => (
							<div
								key={index}
								className='p-4 h-24 relative rounded-md border border-black'
							>
								<div className='text-2xl font-bold'>{title}</div>
								<div className='text-2xl'>20:20:20</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Dialog for TaskForm */}
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
