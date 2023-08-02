function AdminProtect(props) {

    if (localStorage.getItem('adminToken')) {
      return props.children;
    }
    toast.error('You have no account, Please Login');
    return <Navigate to="/admin" />;
  }
  
  export default AdminProtect