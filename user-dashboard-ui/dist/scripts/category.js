const catbut=document.querySelector('.category-buttons')

db.collection('categorybutton').onSnapshot(snap=>{
    catbut.innerHTML="";
    snap.docs.forEach(nap=>{

        const div=document.createElement('div')
    
        div.innerHTML=`
        <button class="btn btn-dark">${nap.id}</button>
        <a class="btn btn-success" id="as${nap.id}">Add</a>
        <a class="btn btn-danger" id="d${nap.id}">X</a>
        <div class="category-input" id="div${nap.id}">
        <input type="text" class="form-control" id="in${nap.id}">
        <input type="button" class="btn btn-primary" id="s${nap.id}" value="submitt">
        
    </div>
        `;
        catbut.append(div);

        for (var name of Object.keys(nap.data())) {
            console.log(name)
            const div2=document.createElement('div')
            div2.innerHTML=`
            <p>${name}<a class="btn btn-danger" id="${name}">x</a></p>
            
            `
            div.append(div2)
            //deleting subcate
            const subca=document.getElementById(`${name}`);
            subca.addEventListener('click',(e)=>{
                var ids =e.target.getAttribute('id')
                console.log(ids,nap.id)
                let mainid=nap.id
                db.collection('categorybutton').doc(nap.id).collection(ids).get().then(nap=>{
                    nap.forEach(cap=>{
                         db.collection('categorybutton').doc(mainid).collection(ids).doc(cap.id).delete();
                        // console.log(mainid)
                        // console.log(ids)
                        // console.log(cap.id)
                    })
                }).then(()=>{
                    return db.collection('categorybutton').doc(nap.id).update({
                        [ids]:firebase.firestore.FieldValue.delete()
                    })
                })
            })
        }
        

        //deleting category
        const del=document.getElementById(`d${nap.id}`)
        del.addEventListener('click',(e)=>{
            db.collection('categorybutton').doc(nap.id).delete();
        })

        //none and block text input under category
        document.getElementById(`div${nap.id}`).style.display="none";
        const as=document.getElementById(`as${nap.id}`)
        let count=0;
        as.addEventListener('click',(e)=>{
            if(count==0){
                document.getElementById(`div${nap.id}`).style.display="block";
                count=1;
            }
            else{
                document.getElementById(`div${nap.id}`).style.display="none";
                count=0;
            }
        })
        
        //adding new subcategory
      const subcat=document.getElementById(`s${nap.id}`);
        subcat.addEventListener('click',(e)=>{
        const inp=document.getElementById(`in${nap.id}`)
            console.log(inp.value,nap.id);
            let subc=inp.value;
            db.collection('categorybutton').doc(nap.id).collection(inp.value).add({
            }).then(()=>{
                return db.collection('categorybutton').doc(nap.id).update({
                    [subc]:""
                })
            })
    
        })        


    })
})

//create new category
const createbtn=document.querySelector('.createbtn');
createbtn.addEventListener('click',(e)=>{
    const inputt=document.querySelector('.createinput')
    console.log(inputt.value);
    db.collection('categorybutton').doc(inputt.value).set({

    }).then(()=>{
        inputt.value="";
    })
})