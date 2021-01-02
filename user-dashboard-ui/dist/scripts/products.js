
//appending all categories sub categories and getting input data
const productbtn=document.querySelector('.productbtn')
document.querySelector('.product-form').style.display="none";
document.querySelector('.productdiv').style.display="none";
var count=0;
productbtn.addEventListener('click',(e)=>{
if(count==0){document.querySelector('.product-form').style.display="block";count=1;}
else{document.querySelector('.product-form').style.display="none";count=0;}
})

var maincategory;
var subcategory;

const buttonscontainer=document.querySelector('.buttons-container')
db.collection('categorybutton').onSnapshot(snap=>{
    snap.forEach(nap=>{
        let maincat;
     //   console.log(nap.data())
        const div=document.createElement('div');
        div.innerHTML=`
        <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="main${nap.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          ${nap.id}
        </button>
        <div class="dropdown-menu" id="sub${nap.id}" aria-labelledby="dropdownMenuButton">

        </div>
      </div>
        `;
        buttonscontainer.append(div)
        const subcat=document.getElementById(`sub${nap.id}`)
        for (var name of Object.keys(nap.data())) {
            console.log(name)
        const div2=document.createElement('div')
        div2.innerHTML=`
        <a class="dropdown-item camcut" data-id="${name}" id="${name}" href="#">${name}</a>
        `;
        subcat.append(div2);
        const sub=document.getElementById(`${name}`)
        sub.addEventListener('click',(e)=>{
            const target=e.target.closest('.camcut')
            if (!target) return;
            const id = target.dataset.id;
            subcategory=id;
             console.log(maincat,id)
             document.querySelector('.productdiv').style.display="block";
             search2(maincat,id)

        })
        }

        const mainbtn=document.getElementById(`main${nap.id}`);
        mainbtn.addEventListener('click',(e)=>{
             console.log(nap.id)
            maincat=nap.id
            maincategory=nap.id
            document.querySelector('.productdiv').style.display="none";
            search1(maincat)
        })

    })
})



//search all prodcuts here
function search1(id){
    let productdb=db.collection('categorybutton')
    productdb.doc(id).onSnapshot(snap=>{
        unique.innerHTML='';
        for (var name of Object.keys(snap.data())) {
            console.log(name)
            productdb.doc(id).collection(name).get().then(nap=>{
             
                nap.forEach(cap=>{
                    // console.log(cap.data())

                })
                append1(nap)
            })
        }
    })
}

//search only selected product
function search2(id,sub){
    let productdb=db.collection('categorybutton')
    productdb.doc(id).collection(sub).onSnapshot(nap=>{
        unique.innerHTML='';
        append1(nap)
    })

}

//append product here
const unique=document.querySelector('.unique')
function append1(data){
  
    data.forEach(nap=>{
        const div=document.createElement('div')
        div.setAttribute('class','marginCard')
        // div.setAttribute('id',nap.id)
        div.innerHTML=`
        <div class="col-lg-3 col-md-4 col-sm-6">  
        <div class="card" style="width: 18rem;" id="${nap.id}">
            <img class="card-img-top" src="${nap.data().link}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title" >Model: ${nap.data().name}</h5>
              <div class="rate-qty">
              <p class="card-text">qty: ${nap.data().qty}</p>
              <p class="card-text">price: &#8377; ${nap.data().price}</p>
              </div><br>
              <a href="#" class="btn btn-primary rentit" id="e${nap.id}"><b>Edit</b></a>
              <a href="#" class="btn btn-danger rentit" id="d${nap.id}"><b>Delete</b></a>
            </div>
            </div>
            </div>
        `
        unique.append(div);

        //edit product
        const editt=document.getElementById(`e${nap.id}`)
        editt.addEventListener('click',(e)=>{
            e.preventDefault()
            document.querySelector('.productdiv2').style.display="block"
            editandsave(nap.id)
        })

        //delete product
        const deletee=document.getElementById(`d${nap.id}`)
        deletee.addEventListener('click',(e)=>{
            e.preventDefault();
            // db.collection('categorybutton').doc(maincategory).collection(subcategory).doc(nap.id).delete()
            // .then(()=>{
            //     alert("deleted");
            // })
            findtodelete(nap.id)
        })
    })
}


// add products 
const newproduct=document.querySelector('.newproduct');
function addproduct(){
    console.log("new product")
    let name=document.getElementById("model")
    let price=document.getElementById("price")
    let qty=document.getElementById("qty")
    let link=productlink;
         newp=db.collection('categorybutton').doc(maincategory).collection(subcategory).doc().set({
            name:name.value,
            price:price.value,
            qty:qty.value,
            link:link
        }).then(()=>{
            name.value='';
            price.value='';
            qty.value='';
            document.querySelector('#uploaderf').value=0;
            document.querySelector('.product-form').style.display="none";
            alert("product added succefully")
        })
    
}


