



//home sliders
const homesliders=document.querySelector('.image-div')
db.collection('homesliders').onSnapshot(snap=>{
 let count=0;
 homesliders.innerHTML="";
    snap.docs.forEach(nap => {
      //  console.log(nap.data().slider)
        let slide=nap.data().sliders;
        slide.forEach(cap=>{
            
            const div=document.createElement('div');
            console.log(cap);
            div.innerHTML=`
            <img src="${cap}" alt="alt" id="i${count}">
            <p class="close" id="r${count}">x</p>
            `;
            homesliders.append(div)
            console.log(count)
            const close=document.querySelector(`#r${count}`)
            const imagelink=document.querySelector(`#i${count}`).src;
            close.addEventListener('click',(e)=>{
                removeslide(imagelink);
            })
            count=count+1;
        })
    });
})

//removing photo in home sliders
function removeslide(link){
    console.log("removing items in sliding")
    db.collection('homesliders').doc('sliding').update({
            sliders : firebase.firestore.FieldValue.arrayRemove(link)
    })
    .then(function(){
        console.log("removed")
    })
    .catch(err=> console.log(err,"error while removing items in sliding"))
}



//upload new photo to sliders
const adharfront=document.querySelector('.adharfront');
adharfront.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    console.log("adhar click")
    uploaderf=document.querySelector('#uploaderf');
   // crate storage ref
  var storageref=storage.ref('homesliders/' + file.name);

     //upload file
   var task=storageref.put(file);

      //update progress bar
  task.on('state_changed',
  function progress(snapshot){
    var percentage=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
    uploaderf.value=percentage;
  },
    function error(err){
    console.log(err)
  },
  function complete(){
  console.log("adhar front uploaded successfully")
  task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
    db.collection('homesliders').doc('sliding').update({
        sliders:firebase.firestore.FieldValue.arrayUnion(downloadURL)
    })
    uploaderf.value=0;
  });
}
  );

})

//terms and conditions adding here
termssubmit=document.getElementById('termssubmit')
termssubmit.addEventListener('click',(e)=>{
  e.preventDefault();
  let terms=document.getElementById('termsarea')
  db.collection('termsandconditions').doc('terms').update({
    terms:terms.value
  }).then(()=>{
    alert("terms added successfully");
  })
})


//getting terms and conditons hrer
db.collection('termsandconditions').doc('terms').onSnapshot(snap=>{
  console.log(snap.data().terms)
  document.getElementById('termsarea').value=snap.data().terms
})




//about us adding here
aboutsubmit=document.getElementById('aboutsubmit')
aboutsubmit.addEventListener('click',(e)=>{
  e.preventDefault();
  let about=document.getElementById('aboutarea')
  db.collection('termsandconditions').doc('about').update({
    about:about.value
  }).then(()=>{
    alert("about us added successfully");
  })
})










//getting about us
db.collection('termsandconditions').doc('about').onSnapshot(snap=>{
 // console.log(snap.data().terms)
  document.getElementById('aboutarea').value=snap.data().about
})