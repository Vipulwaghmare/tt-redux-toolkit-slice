import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees, getEmployee } from "store/employeeSlice";

const Employee = () => {
  const [searchId, setSearchId] = useState("");
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const selectedEmployee = useSelector((state) => state.employee.employee);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!searchId) return;
    await dispatch(getEmployee(searchId)).unwrap();
  };

  return (
    <div className="employee">
      <h2>Employees</h2>
      <div className="main">
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td>{e.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <form>
            <input
              type="number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button type="submit" onClick={onSubmit}>
              Search Employee
            </button>
          </form>
          {selectedEmployee ? (
            <div>
              ID: {selectedEmployee.id}
              <br />
              NAME: {selectedEmployee.name} <br />
              GENDER: {selectedEmployee.gender}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Employee;
