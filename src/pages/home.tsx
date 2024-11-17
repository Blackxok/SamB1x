import Plan from '@/assets/plan.jpg'
import { Button } from '@/components/ui/button'
import { iconS } from '@/constants'

export default function Home() {
	return (
		<>
			<div className='w-full h-screen flex items-center'>
				<div className='max-w-xl ml-60 flex-col justify-center'>
					<h1 className='text-9xl font-semibold uppercase'>Plan with me</h1>
					<p className='text-lg text-gray-700 mt-5'>
						I'm here to help you plan your next big idea, from brainstorming to
						execution. Let's get started.
					</p>
					<Button className='w-32 h-12  text-white font-semibold tracking-wider mt-5'>
						Start planning
					</Button>

					<div className='mt-5'>
						<p className='text-muted-foreground'>AS FEATURED IN</p>
						<div className='flex items-center gap-4'>
							{iconS.map((Icon, index) => (
								<Icon key={index} className='w-12 h-12' />
							))}
						</div>
					</div>
				</div>
				<img
					src={Plan}
					alt='Plan'
					className='w-74 h-64 rounded-lg shadow-lg text-white'
					style={{ width: '500px', height: 'min-content' }}
				/>
			</div>
		</>
	)
}
