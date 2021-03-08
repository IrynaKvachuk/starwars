import React from "react";
import { useEffect, useState } from "react";
import Form, { SimpleItem, GroupItem } from "devextreme-react/form";
import "devextreme-react/text-area";
import { useParams } from "react-router-dom";

const gender = ["female", "male", "n/a"];

const CreaturesById = () => {
  const matchParams = useParams();
  const [data, setData] = useState(null);
  let genderOptions = {
    items: gender,
  };

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${matchParams.id}`)
      .then((resp) => resp.json())
      .then((result) => setData(result))
      .catch((err) => err);
  }, [matchParams.id]);

  useEffect(() => {
    data &&
      fetch(data.homeworld)
        .then((resp) => resp.json())
        .then((result) => setData({ ...data, homeworld: result }))
        .catch((err) => err);
  }, [data]);

  return (
    <Form formData={data}>
      <GroupItem cssClass="first-group" colCount={4}>
        <GroupItem colSpan={4}>
          <SimpleItem dataField="name" />
          <SimpleItem
            dataField="gender"
            displayExpr="gender"
            editorType="dxSelectBox"
            editorOptions={genderOptions}
          />
          <SimpleItem dataField="birth_year" />
        </GroupItem>
      </GroupItem>
      <GroupItem cssClass="second-group" colCount={2}>
        <SimpleItem
          colSpan={2}
          dataField="homeworld.name"
          label={{ text: "Homeworld" }}
        />
        <GroupItem>
          <SimpleItem dataField="skin_color" />
          <SimpleItem dataField="hair_color" />
          <SimpleItem dataField="eye_color" />
        </GroupItem>
        <GroupItem>
          <SimpleItem dataField="mass" />
          <SimpleItem dataField="height" />
        </GroupItem>
      </GroupItem>
    </Form>
  );
};

export default CreaturesById;
