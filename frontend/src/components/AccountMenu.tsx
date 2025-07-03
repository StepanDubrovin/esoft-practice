import { Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";
import { useAppDispatch } from "../hooks/hooks";
import { IAccountMenu } from "../interfaces/IAccountMenu";


export default function AccountMenu ({ anchorEl, open, onClose }: IAccountMenu) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    onClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    onClose();
  };
  const handleMyListing = () => {
    navigate('/userListings');
    onClose();
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    > 
      <MenuItem onClick={handleMyListing}>Мои объявления</MenuItem>
      <MenuItem onClick={handleProfile}>Мой профиль</MenuItem>
      <MenuItem onClick={handleLogout}>Выход</MenuItem>
    </Menu>
  );
};
