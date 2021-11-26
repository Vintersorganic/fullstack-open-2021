import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { ALL_AUTHORS, EDIT_BORNYEAR } from "../queries";
import Select from "react-select";

const Authors = ({ authors, show, setError }) => {
  const [born, setBorn] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [changeBornYear, result] = useMutation(EDIT_BORNYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  const submit = (event) => {
    event.preventDefault();
    if (typeof born !== "number") {
      setError("You forgot a number!");
      return;
    }

    changeBornYear({ variables: { name: selectedOption.value, setBornTo: born } });
    setBorn("");
    console.log(result, "RESULT");
  };

  useEffect(() => {
    console.log(result.data, "result.data");
    if (result.data && result.data.editAuthor === null) {
      setError("person not found");
    }
  }, [result.data]); // eslint-disable-line

  if (!show) {
    return null;
  }

  const options = authors.map((author) => {
    return { value: author.name, label: author.name };
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          options={options}
          defaultValue={selectedOption}
          onChange={setSelectedOption}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(+target.value)}
          />
        </div>

        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
