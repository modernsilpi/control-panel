const orders=document.querySelector('.orders')
const popfield=document.querySelector('.popfield');

const bookdb=db.collection('orders')
bookdb.onSnapshot(snap=>{
    orders.innerHTML='';
    snap.docs.forEach(nap=>{
        console.log(nap.data())
        let user=nap.data();
        let productname;
        let send,recieve="unchecked";
        if(user.send==1)send="checked"
        if(user.recieve==1)recieve="checked"
        if(user.products.length>5){
            productname=user.products[0]+"..."
            console.log(productname)
        }
        else productname=user.products[0];
        const tr=document.createElement('tr');
        tr.innerHTML=`
        <td id="f${nap.id}">${user.buyername}</td>
        <td>${user.buyerphone}</td>
        <td>${user.buyerlocation}</td>
        <td id="f${nap.id}"><b>${productname}</b></td>
        <td>${user.paymentstatus}</td>
        <td>${user.totalprice}</td>
        <td><label class="switch table-switch">
          <input id="s${nap.id}" type="checkbox" ${send}>
          <span class="slider round table-slider table-round"></span>
        </label></td>
        <td><label class="switch table-switch">
        <input id="r${nap.id}" type="checkbox" ${recieve}>
        <span class="slider round table-slider table-round"></span>
      </label></td>
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
               <p><b>payment At</b>:  ${user.paymentAt}</p>
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