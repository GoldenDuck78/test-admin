import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  required,
  CreateProps,
  Toolbar,
  SaveButton,
  useNotify,
  useRedirect,
  useCreate,
} from 'react-admin';
import Typography from '@mui/material/Typography';
import { JSX } from 'react/jsx-runtime';

import productApiClient from '../providers/product';

const CustomProductCreate = (props: JSX.IntrinsicAttributes & CreateProps<any, Error, any>) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [create] = useCreate('products'); // Use the useCreate hook for 'products'

  const handleSave = async (values: any) => {
    try {
      await create('products',{ data: values });
      await productApiClient.postProduct(values);
      notify('Product created successfully');
      redirect('list', 'products');
    } catch (error) {
      notify('Error creating product');
      console.error('Error creating product:', error);
    }
  };

  return (
    <Create {...props}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          marginBottom: '1em',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Create a New Product
      </Typography>
      <SimpleForm
        onSubmit={handleSave}
        sx={{
          maxWidth: '600px',
          margin: 'auto',
          padding: '2em',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
        }}
        toolbar={
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: '1em',
              gap: '1em',
            }}
          >
            <SaveButton
              sx={{
                backgroundColor: '#4caf50',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
                fontWeight: 'bold',
                padding: '0.5em 1em',
                borderRadius: '8px',
                textTransform: 'uppercase',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            />
          </Toolbar>
        }
      >
        <TextInput source="title" label="Title" validate={required()} />
        <TextInput source="description" label="Description" />
        <NumberInput source="price" label="Price" validate={required()} />
        <NumberInput source="discountPercentage" label="Discount Percentage" validate={required()} />
        <NumberInput source="rating" label="Rating" validate={required()} />
        <NumberInput source="stock" label="Stock" validate={required()} />
    
        <TextInput source="thumbnail" label="Thumbnail" />
      </SimpleForm>
    </Create>
  );
};

export default CustomProductCreate;
