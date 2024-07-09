import { useEffect, useState } from "react";
import axios from "axios";
import './Table.css'


function Table() {
  let headerList = ["House", "Region", "Titles", "Sworn Members"];
  const [dataList, setDataList] = useState([]);
  const [swornMembersList, setSwornMembersList] = useState([]);
  const [tableData, setTableData] = useState([]);

  const tableHeadings = headerList.map((item, index) => (
    <th scope="col" key={index}>
      {item}
    </th>
  ));

  const getHouseData = async () => {
    let baseURL = "https://anapioficeandfire.com/api/houses";
    const houseResponse = await axios.get(baseURL);
    setDataList(houseResponse.data);

    const swornMembersEndpoints = houseResponse.data.flatMap(
      (house) => house.swornMembers
    );

    if (swornMembersEndpoints.length > 0) {
      const swornMembersResponses = await Promise.all(
        swornMembersEndpoints.map((endpoint) => axios.get(endpoint))
      );

      const swornMembersList = swornMembersResponses.map((response) => ({
        url: response.data.url,
        name: response.data.name,
      }));

      setSwornMembersList(swornMembersList);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getHouseData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const displayTableData = dataList.map((data) => {
      let swornMembersArr = Object.values(data.swornMembers);

      const displaySwornArr = swornMembersArr.map((url) =>
        swornMembersList.find((member) => member.url === url)?.name
      ).filter(Boolean);

      let titles = data.titles.length > 0 ? data.titles.join(", ") : "None";
      let swornMembers = swornMembersArr.length > 0 ? displaySwornArr.join(", ") : "None";

      return (
        <tr key={data.name}>
          <td>{data.name}</td>
          <td>{data.region}</td>
          <td>{titles}</td>
          <td>{swornMembers}</td>
        </tr>
      );
    });

    setTableData(displayTableData);
  }, [dataList, swornMembersList]);

  return (
    <div className="table">

        <table className="table table-striped table-bordered custom-class ">
          <thead className="thead-dark">
            <tr>{tableHeadings}</tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
    </div>
  );
}

export default Table;