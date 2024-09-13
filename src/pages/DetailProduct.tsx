import React from 'react';
import {
  Show,
  SimpleShowLayout,
  TextField,
  NumberField,
  SelectField,
  ImageField,
  ShowProps,
  useNotify,
  useDataProvider,
  useRefresh,
  useGetRecordId,
} from 'react-admin';
import { IconButton, Dialog, DialogContent, DialogTitle, Button, Box } from '@mui/material';
import { Delete, Visibility } from '@mui/icons-material';

// Predefined options for categories and brands


const CustomProductShow = (props: ShowProps) => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const refresh = useRefresh();
  const recordId = useGetRecordId();
  const [open, setOpen] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState('');
  const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

  const handleDelete = async () => {
    try {
      await dataProvider.delete('products', { id: recordId });
      notify('Product deleted successfully');
      refresh(); // Refresh the list view after deletion
    } catch (error) {
      notify('Error deleting product');
      console.error('Error deleting product:', error);
    }
    setConfirmDeleteOpen(false);
  };

  const handleOpenThumbnail = (thumbnail: string) => {
    setThumbnail(thumbnail);
    setOpen(true);
  };

  const handleCloseThumbnail = () => {
    setOpen(false);
    setThumbnail('');
  };

  const handleOpenConfirmDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const handleCloseConfirmDelete = () => {
    setConfirmDeleteOpen(false);
  };

  return (
    <>
      <Show {...props}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            padding: '2em',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '1200px',
            margin: 'auto',
            gap: '1em',
          }}
        >
          {/* Left Column: Image and Title */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingRight: '1em',
              borderRight: '1px solid #e0e0e0',
              gap: '1em',
            }}
          >
            <ImageField
              source="thumbnail"
              label="Thumbnail"
              sx={{
                width: '100%',
                maxWidth: '300px',
                height: 'auto',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            />
            <TextField
              source="title"
              label="Title"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.2em',
                textAlign: 'center',
              }}
            />
          </Box>

          {/* Right Column: Product Details */}
          <Box sx={{ flex: 2, paddingLeft: '1em' }}>
            <SimpleShowLayout>
              <TextField source="id" label="ID" />
              <TextField source="description" label="Description" />
              <NumberField source="price" label="Price" />
              <NumberField source="discountPercentage" label="Discount Percentage" />
              <NumberField source="rating" label="Rating" />
              <NumberField source="stock" label="Stock" />
            </SimpleShowLayout>
            <Box sx={{ marginTop: '2em', textAlign: 'right' }}>
              <IconButton
                onClick={handleOpenConfirmDelete}
                color="secondary"
                sx={{ marginRight: '1em', borderRadius: '8px', backgroundColor: '#f8d7da', '&:hover': { backgroundColor: '#f5c6cb' } }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Show>

      <Dialog open={open} onClose={handleCloseThumbnail}>
        <DialogTitle>Product Thumbnail</DialogTitle>
        <DialogContent>
          <img src={thumbnail} alt="Product Thumbnail" style={{ width: '100%', maxHeight: '500px', borderRadius: '8px' }} />
        </DialogContent>
        <Button onClick={handleCloseThumbnail} color="primary" variant="contained">
          Close
        </Button>
      </Dialog>

      <Dialog open={confirmDeleteOpen} onClose={handleCloseConfirmDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1em' }}>
          <Button onClick={handleCloseConfirmDelete} color="primary" variant="outlined" sx={{ marginRight: '1em' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" variant="contained">
            Delete
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default CustomProductShow;
