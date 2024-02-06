import { defineStore } from 'pinia'
import moment from 'moment'
function calcularIdade(dataNascimento) {
    const hoje = moment();
    const nascimento = moment(dataNascimento, 'YYYY-MM-DD');
    return hoje.diff(nascimento, 'years');
  }


export const useMyPaciente = defineStore('paciente', {
  state: () => ({
    // estado da loja
    pacienteSelecionado: {},
  }),
  actions: {
    // ações da loja
    setPacienteSelecionado(paciente) {
        paciente.idade = calcularIdade(paciente.dataNascimento)
        paciente.dataNascimento = moment(paciente.dataNascimento,"YYYY-MM-DD").format("DD/MM/YYYY")
       this.pacienteSelecionado = paciente
    },
    resetPacienteSelecionado() {
        this.pacienteSelecionado = {}
     },
  },
})