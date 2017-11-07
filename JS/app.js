window.onload=function(){
var board=document.querySelector('.board-js');
//addEVENLISTENER...se utilizas para hacer un evento en este caso es click//
//target hace refencia a los td, que es una etiqueta//
//board.addEventListener('click', function(event){
//event.target.style.backgroundColor='red';
//});

///board.addEventListener('click',addBgc);
   
///board.addEventListener('dblclick', function(event){
///event.target.style.backgroundColor='blue';
///});
//board.addEventListener('mouseover', function(event){
//event.target.style.backgroundColor='pink';
//});
//board.addEventListener('mousedown', function(event){
//            event.target.style.backgroundColor='yellow';
//           });
//board.addEventListener('mouseup', function(event){
//    event.target.style.backgroundColor='green';
//    });
///board.removeEventListener('click',addBgc);
///function addBgc(event){
///event.target.style.backgroundColor='red';   
///}

board.addEventListener('click',addx);
};
var centinel=true;
function addx(event){
    if (event.target.matches('td')&& event.target.textContent===''){
        if(centinel)
        event.target.textContent='x';        
     else
        event.target.textContent='0';
            centinel=!centinel;
        }
}


            

