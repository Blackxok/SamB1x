import { FaGithub, FaGoogle } from 'react-icons/fa'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export default function SocialMedia() {
	return (
		<>
			<Separator className='my-3' />
			<div className='grid grid-cols-2 gap-3'>
				<Button>
					<FaGithub />
					<span>Sign in with Github</span>
				</Button>
				<Button>
					<FaGoogle />
					<span>Sign in with Google</span>
				</Button>
			</div>
		</>
	)
}
