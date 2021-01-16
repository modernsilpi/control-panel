const orders=document.querySelector('.orders')
const popfield=document.querySelector('.popfield');

const orders2=document.querySelector('.orders2')
const popfield2=document.querySelector('.popfield2');


//today orders here
var sl2=0;
const bookdb2=db.collection('orders')
bookdb2.orderBy("timestamp", "desc").onSnapshot(snap=>{
    orders2.innerHTML='';
    sl2=0;
    snap.docs.forEach(nap=>{
      if(new Date().toDateString()==nap.data().dateofpay){
      sl2+=1;
      //  console.log(nap.data())
        let user=nap.data();
        let productname;
        let timeofpay=user.timeofpay
      // timeofpay=timeofpay.slice(0, -31)
      timeofpay=timeofpay.replace('GMT+0530 (India Standard Time)', '');
        let send,recieve="unchecked";
        let calas="secondary",vale="Pending......."
        if(user.send==1)send="checked"
        if(user.recieve==1)recieve="checked"
        if(user.ordercomplete==1)calas="success",vale="Completed"
        if(user.products.length>5){
            productname=user.products[0]+"..."
            console.log(productname)
        }
        else productname=user.products[0];

        const tr=document.createElement('tr');
        tr.innerHTML=`
        <td>${sl2}</td>
        <td id="f${nap.id}">${user.buyername}</td>
        <td>${user.buyerphone}</td>
        <td>${user.buyerlocation}</td>
        <td id="f${nap.id}"><b>${productname}</b></td>
        <td>${user.paymentstatus}</td>
        <td>${user.totalprice}</td>
        <td>${user.dateofpay}<br> ${timeofpay} </td>
        <td>${user.pickupdate}</td>
        <td><label class="switch table-switch">
          <input id="s${nap.id}" type="checkbox" ${send}>
          <span class="slider round table-slider table-round"></span>
        </label></td>
        <td><label class="switch table-switch">
        <input id="r${nap.id}" type="checkbox" ${recieve}>
        <span class="slider round table-slider table-round"></span>
      </label></td>

      <span class="badge rounded-pill bg-${calas} orderbtn">${vale}</span>
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
               <p><b>name</b>:  ${user.buyername}</p>
               <p><b>phone</b>:  ${user.buyerphone}</p>
               <p><b>location</b>:  ${user.buyerlocation}</p>
               <p><b>payment status</b>:  ${user.paymentstatus}</p>
               <p><b>order id</b>:  ${user.orderid}</p>
               <p><b>payment id</b>:  ${user.paymentid}</p>
               <p><b>pickup date</b>:  ${user.pickupdate}</p>
               <p><b>return date</b>:  ${user.returndate}</p>
               <p><b>Date of payment</b>:  ${user.dateofpay}</p>
               <p><b>Time of payment</b>:  ${user.timeofpay}</p>
               <p><b>promocode</b>:  ${user.promocode}</p>
               <h4><b>totalprice</b>:  ${user.totalprice}</p>
               <div id="p${nap.id}"></div>
               <div id="adhar${nap.id}"</div>

           </div>
       </div>
               `;

               popfield2.append(div2)


               const productfield2=document.getElementById(`p${nap.id}`)
               productfield2.innerHTML='';
               if(user.products.length>5){
                for(var i=0;i<user.products.length;i=i+5){
                  const div=document.createElement('div')
                  div.setAttribute('class',"my-orders")
                  var li=`     
                  <div class="order-pic">
                    <div class="order-pic2">
                      <div>
                        <img src="${user.products[i+3]}" alt="" width="350" height="150">
                      </div>
                  <div>
                    <h5> ${user.products[i+0]}</h5>
                 
                    <p><span>Qty: </span>&nbsp; ${user.products[i+1]}</p>
                    <p><span>Price:</span>&nbsp; ${user.products[i+2]}</p>
                  </div>                 
                    </div>
                     </div>
                  `;
                div.innerHTML=li
                productfield2.append(div)
                
                }
              }
              else{
                const div=document.createElement('div')
                div.setAttribute('class',"my-orders")
                var li=`     
                  
                <div class="order-pic">
                  <div class="order-pic2">
                    <div>
                      <img src="${user.products[3]}" alt="" width="350" height="150">
                    </div>
                  
                <div>
                  <h5> ${user.products[0]}</h5>
                  <p><span>Qty: </span>&nbsp; ${user.products[1]}</p>
                  <p><span>Price:</span>&nbsp; ${user.products[2]}</p>
                </div>        
                  </div>
                 
                  </div>
                `;
              div.innerHTML=li
              productfield2.append(div)
              
              }

              const adharfield2=document.querySelector(`#adhar${nap.id}`);
              adharfield2.innerHTML='';
              const adhardiv2=document.createElement('div')
              db.collection('users').doc(user.buyerid).collection('profile').doc(user.buyerid).get().then(snap=>{
                adhardiv2.innerHTML=`
                <p><b>adhar front</b></p>
                <img src="${snap.data().adharfront}" alt="" width="800" height="400">
                <p><b>adhar back</b></p>
                <img src="${snap.data().adharback}" alt="" width="800" height="400">
                `;
               // adharfield2.append(adhardiv2);
              })
            
            
       
               //user full details
               const fullt=document.querySelector(`#f${nap.id}`);
            //   console.log(`da${nap.id}`)
               fullt.addEventListener("click",(e)=>{
                   e.preventDefault();
                   document.querySelector(`#da${nap.id}`).style.display="block";
       
               })
               //close pop
              const closet=document.querySelector(`#x${nap.id}`)
              closet.addEventListener('click',(e)=>{
               document.querySelector(`#da${nap.id}`).style.display="none";
              })
       

        //confirm product delivered to user
        const sendp=document.getElementById(`s${nap.id}`);
        sendp.addEventListener('change',(e)=>{
            console.log("send")
            if(user.send==1) bookdb2.doc(nap.id).update({send:0})
            else bookdb2.doc(nap.id).update({send:1})
            
        })

        //confirm product recived from user
        const recp=document.getElementById(`r${nap.id}`);
        recp.addEventListener('change',(e)=>{
            console.log("recieve")
            if(user.recieve==1) bookdb2.doc(nap.id).update({recieve:0})
            else bookdb2.doc(nap.id).update({recieve:1})
            
        })
      //  increaseqty(user.orderid,user.products)
      }
    })

  
})





