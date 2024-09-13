import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  required,
  EditProps,
  Toolbar,
  SaveButton,
  useNotify,
  useRedirect,
  useUpdate,
  useGetRecordId,
  useRefresh,
} from 'react-admin';
import { updateDataProvider } from '../providers/dataProvider';
import productApiClient from '../providers/product';


const CustomEditProduct = (props: JSX.IntrinsicAttributes & EditProps) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const refresh = useRefresh();
  const recordId = useGetRecordId();
  const [update] = useUpdate('products');

  const handleSave = async (values: any) => {
    try {
      // Use the update function from useUpdate hook
      await update('products',{ id: recordId, data: values });
      await productApiClient.putProduct({...values , id : recordId})
      notify('Product updated successfully');
      // Optionally, you can use a custom data provider update if needed
      // await updateDataProvider('products', { ...values, id: recordId });

      redirect('list', 'products');
      refresh();
    } catch (error) {
      notify('Error updating product');
      console.error('Error updating product:', error);
    }
  };

  return (
    <Edit {...props}>
      <SimpleForm
        onSubmit={handleSave}
        sx={{
          maxWidth: 600,
          margin: 'auto',
          padding: '1em',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        toolbar={
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <SaveButton
              sx={{
                backgroundColor: '#4caf50',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
              }}
            />
          </Toolbar>
        }
      >
        <TextInput source="id" label="ID" disabled />
        <TextInput source="title" label="Title" validate={required()} />
        <TextInput source="description" label="Description" />
        <NumberInput source="price" label="Price" validate={required()} />
        <NumberInput source="discountPercentage" label="Discount Percentage" validate={required()} />
        <NumberInput source="rating" label="Rating" validate={required()} />
        <NumberInput source="stock" label="Stock" validate={required()} />
        <TextInput source="thumbnail" label="Thumbnail" />
      </SimpleForm>
    </Edit>
  );
};

export default CustomEditProduct;
