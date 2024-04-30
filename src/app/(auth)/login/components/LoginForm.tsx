'use client';

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import Button from '@/components/Button';
import Input from '@/components/Input';
import GoogleIcon from '@/components/icons/GoogleIcon';
import GitHubIcon from '@/components/icons/GitHubIcon';

type LoginFormInputs = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const router = useRouter();
	const { status } = useSession();
	const [otpId, setOtpId] = useState(false);
	const [mobile, setMobile] = useState('');
	const [otp, setOtp] = useState('');

	const {
		register: registerEmail,
		handleSubmit: handleSubmitEmail,
		// formState: { errors },
	} = useForm<LoginFormInputs>();

	if (status === 'authenticated') {
		router.push('/');
	}

	const handleEmailLogin: SubmitHandler<LoginFormInputs> = async values => {
		await signIn('email', {
			email: values.email,
			password: values.password,
			redirect: false,
		});
		router.push('/dashboard');
	};

	const handleSendOtp = async () => {
		try {
			const { status, data } = await axios.post('/api/send-otp', {
				mobile,
			});
			if (status === 200 || (status === 201 && data?.id)) {
				toast.success('OTP Sent');
				setOtpId(data.id);
				console.log({ data });
			}
		} catch (error) {
			toast.error('Error sending OTP');
			console.error(error);
		}
	};

	const handleOtpLogin = async () => {
		await signIn('otp', {
			otp,
			otpId,
			mobile,
			redirect: false,
		});
		router.push('/dashboard');
	};

	return (
		<div className="p-6 rounded-lg border flex-col border-slate-100 shadow-lg w-96 flex justify-center gap-y-3">
			Login with OAuth
			<Button className="w-full shadow-sm text-zinc-700 bg-white border border-zinc-200 hover:bg-zinc-100 active:bg-zinc-200" onClick={() => signIn('google')}>
				Sign in with Google <GoogleIcon />
			</Button>
		</div>
	);
};

export default LoginForm;
