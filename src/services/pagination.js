export async function fetchPage(page,size) {
    try{
    const responePage = await serverRest.get(
        `/api/v1/users?page=${page}&size=${size}`,
    );
    return responePage.data
    }
    catch(error){
        console.error(error)
    }
}