//product pic uploading 
var productlink;
const adharfront=document.querySelector('.adharfront')
adharfront.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    console.log("adhar click")
    uploaderf=document.querySelector('#uploaderf');
   // crate storage ref
  var storageref=storage.ref(`photo/${maincategory}/${subcategory}/` + file.name);

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
    productlink=downloadURL
  });
}
  );

})

//edit product here
function editandsave(productid){
    const model2=document.getElementById('model2')
    const qty2=document.getElementById('qty2')
    const price2=document.getElementById('price2')
    db.collection('categorybutton').get().then(id=>{
      id.docs.forEach(id2=>{
        for (var name of Object.keys(id2.data())) {
              // console.log("object keys",Object.keys(id2.data()).length)
          console.log("path",name);
          saveandedit2(productid,id2,name);
      }
      })
    })
  
  }

  
  function saveandedit2(pid,id2,name){
    const model2=document.getElementById('model2')
    const qty2=document.getElementById('qty2')
    const price2=document.getElementById('price2')
    const editpro=document.querySelector('.editpro')
    db.collection('categorybutton').doc(id2.id).collection(name).get().then(snapp=>{
      console.log("category is",name)
     snapp.docs.forEach(cap=>{
        if(cap.id==pid){
            db.collection('categorybutton').doc(id2.id).collection(name).doc(cap.id).get().then(pup=>{
                console.log(pup.data())
                editpro.setAttribute("id",pup.id)
                model2.setAttribute("value",pup.data().name)
                qty2.setAttribute("value",pup.data().qty)
                price2.setAttribute("value",pup.data().price)
            })
 
        }
     })

    })
    
  }



//save edited product here
function editproduct(){
    let id=document.querySelector('.editpro').getAttribute('id')
    console.log(id)
    editproduct2(id)
}
function editproduct2(productid){
    db.collection('categorybutton').get().then(id=>{
      id.docs.forEach(id2=>{
        for (var name of Object.keys(id2.data())) {
              // console.log("object keys",Object.keys(id2.data()).length)
          console.log("path",name);
          editproduct3(productid,id2,name);
      }
      })
    })
  
  }

  
  function editproduct3(productid,id2,name){
    let name2=document.getElementById('model2')
    let price2=document.getElementById('price2')
    let qty2=document.getElementById('qty2')
    let photo2=productlink2;
    db.collection('categorybutton').doc(id2.id).collection(name).get().then(snapp=>{
      console.log("category is",name)
     snapp.docs.forEach(pan=>{
       if(pan.id==productid){
        db.collection('categorybutton').doc(id2.id).collection(name).doc(productid).update({
            name:name2.value,
            price:price2.value,
            qty:qty2.value,
            link:photo2
        }).then(()=>{
            name2.value='';
            price2.value='';
            qty2.value='';
            document.querySelector('#uploaderf2').value=0;
            document.querySelector('.productdiv2').style.display="none";
            alert("edited")
        })

       }
     })

    })
    
  }

// edit pic uploading 
var productlink2;
const adharfront2=document.querySelector('.adharfront2')
adharfront2.addEventListener('change',(e)=>{
    var file=e.target.files[0];
    console.log("adhar click2")
    uploaderf2=document.querySelector('#uploaderf2');
   // crate storage ref
  var storageref=storage.ref(`photo/` + file.name);

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
    productlink2=downloadURL
  });
}
  );

})
























//find product and delete
function findtodelete(productid){
    db.collection('categorybutton').get().then(id=>{
      id.docs.forEach(id2=>{
        for (var name of Object.keys(id2.data())) {
              // console.log("object keys",Object.keys(id2.data()).length)
          console.log("path",name);
          minuscart2(productid,id2,name);
      }
      })
    })
  
  }

  
  function minuscart2(productid,id2,name){

    db.collection('categorybutton').doc(id2.id).collection(name).get().then(snapp=>{
      console.log("category is",name)
     snapp.docs.forEach(pan=>{
       if(pan.id==productid){
        db.collection('categorybutton').doc(id2.id).collection(name).doc(productid).delete()

       }
     })

    })
    
  }


//append all product when refresh
let productdbc=db.collection('categorybutton')
productdbc.onSnapshot(tap=>{
    tap.forEach(main=>{
        productdbc.doc(main.id).onSnapshot(snap=>{
            for (var name of Object.keys(snap.data())) {
                console.log(name)
                productdbc.doc(main.id).collection(name).get().then(nap=>{
                 
                    // nap.forEach(cap=>{
    
                    // })
                    append1(nap)
                })
            }
        })
    })

})

const allcategories=document.querySelector('.allcategories')
allcategories.addEventListener('click',(e)=>{
    e.preventDefault();
    unique.innerHTML='';
    let productdbc=db.collection('categorybutton')
productdbc.onSnapshot(tap=>{
    tap.forEach(main=>{
        productdbc.doc(main.id).onSnapshot(snap=>{
            for (var name of Object.keys(snap.data())) {
                console.log(name)
                productdbc.doc(main.id).collection(name).get().then(nap=>{
                    append1(nap)
                })
            }
        })
    })

})
})