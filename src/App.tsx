import { Admin, Resource, ListGuesser, ShowGuesser, CustomRoutes } from "react-admin";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./Layout";
import { getDataProvider } from "./providers/dataProvider";
import { authProvider } from "./authProvider";
import RevenuePage from "./pages/RevenuePage";
import CustomProductCreate from "./pages/CreateProducts";
import CustomEditProduct from "./pages/EditProducts";
import CustomProductList from "./pages/ListViewProducts";
import CustomProductShow from "./pages/DetailProduct";

export const App = () => (
  <Router>
    <Admin
      layout={Layout}
      dataProvider={getDataProvider()}
      authProvider={authProvider}>
      <CustomRoutes>
        <Route path="/revenue" element={<RevenuePage/>} />
      </CustomRoutes>
      <Resource
        name="products"
        list={CustomProductList}
        edit={CustomEditProduct}
        create={CustomProductCreate}
        show={CustomProductShow}
      />
      <Resource
        name="tours"
        list={ListGuesser}
        hasCreate={false}
        hasEdit={false}
        show={ShowGuesser}
      />
      <Resource
        name="customers"
        list={ListGuesser}
        show={ShowGuesser}
        hasCreate={false}
        hasEdit={false}
      />
    </Admin>
  </Router>
);