//total orders here






var sl=0;
const bookdb=db.collection('orders')
bookdb.orderBy("timestamp", "desc").onSnapshot(snap=>{
    orders.innerHTML='';
    sl=0;
    snap.docs.forEach(nap=>{
      sl+=1;
      //  console.log(nap.data())
        let user=nap.data();
        let productname;
        let timeofpay=user.timeofpay
      // timeofpay=timeofpay.slice(0, -31)
      timeofpay=timeofpay.replace('GMT+0530 (India Standard Time)', '');
        let send,recieve="unchecked";
        let calas="secondary",vale="Pending......."
        if(user.send==1)send="checked"
        if(user.recieve==1)recieve="checked"
        if(user.ordercomplete==1)calas="success",vale="Completed"
        if(user.products.length>5){
            productname=user.products[0]+"..."
            console.log(productname)
        }
        else productname=user.products[0];
        const tr=document.createElement('tr');
        tr.innerHTML=`
        <td>${sl}</td>
        <td id="tf${nap.id}">${user.buyername}</td>
        <td>${user.buyerphone}</td>
        <td>${user.buyerlocation}</td>
        <td id="f${nap.id}"><b>${productname}</b></td>
        <td>${user.paymentstatus}</td>
        <td>${user.totalprice}</td>
        <td>${user.dateofpay}<br> ${timeofpay} </td>
        <td>${user.pickupdate}</td>
        <td><label class="switch table-switch">
          <input id="s${nap.id}" type="checkbox" ${send}>
          <span class="slider round table-slider table-round"></span>
        </label></td>
        <td><label class="switch table-switch">
        <input id="r${nap.id}" type="checkbox" ${recieve}>
        <span class="slider round table-slider table-round"></span>
      </label></td>

      <span class="badge rounded-pill bg-${calas} orderbtn">${vale}</span>
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
               <p><b>name</b>:  ${user.buyername}</p>
               <p><b>phone</b>:  ${user.buyerphone}</p>
               <p><b>location</b>:  ${user.buyerlocation}</p>
               <p><b>payment status</b>:  ${user.paymentstatus}</p>
               <p><b>order id</b>:  ${user.orderid}</p>
               <p><b>payment id</b>:  ${user.paymentid}</p>
               <p><b>pickup date</b>:  ${user.pickupdate}</p>
               <p><b>return date</b>:  ${user.returndate}</p>
               <p><b>Date of payment</b>:  ${user.dateofpay}</p>
               <p><b>Time of payment</b>:  ${user.timeofpay}</p>
               <p><b>promocode</b>:  ${user.promocode}</p>
               <h4><b>totalprice</b>:  ${user.totalprice}</p>
               <div id="p${nap.id}"></div>
               <div id="adhar${nap.id}"</div>

           </div>
       </div>
               `;

               popfield.append(div2)


               const productfield=document.getElementById(`p${nap.id}`)
               productfield.innerHTML='';
               if(user.products.length>5){
                for(var i=0;i<user.products.length;i=i+5){
                  const div=document.createElement('div')
                  div.setAttribute('class',"my-orders")
                  var li=`     
                  <div class="order-pic">
                    <div class="order-pic2">
                      <div>
                        <img src="${user.products[i+3]}" alt="" width="350" height="150">
                      </div>
                  <div>
                    <h5> ${user.products[i+0]}</h5>
                 
                    <p><span>Qty: </span>&nbsp; ${user.products[i+1]}</p>
                    <p><span>Price:</span>&nbsp; ${user.products[i+2]}</p>
                  </div>                 
                    </div>
                     </div>
                  `;
                div.innerHTML=li
                productfield.append(div)
                
                }
              }
              else{
                const div=document.createElement('div')
                div.setAttribute('class',"my-orders")
                var li=`     
                  
                <div class="order-pic">
                  <div class="order-pic2">
                    <div>
                      <img src="${user.products[3]}" alt="" width="350" height="150">
                    </div>
                  
                <div>
                  <h5> ${user.products[0]}</h5>
                  <p><span>Qty: </span>&nbsp; ${user.products[1]}</p>
                  <p><span>Price:</span>&nbsp; ${user.products[2]}</p>
                </div>        
                  </div>
                 
                  </div>
                `;
              div.innerHTML=li
              productfield.append(div)
              
              }

              const adharfield=document.querySelector(`#adhar${nap.id}`);
              adharfield.innerHTML='';
              const adhardiv=document.createElement('div')
              db.collection('users').doc(user.buyerid).collection('profile').doc(user.buyerid).get().then(snap=>{
                adhardiv.innerHTML=`
                <p><b>adhar front</b></p>
                <img src="${snap.data().adharfront}" alt="" width="800" height="400">
                <p><b>adhar back</b></p>
                <img src="${snap.data().adharback}" alt="" width="800" height="400">
                `;
                adharfield.append(adhardiv);
              })
            
            
       
               //user full details
               const full=document.querySelector(`#tf${nap.id}`);
            //   console.log(`da${nap.id}`)
               full.addEventListener("click",(e)=>{
                  //  e.preventDefault();
                  console.log("user full details")
                   document.querySelector(`#da${nap.id}`).style.display="block";
       
               })
               //close pop
              const close=document.querySelector(`#x${nap.id}`)
              close.addEventListener('click',(e)=>{
               document.querySelector(`#da${nap.id}`).style.display="none";
              })
       

        //confirm product delivered to user
        const sendp=document.getElementById(`s${nap.id}`);
        sendp.addEventListener('change',(e)=>{
            console.log("send")
            if(user.send==1) bookdb.doc(nap.id).update({send:0})
            else bookdb.doc(nap.id).update({send:1})
            
        })

        //confirm product recived from user
        const recp=document.getElementById(`r${nap.id}`);
        recp.addEventListener('change',(e)=>{
            console.log("recieve")
            if(user.recieve==1) bookdb.doc(nap.id).update({recieve:0})
            else bookdb.doc(nap.id).update({recieve:1})
            
        })
        increaseqty(user.orderid,user.products)
    })
    
})

