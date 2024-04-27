// For interacting with local storage


const saveInLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const checkExistsInLocalStorage = (key) =>{
  const retrieved = localStorage.getItem(key);
  return ( retrieved != null )
}

const loadFromLocalStorageWithoutDefaults = (key) => {
  const retrieved = JSON.parse(localStorage.getItem(key));
  return retrieved
}
const loadFromLocalStorage = (key, defaults) => {
  const retrieved = JSON.parse(localStorage.getItem(key));
  if (retrieved != null) {
    return retrieved
  } else {
    saveInLocalStorage(key, defaults)
    const data = JSON.parse(localStorage.getItem(key));
    return data
  }

}


export {saveInLocalStorage,loadFromLocalStorage,loadFromLocalStorageWithoutDefaults,checkExistsInLocalStorage}
