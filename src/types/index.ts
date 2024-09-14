import { FormEvent } from "react";
import { InferOutput } from "valibot";
import { ProductSchema } from "../schemas";

export type Product = InferOutput<typeof ProductSchema>;

export interface AvailabilityOptions {
	name: string;
	value: boolean;
}

export type FormSubmitEvent = FormEvent<HTMLFormElement>;
