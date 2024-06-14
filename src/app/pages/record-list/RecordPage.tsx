import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { Content } from "../../../_metronic/layout/components/content";
import { useEffect, useState } from "react";
import axios from "axios";
import { demoarry } from "./listarray";
import { KTIcon } from "../../../_metronic/helpers";
import { Dropdown1 } from "../../../_metronic/partials";
import { UsersListHeader } from "../../modules/apps/user-management/users-list/components/header/UsersListHeader";
import { UsersListLoading } from "../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import { UsersListFilter } from "../../modules/apps/user-management/users-list/components/header/UsersListFilter";
import { Link } from "react-router-dom";

const RecordPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState();

  let tabs = [{ title: "List" }, { title: "Pipeline" }, { title: "Map View" }];

  useEffect(() => {
    getData();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getData = async () => {
    try {
      let headers = {
        "cache-control": "no-cache",
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      let body = {
        module: "Contacts",
      };

      let res = await axios.post(
        "https://v7-dev.simply-crm.com/spa.php",
        body,
        {
          headers: headers,
        }
      );
      console.log("res", res?.data);
    } catch (error) {
      console.log("err", error);
    }
  };

  let LISTVIEWHEADERS = demoarry?.data?.LISTVIEW_HEADERS;
  let LISTVIEWENTRIES = demoarry?.data?.LISTVIEW_ENTRIES;

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
                      <Link
                        to={""}
                        className={`nav-link ${
                          index === selectedIndex ? "" : "active"
                        } `}
                        role="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedIndex(index);
                        }}
                      >
                        {val?.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
              {/* end::Search */}
            </div>
            <div className="card-toolbar">
              <UsersListFilter />
              <button
                type="button"
                className="btn btn-primary"
                // onClick={openAddUserModal}
              >
                <KTIcon iconName="plus" className="fs-2" />
                Add User
              </button>
            </div>
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
                        />
                      </div>
                    </th>

                    {Object?.values(LISTVIEWHEADERS)?.map((header) => {
                      return <th className="min-w-150px">{header?.label}</th>;
                    })}
                  </tr>
                </thead>

                <tbody>
                  {LISTVIEWENTRIES ? (
                    <>
                      {Object.values(LISTVIEWENTRIES)
                        .slice(0, 17)
                        .map((entry, index) => (
                          <tr key={index}>
                            <td>
                              <div className="form-check form-check-sm form-check-custom form-check-solid">
                                <input
                                  className="form-check-input widget-13-check"
                                  type="checkbox"
                                  value="1"
                                />
                              </div>
                            </td>
                            {Object.values(entry.rawData)
                              .slice(0, 17)
                              .map((value, subIndex) => (
                                <td key={subIndex}>
                                  <span className="text-gray-900 fw-bold tes text-center fs-6">
                                    {value}
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
      </Content>
    </>
  );
};

export { RecordPage };
