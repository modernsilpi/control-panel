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
               <p><b>name</b>:${user.buyername}</p>
               <p><b>phone</b>:${user.buyerphone}</p>
               <p><b>location</b>:${user.buyerlocation}</p>
               <p><b>name</b>:${user.paymentstatus}</p>
           </div>
       </div>
               `;
               popfield.append(div2)
       
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