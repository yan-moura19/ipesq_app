<template width="300">
    <Pie
      id="my-chart-id"
      :options="chartOptions1"
      :data="chartData"
      
    />
    <div>
    
  </div>
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Pie },
    props: {
    chartOptions: Object,
    chartData: Object
  },
  watch: {
    chartOptions: {
      handler(newOptions) {
        this.chartOptions = newOptions
       
      },
      deep: true // Observa alterações profundas nos objetos
    },
    chartData: {
      handler(newData) {
        
        this.chartData1 = newData
        console.log("data: ", newData)
        
        this.$forceUpdate
       
      },
      deep: true // Observa alterações profundas nos objetos
    }
  },
    data() {
      return {
        chartData1: {
          labels: this.chartData.labels,
          datasets: [ { data: [this.chartData.data],
            label: 'Sessões',
                        backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                        borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                ], } ]
        },
        chartOptions1: {
          responsive: true,
          legend: {
          display: true,
          position: 'bottom' // Defina a posição da legenda como 'bottom'
        }
        
        }
      }
    }
  }
  </script>
  <style>
  .chart-container {
  width: 500px; 
}
  </style>