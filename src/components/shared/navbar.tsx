import { navLinks } from '@/constants'
import { useUserState } from '@/stores/user.store'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import UserBox from './userBox'

export default function Navbar() {
	const { user } = useUserState()

	return (
		<div className='w-full h-[10vh] border-b fixed inset-0 z-50 bg-background'>
			<div className='container max-w-6xl mx-auto h-full flex justify-between items-center'>
				<Link to={'/'}>
					<h1 className='text-21xl font-bold'>PLAN</h1>
				</Link>
				<div className='flex items-center gap-3'>
					{navLinks.map(link => (
						<a
							key={link.path}
							href={link.path}
							className='font-medium hover:underline text-black'
						>
							{link.label}
						</a>
					))}
					{user ? (
						<UserBox />
					) : (
						<Link to={'/auth'}>
							<Button variant={'secondary'} className='bg-gray-300'>
								Join free
							</Button>
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
