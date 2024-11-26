import { db } from '@/firebase/fb_init'
import { IPlan, IPlanData } from '@/types/types'
import { QueryObserverResult } from '@tanstack/react-query'
import { doc, updateDoc } from 'firebase/firestore/lite'
import { CirclePause, CirclePlay, Edit, RefreshCw, Trash } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ImCheckboxChecked } from 'react-icons/im'
import { MdOnlinePrediction } from 'react-icons/md'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import Loader from './loader'

interface Props {
	plan: IPlan
	onEdit: () => void
	onDelete: () => void
	refetch: () => Promise<QueryObserverResult<IPlanData, Error>>
}

export default function PlansItems({ plan, onEdit, onDelete, refetch }: Props) {
	const [loading, setLoading] = useState(false)

	const activeColors = useMemo(() => {
		switch (plan.status) {
			case 'un_started':
				return 'text-blue-500'
			case 'in_progress':
				return 'text-green-500'
			case 'paused':
				return 'text-red-500'
		}
	}, [plan.status])

	const onStart = async () => {
		setLoading(true)
		const ref = doc(db, 'plans', plan.id)
		try {
			await updateDoc(ref, {
				status: 'in_progress',
				startTime: Date.now(),
			})
			refetch()
		} catch (error) {
			toast.error('Error!!!')
		} finally {
			setLoading(false)
		}
	}
	const onPause = async () => {
		setLoading(true)
		const ref = doc(db, 'plans', plan.id)
		try {
			const el = plan.startTime ? Date.now() - plan.startTime : 0
			const newTT = (plan.totalTime || 0) + el
			await updateDoc(ref, {
				status: 'paused',
				endTime: Date.now(),
				totalTime: newTT,
			})
			refetch()
		} catch (error) {
			toast.error('Error!!!')
		} finally {
			setLoading(false)
		}
	}
	const renderB = () => {
		switch (plan.status) {
			case 'un_started':
				return (
					<Button size={'icon'} onClick={onStart}>
						<CirclePlay />
					</Button>
				)
			case 'in_progress':
				return (
					<Button size={'icon'} onClick={onPause}>
						<CirclePause />
					</Button>
				)
			case 'paused':
				return (
					<Button size={'icon'} onClick={onStart}>
						<RefreshCw />
					</Button>
				)
			default:
				return null
		}
	}

	return (
		<Card className='w-full p-4 shadow-md grid grid-cols-4 items-center relative'>
			{loading && <Loader />}
			<div className='flex gap-1 items-center col-span-2 '>
				<ImCheckboxChecked />
				<span className='capitalize'>{plan.title}</span>
			</div>
			<div className='flex gap-1 items-center '>
				<MdOnlinePrediction className={activeColors} />
				<span>{plan.status}</span>
			</div>
			<div className='w-full flex gap-1 items-center justify-self-end'>
				{renderB()}
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
