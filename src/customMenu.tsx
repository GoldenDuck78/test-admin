import { Menu, MenuItemLink, MenuProps } from 'react-admin';
import {  ListAlt, AttachMoney, Group } from '@mui/icons-material'; // Example icons
import { JSX } from 'react/jsx-runtime';

const MyCustomMenu = (props: JSX.IntrinsicAttributes & MenuProps) => (
    <Menu {...props}>
        <MenuItemLink to="/products" primaryText="Products" leftIcon={<ListAlt />} />
        <MenuItemLink to="/tours" primaryText="Tours" leftIcon={<ListAlt />} />
        <MenuItemLink to="/customers" primaryText="Customers" leftIcon={<Group />} />
        <MenuItemLink to="/revenue" primaryText="Revenue" leftIcon={<AttachMoney />} />
    </Menu>
);

export default MyCustomMenu;
