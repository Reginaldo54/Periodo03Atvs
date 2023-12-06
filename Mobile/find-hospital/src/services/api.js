import axios from 'axios';

const api = axios.create({
    
    baseURL: 'http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=a2dab4d4-3a7b-4cce-b3a7-dd7f5ef22226'
});

export default api;