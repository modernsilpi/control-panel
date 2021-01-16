const userlist=document.querySelector('.userslist');
const popfield=document.querySelector('.popfield');
// const usermain=document.querySelector('.usersmain');
db.collection('users').orderBy("timestamp", "desc").get().then(snap=>{ 
    userlist.innerHTML='';
    sl=0;
    snap.forEach(nap=>{
        userlist.innerHTML='';
      //  console.log(nap.id)
        printusers(nap.id);
    })
})
var sl=0;
function printusers(id){
    let userdb=db.collection('users').doc(id).collection('profile').doc(id)
    const div=document.createElement('tr');
    userdb.get().then(snap=>{
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
          <td id="e${id}"><button class="btn btn-dark">edit</button></td>
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
        <p><b>adhar number</b>:${snap.data().adharnumber}</p>
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

        //edit user details
        const edit=document.querySelector(`#e${id}`);
        edit.addEventListener('click',(e)=>{
            document.querySelector('#editsections').style.display='block';
            console.log("edit id",id)
            pushdetails(id)
        })
    })

}

function resetall(){
    ename.value='';
    ephone.value='';
    ealtphone.value='';
    eadharnumber.value='';
    eadharfront.value='';
    eadharback.value='';
     euploaderf.value='0';
     euploaderb.value='0';
    eotherid.value='';
     eotheridp.value='0';
    eprofile.value='';
     eprofilep.value='0';
    elocation.value='';
    eprofession.value='';
    eadharfrontl='';
    eadharbackl='';
    eotheridl='';
    eprofilel='';
    document.querySelector('#editsections').style.display='none'
}

const ename=document.getElementById('ename');
const ephone=document.getElementById('ephone');
const ealtphone=document.getElementById('ealtphone');
const eadharnumber=document.getElementById('eadharnumber');
const eadharfront=document.getElementById('eadharfront');
const eadharback=document.getElementById('eadharback');
const euploaderf=document.getElementById('euploaderf');
const euploaderb=document.getElementById('euploaderb');
const eotherid=document.getElementById('eotherid');
const eotheridp=document.getElementById('eotheridp');
const eprofile=document.getElementById('eprofile');
const eprofilep=document.getElementById('eprofilep');
const elocation=document.getElementById('elocation');
const eprofession=document.getElementById('eprofession');
const uid=document.querySelector('.forms-groups')

var eadharfrontl;
var eadharbackl;
var eotheridl;
var eprofilel;

function pushdetails(id){
    db.collection('users').doc(id).collection('profile').doc(id).get().then(snap=>{
        ename.setAttribute("value",snap.data().name);
        ephone.setAttribute("value",snap.data().phone);
        ealtphone.setAttribute("value",snap.data().altnumber);
        elocation.setAttribute("value",snap.data().location);
        eprofession.setAttribute("value",snap.data().profession);
        eadharnumber.setAttribute("value",snap.data().adharnumber)
        uid.setAttribute("id",id)
        eadharfrontl=snap.data().adharfront;
        eadharbackl=snap.data().adharback;
        eotheridl=snap.data().otherid;
        eprofilel=snap.data().profilepic;
    })
}


//updating user data here

function accessto(){
    let userids=uid.getAttribute('id')
    db.collection('users').doc(userids).collection('profile').doc(userids).set({
        name:ename.value,
        phone:ephone.value,
        location:elocation.value,
        adharfront:eadharfrontl,
        adharback:eadharbackl,
        promocode:"eligible",
        status:"active",
        altnumber:ealtphone.value,
        profession:eprofession.value,
        otherid:eotheridl,
        profilepic:eprofilel,
        adharnumber:eadharnumber.value,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
    }).then(function(){ 
    //  document.querySelector('.back-layer').style.display="none";
     return db.collection('users').doc(userids).set({
         
        adharnumber:eadharnumber.value,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      phone:ephone.value
    })
}).then(()=>{
    alert("updated");
    resetall();
})
}








//adhar card front
eadharfront.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    fileuploader(file,euploaderf,1)

})
//adhar card back
eadharback.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    fileuploader(file,euploaderb,2)

})
//other id
eotherid.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    fileuploader(file,eotheridp,3)

})
//profile pic
eprofile.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    fileuploader(file,eprofilep,4)

})





function fileuploader(file,progress,val){
var flink;
    uploaderf2=progress
    // crate storage ref
   var storageref=storage.ref(`users/edits/` + file.name);
   
      //upload file
    var task=storageref.put(file);
 
       //update progress bar
   task.on('state_changed',
   function progress(snapshot){
     var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
     uploaderf2.value=percentage;
   },
     function error(err){
     console.log(err)
   },
   
   function complete(){
   console.log("adhar front uploaded successfully")
   task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
     console.log('File available at', downloadURL);
    if(val==1)eadharfrontl=downloadURL;
    if(val==2)eadharbackl=downloadURL;
    if(val==3)eotheridl=downloadURL;
    if(val==4)eprofilel=downloadURL;
   });
 
 }
   );
}
   
































document.querySelector('#editsections').style.display='none'
//search user by phone number
const searchbtn=document.querySelector('#searchbtn');
const orders3=document.querySelector('.orders3');
const popfield3=document.querySelector('.popfield3');
var sl3=0;
searchbtn.addEventListener('click',(e)=>{
  const searchinput=document.querySelector('#searchinput')
sl3=0;
finding("phone",searchinput.value)

})


function finding(input1,input2){
    orders3.innerHTML='';
  popfield3.innerHTML='';
    document.querySelector('.searchresult').style.display="block"
    var citiesRef = db.collection("users");
  // Create a query against the collection.
  var query = citiesRef.where(input1, "==", input2);
  query.onSnapshot(snap=>{
    snap.forEach(nap=>{
        console.log(nap.id)
        printusers2(nap.id);
    })
    })
}

function printusers2(id){
    let userdb=db.collection('users').doc(id).collection('profile').doc(id)
    const div=document.createElement('tr');
    userdb.get().then(snap=>{
        sl3+=1;
        console.log(snap.data())
        var statee="unchecked";
        if(snap.data().status==="active"){
            statee="checked";
        }
        div.setAttribute('id',id)
        div.innerHTML=` 
          <td>${sl3}</td>
          <td id="f${id}">${snap.data().name}</td>
          <td>${snap.data().phone}</td>
          <td>${snap.data().location}</td>
          <td>${snap.data().status}</td>

          <td><label class="switch table-switch">
            <input id="s${id}" type="checkbox" ${statee}>
            <span class="slider round table-slider table-round"></span>
          </label></td>
          <td id="e${id}"><button class="btn btn-dark">edit</button></td>
                    
        `;
        orders3.append(div);

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
        <p><b>adhar number</b>:${snap.data().adharnumber}</p>
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
        popfield3.append(div2)

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

                //edit user details
                const edit=document.querySelector(`#e${id}`);
                edit.addEventListener('click',(e)=>{
                    document.querySelector('#editsections').style.display='block';
                    console.log("edit id",id)
                    pushdetails(id)
                })

    })

}