'use client'

import { z } from 'zod'

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters long')
		.max(64, 'Password must not exceed 64 characters')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/\d/, 'Password must contain at least one number')
		.refine(
			password => !/\s/.test(password),
			'Password must not contain spaces'
		),
})

export const registerSchema = z
	.object({
		email: z.string().email('Invalid email address'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long')
			.max(64, 'Password must not exceed 64 characters')
			.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
			.regex(/\d/, 'Password must contain at least one number')
			.refine(
				password => !/\s/.test(password),
				'Password must not contain spaces'
			),
		confirmPassword: z.string().min(1, 'Confirm password is required'), // IS password is not empty??...
	})
	.refine(data => data.confirmPassword === data.password, {
		message: 'Confirm password do not much',
		path: ['confirmPassword'],
	})

export const taskSchema = z.object({
	title: z.string().min(5),
})
