$(document).ready(function(){
    
    show(0,0);

    let repeat;
    let input = document.querySelector("#input");
    let button_start = document.querySelector("#button1");
    let button_stop = document.querySelector("#button2");

    button_start.addEventListener("click", function(){

        let array = input.value.split(":");
        
        let minute = parseInt(array[0]);
        let second = parseInt(array[1]);
        
        switch(isNaN(minute) || isNaN(second)){
            case true: 
                show_alert(3);
                break;
            
            default: 
                button_start.disabled = true;
                button_stop.disabled = false;

                show(minute, second);
                show_alert(1);
                repeat = start(minute, second, repeat, button_start, button_stop);
                break;
        }

    });

    button_stop.addEventListener("click", function(){
        button_start.disabled = false;
        button_stop.disabled = true;
        stop(repeat);
        show_alert(4);
    });
    
});

function show(minute, second){
    let countdown = document.getElementById("countdown");

    if (minute < 10){
        minute = "0"+minute;
    }

    if(second < 10){
        second = "0"+second;
    }

    countdown.innerHTML = "<h1 class='time'> "+ minute +":"+ second +" </h1>";
}

function start(minute, second, repeat, button_start, button_stop){

    repeat = setInterval(function(){

        if(second != 0){
            second--;
        }

        if(second == 0 && minute != 0){
            minute--;
            second = 59;
        }

        if(minute == 0 && second == 0){
            stop(repeat);
            show_alert(2);
            button_start.disabled = false;
            button_stop.disabled = true;
        }

        show(minute, second);

    }, 1000);

    return repeat;
}

function stop(repeat){
    clearInterval(repeat);
}

function show_alert(number){

    const message = {
        1: ['Cuenta regresiva iniciada', 'primary'],
        2: ['Cuenta regresiva Finalizada', 'info'],
        3: ['Valor no valido', 'warning'],
        4: ['Se ha detenido', 'danger']
    }

    let alert =document.getElementById("alert");
    alert.innerHTML = "<div class='text-center alert alert-"+ message[number][1] + " alert-dismissible fade show' role='alert'>"+
                       "<strong> "+ message[number][0] +" </strong>"+
                       "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                          "<span aria-hidden='true'>&times;</span>"+
                       "</button>"+
                      "</div>";
}