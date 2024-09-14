import { ActionFunctionArgs, Form, Link, redirect, useFetcher } from "react-router-dom";
import { deleteProduct } from "../services/ProductService";
import type { FormSubmitEvent, Product } from "../types";
import { formatCurrency } from "../utils";

interface ProductDetailsProps {
	product: Product;
}

export async function action({ params }: ActionFunctionArgs) {
	if (params.id) {
		await deleteProduct(Number(params.id));
	}
	return redirect("/");
}

function handleSubmit(evt: FormSubmitEvent) {
	if (!confirm("¿Eliminar?")) evt.preventDefault();
}

export default function ProductDetails({ product }: ProductDetailsProps) {
	const fetcher = useFetcher();
	const isAvailable = product.availability;

	return (
		<tr className="border-b text-center">
			<td className="p-3 text-lg text-gray-800">{product.name}</td>
			<td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
			<td className="p-3 text-lg text-gray-800">
				<fetcher.Form method="POST">
					<button
						type="submit"
						name="id"
						value={product.id}
						className={`${
							isAvailable ? "text-black " : "text-red-600"
						} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100`}>
						{isAvailable ? "Disponible" : "No Disponible"}
					</button>
				</fetcher.Form>
			</td>
			<td className="p-3 text-lg text-gray-800 ">
				<div className="flex gap-2 items-center">
					<Link
						to={`productos/${product.id}/editar`}
						className="bg-indigo-600 text-white rounded-lg w-full p-2 font-bold text-xs">
						EDITAR
					</Link>
					<Form
						className="w-full"
						method="DELETE"
						action={`productos/${product.id}/eliminar`}
						onSubmit={handleSubmit}>
						<button
							type="submit"
							className="bg-red-600 text-white rounded-lg w-full p-2 font-bold text-xs">
							ELIMINAR
						</button>
					</Form>
				</div>
			</td>
		</tr>
	);
}
