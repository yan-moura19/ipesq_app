import { useMyAuth } from '@/stores/auth';
import axios from 'axios'
import { URL_API } from '@/ennviroments' 
import { useMyPaciente} from '@/stores/paciente'

function getIdUsuario(){
    const myAuth = useMyAuth();
    return myAuth.user.usuarioId;
}
function getHeaders(){
    const myAuth = useMyAuth();
    return myAuth.headers;
}
function getIdPaciente(){
    const myPaciente = useMyPaciente();
    return myPaciente.pacienteSelecionado.id

}

export async function getPacientePorId(id){
   
    const myPaciente = useMyPaciente();
    let token = getHeaders();
    return await axios.get(`${URL_API}Paciente/pacientePorId?id=${id}`, { headers:token}).then((resp)=>{
        myPaciente.setPacienteSelecionado(resp.data);
    })

}

export async function salvarFormulario(model){
    let token = getHeaders();
    model.pacienteId = getIdPaciente();
    model.usuarioId = getIdUsuario();
    model.especialidadeId = 1
    // model.formJson = JSON.stringify(model.formJson )
    console.log(model)

    return await axios.post(`${URL_API}Formulario`,model, { headers:token})
}



export async function getPacientes(){
    const myAuth = useMyAuth();
    let token = getHeaders();
    return await axios.get(`${URL_API}Paciente/todosPacientes`, { headers:token})
}
export async function postPaciente(paciente){
    let token = getHeaders();
    let body = {...paciente}
   
     return await axios.post(`${URL_API}Paciente`,body, { headers:token})
}