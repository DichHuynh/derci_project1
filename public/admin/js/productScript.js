console.log("ok");
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length> 0){
    
    buttonsChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = status == "active" ? "inactive" : "active";

            const formChangeStatus = document.querySelector("#form-change-status")
            const dataPath = formChangeStatus.getAttribute("data-path");
            const path = `${dataPath}/${statusChange}/${id}?_method=PATCH`;
            
            formChangeStatus.setAttribute("action", path);
            formChangeStatus.submit();     
    });
});}