import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { Formik } from "formik";
import Select from "react-select";
import shortValidations from "../../../../validations/short-validations";
import PermissionService from "../../../../services/PermissionService";
import RoleService from "../../../../services/RoleService";
import { useHistory } from "react-router-dom";
import { permissions as perms } from "../../../../assets/js/pages/PagePermissions";

const PermissionForm = (props) => {
  const history = useHistory();
  const [data, setData] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [roleOptions, setRoleOptions] = useState([]);
  const [permissions, setPermissions] = useState(perms);
  const [savedRolePermissions, setSavedRolePermissions] = useState([]);
  let pageTabs = [],
    tabContent = [];

  useEffect(() => {
    // renderTabsAndData();
    getRoles();
  }, []);

  useEffect(() => {
    renderTabsAndData();
  }, [permissions, savedRolePermissions]);

  const getRolePermissions = (roleId) => {
    PermissionService.getRolePermissions(roleId)
      .then((res) => {
        console.log(res.data);
        setSavedRolePermissions(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getRoles = () => {
    RoleService.getAllRole()
      .then((res) => {
        console.log("roles", res.data);
        let options = [];
        for (let role of res.data) {
          options.push({ label: role.name, value: role._id });
        }
        setRoleOptions(options);
        // getRolePermissions(options[0].value);
      })
      .catch((err) => {
        console.log("role get error");
      });
  };
  const renderCheckBox = (
    categoryIndex,
    pageindex,
    mainPermIndex,
    subPermIndex,
    disabled
  ) => {
    if (
      permissions[categoryIndex].pages[pageindex].permissionOptions[
        mainPermIndex
      ].subPermissions
    ) {
      permissions[categoryIndex].pages[pageindex].permissionOptions[
        mainPermIndex
      ].disabled = true;
    }

    if (subPermIndex != null) {
      let foundItem = savedRolePermissions.map((item) => {
        console.log("---------");
        console.log("page n", permissions[categoryIndex].pages[pageindex].name);
        console.log("selected role", selectedRole);
        console.log(
          "per name",
          permissions[categoryIndex].pages[pageindex].permissionOptions[
            mainPermIndex
          ].subPermissions[subPermIndex].value
        );
        console.log("item", item);
        console.log("---------");
        if (
          item.page === permissions[categoryIndex].pages[pageindex].name &&
          item.role === selectedRole &&
          item.name ===
            permissions[categoryIndex].pages[pageindex].permissionOptions[
              mainPermIndex
            ].subPermissions[subPermIndex].value
        ) {
          // console.log("found item");
          return true;
        } else {
          // console.log("not found item");
          return false;
        }
      });
      if (foundItem) {
        // console.log("found item", foundItem);
        permissions[categoryIndex].pages[pageindex].permissionOptions[
          mainPermIndex
        ].subPermissions[subPermIndex].checked = foundItem.active;
      }
    } else {
      let foundItem = savedRolePermissions.map((item) => {
        if (
          item.page === permissions[categoryIndex].pages[pageindex].name &&
          item.role === selectedRole &&
          item.name ===
            permissions[categoryIndex].pages[pageindex].permissionOptions[
              mainPermIndex
            ].value
        ) {
          // console.log("found item 2");
          return true;
        } else {
          // console.log("not found item 2");
          return false;
        }
      });
      if (foundItem) {
        permissions[categoryIndex].pages[pageindex].permissionOptions[
          mainPermIndex
        ].checked = foundItem.active;
      }
    }
    return (
      // <div className="col">
      <div class="custom-control custom-checkbox mr-3">
        <input
          type="checkbox"
          class="custom-control-input"
          disabled={
            subPermIndex != null
              ? permissions[categoryIndex].pages[pageindex].permissionOptions[
                  mainPermIndex
                ].subPermissions[subPermIndex].disabled
              : permissions[categoryIndex].pages[pageindex].permissionOptions[
                  mainPermIndex
                ].disabled
          }
          checked={
            subPermIndex != null
              ? permissions[categoryIndex].pages[pageindex].permissionOptions[
                  mainPermIndex
                ].subPermissions[subPermIndex].checked
              : permissions[categoryIndex].pages[pageindex].permissionOptions[
                  mainPermIndex
                ].checked
          }
          onClick={(val) => {
            console.log(
              "check",
              categoryIndex,
              pageindex,
              mainPermIndex,
              subPermIndex
            );
            console.log("check p", permissions);
            let toChange = "";
            if (subPermIndex != null) {
              if (
                permissions[categoryIndex].pages[pageindex].permissionOptions[
                  mainPermIndex
                ].subPermissions[subPermIndex].label === "all"
              ) {
                let temp =
                  permissions[categoryIndex].pages[pageindex].permissionOptions[
                    mainPermIndex
                  ].subPermissions[subPermIndex].checked;
                for (let subP of permissions[categoryIndex].pages[pageindex]
                  .permissionOptions[mainPermIndex].subPermissions) {
                  subP.checked = !temp;
                }
              } else {
                permissions[categoryIndex].pages[pageindex].permissionOptions[
                  mainPermIndex
                ].subPermissions[subPermIndex].checked = !permissions[
                  categoryIndex
                ].pages[pageindex].permissionOptions[mainPermIndex]
                  .subPermissions[subPermIndex].checked;
              }
            } else {
              permissions[categoryIndex].pages[pageindex].permissionOptions[
                mainPermIndex
              ].checked = !permissions[categoryIndex].pages[pageindex]
                .permissionOptions[mainPermIndex].checked;
            }
            setPermissions((oldVal) => [...permissions]);
          }}
          id={
            `defaultUnchecked` +
            categoryIndex +
            pageindex +
            mainPermIndex +
            subPermIndex
          }
        />
        <label
          class="custom-control-label"
          for={
            `defaultUnchecked` +
            categoryIndex +
            pageindex +
            mainPermIndex +
            subPermIndex
          }
        >
          {subPermIndex != null
            ? permissions[categoryIndex].pages[pageindex].permissionOptions[
                mainPermIndex
              ].subPermissions[subPermIndex].label.toUpperCase()
            : permissions[categoryIndex].pages[pageindex].permissionOptions[
                mainPermIndex
              ].label.toUpperCase()}
        </label>
      </div>
      // </div>
    );
  };
  let counter = 0;
  const getTabsAndData = () => {
    pageTabs = [];
    tabContent = [];
    permissions.map((item, categoryindex) => {
      pageTabs.push(
        <li className="nav-item">
          <a
            className={`nav-link ${categoryindex === 0 && "active"}`}
            data-toggle="tab"
            href={"#" + item.category}
            role="tab"
          >
            <span className="d-none d-md-block">
              {item.category
                .split("_")
                .join(" ")
                .toUpperCase()}
            </span>
            <span className="d-block d-md-none">
              <i className="mdi mdi-home-variant h5" />
            </span>
          </a>
        </li>
      );

      tabContent.push(
        <div
          className={`tab-pane ${categoryindex === 0 && "active"} p-3"`}
          id={`${item.category}`}
          role="tabpanel"
        >
          <table class="table table-striped table-sm">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Page Description</th>
                <th scope="col">Permissions</th>
              </tr>
            </thead>
            <tbody>
              {item.pages.map((page, pageindex) => {
                return (
                  <tr key={counter++}>
                    <td className="col-1">
                      {item.category.split("_").join(" ")}
                    </td>
                    <td className="col-1">{page.name.split("_").join(" ")}</td>
                    <td className="col-10">
                      {page.permissionOptions.map((permission, permIndx) => {
                        return (
                          <div
                            key={counter++}
                            className="d-flex border-bottom border-left mb-2"
                          >
                            {permission.subPermissions ? (
                              <>
                                <div className="col-sm-4 col-md-3 col-lg-2">
                                  {renderCheckBox(
                                    categoryindex,
                                    pageindex,
                                    permIndx,
                                    null,
                                    true
                                  )}
                                </div>

                                <div className="col-sm-8  col-md-9 col-lg-10 row align-items-center">
                                  {permission.subPermissions.map(
                                    (subPerm, subPIndex) => {
                                      return (
                                        <div key={counter++}>
                                          {renderCheckBox(
                                            categoryindex,
                                            pageindex,
                                            permIndx,
                                            subPIndex
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="col">
                                {renderCheckBox(
                                  categoryindex,
                                  pageindex,
                                  permIndx,
                                  null
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };

  const renderTabsAndData = () => {
    getTabsAndData();
    setData(
      <>
        <ul className="nav nav-tabs" role="tablist">
          {pageTabs}
        </ul>
        <div className="tab-content">{tabContent} </div>
      </>
    );
  };

  return (
    <Formik
      initialValues={{
        role: "",
      }}
      // validationSchema={permissionValidations.PermissionValidation}
      onSubmit={(values, actions) => {
        console.log("values", values);
        PermissionService.addPermission({
          permissions: permissions,
          role: values.role.value,
        })
          .then((res) => {
            PermissionService.handleMessage("add");
          })
          .catch((err) => {
            PermissionService.handleCustomMessage(err.response.data);
          });
      }}
    >
      {(props) => {
        return (
          <>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Role</label>
                  <Select
                    className={`my-select${
                      props.touched.role && props.errors.role
                        ? "is-invalid"
                        : props.touched.role && "is-valid"
                    }`}
                    name="role"
                    onBlur={props.handleBlur}
                    className="select-override zIndex"
                    value={props.values.role}
                    onChange={(role) => {
                      props.setFieldValue("role", role);
                      console.log("role", role);
                      getRolePermissions(role.value);
                    }}
                    options={roleOptions}
                  />
                  <span id="err" className="invalid-feedback">
                    {props.touched.role && props.errors.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">{data}</div>
            </div>
            <div className="row">
              <div className="col">
                <Button
                  className="mt-3 my-primary-button"
                  onClick={props.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default PermissionForm;
