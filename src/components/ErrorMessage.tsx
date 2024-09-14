import { ReactNode } from "react";

interface ErrorMessageProps {
	children: ReactNode;
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
	return (
		<div className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase">
      {children}
    </div>
	);
}
