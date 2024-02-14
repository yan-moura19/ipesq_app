import tese from '@/pages/tese.vue'
import index from '@/pages/index.vue'
import login from '@/pages/login.vue'
import pacientes from '@/pages/pacientes'
import formEvolucaoFisioterapeutica from  "@/views/fichaDeEvolucaoFisioterapeutica.vue"
import fichadeevolucaofisioterapiarespiratoria from "@/views/fichaDeEvolucaoFisioterapiaRespiratoria.vue"
import fichadeevolucaopsicopedagogia from '@/views/fichaDeEvolucaoPsicopedagogia.vue'



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



    
    ]