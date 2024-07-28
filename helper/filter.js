module.exports = (query)=>{
    let filterStatus = [
        { name: "Tất cả", status:"", class: ""},
        { name: "Đang hoạt động", status:"active", class:""},
        { name: "Ngưng hoạt động", status:"inactive", class:""}
    ]

    if(query.status){
        let index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "active";
    }
    else{
        filterStatus[0].class = "active";
    }
    return filterStatus;
}