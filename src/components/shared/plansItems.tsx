import { CirclePlay, Edit, Trash } from 'lucide-react'
import { ImCheckboxChecked } from 'react-icons/im'
import { MdOnlinePrediction } from 'react-icons/md'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

export default function PlansItems() {
	return (
		<Card className='w-full p-4 shadow-md grid grid-cols-4 items-center relative'>
			<div className='flex gap-1 items-center col-span-2 '>
				<ImCheckboxChecked />
				<span>Completed</span>
			</div>
			<div className='flex gap-1 items-center '>
				<MdOnlinePrediction />
				<span>Un_started</span>
			</div>
			<div className='w-full flex gap-1 items-center justify-self-end'>
				<Button size={'icon'}>
					<CirclePlay />
				</Button>{' '}
				<Button size={'icon'}>
					<Edit />
				</Button>{' '}
				<Button size={'icon'}>
					<Trash />
				</Button>
			</div>
		</Card>
	)
}
