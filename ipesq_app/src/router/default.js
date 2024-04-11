import tese from '@/pages/tese.vue'
import index from '@/pages/index.vue'
import login from '@/pages/login.vue'
import pacientes from '@/pages/pacientes'
import formEvolucaoFisioterapeutica from  "@/views/fichaDeEvolucaoFisioterapeutica.vue"
import fichadeevolucaofisioterapiarespiratoria from "@/views/fichaDeEvolucaoFisioterapiaRespiratoria.vue"
import fichadeevolucaopsicopedagogia from '@/views/fichaDeEvolucaoPsicopedagogia.vue'
import fichadeevolucaofisioterapiapsicomotricidade from '@/views/fichaDeEvolucaoFisioterapiaPsicomotricidade.vue'
import fichadeevolucaofonoaudiologia from '@/views/fichaDeEvolucaoFonoaudiologia.vue'
import acompanhamentomensal from '@/views/acompanhamentoMensal.vue'
import definirSenha from '@/pages/definirSenha.vue'



export default [
    {
        path: '/teste',
        component: tese
  
      },

      {
        path: '/index',
        component: index
  
      },
      {
        path: '/definir-senha',
        component: definirSenha
  
      },
      {
        path: '/',
        component: login
  
      },
      {
        path: '/paciente',
        component: pacientes,
        name: 'pacienteList'
      },
      {
        path: '/fichadeevolucaofisioterapeutica',
        component: formEvolucaoFisioterapeutica,
        name: 'fichadeevolucaofisioterapeutica'
      },
      {
        path: '/fichadeevolucaofisioterapiarespiratoria',
        component: fichadeevolucaofisioterapiarespiratoria,
        name: 'fichadeevolucaofisioterapiarespiratoria'
      },
      {
        path: '/fichadeevolucaopsicopedagogia',
        component: fichadeevolucaopsicopedagogia,
        name: 'fichadeevolucaopsicopedagogia'
      },
      {
        path: '/fichadeevolucaofisioterapiapsicomotricidade',
        component: fichadeevolucaofisioterapiapsicomotricidade,
        name: 'fichadeevolucaofisioterapiapsicomotricidade'
      },
      {
        path: '/fichadeevolucaofonoaudiologia',
        component: fichadeevolucaofonoaudiologia,
        name: 'fichadeevolucaofonoaudiologia'
      },
      {
        path: '/acompanhamentomensal',
        component: acompanhamentomensal,
        name: 'acompanhamentomensal'
      },




    
    ]