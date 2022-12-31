const container = document.querySelector(".container");
const addItem = document.querySelector(".add");
const overlay = document.querySelector(".overlay");

let dataArray;
let storageStatus = true;

if(!localStorage.getItem("data")) {
    // array way of storage:
    // localStorage.setItem("data", JSON.stringify([]))
   
    localStorage.setItem("data", JSON.stringify({}))
} 

else {  
    // ==> array way of storage:
    // dataArray = JSON.parse(localStorage.getItem("data"));  
    // dataArray.forEach(({name, email}) => createField(name, email)); 

    dataArray = JSON.parse(localStorage.getItem("data"));  
    Object.values(dataArray).forEach(({name, email}) => createField(name, email));
        
    }


function createField(name, email, form) {
    overlay.hidden = true;
        const newBox = document.createElement("div");  
            newBox.classList = "box";
        const newX = document.createElement("div");  
            newX.classList = "x";
        const xSymbol = document.createElement("a"); 
            xSymbol.classList = "close"; 
            xSymbol.textContent = "✕"; 
            xSymbol.href = "";
        const newData = document.createElement("div"); 
            newData.classList = "data";
        const image = document.createElement("img"); 
            image.classList = "image";
            image.setAttribute("src", `https://s2.googleusercontent.com/s2/favicons?domain=${email}`)
        const dataName = document.createElement("a");
            dataName.target = "_blank" 
            dataName.textContent = name.slice(0,1).toLocaleUpperCase() + name.slice(1).toLocaleLowerCase(); 
            dataName.classList = "name";
            if(!email.includes("http://", "https://")) {
                dataName.href = ("https://" + email).toLowerCase();
            } else { dataName.href = email.toLowerCase();  }

        const expression = /https?:\/\/(www\.)?[a-zA-Z0-9@:%._\+~#=\-]{1,256}\.[a-zA-Z0-9()]{1,6}\b([a-zA-Z0-9()@:%_\+~#?&//=]*)/g;
        const newReg = new RegExp(expression);
            if(dataName.href.match(newReg)) {
                storageStatus = true;
            } 
            else {
                storageStatus = false;
                alert("insert valid email");

            if(form) {form.remove();} return false; }
            if(dataName.textContent == "") {
                storageStatus = false;
                alert("Please submit values for both fields!");
                if(form) {form.remove();} return false; }
            
    
        newX.append(xSymbol);
        newData.append(image);
        newData.append(dataName);
    
        newBox.append(newX);
        newBox.append(newData);
    
        container.append(newBox);
        if(form) {form.remove();}
        
}


addItem.addEventListener("click", ()=> {

    // Creating and appearing form of fields

    const formDiv = document.createElement("div"); formDiv.classList = "formdiv";
    const titleDiv = document.createElement("div"); titleDiv.classList = "titlediv";
        const divT = document.createElement("div"); 
        const divX = document.createElement("div"); divX.classList = "xx"
        divT.textContent = "Add Bookmark";
        divX.textContent = "✕"; 
        titleDiv.append(divT); titleDiv.append(divX);
    const form = document.createElement("form");
    const label1 = document.createElement("label");
        label1.for = "name1";
        label1.textContent = "Website name";
    const input1 = document.createElement("input"); 
        input1.type = "text"; 
        input1.name = "name1";
        input1.id = "name1";
        input1.value = "";
    const label2 = document.createElement("label");
        label2.for = "name2";
        label2.textContent = "Website URL";
    const input2 = document.createElement("input"); 
        input2.type = "text"; 
        input2.name = "name2";
        input2.id = "name2";
        input2.value = "";
    const button = document.createElement("button");
        button.type = "submit";
        button.textContent = "Save";

    let formItems = [label1, input1, label2, input2, button];
    formItems.forEach(item => form.append(item));
    formDiv.append(titleDiv);
    formDiv.append(form);
    container.append(formDiv);
    overlay.hidden = false;
    input1.focus();

    // Disappearing by clicking on dark overlay background
    overlay.addEventListener("click", ()=>{
        formDiv.remove();
        overlay.hidden = true;
    })

    // Disappearing by clicking on x closing point
    divX.addEventListener("click", ()=>{
        formDiv.remove();
        overlay.hidden = true;
    })

    // Submitting the inserted fields
    button.addEventListener("click", (e)=> {
        e.preventDefault();
        createField(input1.value, input2.value, formDiv);
        location.reload();
        if(storageStatus) {

            // ==> array way of storage: 
            // let forStorage = {name:input1.value, email:input2.value};
            // dataArray.push(forStorage);
            // localStorage.setItem("data", JSON.stringify(dataArray)); 
            
            dataArray[input1.value.toLowerCase()] = {name:input1.value, email:input2.value}
            localStorage.setItem("data", JSON.stringify(dataArray));


        }
    })

})

const boxes = document.querySelectorAll(".box");
const closes = document.querySelectorAll(".close");

for(let i = 0; i < boxes.length; i++) {
    closes[i].addEventListener("click", (e)=>{
            e.preventDefault();
            boxes[i].remove();
            let deleteItem = boxes[i].children[1].children[1].textContent;
            let deleteStorage = JSON.parse(localStorage.getItem("data"));

            // ==> array way of storage and delete:
            // localStorage.removeItem("data");
            // let forStorage = deleteStorage.filter(item => deleteItem.toLowerCase() !== item.name.toLowerCase())
            // localStorage.setItem("data", JSON.stringify(forStorage));

            localStorage.removeItem("data");
            delete deleteStorage[deleteItem.toLowerCase()]
            localStorage.setItem("data", JSON.stringify(deleteStorage));
    })
    
}
