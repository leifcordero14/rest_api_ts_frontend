interface FormButtonProps {
	text: string;
}

export default function FormButton({ text }: FormButtonProps) {
	return (
		<button
			type="submit"
			className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg rounded">
			{text}
		</button>
	);
}
