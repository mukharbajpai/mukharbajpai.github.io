var playing =false;
var score; 
var action;
var timeremaining;
var correctanswer;
//if we click on start/reset
document.getElementById("startreset").onclick = 
    function(){
    //if we are playing
    if(playing==true){//if we are playing
        location.reload();//reload page
        
    }
    else{//if not playing
        
        //change mode to playing
        playing=true;
        
        //set score to 0
        score=0;
        
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        show("timeremaining");  
        timeremaining=30;
     
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        
        //hide gameover box
        hide("gameover");
        
        //button to reset
        document.getElementById("startreset").innerHTML="Reset Game";
        
        //starting countdown
        startCountdown();
        
        //generate que and answers
        generateQA();
    }
    
}
//clicking an answer box

for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick =    
     function(){
     //check if we are playing
     if(playing==true){
         if(this.innerHTML == correctanswer){
             //correct answer
             score+=1;
             document.getElementById("scorevalue").innerHTML= score;
             //show correct box // hide wrong box
             hide("wrong");
             show("correct");
             setTimeout(function(){
                 hide("correct"); 
             }, 1000);
             generateQA();
         }
         else{
             //wrong answer
             hide("correct");
             show("wrong");
             setTimeout(function(){
                 hide("wrong");                 
             }, 1000) ;        
         }      
     }     
 }
}

//functions

//startcounter
function startCountdown(){
    action = setInterval(function(){
        timeremaining-=1;  
        document.getElementById("timeremainingvalue").innerHTML=timeremaining;
        if(timeremaining==0){
            //game over
        stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML  ="<p>game over !</p> <p>Your Score is "+ score +".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing= false;
            document.getElementById("startreset").innerHTML="Start Game";
        }
    },1000);
    
}


//stopcounter

function stopCountdown(){
        clearInterval(action);
}


//hide an element
function hide(Id){
    document.getElementById(Id).style.display="none";
}


//show an element
function show(Id){
    document.getElementById(Id).style.display="block";
}

//question generator

function generateQA() {
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    correctanswer = x*y;
    document.getElementById("question").innerHTML= x +"x" + y;
    var correctposition = 1+Math.round(3*Math.random());
    document.getElementById("box"+correctposition).innerHTML=correctanswer;//fill a box with correct answer
    
    //filling others with wrong answers
    var answers = [correctanswer];
    
    for(i=1;i<5;i++){
        if(i!= correctposition){
            var wronganswer;
            do
            {
                wronganswer= (1+Math.round(9*Math.random())) * (1+Math.round(9*Math.random())); 
            }while(answers.indexOf(wronganswer)>-1)
            document.getElementById("box"+i).innerHTML= wronganswer;
            answers.push(wronganswer);
        }
    }
}





