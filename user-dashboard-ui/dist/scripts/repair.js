const orders=document.querySelector('.ordersr')
const popfield=document.querySelector('.popfieldr');

const orders2=document.querySelector('.orders2r')
const popfield2=document.querySelector('.popfield2r');




//today orders


var sl2=0;
const bookdb2=db.collection('repairs')
bookdb2.orderBy("timestamp", "desc").onSnapshot(snap=>{
    orders2.innerHTML='';
    sl2=0;
    snap.docs.forEach(nap=>{
      if(new Date().toDateString()==nap.data().date){
      sl2+=1;
      //  console.log(nap.data())
        let user=nap.data();
        let timeofpay=user.time
      // timeofpay=timeofpay.slice(0, -31)
      timeofpay=timeofpay.replace('GMT+0530 (India Standard Time)', '');

        const tr=document.createElement('tr');
        tr.innerHTML=`
        <td>${sl2}</td>
        <td id="f${nap.id}">${user.servername}</td>
        <td>${user.servernumber}</td>
        <td id="f${nap.id}"><b>${user.servicename}</b></td>
        <td id="f${nap.id}"><b>${user.servicesubject}</b></td>
        <td>${user.date}<br> ${timeofpay} </td>
        `;
        orders2.append(tr);

               //append full details of booking
               console.log("popup")
               const div2=document.createElement('div')
               div2.innerHTML=`
               <div class="hover_bkgr_fricc" id="da${nap.id}">
           <span class="helper"></span>
           <div>
               <div class="popupCloseButton" id="x${nap.id}">&times;</div>
               <h3><b>Service name</b>:  ${user.servicename}<h3>
               <p><b>service subject</b>:  ${user.servicesubject}</p>
               <p><b>description</b>:  ${user.servicedescription}</p>
               <img src="${user.servicepic}" alt="" width="500" height="200">
               <p><b>Person name</b>:  ${user.servername}</p>
               <p><b>Phone number</b>:  ${user.servernumber}</p>
               <p>Date:  ${user.date}</p>
               <p>Time:  ${user.time}</p>
               
           </div>
       </div>
               `;

               popfield2.append(div2)
          
            
       
               //user full details
               const full=document.querySelector(`#f${nap.id}`);
            //   console.log(`da${nap.id}`)
               full.addEventListener("click",(e)=>{
                   e.preventDefault();
                   document.querySelector(`#da${nap.id}`).style.display="block";
       
               })
               //close pop
              const close=document.querySelector(`#x${nap.id}`)
              close.addEventListener('click',(e)=>{
               document.querySelector(`#da${nap.id}`).style.display="none";
              })
       

            }
    })
    
    
})


//total orders here


var sl=0;
const bookdb=db.collection('repairs')
bookdb.orderBy("timestamp", "desc").onSnapshot(snap=>{
    orders.innerHTML='';
    sl=0;
    snap.docs.forEach(nap=>{
      sl+=1;
      //  console.log(nap.data())
        let user=nap.data();
        let timeofpay=user.time
      // timeofpay=timeofpay.slice(0, -31)
      timeofpay=timeofpay.replace('GMT+0530 (India Standard Time)', '');

        const tr=document.createElement('tr');
        tr.innerHTML=`
        <td>${sl}</td>
        <td id="f${nap.id}">${user.servername}</td>
        <td>${user.servernumber}</td>
        <td id="f${nap.id}"><b>${user.servicename}</b></td>
        <td id="f${nap.id}"><b>${user.servicesubject}</b></td>
        <td>${user.date}<br> ${timeofpay} </td>
        `;
        orders.append(tr);

               //append full details of booking
               console.log("popup")
               const div2=document.createElement('div')
               div2.innerHTML=`
               <div class="hover_bkgr_fricc" id="da${nap.id}">
           <span class="helper"></span>
           <div>
               <div class="popupCloseButton" id="x${nap.id}">&times;</div>
               <h3><b>Service name</b>:  ${user.servicename}<h3>
               <p><b>service subject</b>:  ${user.servicesubject}</p>
               <p><b>description</b>:  ${user.servicedescription}</p>
               <img src="${user.servicepic}" alt="" width="500" height="200">
               <p><b>Person name</b>:  ${user.servername}</p>
               <p><b>Phone number</b>:  ${user.servernumber}</p>
               <p>Date:  ${user.date}</p>
               <p>Time:  ${user.time}</p>
               
           </div>
       </div>
               `;

               popfield.append(div2)
          
            
       
               //user full details
               const full=document.querySelector(`#f${nap.id}`);
            //   console.log(`da${nap.id}`)
               full.addEventListener("click",(e)=>{
                   e.preventDefault();
                   document.querySelector(`#da${nap.id}`).style.display="block";
       
               })
               //close pop
              const close=document.querySelector(`#x${nap.id}`)
              close.addEventListener('click',(e)=>{
               document.querySelector(`#da${nap.id}`).style.display="none";
              })
       

      
    })
    
})


