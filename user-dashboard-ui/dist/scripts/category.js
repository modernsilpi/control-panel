const catbut=document.querySelector('.category-buttons')

db.collection('categorybutton').onSnapshot(snap=>{
    catbut.innerHTML="";
    snap.docs.forEach(nap=>{

        const div=document.createElement('div')
    
        div.innerHTML=`
        <button class="btn btn-dark">${nap.id}</button>
        <a class="btn btn-success">Add</a>
        <a class="btn btn-danger" id="d${nap.id}">X</a>
        `;
        catbut.append(div);

        for (var name of Object.keys(nap.data())) {
            console.log(name)
            const div2=document.createElement('div')
            div2.innerHTML=`
            <p>${name}</p>
            `
            div.append(div2)
        }
        const del=document.querySelector(`#d${nap.id}`)
        del.addEventListener('click',(e)=>{
            db.collection('categorybutton').doc(nap.id).delete();
        })
    })
})

//create new category
const createbtn=document.querySelector('.createbtn');
createbtn.addEventListener('click',(e)=>{
    const inputt=document.querySelector('.createinput')
    console.log(inputt);
    db.collection('categorybutton').doc(inputt.value).set({

    }).then(()=>{
        inputt.value="";
    })
})