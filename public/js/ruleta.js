const symbols = ['🍎', '🍊', '🍇', '🍓', '🍒','🔥','🍉','🌶️','🍄','🍕','💣','🏆','💰']; 

const slots = document.querySelectorAll('.slot');
const spinButton = document.querySelector('#spin-button');

const monto = document.getElementById('monto');
const apuesta = document.getElementById('seleccionApuesta');
const ganancia = document.getElementById('ganancia');

window.addEventListener('load', ()=>{
    slots.forEach(slot => {
        slot.textContent = '💎';
      });

    spinButton.addEventListener('click', () => {
        let contador = 0;
        let matrizPrincipal = [[],[],[]]
        let linea1 = [] 
        let linea2 = [] 
        let linea3 = [] 
        if(parseInt(monto.value )>= parseInt(apuesta.value)){
            slots.forEach(slot => {

                const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                slot.textContent = randomSymbol;
                
              
                if(contador < 3){
                    linea1.push(slot.textContent)
                    //console.log(valores1)
                }
                if(contador >= 3 && contador < 6){  
                    linea2.push(slot.textContent)
                    //console.log(valores2)
                }
                if(contador >= 6 && contador < 9){
                    linea3.push(slot.textContent)
                    //console.log(valores3)
                }
                matrizPrincipal[0] = linea1
                matrizPrincipal[1] = linea2
                matrizPrincipal[2] = linea3
                contador++
              });
              console.log(matrizPrincipal)
              //descuento el valor del juego actual
              monto.value = monto.value - apuesta.value;

             if(lineHorizontal(linea1)){
                determinarValorGanancia(linea1[0])
                //agregar efecto de linea ganada
             }
             if(lineHorizontal(linea2)){
                determinarValorGanancia(linea2[0])
             }
             if(lineHorizontal(linea3)){
                determinarValorGanancia(linea3[0])
             }
             if(lineavertical(matrizPrincipal)){
                determinarValorGananciaColumna(matrizPrincipal)
                    //agregar efecto de linea ganada
             }
             if(lineavertical(matrizPrincipal)){
                determinarValorGananciaColumna(matrizPrincipal)
             }
             if(lineavertical(matrizPrincipal)){
                determinarValorGananciaColumna(matrizPrincipal)
             }

              //limpio la jugada
              linea1=[]
              linea2=[]
              linea3=[]
        }else{
            alert('No puede apostar')
        }
      });

      //verificar valores de jugada
      function lineHorizontal(array) {
        for (let i = 1; i < array.length; i++) {
          if (array[i] !== array[0]) {
            return false;
          }
        }
        return true;
      }
      function lineavertical(array) {
        if(array[0][0] == array[1][0] && array[0][0] == array[2][0]){
            return true;
        }
        if(array[0][1] == array[1][1] && array[0][0] == array[2][1]){
            return true;
        }
        if(array[0][2] == array[1][2] && array[0][0] == array[2][2]){
            return true;
        }
        return false;
      }

      function determinarValorGananciaFila(dato){
        switch (dato) {
            case '🍎':
            case '🍊':
                ganancia.value = ganancia.value + 100;
                alert(ganancia.value)
              break;
            case '🍇':
                ganancia.value = ganancia.value + 200;
                alert(ganancia.value)
              break;
            case '🍓':
                ganancia.value = ganancia.value + 300;
                alert(ganancia.value)
             break;
            case '🍒':
                ganancia.value = ganancia.value + 500;
                alert(ganancia.value)
             break;
            case '🍉':
                ganancia.value = ganancia.value + 700;
                alert(ganancia.value)
             break;
            case '🌶️':
                ganancia.value = ganancia.value + 750;
                alert(ganancia.value)
              break;
            case '🍕':
                ganancia.value = ganancia.value + 800;
                alert(ganancia.value)
                 break;
            case '🍄':
                ganancia.value = ganancia.value + 850;
                alert(ganancia.value)
             break;
            case '🔥':
                ganancia.value = ganancia.value + 900;
                alert(ganancia.value)
             break;
            case '💣':
                ganancia.value = ganancia.value + 950;
                alert(ganancia.value)
             break;
            case '💰':
                ganancia.value = ganancia.value + 1000;
                alert(ganancia.value)
             break;
            case '🏆':
                console.log('Bonus de 3 tiros');
             break;
            default:
              console.log('El tipo del elemento no es reconocido');
              break;
          }
      }
      function determinarValorGananciaColumna(dato){
        switch (dato) {
            case '🍎':
            case '🍊':
                ganancia.value = ganancia.value + 100;
                alert(ganancia.value)
              break;
            case '🍇':
                ganancia.value = ganancia.value + 200;
                alert(ganancia.value)
              break;
            case '🍓':
                ganancia.value = ganancia.value + 300;
                alert(ganancia.value)
             break;
            case '🍒':
                ganancia.value = ganancia.value + 500;
                alert(ganancia.value)
             break;
            case '🍉':
                ganancia.value = ganancia.value + 700;
                alert(ganancia.value)
             break;
            case '🌶️':
                ganancia.value = ganancia.value + 750;
                alert(ganancia.value)
              break;
            case '🍕':
                ganancia.value = ganancia.value + 800;
                alert(ganancia.value)
                 break;
            case '🍄':
                ganancia.value = ganancia.value + 850;
                alert(ganancia.value)
             break;
            case '🔥':
                ganancia.value = ganancia.value + 900;
                alert(ganancia.value)
             break;
            case '💣':
                ganancia.value = ganancia.value + 950;
                alert(ganancia.value)
             break;
            case '💰':
                ganancia.value = ganancia.value + 1000;
                alert(ganancia.value)
             break;
            case '🏆':
                console.log('Bonus de 3 tiros');
             break;
            default:
              console.log('El tipo del elemento no es reconocido');
              break;
          }
      }
})


