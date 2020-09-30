import { IItem } from '../Item';
import itemsDataJSON from '../../../enum/items.json';
// import Config from '../data/config';

const online = true; // Config.server4444;
const hostName = 'http://localhost'; // Config.host;
const itemsData = itemsDataJSON as IItem[];

const allItems = `${hostName}:4444/list`;
const itemsBySearchIndex = `${hostName}:4444/list?searchIndex=`;
const itemById = `${hostName}:4444/search?id=`;

function request(url: string, options?: RequestInit, toJson = true) {
  return (
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          if (toJson) return response.json();
          return response.text();
        }
        throw new Error('BAD RESPONSE');
      })
      // eslint-disable-next-line no-console
      .catch(console.log)
  );
}

export function getAllItems(): Promise<IItem[]> {
  return request(allItems);
}

export function getItemsBySearchIndex(searchIndex: string): Promise<IItem[]> {
  if (!online) {
    const items = itemsData.filter(
      (item) =>
        item.searchIndex.toUpperCase().includes(searchIndex) ||
        String(item.plu).includes(searchIndex),
    );
    return Promise.resolve(items);
  }
  return request(`${itemsBySearchIndex}${searchIndex}`);
}

export function getItemById(id: string): Promise<IItem> {
  return request(`${itemById}${id}`);
}

export const SearchService = {
  getItemsBySearchIndex,
};

/* post create-order-row
{
    "id": 1,
    "data": {"id":"734ae666-ad1c-2440-7d16-9d22debf1c99","plu":903,"searchIndex":"Гриби Гливи жовті\r\n#75#Грибы Вешенки желтые","price":29.99,"type":"weighed","defaults":{"tara":0,"pieces_per_package":0},"lifetime":{"shelf_life_1":0},"texts":{"article":"492273","shop":"Сильпо Винница","short_title":"ГрибиКгГливиЖовтi","full_title":"Гриби Гливи жовті"}}

}
*/

/* response on create-order-row and patch update-order-row and delete delete-order-row
{
    "data": {
        "id": "734ae666-ad1c-2440-7d16-9d22debf1c99",
        "plu": 903,
        "searchIndex": "Гриби Гливи жовті\r\n#75#Грибы Вешенки желтые",
        "price": 29.99,
        "type": "weighed",
        "defaults": {
            "tara": 0,
            "pieces_per_package": 0
        },
        "lifetime": {
            "shelf_life_1": 0
        },
        "texts": {
            "article": "492273",
            "shop": "Сильпо Винница",
            "short_title": "ГрибиКгГливиЖовтi",
            "full_title": "Гриби Гливи жовті"
        }
    },
    "tab": {
        "id": 1
    },
    "id": "f04c2ded-e69c-4803-b5e2-c52510daeae2",
    "quantity": 1,
    "created": "2020-09-23T07:18:15.876Z"
}
*/
