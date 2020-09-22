
const allList = 'http://localhost:9000/list'; // 'http://10.13.16.80:4444/list';
const itemBySearchIndex = 'http://localhost:9000/list?searchIndex'; // 'http://10.13.16.80:4444/list?searchIndex='; // <text>
const itemById = 'http://localhost:9000/search?id='; // 'http://10.13.16.80:4444/search?id='; // <uuid>

function getAllItems() {
    return fetch(allList)
    .then(response => {
        if (response.ok && response.status === 200)
            return response.json();
        else throw new Error('BAD RESPONSE');
    })
    .catch(console.log);
}

function getItemBySearchIndex(searchIndex: string) {
    return fetch(itemBySearchIndex + searchIndex)
    .then(response => {
        if (response.ok && response.status === 200)
            return response.json();
        else throw new Error('BAD RESPONSE');
    })
    .catch(console.log);
}

function getItemById (id: string) {
    return fetch(itemById + id)
    .then(response => {
        if (response.ok && response.status === 200)
            return response.json();
        else throw new Error('BAD RESPONSE');
    })
    .catch(console.log);
}

export { getAllItems, getItemBySearchIndex, getItemById };
