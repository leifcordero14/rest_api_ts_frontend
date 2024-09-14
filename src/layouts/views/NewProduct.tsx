import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import FormButton from "../../components/FormButton";
import ProductForm from "../../components/ProductForm";
import { addProduct } from "../../services/ProductService";

export async function action({ request }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());
	if (Object.values(data).includes("")) {
		return "Todos los campos son obligatorios";
	}
	await addProduct(data);
	return redirect("/");
}

export default function NewProduct() {
	const error = useActionData() as string;

	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
				<Link
					to="/"
					className="rounded-md bg-indigo-600 p-3 text-sm text-white font-bold shadow-sm hover:bg-indigo-500">
					Volver a Productos
				</Link>
			</div>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form className="mt-10" method="POST">
				<ProductForm />
				<FormButton text="Registrar Producto" />
			</Form>
		</>
	);
}
