import { Button } from '@/components/ui/button'
import { iconS } from '@/constants'
import { Link } from 'react-router-dom'

export default function Home() {
	return (
		<>
			<div className='w-full h-screen flex items-center justify-center'>
				<div className='text-center justify-center'>
					<h1 className='text-9xl font-semibold uppercase'>Plan with me</h1>
					<p className='text-lg text-gray-700 mt-5'>
						I'm here to help you plan your next big idea, from brainstorming to
						execution. Let's get started.
					</p>
					<Link to={'/dashboard'}>
						<Button className='w-32 h-12  text-white font-semibold tracking-wider mt-5'>
							Start planning
						</Button>
					</Link>

					<div className='mt-5 '>
						<p className='mb-5 text-muted-foreground'>AS FEATURED IN</p>
						<div className='flex items-center justify-center gap-4'>
							{iconS.map((Icon, index) => (
								<Icon key={index} className='w-12 h-12' />
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
