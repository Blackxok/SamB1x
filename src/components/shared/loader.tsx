import { LuLoader2 } from 'react-icons/lu'
import { Skeleton } from '../ui/skeleton'

export default function Loader() {
	return (
		<Skeleton className='absolute inset-0 flex items-center justify-center w-full h-full opacity-15 z-10 bg-slate-200'>
			<LuLoader2 className='animate-spin w-10 h-10' />
		</Skeleton>
	)
}
