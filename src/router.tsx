import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { action as deleteProductAction } from "./components/ProductDetails";
import Layout from "./layouts/Layout";
import EditProduct, {
	action as editProductAction,
	loader as editProductLoader
} from "./layouts/views/EditProduct";
import NewProduct, { action as newProductAction } from "./layouts/views/NewProduct";
import Products, {
	loader as productsLoader,
	action as updateAvailabilityAction
} from "./layouts/views/Products";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route
				index
				element={<Products />}
				loader={productsLoader}
				action={updateAvailabilityAction}
			/>
			<Route path="productos/nuevo" element={<NewProduct />} action={newProductAction} />
			<Route
				path="productos/:id/editar"
				element={<EditProduct />}
				loader={editProductLoader}
				action={editProductAction}></Route>
			<Route path="productos/:id/eliminar" action={deleteProductAction}></Route>
		</Route>
	)
);

export default router;
