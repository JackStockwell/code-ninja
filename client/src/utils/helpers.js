export function idbPromise(storeName, method, object) {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open('git-job', 1);
      let db, tx, store;
      request.onupgradeneeded = function(e) {
        const db = request.result;
        db.createObjectStore('categories', { keyPath: '_id' });
      };
  
      request.onerror = function(e) {
        console.log('There was an error');
      };
  
      request.onsuccess = function(e) {
        db = request.result;
        tx = db.transaction(storeName, 'readwrite');
        store = tx.objectStore(storeName);
  
        db.onerror = function(e) {
          console.log('error', e);
        };
  
        switch (method) {
          case 'put':
            store.put(object);
            resolve(object);
            break;
          case 'get':
            const all = store.getAll();
            all.onsuccess = function() {
              resolve(all.result);
            };
            break;
          case 'delete':
            store.delete(object._id);
            break;
          default:
            console.log('No valid method');
            break;
        }
  
        tx.oncomplete = function() {
          db.close();
        };
      };
    });
  }
  

export function trimObjectValues(obj) {
  if (typeof obj !== 'object' || obj === null) {
    // If obj is not an object or is null, return it as is
    return obj;
  }

  if (Array.isArray(obj)) {
    // If obj is an array, iterate through its elements and trim them
    return obj.map((item) => trimObjectValues(item));
  }

  // If obj is an object, iterate through its properties
  const trimmedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'string') {
        // If the value is a string, trim it
        trimmedObj[key] = value.trim();
      } else {
        // If the value is not a string, recursively call trimObjectValues
        trimmedObj[key] = trimObjectValues(value);
      }
    }
  }

  return trimmedObj;
}