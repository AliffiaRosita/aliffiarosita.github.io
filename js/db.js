const dbPromised = idb.open("football",1, upgradeDb=>{
  
    
   const teamObjectStore = upgradeDb.createObjectStore("teams",{
       keyPath:"ID"
   });
   teamObjectStore.createIndex("name","name",{unique:false});
   teamObjectStore.createIndex("address","address",{unique:false}); 
   teamObjectStore.createIndex("email","email",{unique:false}); 
});

function favoriteTeam(team) {
    dbPromised
    .then(db=>{
        const tx = db.transaction("teams","readwrite");
        const store = tx.objectStore("teams");
        store.put({
            'ID': team.id,
            'name': team.name,
            'address':team.address,
            'email':team.email
        });
        return tx.complete;
    }).then(()=>{
        M.toast({html:"team berhasil disimpan"});  
    }).catch((e)=>{
        console.log(e);
        
    })
  
}

function getAllTeam() {
    return new Promise(function(resolve,reject){
        dbPromised
        .then(db=>{
            const tx = db.transaction("teams","readonly");
            const store = tx.objectStore("teams");
            return store.getAll();
        })
        .then(teams=>{
            resolve(teams);
        });
    });
}

function deleteTeam(id) {
    dbPromised.then(db=> {
        const tx = db.transaction("teams","readwrite");
        const store = tx.objectStore("teams");
        store.delete(id);
        return tx.complete;
    }).then(()=>{
        M.toast({html: 'Team telah dihapus'})
        location.reload();
    })
}


