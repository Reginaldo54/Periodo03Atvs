import axios from 'axios';

const api = axios.create({
    
    baseURL: 'http://dados.recife.pe.gov.br/api/3/action/datastore_search?q='
});

export default api;