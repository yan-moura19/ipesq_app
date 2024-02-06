import { useMyAuth } from '@/stores/auth';
import axios from 'axios'
import { URL_API } from '@/ennviroments' 
import { useMyPaciente} from '@/stores/paciente'

function getHeaders(){
    const myAuth = useMyAuth();
    return myAuth.headers;
}

export async function getPacientePorId(id){
    console.log("ok")
    const myPaciente = useMyPaciente();
    let token = getHeaders();
    return await axios.get(`${URL_API}Paciente/pacientePorId?id=${id}`, { headers:token}).then((resp)=>{
        myPaciente.setPacienteSelecionado(resp.data);
    })

}



export async function getPacientes(){
    const myAuth = useMyAuth();
    let token = getHeaders();
    return await axios.get(`${URL_API}Paciente/todosPacientes`, { headers:token})
}
export async function postPaciente(paciente){
    let token = getHeaders();
    let body = {...paciente}
    console.log(body)
     return await axios.post(`${URL_API}Paciente`,body, { headers:token})
}