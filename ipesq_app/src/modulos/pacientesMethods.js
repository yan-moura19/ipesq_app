import { useMyAuth } from '@/stores/auth';
import axios from 'axios'
import { URL_API } from '@/ennviroments' 
import { useMyPaciente} from '@/stores/paciente'
import { useMyForm } from '@/stores/form';
import { useMyStore } from '@/stores/store';
import moment from 'moment';
import VueJwtDecode from 'vue-jwt-decode';

function getIdUsuario(){
    const myAuth = useMyAuth();
    return myAuth.user.usuarioId;
}
function getNomeProfissional(){
    const myAuth = useMyAuth();
    return myAuth.user.nome;
}
function getHeaders(){
    const myAuth = useMyAuth();
    return myAuth.headers;
}
function getIdPaciente(){
    const myPaciente = useMyPaciente();
    return myPaciente.pacienteSelecionado.id

}
function getNomePaciente(){
    const myPaciente = useMyPaciente();
    return myPaciente.pacienteSelecionado.nome

}
function setFormSelecionado(form){
    const formDb = useMyForm()
    let formFormatter = JSON.parse(form)
    formDb.setForm(formFormatter)

}
export function getNomeLogin(){
    const myAuth = useMyAuth();
    return myAuth.user.nome;

    
}
export async function patchSenha( senha){
    const myAuth = useMyAuth();
    let headers = getHeaders();
    let token = myAuth.definirSenha.token

    return await axios.patch(`${URL_API}Usuario/definirSenha?token=${token}&novaSenha=${senha}`,null, { headers:headers}).then(()=>{
        const myAuth = useMyAuth();
        myAuth.resetDefinirSenha()
    })

}
export async function enviarEmail( email){
    return await axios.post(`${URL_API}Usuario/redifinirSenha?email=${email}`).then(()=>{     
        
    })

}
export function setToken(token){
    let decoded = VueJwtDecode.decode(token)
    let nome = decoded.unique_name
    let email = decoded.email
    const myAuth = useMyAuth();
    myAuth.setRedefinirSenha(nome, token, email)
}

export async function atualizaFormulario(form){
    let id = form.id
    let headers = getHeaders();
    let body = {...form}
    delete body.id

      return await axios.patch(`${URL_API}Formulario?formId=${id}`,body, { headers:headers})
     
}
export async function getFormularios(body){
    
    const myPaciente = useMyPaciente();
    let id = getIdPaciente();
    let headers = getHeaders();
    return await axios.get(`${URL_API}Formulario?pacienteId=${id}&dataInicio=${body.dataInicio}&dataFim=${body.dataFim}${body.especialidadeId? '&especialidadeId='+body.especialidadeId :''}`, { headers:headers}).then((resp)=>{
        let modelPaciente = resp.data.paciente

        let formulariosFormatter = resp.data.formularios.map((form)=>{
            
            return {...form,
                dataAplicacao: moment(form.dataAplicacao, "YYYY-MM-DD").format("DD/MM/YYYY")

            }
        })
        
        modelPaciente.formularios = formulariosFormatter
        myPaciente.setPacienteSelecionado(modelPaciente);
    })

}
export async function getFormulariosMes(body){
    const myPaciente = useMyPaciente();
    let id = getIdPaciente();
    let headers = getHeaders();
    let primeiroDiaDoMes = moment().startOf('month');
    let  dataAtual = moment();
    primeiroDiaDoMes = primeiroDiaDoMes.format('YYYY-MM-DD')
    dataAtual = dataAtual.format('YYYY-MM-DD')
    return await axios.get(`${URL_API}Formulario?pacienteId=${id}&dataInicio=${primeiroDiaDoMes}&dataFim=${dataAtual}`, { headers:headers}).then((resp)=>{
        let modelPaciente = resp.data.paciente

        let formulariosFormatter = resp.data.formularios.map((form)=>{
            
            return {...form,
                dataAplicacao: moment(form.dataAplicacao, "YYYY-MM-DD").format("DD/MM/YYYY")

            }
        })
        
        modelPaciente.formulariosMes = formulariosFormatter
        myPaciente.setPacienteSelecionado(modelPaciente);
    })


}
export async function getEspecialidades(){
    const storeDB = useMyStore()
   
    
    let token = getHeaders();
    return await axios.get(`${URL_API}Especialidade`, { headers:token}).then((resp)=>{
        storeDB.setExpecialidades(resp.data)

        
    })

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
    
    
    model.formJson.profissional = getNomeProfissional()
    model.formJson.nomePaciente = getNomePaciente()
    // model.formJson = JSON.stringify(model.formJson )
    

    return await axios.post(`${URL_API}Formulario`,model, { headers:token}).then((resp)=>{
        model.formJson.id = resp.data.id

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
   
     return await axios.post(`${URL_API}Paciente`,body, { headers:token})
}