import { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import CreateListingForm from "../components/CreateListingForm";
import UserListings from "../components/UserListings";
import useCheckAuth from "../hooks/useCheckAuth";
import RequireAuth from "../components/RequireAuth";

const UserListingPage = () => {
    const store = useCheckAuth();
    const [tabIndex, setTabIndex] = useState(0);

    if (!store.isAuth) {
        return (
        <RequireAuth text="Пожалуйста, авторизируйтесь, чтобы получить доступ к объявлениям" />
        );
    }

   return (
    <Box > 
      <Box
        sx={{
          width: "100%",
          bgcolor: "white",
          height: "80px",
          mb: '50px'
        }}
      >
        <Box sx={{  mx: "auto", py: 2,  }}>
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
            textColor="inherit"
            centered
            sx={{
              '& .Mui-selected': {
                color: 'black', 
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'black', 
              },
          }}
          >
            <Tab label="Создать объявление" />
            <Tab label="Мои объявления" />
          </Tabs>
        </Box>
        <Divider />
      </Box>

      <Box>
        {tabIndex === 0 && <CreateListingForm setTabIndex={setTabIndex}/>}
        {tabIndex === 1 && <UserListings />}
      </Box>
    </Box>
  );
};

export default UserListingPage;
