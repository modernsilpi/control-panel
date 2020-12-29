const userlist=document.querySelector('.userslist');
// const usermain=document.querySelector('.usersmain');
db.collection('users').onSnapshot(snap=>{ 
   
    snap.forEach(nap=>{
      
      //  console.log(nap.id)
        printusers(nap.id);
    })
})

function printusers(id){
    let userdb=db.collection('users').doc(id).collection('profile').doc(id)
    const div=document.createElement('tr');
    userdb.onSnapshot(snap=>{
        console.log(snap.data())
        var statee="unchecked";
        if(snap.data().status==="active"){
            statee="checked";
        }
        div.setAttribute('id',id)
        div.innerHTML=` 
          <td>${snap.data().name}</td>
          <td>${snap.data().phone}</td>
          <td>${snap.data().location}</td>
          <td>${snap.data().status}</td>
          <td><label class="switch table-switch">
            <input id="s${id}" type="checkbox" ${statee}>
            <span class="slider round table-slider table-round"></span>
          </label></td>
        `;
        userlist.append(div);
        const swt=document.querySelector(`#s${id}`);
        swt.addEventListener('click',(e)=>{
           
            console.log("clicked",id)
            if(snap.data().status==="active"){
                userdb.update({status:"inactive"})
                
            }
            else userdb.update({status:"active"})
        })
    })

}