function increaseqty(id,products){
  db.collection('orders').doc(id).get().then(snap=>{
    console.log(snap.data().send)
    console.log(snap.data().recieve)
    console.log(snap.data().ordercomplete)
    if(snap.data().send==1 && snap.data().recieve){
      if(snap.data().ordercomplete==0){
        for(var i=0; i<products.length;i=i+5){
          console.log(products[i+4])
          console.log(products[i+1])
          minuscart(products[i+4],products[i+1])
        }
        updateorder(id);
      }
    }
  })

}

function minuscart(productid,qte){
  db.collection('categorybutton').get().then(id=>{
    id.docs.forEach(id2=>{
      for (var name of Object.keys(id2.data())) {
            // console.log("object keys",Object.keys(id2.data()).length)
        console.log("path",name);
        minuscart2(productid,qte,id2,name);
    }
    })
  })

}

function minuscart2(productid,qte,id2,name){

  db.collection('categorybutton').doc(id2.id).collection(name).get().then(snapp=>{
    console.log("category is",name)
   snapp.docs.forEach(pan=>{
     if(pan.id==productid){
     
      db.collection('categorybutton').doc(id2.id).collection(name).doc(pan.id).update({
        qty:firebase.firestore.FieldValue.increment(qte)
      }).then(()=>{
        console.log("increased")
      })

     }
   })

  })
  
}


