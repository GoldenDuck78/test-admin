import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  NumberField,
  ImageField,
  FunctionField,
  useNotify,
  useDataProvider,
  useRefresh,
  ListProps,
} from 'react-admin';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { JSX } from 'react/jsx-runtime';
import productApiClient from '../providers/product';



const CustomProductList = (props: JSX.IntrinsicAttributes & ListProps<any>) => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();

  const handleDelete = async (id: any) => {
    try {
      await dataProvider.delete('products', { id });
      await productApiClient.deteleProduct({ id : id});
      notify('Product deleted successfully');
      refresh(); // Refresh the list after deletion
    } catch (error) {
      notify('Error deleting product');
      console.error('Error deleting product:', error);
    }
  };



  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" label="ID" />
        <TextField source="title" label="Title" />
        <TextField source="description" label="Description" />
        <NumberField source="price" label="Price" />
        <NumberField source="discountPercentage" label="Discount Percentage" />
        <NumberField source="rating" label="Rating" />
        <NumberField source="stock" label="Stock" />
        <ImageField source="thumbnail" label="Thumbnail" />

        <FunctionField
          label="Actions"
          render={(record) => (
            <div>
              <IconButton onClick={() => handleDelete(record.id)} color="error">
                <Delete />
              </IconButton>
            </div>
          )}
        />
      </Datagrid>
    </List>
  );
};

export default CustomProductList;
