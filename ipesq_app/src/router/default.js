import tese from '@/pages/tese.vue'
import index from '@/pages/index.vue'
import login from '@/pages/login.vue'
import pacientes from '@/pages/pacientes'



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
      }


    
    ]