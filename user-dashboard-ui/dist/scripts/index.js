//total orders in overview
const todayorders=document.querySelector('.today-orders')
db.collection("orders").get().then(snap=>{
   todayorders.innerHTML=snap.docs.length;

   
})