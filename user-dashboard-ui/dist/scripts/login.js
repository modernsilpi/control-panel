document.querySelector('.back-layer2').style.display="none";
//checking current user
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
     console.log("user login")
     //displaying username
adminname=document.querySelector('.admin-name')
db.collection('users').doc(firebase.auth().currentUser.uid).collection('profile').doc(firebase.auth().currentUser.uid).onSnapshot(snap=>{
  //  console.log(snap.data().name)
    adminname.innerHTML=snap.data().name;
})
    } 
    else {
     console.log("user not login")  
    }
    })



const loginbtn=document.querySelector('.loginbtn');
var count=0;
loginbtn.addEventListener('click',(e)=>{
if(count==0){
    document.querySelector('.back-layer2').style.display="block";
    count=1;
}
else{
    document.querySelector('.back-layer2').style.display="none";
    count=0;
}
})

//login
const lgenerateotp=document.querySelector('.lgenerateotp');
window.lrecaptchaVerifier = new firebase.auth.RecaptchaVerifier('lrecaptcha-container');
lgenerateotp.addEventListener('click', (e)=>{
    const numm="+91" + document.querySelector('.lphonenumber').value;
    console.log(numm);
  firebase.auth().signInWithPhoneNumber(numm,window.lrecaptchaVerifier) 
  .then(function(lconfirmationResult) {
    window.lconfirmationResult = lconfirmationResult;
    console.log(lconfirmationResult);
    document.querySelector('#lrecaptcha-container').style.display="none";
  });
})
lverifyotp=document.querySelector('.lverifyotp');
lverifyotp.addEventListener('click',(e)=>{
    console.log(document.querySelector('.lverificationcode').value);
   
    window.lconfirmationResult.confirm(document.querySelector(".lverificationcode").value)
    .then(function(result) {
        //add user data to db
        phonenumber=document.querySelector('.lphonenumber').value;
      console.log(result);
      document.querySelector('.back-layer2').style.display="none";
    }).catch(function(error) {
      console.log(error);
    });
}) 

//logout
const logoutbtn=document.querySelector('.logoutbtn')
logoutbtn.addEventListener('click',(e)=>{
    firebase.auth().signOut().then(()=>{
        console.log("logout successfully");
    })
})


