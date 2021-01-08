const userlist=document.querySelector('.userslist');
const popfield=document.querySelector('.popfield');
// const usermain=document.querySelector('.usersmain');
db.collection('users').onSnapshot(snap=>{ 
    userlist.innerHTML='';
    sl=0;
    snap.docs.forEach(nap=>{
       
      //  console.log(nap.id)
        printusers(nap.id);
    })
})
var sl=0;
function printusers(id){
    let userdb=db.collection('users').doc(id).collection('profile').doc(id)
    const div=document.createElement('tr');
    userdb.onSnapshot(snap=>{
        sl+=1;
        console.log(snap.data())
        var statee="unchecked";
        if(snap.data().status==="active"){
            statee="checked";
        }
        div.setAttribute('id',id)
        div.innerHTML=` 
          <td>${sl}</td>
          <td id="f${id}">${snap.data().name}</td>
          <td>${snap.data().phone}</td>
          <td>${snap.data().location}</td>
          <td>${snap.data().status}</td>
          <td><label class="switch table-switch">
            <input id="s${id}" type="checkbox" ${statee}>
            <span class="slider round table-slider table-round"></span>
          </label></td>
        `;
        userlist.append(div);

        //append popupbox
        console.log("popup")
        const div2=document.createElement('div')
        div2.innerHTML=`
        <div class="hover_bkgr_fricc" id="da${id}">
    <span class="helper"></span>
    <div>
        <div class="popupCloseButton" id="x${id}">&times;</div>
        <p><b>Name</b>:${snap.data().name}</p>
        <p><b>Phone number</b>:${snap.data().phone}</p>
        <p><b>Alternative Phone number</b>:${snap.data().altnumber}</p>
        <p><b>Profession</b>:${snap.data().profession}</p>
        <p><b>Location</b>:${snap.data().location}</p>
        <p><b>Status</b>:${snap.data().status}</p>
        <h4><b>profile pic</b></h4>
        <img src="${snap.data().profilepic}" alt="" width="500" height="200">

        <h4><b>Adhar front</b></h4>
        <img src="${snap.data().adharfront}" alt="" width="800" height="400">
        <h4><b>Adhar back</b></h4>
        <img src="${snap.data().adharback}" alt="" width="800" height="400">

        <h4><b>other proofs</b></h4>
        <img src="${snap.data().otherid}" alt="" width="800" height="400">
    </div>
</div>
        `;
        popfield.append(div2)

        //user full details
        const full=document.querySelector(`#f${id}`);
       // console.log(`da${id}`)
        full.addEventListener('click',(e)=>{
            e.preventDefault();
            document.querySelector(`#da${id}`).style.display="block";

        })
        //close pop
       const close=document.querySelector(`#x${id}`)
       close.addEventListener('click',(e)=>{
        document.querySelector(`#da${id}`).style.display="none";
       })

        //active and inactive code
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

