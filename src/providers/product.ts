import axios from 'axios';

// Define the API endpoint
const API_URL = 'http://localhost/api/products.php';

class ProductApiClient {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  // Function to send POST data
  public async postProduct(data: any): Promise<any> {
    try {
      const response = await axios.post(this.apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Product created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Function to update product data
  public async putProduct(data: any): Promise<any> {
    try {
      console.log(data)
      const response = await axios.put(`${this.apiUrl}?id=${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Product updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  public async deteleProduct(data : any) : Promise<any>{
    try {
      console.log(data)

      const response = await axios.delete(`${this.apiUrl}?id=${data.id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Product delete successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error delete product:', error);
      throw error;
    }
  }
}

// Create an instance of the class
const productApiClient = new ProductApiClient(API_URL);

export default productApiClient;
