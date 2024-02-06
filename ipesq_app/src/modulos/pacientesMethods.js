import { useMyAuth } from '@/stores/auth';
import axios from 'axios'
import { URL_API } from '@/ennviroments' 





export async function getPacientes(){
    const myAuth = useMyAuth();


    let token = myAuth.headers;
    console.log( { headers:token})
    return await axios.get(`${URL_API}Paciente/todosPacientes`, { headers:token})
    

}