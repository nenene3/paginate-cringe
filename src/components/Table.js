"use client";
import { useEffect, useState } from "react";
import PaginatedItems from "../components/Pagination";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import _ from 'lodash'

export default function Home({ dbName,thheadF }) {
  let [query, setQuery] = useState("");
  let [users, setUsers] = useState([]);
  let [display, setDisplay] = useState([]);

  const [orders, setOrders] = useState(new Array(thheadF.length).fill(0));

  const incrementCounter = (index) => {
    const newCounters = [...orders];
    newCounters[index] += 1;
    setOrders(newCounters);
  };

  const initOrders = async () => {
    let res = await getDocs(collection(db, dbName));
    let data = res.docs.map((e) => ({ ...e.data(), id: e.id }));
    setUsers(data);
    console.log(data);
    setDisplay(data);
    // setDisplay(set.slice(0, numbersOfDisplay));
    // console.log(limit);
  };

  

  function header() {
    return (
      <thead>
        <tr>
          {thheadF.map((v, i) => {
            return (
              <td
                key={i}
                onClick={() => {
                  sort(Object.keys(v)[0], orders[i] + 1);
                  incrementCounter(i);
                }}
              >
                {v[Object.keys(v)[0]]}
              </td>
            );
          })}

          <td className="">עריכה</td>
        </tr>
      </thead>
    );
  }

  function Items({ currentItems }) {
    return (
      <tbody>
        {currentItems.map((user) => {
          return (
            <tr key={user.id}>
              {thheadF.map((e, i) => (
                <th key={i} className="whitespace-nowrap">{user[Object.keys(e)[0]]}</th>
              ))}
              <th className="flex gap-5 whitespace-nowrap">
                <button className="btn btn-xs btn-error">delete</button>
                <button className="btn btn-xs btn-primary">edit</button>
              </th>
            </tr>
          );
        })}
      </tbody>
    );
  }

  function sort(field, order) {
    if (order % 3 === 1) {
      setDisplay(
        _.sortBy(display,field,'asc')
      );
      console.log('desc')
    } else if (order % 3 === 2) {
      setDisplay(
        _.sortBy(display,field,'desc').reverse()
      );
      console.log('asc')
    } else {
      setDisplay(users);
      filter(query);
    }
    console.log("sorted");
  }

  let filter = () => {
    setDisplay(
      users.filter((obj) =>
        Object.keys(obj).some((key) => String(obj[key]).includes(query))
      )
    );
  };

  useEffect(() => {
    if (query !== "") {
      filter(query);
    } else {
      setDisplay(users);
    }
  }, [query]);

  useEffect(() => {
    initOrders();
  }, []);

  const queryRows = (e) => {
    console.log(e);
    setQuery(e);
  };
  return (
    <div className="">
      <input
        className=" input input-primary mb-5"
        onChange={(e) => {
          queryRows(e.target.value);
        }}
      />
      <PaginatedItems
        itemsPerPage={10}
        Header={header}
        Cb={Items}
        items={display}
      />
    </div>
  );
}
