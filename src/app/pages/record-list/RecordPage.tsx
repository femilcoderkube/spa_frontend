import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { useEffect, useState } from "react";
import axios from "axios";
import { demoarry } from "./listarray";
import Cookies from "js-cookie";
import { KTIcon } from "../../../_metronic/helpers";
import { UsersListLoading } from "../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import { UsersListFilter } from "../../modules/apps/user-management/users-list/components/header/UsersListFilter";
import { Link } from "react-router-dom";

import FormModel from "../../../Components/FormModel";
import clsx from "clsx";
import { useTable } from "react-table";

const RecordPage: React.FC = () => {
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState();
  const [checkAll, setCheckAll] = useState(false);
  const [addModel, setAddModel] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [data, setData] = useState([]);

  let tabs = [{ title: "List" }, { title: "Pipeline" }, { title: "Map View" }];
  let user = {};
  let LISTVIEWHEADERS = demoarry?.data?.LISTVIEW_HEADERS;
  let LISTVIEWENTRIES = demoarry?.data?.LISTVIEW_ENTRIES;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   // URL of the resource you want to access

  //   Cookies.set("_ga", "GA1.2.1262342066.1718704107", {
  //     path: "/metronic8/react/demo1/recordlist",
  //     domain: "https://v7-dev.simply-crm.com/spa.php",
  //   });
  //   Cookies.set("_gid", "GA1.2.266553500.1718704107", {
  //     path: "/metronic8/react/demo1/recordlist",
  //     domain: "https://v7-dev.simply-crm.com/spa.php",
  //   });
  //   Cookies.set("_pk_id.1.08ec", "29761231bcf330f9.1718704109.", {
  //     path: "/metronic8/react/demo1/recordlist",
  //     domain: "https://v7-dev.simply-crm.com/spa.php",
  //   });
  //   Cookies.set(
  //     "cw_conversation",
  //     "eyJhbGciOiJIUzI1NiJ9.eyJzb3VyY2VfaWQiOiI3YmYxM2NmYi04YzZlLTRkNmEtYjY3NS0wODI4MTk4NDI3NzgiLCJpbmJveF9pZCI6Mn0.FAIqQtsbOQYVeLR6GXqNuyav9mu4LeG6ovECzm_6juc",
  //     {
  //       path: "/metronic8/react/demo1/recordlist",

  //       domain: "https://v7-dev.simply-crm.com/spa.php",
  //     }
  //   );
  //   Cookies.set("_pk_ses.1.08ec", "1", {
  //     path: "/metronic8/react/demo1/recordlist",
  //     domain: "https://v7-dev.simply-crm.com/spa.php",
  //   });
  //   Cookies.set("PHPSESSID", "cvi9gtvcicuouj8r6do6ij3kus", {
  //     path: "/metronic8/react/demo1/recordlist",
  //     domain: "https://v7-dev.simply-crm.com/spa.php",
  //   });
  //   const url =
  //     "https://v7-dev.simply-crm.com/spa.php?module=Contacts&view=DataTable&length=10";

  //   getData(url);

  //   // Fetch data with cookies
  //   // fetch(url, {
  //   //   method: "GET",
  //   //   // credentials: "include",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Cookie: document.cookie,
  //   //     // Add any additional headers if needed
  //   //   },
  //   // })
  //   //   .then((response) => {
  //   //     if (response.ok) {
  //   //       return response.json();
  //   //     } else {
  //   //       throw new Error("Network response was not ok");
  //   //     }
  //   //   })
  //   //   .then((data) => {
  //   //     console.log("data", data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error("Failed to fetch data:", error);
  //   //   });
  // }, []);
  useEffect(() => {
    // URL of the resource you want to access
    const url = "https://v7-dev.simply-crm.com/spa-static.json";

    // Fetch data with cookies
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        if (data) {
          console.log("data", data?.data);
          setTimeout(() => {
            setData(data?.data);
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  const handleCheckAllChange = () => {
    setCheckAll(!checkAll);
    if (!checkAll) {
      const allIds: any = Object.values(LISTVIEWENTRIES)
        .slice(0, 17)
        .map((entry, index) => index);

      setCheckedItems(allIds);
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (id: string) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
      setCheckAll(false);
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleSearchChange = (headerKey: string, value: string) => {
    setSearchTerms({
      ...searchTerms,
      [headerKey]: value,
    });
  };

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className="card mb-5 mb-xl-8">
          <div className="card-header border-0 pt-6">
            <div className="card-title">
              <div className="d-flex align-items-center position-relative my-1">
                {/* <KTIcon
                  iconName="magnifier"
                  className="fs-1 position-absolute ms-6"
                />
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search user"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
              </div>
              <div className="nav nav-tabs">
                {tabs?.map((val: any, index: any) => {
                  return (
                    <div className="nav-item">
                      <>
                        <Link
                          to={"#"}
                          className={`nav-link ${
                            index === selectedIndex ? "" : "active"
                          } `}
                          role="button"
                          data-kt-menu-trigger={
                            selectedIndex === 1 ? "click" : ""
                          }
                          data-kt-menu-placement="bottom-end"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedIndex(index);
                          }}
                        >
                          {val?.title}
                          {index === 1 && (
                            <KTIcon iconName="down" className="fs-5 m-0" />
                          )}
                        </Link>
                        {index === 1 && (
                          <div
                            className="menu  menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-200px py-4 "
                            data-kt-menu="true"
                          >
                            <div className="menu-item px-3">
                              <a className="menu-link px-3">
                                + Add Visual Pipeline
                              </a>
                            </div>
                            {/* 
                          <div className="menu-item px-3">
                            <a
                              className="menu-link px-3"
                              data-kt-users-table-filter="delete_row"
                            >
                              Delete
                            </a>
                          </div> */}
                          </div>
                        )}
                      </>
                    </div>
                  );
                })}
              </div>

              {/* end::Search */}
            </div>
            {checkedItems?.length > 0 ? (
              <div className="d-flex justify-content-end align-items-center">
                <div className="fw-bolder me-5">
                  <span className="me-2">{checkedItems?.length}</span> Selected
                </div>

                <button type="button" className="btn btn-danger">
                  Delete Selected
                </button>
              </div>
            ) : (
              <div className="card-toolbar">
                <UsersListFilter />
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setAddModel(true);
                  }}
                >
                  <KTIcon iconName="plus" className="fs-2" />
                  Add User
                </button>
              </div>
            )}
          </div>
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                {demoarry?.data?.MODULE}
              </span>
              <span className="text-muted mt-1 fw-semibold fs-7">
                {demoarry?.data?.CURRENTUSER}
              </span>
            </h3>
          </div>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="w-25px">
                      <div className="form-check form-check-sm form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          data-kt-check="true"
                          data-kt-check-target=".widget-13-check"
                          checked={checkAll}
                          onChange={handleCheckAllChange}
                        />
                      </div>
                    </th>
                    <th className="min-w-150px">Actions</th>
                    {Object?.values(LISTVIEWHEADERS)?.map((header) => {
                      return (
                        <th className="min-w-150px">
                          <input
                            type="text"
                            data-kt-user-table-filter="search"
                            className="form-control form-control-solid min-w-150px"
                            placeholder={header?.label}
                            value={searchTerms[header?.label] || ""}
                            onChange={(e) =>
                              handleSearchChange(header?.label, e.target.value)
                            }
                          />
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {data?.length > 0 ? (
                    <>
                      {data?.map((entry: any, index: any) => (
                        <tr key={index}>
                          <td>
                            <div className="form-check form-check-sm form-check-custom form-check-solid">
                              <input
                                className="form-check-input widget-13-check"
                                type="checkbox"
                                value="1"
                                checked={checkedItems.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                              />
                            </div>
                          </td>
                          <td>
                            <>
                              <a
                                href="#"
                                className="btn btn-light btn-active-light-primary btn-sm"
                                data-kt-menu-trigger="click"
                                data-kt-menu-placement="bottom-end"
                              >
                                Actions
                                <KTIcon iconName="down" className="fs-5 m-0" />
                              </a>

                              <div
                                className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
                                data-kt-menu="true"
                              >
                                <div className="menu-item px-3">
                                  <a className="menu-link px-3">Edit</a>
                                </div>

                                <div className="menu-item px-3">
                                  <a
                                    className="menu-link px-3"
                                    data-kt-users-table-filter="delete_row"
                                  >
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </>
                          </td>

                          {entry?.map((value: any, subIndex: any) => (
                            <td key={subIndex}>
                              <span
                                className={`${
                                  value ? "text-gray-900" : "text-gray-400"
                                } fw-bold tes text-center fs-6`}
                              >
                                {value ? value : "No Details"}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={7}>
                        <div className="d-flex text-center w-100 align-content-center justify-content-center">
                          No matching records found
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {loading && <UsersListLoading />}
          </div>
        </div>
        {addModel && <FormModel user={user} setAddModel={setAddModel} />}
      </Content>
    </>
  );
};

export { RecordPage };
