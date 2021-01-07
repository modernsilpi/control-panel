const orders=document.querySelector('.ordersr')
const popfield=document.querySelector('.popfieldr');

const orders2=document.querySelector('.orders2r')
const popfield2=document.querySelector('.popfield2r');


//today orders here
// var sl2=0;
// const bookdb2=db.collection('repairs')
// bookdb2.onSnapshot(snap=>{
//     orders2.innerHTML='';
//     sl2=0;
//     snap.docs.forEach(nap=>{
//       if(new Date().toDateString()==nap.data().dateofpay){
//       sl2+=1;
//       //  console.log(nap.data())
//         let user=nap.data();
//         let productname;
//         let timeofpay=user.timeofpay
//       // timeofpay=timeofpay.slice(0, -31)
//       timeofpay=timeofpay.replace('GMT+0530 (India Standard Time)', '');
//         let send,recieve="unchecked";
//         let calas="secondary",vale="Pending......."
//         if(user.send==1)send="checked"
//         if(user.recieve==1)recieve="checked"
//         if(user.ordercomplete==1)calas="success",vale="Completed"
//         if(user.products.length>5){
//             productname=user.products[0]+"..."
//             console.log(productname)
//         }
//         else productname=user.products[0];

//         const tr=document.createElement('tr');
//         tr.innerHTML=`
//         <td>${sl2}</td>
//         <td id="f${nap.id}">${user.buyername}</td>
//         <td>${user.buyerphone}</td>
//         <td>${user.buyerlocation}</td>
//         <td id="f${nap.id}"><b>${productname}</b></td>
//         <td>${user.paymentstatus}</td>
//         <td>${user.totalprice}</td>
//         <td>${user.dateofpay}<br> ${timeofpay} </td>
//         <td><label class="switch table-switch">
//           <input id="s${nap.id}" type="checkbox" ${send}>
//           <span class="slider round table-slider table-round"></span>
//         </label></td>
//         <td><label class="switch table-switch">
//         <input id="r${nap.id}" type="checkbox" ${recieve}>
//         <span class="slider round table-slider table-round"></span>
//       </label></td>

//       <span class="badge rounded-pill bg-${calas} orderbtn">${vale}</span>
//         `;
//         orders2.append(tr);

//                //append full details of booking
//                console.log("popup")
//                const div2=document.createElement('div')
//                div2.innerHTML=`
//                <div class="hover_bkgr_fricc" id="da${nap.id}">
//            <span class="helper"></span>
//            <div>
//                <div class="popupCloseButton" id="x${nap.id}">&times;</div>
//                <p><b>name</b>:  ${user.buyername}</p>
//                <p><b>phone</b>:  ${user.buyerphone}</p>
//                <p><b>location</b>:  ${user.buyerlocation}</p>
//                <p><b>payment status</b>:  ${user.paymentstatus}</p>
//                <p><b>order id</b>:  ${user.orderid}</p>
//                <p><b>payment id</b>:  ${user.paymentid}</p>
//                <p><b>pickup date</b>:  ${user.pickupdate}</p>
//                <p><b>return date</b>:  ${user.returndate}</p>
//                <p><b>Date of payment</b>:  ${user.dateofpay}</p>
//                <p><b>Time of payment</b>:  ${user.timeofpay}</p>
//                <p><b>promocode</b>:  ${user.promocode}</p>
//                <h4><b>totalprice</b>:  ${user.totalprice}</p>
//                <div id="p${nap.id}"></div>
//                <div id="adhar${nap.id}"</div>

//            </div>
//        </div>
//                `;

//                popfield2.append(div2)


//                const productfield2=document.getElementById(`p${nap.id}`)
//                productfield2.innerHTML='';
//                if(user.products.length>5){
//                 for(var i=0;i<user.products.length;i=i+5){
//                   const div=document.createElement('div')
//                   div.setAttribute('class',"my-orders")
//                   var li=`     
//                   <div class="order-pic">
//                     <div class="order-pic2">
//                       <div>
//                         <img src="${user.products[i+3]}" alt="" width="350" height="150">
//                       </div>
//                   <div>
//                     <h5> ${user.products[i+0]}</h5>
                 
//                     <p><span>Qty: </span>&nbsp; ${user.products[i+1]}</p>
//                     <p><span>Price:</span>&nbsp; ${user.products[i+2]}</p>
//                   </div>                 
//                     </div>
//                      </div>
//                   `;
//                 div.innerHTML=li
//                 productfield2.append(div)
                
//                 }
//               }
//               else{
//                 const div=document.createElement('div')
//                 div.setAttribute('class',"my-orders")
//                 var li=`     
                  
//                 <div class="order-pic">
//                   <div class="order-pic2">
//                     <div>
//                       <img src="${user.products[3]}" alt="" width="350" height="150">
//                     </div>
                  
//                 <div>
//                   <h5> ${user.products[0]}</h5>
//                   <p><span>Qty: </span>&nbsp; ${user.products[1]}</p>
//                   <p><span>Price:</span>&nbsp; ${user.products[2]}</p>
//                 </div>        
//                   </div>
                 
//                   </div>
//                 `;
//               div.innerHTML=li
//               productfield2.append(div)
              
//               }

//               const adharfield2=document.querySelector(`#adhar${nap.id}`);
//               adharfield2.innerHTML='';
//               const adhardiv2=document.createElement('div')
//               db.collection('users').doc(user.buyerid).collection('profile').doc(user.buyerid).get().then(snap=>{
//                 adhardiv2.innerHTML=`
//                 <p><b>adhar front</b></p>
//                 <img src="${snap.data().adharfront}" alt="" width="800" height="400">
//                 <p><b>adhar back</b></p>
//                 <img src="${snap.data().adharback}" alt="" width="800" height="400">
//                 `;
//                // adharfield2.append(adhardiv2);
//               })
            
            
       
//                //user full details
//                const full=document.querySelector(`#f${nap.id}`);
//             //   console.log(`da${nap.id}`)
//                full.addEventListener("click",(e)=>{
//                    e.preventDefault();
//                    document.querySelector(`#da${nap.id}`).style.display="block";
       
//                })
//                //close pop
//               const close=document.querySelector(`#x${nap.id}`)
//               close.addEventListener('click',(e)=>{
//                document.querySelector(`#da${nap.id}`).style.display="none";
//               })
       

//         //confirm product delivered to user
//         const sendp=document.getElementById(`s${nap.id}`);
//         sendp.addEventListener('change',(e)=>{
//             console.log("send")
//             if(user.send==1) bookdb2.doc(nap.id).update({send:0})
//             else bookdb2.doc(nap.id).update({send:1})
            
//         })

//         //confirm product recived from user
//         const recp=document.getElementById(`r${nap.id}`);
//         recp.addEventListener('change',(e)=>{
//             console.log("recieve")
//             if(user.recieve==1) bookdb2.doc(nap.id).update({recieve:0})
//             else bookdb2.doc(nap.id).update({recieve:1})
            
//         })
//       //  increaseqty(user.orderid,user.products)
//       }
//     })

  
// })


//today orders


var sl2=0;
const bookdb2=db.collection('repairs')
bookdb2.onSnapshot(snap=>{
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
bookdb.onSnapshot(snap=>{
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
