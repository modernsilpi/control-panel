var d = new Date().toDateString();//today date
console.log(new Date().getMonth())

//total orders in overview
var todayord=0;

const allorders=document.querySelector('.allorders')
const todayorders=document.querySelector('.today-orders')
const todaybooks=document.querySelector('.today-books')
db.collection("orders").get().then(snap=>{
   snap.forEach(nap=>{
      if(nap.data().dateofpay==d){ 
      todayord+=1;
      console.log("todayorder",todayord);

     //today revenue
     trev+=nap.data().totalprice;
      }
      todayorders.innerHTML=todayord;
      //append revenu
      todayrevenue.innerHTML="&#8377;"+trev;
      if(nap.data().month==new Date().getMonth()){
      totalrev+=nap.data().totalprice;
      }
   })
   allorders.innerHTML=snap.docs.length;

   //revenu here
   totalrevenue.innerHTML="&#8377;"+totalrev;
   
})



//transaction here
var todaytransc=0;
var alltransc=0;
const alltrans=document.querySelector('.alltrans')
const todaytrans=document.querySelector('.today-trans')
db.collection("orders").get().then(snap=>{
   snap.forEach(nap=>{
      if(nap.data().dateofpay==d){
      if(nap.data().paymentstatus==="success"){ 
      todaytransc=todaytransc+1;
      console.log("todaytrans",todaytransc);
      }
      todaytrans.innerHTML=todaytransc;
   }
   if(nap.data().paymentstatus==="success"){ 
      alltransc=alltransc+1;
      console.log("alltrans",alltransc);
      }
      alltrans.innerHTML=alltransc;
   })
})

//users here
allusers=document.querySelector('.users-count');
db.collection('users').onSnapshot(snap=>{
   allusers.innerHTML=snap.docs.length;
})


//revenu
var trev=0;
var totalrev=0;
const todayrevenue=document.querySelector(".today-revenue");
const totalrevenue=document.querySelector(".total-revenue");