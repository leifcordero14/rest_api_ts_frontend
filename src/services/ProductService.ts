import { safeParse } from "valibot";
import axiosClient from "../axios";
import { DraftProductSchema, ProductSchema, ProductsSchema } from "../schemas";
import type { Product } from "../types";
import { toBoolean } from "../utils";

interface ProductData {
	[key: string]: FormDataEntryValue;
}

export async function addProduct(productData: ProductData) {
	try {
		const result = safeParse(DraftProductSchema, {
			name: productData.name,
			price: Number(productData.price)
		});
		if (result.success) {
			await axiosClient.post("/products", {
				name: result.output.name,
				price: result.output.price
			});
			return;
		}
		throw new Error("Invalid data");
	} catch (error) {
		console.error(error);
	}
}

export async function getProducts() {
	try {
		const { data } = await axiosClient.get("/products");
		const result = safeParse(ProductsSchema, data.data);
		if (result.success) return result.output;
		throw new Error("Error fetching data");
	} catch (error) {
		console.error(error);
	}
}

export async function getProductById(id: Product["id"]) {
	try {
		const { data } = await axiosClient.get(`/products/${id}`);
		const result = safeParse(ProductSchema, data.data);
		if (result.success) return result.output;
		throw new Error("Error fetching data");
	} catch (error) {
		console.error(error);
	}
}

export async function updateProduct(productData: ProductData, id: Product["id"]) {
	try {
		const result = safeParse(ProductSchema, {
			id,
			name: productData.name,
			price: Number(productData.price),
			availability: toBoolean(productData.availability.toString())
		});
		if (result.success) {
			await axiosClient.put(`/products/${id}`, result.output);
			return;
		}
		throw new Error("Error updating product");
	} catch (error) {
		console.error(error);
	}
}

export async function updateAvailability(id: Product["id"]) {
	try {
		await axiosClient.patch(`/products/${id}`);
	} catch (error) {
		console.log(error);
	}
}

export async function deleteProduct(id: Product["id"]) {
	try {
		await axiosClient.delete(`/products/${id}`);
	} catch (error) {
		console.error(error);
	}
}