function advancedsearch(productid,qtu){
  db.collection('categorybutton').get().then(id=>{
    id.docs.forEach(id2=>{
      for (var name of Object.keys(id2.data())) {
        console.log("object keys",Object.keys(id2.data()).length)
        console.log("path",id2.id,name)
        db.collection('categorybutton').doc(id2.id).collection(name).get().then(snapp=>{
         snapp.docs.forEach(pan=>{
           if(pan.id==productid){
             console.log("increased")
            db.collection('categorybutton').doc(id2.id).collection(name).doc(pan.id).update({
              qty:firebase.firestore.FieldValue.increment(qtu)
            })
           }
         })
    
        });
    }
    })
  })
}
function updateorder(id){
  db.collection('orders').doc(id).update({
    ordercomplete:1
  }).then(()=>{
    console.log("updating")
  })
}




const findbydate=document.getElementById('findbydate')
findbydate.addEventListener('change',(e)=>{
  const sdate=new Date(findbydate.value).toDateString()
  console.log(sdate)
  finding("dateofpay",sdate)
})




//where search
const searchbtn=document.querySelector('#searchbtn');
const orders3=document.querySelector('.orders3');
const popfield3=document.querySelector('.popfield3');
var sl3=0;
searchbtn.addEventListener('click',(e)=>{
  const searchinput=document.querySelector('#searchinput')
var citiesRef = db.collection("orders");

sl3=0;
finding("buyerphone",searchinput.value)

})


function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

//get today pickups here
const todaypicks=document.getElementById('todaypicks')
todaypicks.addEventListener('click',(e)=>{
  sl3=0;
  let pickupdate=formatDate(new Date().toDateString())
  finding("pickupdate",pickupdate)

})
todaypicks.addEventListener('change',(e)=>{
  sl3=0;
  
  let pickupdate=formatDate(new Date(formatDate(todaypicks.value)).toDateString())
  finding("pickupdate",pickupdate)

})

//get today returns here
const todayreturns=document.getElementById('todayreturns')
todayreturns.addEventListener('click',(e)=>{
  sl3=0;
  let returndate=formatDate(new Date().toDateString())
  finding("returndate",returndate)
})

todayreturns.addEventListener('change',(e)=>{
  sl3=0;
  
  let returndate=formatDate(new Date(formatDate(todayreturns.value)).toDateString())
  finding("returndate",returndate)

})


