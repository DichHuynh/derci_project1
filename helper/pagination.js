module.exports = (query) => {
    const objectPagination ={
        currentPage: 1,
        limit: 4
    }
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
        objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limit;
    }

    return objectPagination;
}