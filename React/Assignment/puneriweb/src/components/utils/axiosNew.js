import axios from 'axios';

 const axiosNew= axios.create({
    baseURL:'https://appy.trycatchtech.com/v3/puneri_paltan/'
})

export default axiosNew;