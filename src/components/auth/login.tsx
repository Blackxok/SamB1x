import { loginSchema } from '@/lib/validation'
import { useAuthState } from '@/stores/auth.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'

export default function Login() {
	const { setAuth } = useAuthState()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		// const { email, password } = values
	}
	return (
		<div className='flex flex-col'>
			<h2 className='text-xl font-bold'>Login</h2>
			<p className='text-muted-foreground mb-3'>
				Don't have an account?!{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => setAuth('register')}
				>
					Sign up
				</span>
			</p>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>Email</FormLabel>
								<FormControl>
									<Input placeholder='example@gmail.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-muted-foreground'>
									Password
								</FormLabel>
								<FormControl>
									<Input placeholder='*****' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='w-full mt-3' type='submit'>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}
