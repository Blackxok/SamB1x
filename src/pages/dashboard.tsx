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

export default function Dashboard() {
	return (
		<div className='h-screen max-w-6xl mx-auto flex items-center '>
			<div className='grid grid-cols-2 w-full gap-8 items-center'>
				<div className='flex flex-col rounded-md space-y-3 border border-black'>
					<div className='w-full p-4  flex justify-between '>
						<div className='text-2xl font-bold'>Planing</div>
						<Dialog>
							<DialogTrigger>
								<Button size={'icon'}>+</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Are you absolutely sure?</DialogTitle>
								</DialogHeader>
								<Separator />
								<TaskForm />
							</DialogContent>
						</Dialog>
					</div>
					<Separator />
					<div className='w-full p-4 rounded-md flex justify-between'>
						<div className='flex flex-col space-y-3 w-full'>
							{Array.from({ length: 3 }).map((i, j) => (
								<PlansItems />
							))}
						</div>
					</div>
				</div>
				<div className='flex flex-col rounded-md space-y-3  relative w-full'>
					<div className='p-4 h-24 relative rounded-md border border-black'>
						<div className='text-2xl font-bold'>Some</div>
						<div className='text-2xl'>20:20:20</div>
					</div>
					<div className='p-4 h-24 relative rounded-md border border-black'>
						<div className='text-2xl font-bold'>Some</div>
						<div className='text-2xl'>20:20:20</div>
					</div>
					<div className='p-4 h-24 relative rounded-md border border-black'>
						<div className='text-2xl font-bold'>Some</div>
						<div className='text-2xl'>20:20:20</div>
					</div>
				</div>
			</div>
		</div>
	)
}
