import { taskSchema } from '@/lib/validation'
import { useUserState } from '@/stores/user.store'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import Loader from '../shared/loader'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface Props {
	title?: string
	isEdit?: boolean
	onClose?: () => void
	handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>
}

export default function TaskForm({ title = '', handler }: Props) {
	const [loading, setLoading] = useState(false)
	const { user } = useUserState()

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title,
		},
	})

	const onSubmit = async (values: z.infer<typeof taskSchema>) => {
		if (!user) return

		setLoading(true)

		try {
			const promise = handler(values).finally(() => {
				setLoading(false)
			})

			toast.promise(promise, {
				loading: 'Loading...',
				success: 'Plan created successfully!',
				error: 'Failed to create plan!',
			})

			await promise
			form.reset()
		} catch (error) {
			console.error('Error creating plan:', error)
			toast.error('Failed to create plan!')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Form {...form}>
			{loading && <Loader />}
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder='Enter new plan'
									disabled={loading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex justify-end mt-4'>
					<Button type='submit' disabled={loading}>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	)
}
