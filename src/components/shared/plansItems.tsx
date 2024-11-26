import { IPlan } from '@/types/types'
import { CirclePlay, Edit, Trash } from 'lucide-react'
import { ImCheckboxChecked } from 'react-icons/im'
import { MdOnlinePrediction } from 'react-icons/md'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface Props {
	plan: IPlan
	onEdit: () => void
	onDelete: () => void
}

export default function PlansItems({ plan, onEdit, onDelete }: Props) {
	return (
		<Card className='w-full p-4 shadow-md grid grid-cols-4 items-center relative'>
			<div className='flex gap-1 items-center col-span-2 '>
				<ImCheckboxChecked />
				<span className='capitalize'>{plan.title}</span>
			</div>
			<div className='flex gap-1 items-center '>
				<MdOnlinePrediction />
				<span>{plan.status}</span>
			</div>
			<div className='w-full flex gap-1 items-center justify-self-end'>
				<Button size={'icon'}>
					<CirclePlay />
				</Button>{' '}
				<Button size={'icon'} onClick={onEdit}>
					<Edit />
				</Button>{' '}
				<Button size={'icon'} onClick={onDelete}>
					<Trash />
				</Button>
			</div>
		</Card>
	)
}