//search user by phone number
const searchbtn=document.querySelector('#searchbtn');
const orders3=document.querySelector('.orders3');
const popfield3=document.querySelector('.popfield3');
var sl3=0;
searchbtn.addEventListener('click',(e)=>{
  const searchinput=document.querySelector('#searchinput')
sl3=0;
finding("servernumber",searchinput.value)

})

//get repairs by date 
const findbydate=document.getElementById('findbydate')
findbydate.addEventListener('change',(e)=>{
  let repairdate=new Date(findbydate.value).toDateString()
  finding("date",repairdate);
})



function finding(input1,input2){
  orders3.innerHTML='';
popfield3.innerHTML='';
  document.querySelector('.searchresult').style.display="block"
  var citiesRef = db.collection("repairs");
// Create a query against the collection.
var query = citiesRef.where(input1, "==", input2);
query.orderBy("timestamp", "desc").onSnapshot(snap=>{
  snap.forEach(nap=>{
    sl3+=1;
    //  console.log(nap.data())
      let user=nap.data();
      let timeofpay=user.time
    // timeofpay=timeofpay.slice(0, -31)
    timeofpay=timeofpay.replace('GMT+0530 (India Standard Time)', '');

      const tr=document.createElement('tr');
      tr.innerHTML=`
      <td>${sl3}</td>
      <td id="f${nap.id}">${user.servername}</td>
      <td>${user.servernumber}</td>
      <td id="f${nap.id}"><b>${user.servicename}</b></td>
      <td id="f${nap.id}"><b>${user.servicesubject}</b></td>
      <td>${user.date}<br> ${timeofpay} </td>
      `;
      orders3.append(tr);

             //append full details of booking
             console.log("popup")
             const div2=document.createElement('div')
             div2.innerHTML=`
             <div class="hover_bkgr_fricc" id="da${nap.id}">
         <span class="helper"></span>
         <div>
             <div class="popupCloseButton" id="x${nap.id}">&times;</div>
             <h3><b>Service name</b>:  ${user.servicename}<h3>
             <p><b>service subject</b>:  ${user.servicesubject}</p>
             <p><b>description</b>:  ${user.servicedescription}</p>
             <img src="${user.servicepic}" alt="" width="500" height="200">
             <p><b>Person name</b>:  ${user.servername}</p>
             <p><b>Phone number</b>:  ${user.servernumber}</p>
             <p>Date:  ${user.date}</p>
             <p>Time:  ${user.time}</p>
             
         </div>
     </div>
             `;

             popfield3.append(div2)
        
          
     
             //user full details
             const full=document.querySelector(`#f${nap.id}`);
          //   console.log(`da${nap.id}`)
             full.addEventListener("click",(e)=>{
                 e.preventDefault();
                 document.querySelector(`#da${nap.id}`).style.display="block";
     
             })
             //close pop
            const close=document.querySelector(`#x${nap.id}`)
            close.addEventListener('click',(e)=>{
             document.querySelector(`#da${nap.id}`).style.display="none";
            })
     

    
  })





  })
}