import { auth } from '@/firebase/fb_init'
import { useUserState } from '@/stores/user.store'
import { LogOut } from 'lucide-react'
import { LuLoader2 } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function UserBox() {
	const { user, setUser } = useUserState()
	const navigate = useNavigate()

	!user && <LuLoader2 className='animate-spin' />

	const handleLogout = () => {
		auth.signOut().then(() => {
			setUser(null)
			navigate('/')
			window.location.reload()
		})
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className='cursor-pointer'>
					<AvatarImage src={user?.photoURL!} />
					<AvatarFallback className='uppercase'>{user?.email![0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-80' align='start' alignOffset={11} forceMount>
				<div className='flex flex-col space-y-4 p-2'>
					<p className='text-xs font-medium leading-none'>{user?.email}</p>
					<div className='flex items-center gap-x-2'>
						<div className='rounded-md p-1'>
							<Avatar>
								<AvatarImage src={user?.photoURL!} />
								<AvatarFallback className='uppercase'>{user?.email![0]}</AvatarFallback>
							</Avatar>
						</div>

						<div className='space-y-1'>
							<p className='line-clamp-1 text-xs font-medium leading-none'>
								{user?.displayName ?? user?.email}
							</p>
						</div>
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
						<LogOut className='w-4 h-4 mr-2' />
						<span>Sign out</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
