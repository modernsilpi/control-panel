//promo codes

//promo code list
const promo=document.querySelector('.promocodelist')
db.collection('promocodes').onSnapshot(snap=>{
    promo.innerHTML="";
    snap.docs.forEach(nap=>{
        const div=document.createElement('div');
        console.log(nap.id)
        div.innerHTML=`
        <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">code</th>
            <th scope="col">cut off</th>
            <th scope="col">Off</th>
            <th scope="col">Type</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">${nap.data().promocode}</th>
            <td>${nap.data().cutoff}</td>
            <td>${nap.data().off}</td>
            <td>${nap.data().type}</td>
            <td>${nap.data().status}</td>
            <td><button id=${nap.id}>click</button></td>
            <td><button id=d${nap.id}>click</button></td>
          </tr>
        </tbody>
      </table> 
        `;
        promo.append(div);

        //updating status of promocode
        const check=document.querySelector(`#${nap.id}`);
        check.addEventListener('click',(e)=>{
            if(nap.data().status=="inactive"){
                db.collection('promocodes').doc(nap.id).update({
                    status:"active"
                })

            }
            else{
                db.collection('promocodes').doc(nap.id).update({
                    status:"inactive"
                })
            }
            
        })

        //deleting promo code here
        const del=document.querySelector(`#d${nap.id}`)
        del.addEventListener('click',(e)=>{
            db.collection('promocodes').doc(nap.id).delete();
            console.log("del promo")
        })
    })
})


//block and none the new promo code form
const add=document.querySelector('.createpromo');
document.querySelector('.promocode-form').style.display="none";
var count=0;
add.addEventListener('click',(e)=>{
    console.log("add")
    if(count==0){
        document.querySelector('.promocode-form').style.display="block";
        count=1;
    }
    else{
        document.querySelector('.promocode-form').style.display="none";
        count=0;

    }
})


//add new promo code here

function makeapromo(){
    console.log("new promo")
    const code=document.querySelector('#promocode').value;
    const cutoff=document.querySelector('#cutoff').value;
    const type=document.querySelector('#type').value;
    const amount=document.querySelector('#amount').value;
    const status=document.querySelector('#status').value;

    console.log(code,cutoff,type,amount,status);
    db.collection('promocodes').doc().set({
        cutoff:cutoff,
        promocode:code,
        type:type,
        off:amount,
        status:status
    }).then(()=>{
        console.log("promo added succefully");
        document.querySelector('#promocode').value='';
        document.querySelector('#cutoff').value='';
        document.querySelector('#type').value='';
        document.querySelector('#amount').value='';
        document.querySelector('#status').value='';
        document.querySelector('.promocode-form').style.display="none";

    }).catch(err=>{console.log(err)})
}

//access to (priority) promo codes
function accessto(){
    const access=document.querySelector('#access').value
    // if(access=="all"){

    // }
    console.log(access)
}

// const newpromo=document.querySelector('.promocodesubmit')
// newpromo.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     console.log("new promo")
//     const code=document.querySelector('#promocode').value;
//     const cutoff=document.querySelector('#cutoff').value;
//     const type=document.querySelector('#type').value;
//     const amount=document.querySelector('#amount').value;
//     const status=document.querySelector('#status').value;

//     console.log(code,cutoff,type,amount,status);

// })
