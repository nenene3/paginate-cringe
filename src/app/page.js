"use client";
import { useEffect, useState } from "react";
import PaginatedItems from "../components/Pagination";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function Home({ dbName }) {
  let [query, setQuery] = useState("");
  let [users, setUsers] = useState([]);
  let [display, setDisplay] = useState([]);

  const [orders, setOrders] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ]);

  const incrementCounter = (index) => {
    const newCounters = [...orders];
    newCounters[index] += 1;
    setOrders(newCounters);
  };

  const initOrders = async () => {
    let res = await getDocs(collection(db, "users"));
    let data = res.docs.map((e) => ({ ...e.data(), id: e.id }));
    setUsers(data);
    console.log(data);
    setDisplay(data);
    // setDisplay(set.slice(0, numbersOfDisplay));
    // console.log(limit);
  };

  let thheadF = [
    { id: "id" },
    { fullname: "שם מלא" },
    { email: "אימייל" },
    { phone: "טלפון" },
    { address: "כתובת" },
    { dealer: "דילר" },
  ];

  function header2() {
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

  function Items2({ currentItems }) {
    return (
      <tbody>
        {currentItems.map((user) => {
          return (
            <tr key={user.id}>
              {thheadF.map((e, i) => (
                <th key={i}>{user[Object.keys(e)[0]]}</th>
              ))}
              <th className="flex gap-5">
                <button className="btn btn-xs btn-error">delete</button>
                <button className="btn btn-xs btn-primary">edit</button>
              </th>
            </tr>
          );
        })}
      </tbody>
    );
  }

  // function Items({ currentItems }) {
  //   return (
  //     <tbody>
  //       {currentItems.map((user) => {
  //         return (
  //           <tr key={user.id}>
  //             <th className=" ">{user.id.substring(0, 6)}</th>
  //             <th>{user.fullname}</th>
  //             <th>{user.email}</th>
  //             <th>{user.phone}</th>
  //             <th>{user.address}</th>
  //             <th>{user.dealer}</th>
  //             <th className="flex gap-5">
  //               <button className="btn btn-xs btn-error">delete</button>
  //               <button className="btn btn-xs btn-primary">edit</button>
  //             </th>
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //   );
  // }
  function sort(field, order) {
    console.log(order)
    console.log(order);
    if (order % 3 === 1) {
      setDisplay(
        [...display].sort((a, b) => {
          if (typeof a[field] === "number") {
            return a[field] - b[field]; // Sort numbers numerically
          } else if (typeof a[field] === "string") {
            return a[field].localeCompare(b[field]);
          } else {
            return a[field] > b[field];
          }
        })
      );
    } else if (order % 3 === 2) {
      setDisplay(
        [...display].sort((b, a) => {
          if (typeof a[field] === "number") {
            return a[field] - b[field]; // Sort numbers numerically
          } else if (typeof a[field] === "string") {
            return a[field].localeCompare(b[field]); // Case-insensitive string comparison
          } else {
            // Handle other data types (dates, objects, etc.) as needed
            return a[field] < b[field]; // Default for unknown types
          }
        })
      );
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

  function setQ(e) {
    setQuery(e.taget.value);
  }

  // function header() {
  //   return (
  //     <thead>
  //       <tr>
  //         <td
  //           onClick={() => {
  //             sort("id", orders[0] + 1);
  //             incrementCounter(0);
  //           }}
  //         >
  //           id
  //         </td>
  //         <td
  //           onClick={() => {
  //             sort("fullname", orders[1] + 1);
  //             incrementCounter(1);
  //           }}
  //         >
  //           שם מלא
  //         </td>
  //         <td
  //           onClick={() => {
  //             sort("email", orders[2] + 1);
  //             incrementCounter(2);
  //           }}
  //         >
  //           אימייל
  //         </td>
  //         <td
  //           onClick={() => {
  //             sort("phone", orders[3] + 1);
  //             incrementCounter(3);
  //           }}
  //         >
  //           מספר טלפון
  //         </td>
  //         <td
  //           onClick={() => {
  //             sort("address", orders[4] + 1);
  //             incrementCounter(4);
  //           }}
  //         >
  //           כתובת
  //         </td>
  //         <td
  //           onClick={() => {
  //             sort("dealer", orders[5] + 1);
  //             incrementCounter(5);
  //           }}
  //         >
  //           ספק
  //         </td>
  //         <td className="">עריכה</td>
  //       </tr>
  //     </thead>
  //   );
  // }

  useEffect(() => {
    initOrders();
  }, []);

  const queryRows = (e) => {
    console.log(e);
    setQuery(e);
  };
  return (
    <div className="container mx-auto">
      <input
        className=" input input-primary mb-5"
        onChange={(e) => {
          queryRows(e.target.value);
        }}
      />
      <PaginatedItems
        itemsPerPage={20}
        Header={header2}
        items={display}
        Cb={Items2}
      />
    </div>
  );
}
