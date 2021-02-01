import React from 'react';
import { Typography } from "@material-ui/core";
import { Customer } from "../common/api-types";
import { useCustomers } from './hooks/api';
import { CustomersTable } from './components/CustomersTable';


function App() {
  const [ response, getData ] = useCustomers();
  React.useEffect(() => {
    getData();
  }, []);

  const customers = response?.data;
  
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', margin: 'auto'}}>
      <Typography align="center" variant="h3" style={{ padding: "30px", fontWeight: "bold"}}>
        Agreement Prices
      </Typography>
      {customers && <CustomersTable onEdit={getData} data={customers} />}
    </div>
    
  );
}

export default App;
