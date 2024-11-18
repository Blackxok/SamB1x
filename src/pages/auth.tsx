import { Card } from '@/components/ui/card'
import { useState } from 'react'

export default function Auth() {
	const [auth, setAuth] = useState()
	return (
		<>
			<div className='w-full h-screen flex items-center justify-center border-[5px] border-red-600'>
				<Card className='p-5 w-1/3'>some thing</Card>
			</div>
		</>
	)
}
