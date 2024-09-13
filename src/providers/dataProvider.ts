import axios from 'axios';
import fakeRestDataProvider from 'ra-data-fakerest';

const apiProducts = 'http://localhost/api/products.php';
const apiTours = 'http://localhost/t_api/tours.php';
const apiCustomer = 'http://localhost/api2/customer.php';

let dataProvider: ReturnType<typeof fakeRestDataProvider>;
let globalData: any = {};

async function fetchData() {
    try {
        const [productsResponse, toursResponse, customerResponse] = await Promise.all([
            axios.get(apiProducts),
            axios.get(apiTours),
            axios.get(apiCustomer)
        ]);

        const productsData = productsResponse.data;
        const toursData = toursResponse.data;
        const customerData = customerResponse.data;

        globalData = {
            products: productsData.map((product: Record<string, unknown>) => {
                const { images, ...rest } = product;
                return rest;
            }),
            tours: toursData.tours.map((tour: Record<string, unknown>) => { 
                const { cust_id, ...rest } = tour; 
                return { customer_id: cust_id, ...rest }; 
            }),
            customers: customerData.map((customer: Record<string, unknown>) => {
                return customer;
            })
        };

        dataProvider = fakeRestDataProvider(globalData, process.env.NODE_ENV !== 'test', 300);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

await fetchData();

export const getDataProvider = () => dataProvider;

export const updateDataProvider = async (resource: string, data: any) => {
    if (globalData[resource]) {
        const index = globalData[resource].findIndex((item: any) => item.id == data.id);
        if (index !== -1) {
            globalData[resource][index] = data;
        } else {
            globalData[resource].push(data);
        }
    } else {
        globalData[resource] = [data];
    }
    dataProvider = fakeRestDataProvider(globalData, process.env.NODE_ENV !== 'test', 300);
};
