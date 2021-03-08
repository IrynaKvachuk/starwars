import { useState, useCallback } from "react";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import ODataStore from "devextreme/data/odata/store";

const PlanetsPage = () => {
  const pageSizes = [10, 25, 50, 100];
  const creaturesFields = [
    "name",
    "rotation_period",
    "orbital_period",
    "diameter",
    "climate",
    "gravity",
    "terrain",
    "surface_water",
    "population",
  ];
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onContentReady = useCallback(
    (e) => {
      if (!isCollapsed) {
        e.component.expandRow(["Planets"]);
        setIsCollapsed(true);
      }
    },
    [isCollapsed]
  );

  const dataSourceOptions = {
    store: new ODataStore({
      url: "https://swapi.dev/api/planets/",
    }),
  };

  return (
    <DataGrid
      dataSource={dataSourceOptions}
      allowColumnReordering={true}
      showBorders={true}
      onContentReady={onContentReady}
    >
      <GroupPanel visible={true} />
      <SearchPanel
        visible={true}
        dataField={"name"}
        highlightCaseSensitive={true}
      />
      <Grouping autoExpandAll={false} />

      <Column dataField="Planets" groupIndex={0} />
      {creaturesFields.map((creature) => (
        <Column
          key={creature}
          dataField={creature}
          dataType="string"
        />
      ))}

      <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
      <Paging defaultPageSize={10} />
    </DataGrid>
  );
};

export default PlanetsPage;
