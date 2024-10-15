const buttonsStatus = document.querySelectorAll("[button-status]");
if(buttonsStatus.length > 0){
    let url = new URL(window.location.href);
    buttonsStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const buttonStatus = button.getAttribute("button-status");
            if(buttonStatus){
                url.searchParams.set("status", buttonStatus);
            }
            else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });
}

// form searh
const formSearch = document.querySelector("#form-search");
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// end form search

// pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination.length > 0){
    let url = new URL(window.location.href);
    buttonsPagination.forEach((button) => {
        const page = button.getAttribute("button-pagination");
        button.addEventListener("click", () => {
            url.searchParams.set("page", page);
            window.location.href = url.href;
        });
    });
}
// end pagination
