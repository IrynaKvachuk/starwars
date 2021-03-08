import CustomStore from "devextreme/data/custom_store";
import DataSource from "devextreme/data/data_source";

const createSwDataStore = (url, setIndex, getIndex, idExtractor, pageSize) => {
  let totalCount = 0;

  const st = new CustomStore({
    totalCount: (e) => Promise.resolve(totalCount),
    load: (loadData) => {
      return fetch(
        url +
          (getIndex() === 0
            ? ""
            : "?" + new URLSearchParams({ page: getIndex() + 1 }))
      )
        .then((data) => data.json())
        .then((data) => {
          totalCount = data.count;
          let results = new Array(getIndex() * pageSize).concat(
            data.results.map((entry) => {
              const id = idExtractor(entry);
              return { ...entry, id: id[0] };
            })
          );
          return results;
        });
    },
  });

  const dataSourceOptions = new DataSource({
    store: st,
    paginate: true,
    pageSize: pageSize,
  });
  dataSourceOptions.pageIndex = (newIndex) => {
    if (newIndex !== undefined) {
      setIndex(newIndex);
    }
    return getIndex();
  };
  dataSourceOptions.totalCount = (data) => {
    return totalCount;
  };
  return dataSourceOptions;
};

export default createSwDataStore;
