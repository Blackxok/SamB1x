import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Dashboard() {
	return (
		<div className='h-screen max-w-6xl mx-auto flex items-center '>
			<div className='grid grid-cols-2 w-full gap-8 '>
				<div className='flex flex-col rounded-md space-y-3 border border-black'>
					<div className='w-full p-4  flex justify-between '>
						<div className='text-2xl font-bold'>Planing</div>
						<Button size={'icon'}>+</Button>
					</div>
					<Separator />
					<div className='w-full p-4 rounded-md flex justify-between'>
						<div className='flex flex-col space-y-3'>
							put in here TaskItem map()
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