function finding(input1,input2){
  orders3.innerHTML='';
popfield3.innerHTML='';
  document.querySelector('.searchresult').style.display="block"
  var citiesRef = db.collection("orders");
// Create a query against the collection.
var query = citiesRef.where(input1, "==", input2);
query.orderBy("timestamp", "desc").onSnapshot(snap=>{
  snap.forEach(nap=>{
    console.log(nap.id ,'=>',nap.data())

   sl3+=1;
   //  console.log(nap.data())
     let user=nap.data();
     let productname;
     let timeofpay=user.timeofpay
   // timeofpay=timeofpay.slice(0, -31)
   timeofpay=timeofpay.replace('GMT+0530 (India Standard Time)', '');
     let send,recieve="unchecked";
     let calas="secondary",vale="Pending......."
     if(user.send==1)send="checked"
     if(user.recieve==1)recieve="checked"
     if(user.ordercomplete==1)calas="success",vale="Completed"
     if(user.products.length>5){
         productname=user.products[0]+"..."
         console.log(productname)
     }
     else productname=user.products[0];
     const tr=document.createElement('tr');
     tr.innerHTML=`
     <td>${sl3}</td>
     <td id="f${nap.id}">${user.buyername}</td>
     <td>${user.buyerphone}</td>
     <td>${user.buyerlocation}</td>
     <td id="f${nap.id}"><b>${productname}</b></td>
     <td>${user.paymentstatus}</td>
     <td>${user.totalprice}</td>
     <td>${user.dateofpay}<br> ${timeofpay} </td>
     <td>${user.pickupdate}</td>
     <td><label class="switch table-switch">
       <input id="s${nap.id}" type="checkbox" ${send}>
       <span class="slider round table-slider table-round"></span>
     </label></td>
     <td><label class="switch table-switch">
     <input id="r${nap.id}" type="checkbox" ${recieve}>
     <span class="slider round table-slider table-round"></span>
   </label></td>

   <span class="badge rounded-pill bg-${calas} orderbtn">${vale}</span>
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
            <p><b>name</b>:  ${user.buyername}</p>
            <p><b>phone</b>:  ${user.buyerphone}</p>
            <p><b>location</b>:  ${user.buyerlocation}</p>
            <p><b>payment status</b>:  ${user.paymentstatus}</p>
            <p><b>order id</b>:  ${user.orderid}</p>
            <p><b>payment id</b>:  ${user.paymentid}</p>
            <p><b>pickup date</b>:  ${user.pickupdate}</p>
            <p><b>return date</b>:  ${user.returndate}</p>
            <p><b>Date of payment</b>:  ${user.dateofpay}</p>
            <p><b>Time of payment</b>:  ${user.timeofpay}</p>
            <p><b>promocode</b>:  ${user.promocode}</p>
            <h4><b>totalprice</b>:  ${user.totalprice}</p>
            <div id="p${nap.id}"></div>
            <div id="adhar${nap.id}"</div>

        </div>
    </div>
            `;

            popfield3.append(div2)


            const productfields=document.getElementById(`p${nap.id}`)
            productfields.innerHTML='';
            if(user.products.length>5){
             for(var i=0;i<user.products.length;i=i+5){
               const div=document.createElement('div')
               div.setAttribute('class',"my-orders")
               var li=`     
               <div class="order-pic">
                 <div class="order-pic2">
                   <div>
                     <img src="${user.products[i+3]}" alt="" width="350" height="150">
                   </div>
               <div>
                 <h5> ${user.products[i+0]}</h5>
              
                 <p><span>Qty: </span>&nbsp; ${user.products[i+1]}</p>
                 <p><span>Price:</span>&nbsp; ${user.products[i+2]}</p>
               </div>                 
                 </div>
                  </div>
               `;
             div.innerHTML=li
             productfields.append(div)
             
             }
           }
           else{
             const div=document.createElement('div')
             div.setAttribute('class',"my-orders")
             var li=`     
               
             <div class="order-pic">
               <div class="order-pic2">
                 <div>
                   <img src="${user.products[3]}" alt="" width="350" height="150">
                 </div>
               
             <div>
               <h5> ${user.products[0]}</h5>
               <p><span>Qty: </span>&nbsp; ${user.products[1]}</p>
               <p><span>Price:</span>&nbsp; ${user.products[2]}</p>
             </div>        
               </div>
              
               </div>
             `;
           div.innerHTML=li
           productfields.append(div)
           
           }

           const adharfields=document.querySelector(`#adhar${nap.id}`);
           adharfields.innerHTML='';
           const adhardivs=document.createElement('div')
           db.collection('users').doc(user.buyerid).collection('profile').doc(user.buyerid).get().then(snap=>{
             adhardivs.innerHTML=`
             <p><b>adhar front</b></p>
             <img src="${snap.data().adharfront}" alt="" width="800" height="400">
             <p><b>adhar back</b></p>
             <img src="${snap.data().adharback}" alt="" width="800" height="400">
             `;
             adharfields.append(adhardivs);
           })
         
         
    
            //user full details
            const fulls=document.querySelector(`#f${nap.id}`);
         //   console.log(`da${nap.id}`)
            fulls.addEventListener("click",(e)=>{
                e.preventDefault();
                document.querySelector(`#da${nap.id}`).style.display="block";
    
            })
            //close pop
           const closes=document.querySelector(`#x${nap.id}`)
           closes.addEventListener('click',(e)=>{
            document.querySelector(`#da${nap.id}`).style.display="none";
           })
    

     //confirm product delivered to user
     const sendp=document.getElementById(`s${nap.id}`);
     sendp.addEventListener('change',(e)=>{
         console.log("send")
         if(user.send==1) bookdb.doc(nap.id).update({send:0})
         else bookdb.doc(nap.id).update({send:1})
         
     })

     //confirm product recived from user
     const recp=document.getElementById(`r${nap.id}`);
     recp.addEventListener('change',(e)=>{
         console.log("recieve")
         if(user.recieve==1) bookdb.doc(nap.id).update({recieve:0})
         else bookdb.doc(nap.id).update({recieve:1})
         
     })
     increaseqty(user.orderid,user.products)
 })





  })
}