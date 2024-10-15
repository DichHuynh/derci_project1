console.log("ok");
// form change status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length> 0){
    buttonsChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = status=="active" ? "inactive" : "active";

            const formChangeStatus = document.querySelector("#form-change-status")
            const dataPath = formChangeStatus.getAttribute("data-path");
            const action = `${dataPath}/${statusChange}/${id}?_method=PATCH`;
            
            formChangeStatus.setAttribute("action", action);
            formChangeStatus.submit();
    });
});}
//end form change status

// checkbox multi status
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name='ids']");
    inputCheckAll.addEventListener("click", () => {
        if(inputCheckAll.checked){
            inputsId.forEach((input) => {
                input.checked = true;
            });
        }else{
            inputsId.forEach((input) => {
                input.checked = false;
            });
        };
    });
    inputsId.forEach((input) => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='ids']:checked").length;
            if(countChecked == inputsId.length){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            };
    });
});
};
// end checkbox multi status

// form Change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (e)=> {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='ids']:checked");
        
        const typeChange = e.target.elements.type.value;
        console.log(typeChange);

        if(typeChange =="delete-all"){
            const isConfirm = confirm("Do you want to delete all?");
            if(!isConfirm){
                return;
            }
        }
    
        if(inputsChecked.length >0){
            let ids = [];
            const inputsId = formChangeMulti.querySelector("input[name='ids']");
            inputsChecked.forEach((input)=>{
                const id = input.value;
                if(typeChange =="change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']");
                    ids.push(`${id}-${position.value}`);
                    console.log(ids);
                }else{
                    ids.push(id);
                }
            });
            inputsId.value = ids.join(",");
            formChangeMulti.submit();
        };
    });
}
//end form change multi

// delete Item
const buttonDelete = document.querySelectorAll('[button-delete]');
if(buttonDelete.length >0){
    const formDeleteItem = document.querySelector('#form-delete-product');
    const path = formDeleteItem.getAttribute("data-path");

    buttonDelete.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const isConfirm = confirm("Do you want to delete this item?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.setAttribute("action", action);
                formDeleteItem.submit();
            }
        });
    });
};
// end delete Item

// message change status
const showAlert = document.querySelector("[show-alert]");
const closeAlert = document.querySelector("[close-alert]");

if(showAlert){
    const time = showAlert.getAttribute("data-time");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    },time);
}
if(closeAlert && showAlert){
    closeAlert.addEventListener("click", ()=>{
        showAlert.classList.add("alert-hidden");
    })
}
// end message change status

// sort
const sort = document.querySelector("[sort]");
if(sort){
    let url = new URL(window.location.href);
    const sortSelect = document.querySelector("[sort-select]");
    const sortClear = document.querySelector("[sort-clear]");

    sortSelect.addEventListener("change", (e) =>{
        const [sortKey, sortValue] = e.target.value.split("-");
        if(sortKey && sortValue){
            url.searchParams.set("sortKey", sortKey);
            url.searchParams.set("sortValue", sortValue);
            window.location.href = url.href;
            console.log(url.href);
        }
    })
    sortClear.addEventListener("click", ()=>{
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    })
    // thêm selected cho option
    const Key = url.searchParams.get("sortKey");
    const Value = url.searchParams.get("sortValue");
    const stringSort = `${Key}-${Value}`;
    if(Key && Value){
        const option = sortSelect.querySelector(`[value="${stringSort}"]`);
        if(option){
            option.setAttribute("selected", true);
        }
    }
}
// end sort
