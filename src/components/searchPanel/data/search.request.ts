import { OutgoingHttpHeaders } from "http";
import { RequestOptions } from "https";

const allItems = 'http://localhost:9000/list'; // 'http://10.13.16.80:4444/list';
const itemsBySearchIndex = 'http://localhost:9000/list?searchIndex='; // 'http://10.13.16.80:4444/list?searchIndex='; // <text>
const itemById = 'http://localhost:9000/search?id='; // 'http://10.13.16.80:4444/search?id='; // <uuid>

const allTabs = 'http://localhost:9000/tab/list'; // 'http://10.13.16.80:4445/tab/list';
const tabByNumber = 'http://localhost:9000/tab/'; // 'http://10.13.16.80:4445/tab/:number';
const createTab = 'http://localhost:9000/create-tab'; // 'http://10.13.16.80:4445/create-tab';
const delTab = 'http://localhost:9000/delete-tab'; // 'http://10.13.16.80:4445/delete-tab';

function request(url: string, options?: RequestInit) {
    return fetch(url, options)
    .then(response => {
        if (response.ok && response.status <= 299)
            return response.json();
        else throw new Error('BAD RESPONSE');
    })
    .catch(console.log);
}

function getAllItems() {
    return request(allItems);
}

function getItemsBySearchIndex(searchIndex: string) {
    return request(itemsBySearchIndex + searchIndex);
}

function getItemById (id: string) {
    return request(itemById + id);
}

function getAllTabs () {
    return request(allTabs);
}

function getTabByNumber(tabNumber: number) {
    return request(tabByNumber + tabNumber)
    .then(r => ({ tabNumber: tabNumber, tab: r}));
}

function postCreateTab() {
    return request(createTab, { method: 'POST' });
}

function delTabByNumber(tabNumber: number) {
    const body = {
        id: tabNumber,
    };
    return request(delTab, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    .then(r => ({ result: r, tabNumber: tabNumber}));
}

export {
    getAllItems,
    getItemsBySearchIndex,
    getItemById,
    getAllTabs,
    getTabByNumber,
    postCreateTab,
    delTabByNumber,
};
