import {
	ActionFunctionArgs,
	Form,
	Link,
	LoaderFunctionArgs,
	redirect,
	useActionData,
	useLoaderData
} from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import FormButton from "../../components/FormButton";
import ProductForm from "../../components/ProductForm";
import availabilityOptions from "../../data";
import { getProductById, updateProduct } from "../../services/ProductService";
import type { Product } from "../../types";

export async function loader({ params }: LoaderFunctionArgs) {
	if (params.id) {
		const product = await getProductById(Number(params.id));
		if (!product) return redirect("/");
		return product;
	}
}

export async function action({ request, params }: ActionFunctionArgs) {
	const data = Object.fromEntries(await request.formData());
	if (Object.values(data).includes("")) {
		return "Todos los campos son obligatorios";
	}
	if (params.id) {
		await updateProduct(data, Number(params.id));
	}
	return redirect("/");
}

export default function EditProduct() {
	const error = useActionData() as string;
	const product = useLoaderData() as Product;

	return (
		<>
			<div className="flex justify-between">
				<h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
				<Link
					to="/"
					className="rounded-md bg-indigo-600 p-3 text-sm text-white font-bold shadow-sm hover:bg-indigo-500">
					Volver a Productos
				</Link>
			</div>
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<Form className="mt-10" method="POST">
				<ProductForm product={product} />
				<div className="mb-4">
					<label className="text-gray-800" htmlFor="availability">
						Disponibilidad:
					</label>
					<select
						id="availability"
						className="mt-2 block w-full p-3 bg-gray-50 appearance-none"
						name="availability"
						defaultValue={product?.availability.toString()}>
						{availabilityOptions.map(option => (
							<option key={option.name} value={option.value.toString()}>
								{option.name}
							</option>
						))}
					</select>
				</div>
				<FormButton text="Editar Producto" />
			</Form>
		</>
	);
}
