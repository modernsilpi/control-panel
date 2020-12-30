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
        if(user.products.length>4){
            productname=user.products[0]+"..."
            console.log(productname)
        }
        else productname=user.products[0];
        const tr=document.createElement('tr');
        tr.innerHTML=`
        <td id="f${nap.id}">${user.buyername}</td>
        <td>${user.buyerphone}</td>
        <td>${user.buyerlocation}</td>
        <td><b>${productname}</b></td>
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
           </div>
       </div>
               `;

               popfield.append(div2)
               const productfield=document.getElementById(`p${nap.id}`)
               if(user.products.length>4){
                for(var i=0;i<user.products.length;i=i+4){
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
            
            
       
               //user full details
               const full=document.querySelector(`#f${nap.id}`);
               console.log(`da${nap.id}`)
               full.addEventListener('click',(e)=>{
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
    })
})