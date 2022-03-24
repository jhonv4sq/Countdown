$(document).ready(function(){
    
    show(0,0);

    let f;
    let input = document.querySelector("#input");
    let button_start = document.querySelector("#button1");
    let button_stop = document.querySelector("#button2");

    button_start.addEventListener("click", function(){

        let array = input.value.split(":");
        let min = parseInt(array[0]);
        let seg = parseInt(array[1]);
        
        if(isNaN(min) || isNaN(seg)){
            let alert =document.getElementById("alert");
            alert.innerHTML = "<div class='alert alert-warning alert-dismissible fade show' role='alert'>"+
                               "<strong>"+ input.value + "</strong>  No es un dato valido"+
                               "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                                  "<span aria-hidden='true'>&times;</span>"+
                               "</button>"+
                              "</div>"+
                              "<div class='alert alert-primary alert-dismissible fade show' role='alert'>"+
                               "Debes introducir los minutos y segundos separados por<strong> ' : '</strong> ejemplo <strong>3:40</strong> "+
                               "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+
                                  "<span aria-hidden='true'>&times;</span>"+
                               "</button>"+
                              "</div>";

        }else{
            button_start.disabled = true;
            button_stop.disabled = false;
            show(min, seg);
            f = start(min, seg, f, button_start, button_stop);
        }
        
    });
    
    button_stop.addEventListener("click", function(){
        button_start.disabled = false;
        button_stop.disabled = true;
        stop(f);
    });
    
});

function show(min, seg){
    let div = document.getElementById("contador");
    if (min < 10){
        min = "0"+min;
    }
    if(seg < 10){
        seg = "0"+seg;
    }
    div.innerHTML = "<h1> "+ min +":"+ seg +" </h1>";
}

function start(min, seg, f, button_start, button_stop){
    f = setInterval(function(){
        if(seg != 0){
            seg--;
        }
        else if(seg == 0 && min != 0){
            min--;
            seg = 59;
        }
        if(min == 0 && seg == 0){
            stop(f);
            console.log("temino la cuenta regresiva");
            button_start.disabled = false;
            button_stop.disabled = true;
            
        }
        show(min, seg);
    }, 1000);
    return f;
}

function stop(f){
    clearInterval(f);
}