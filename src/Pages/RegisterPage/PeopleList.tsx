import React from "react";

const PeopleList = (props) => {
  const { people } = props;

  return people.map((person) => {
    const { id, username, firstname, middleName, lastname, size, uploadTime } =
      person;
    return (
      <select key={id} className="document">
        <option value={username}>
          {firstname} {middleName !== null ? middleName : null} {lastname} '(
          {username})
        </option>
        <small>File size: {size}</small>
      </select>
    );
  });
};

export default PeopleList;
