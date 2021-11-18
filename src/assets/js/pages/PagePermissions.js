const LIST = "list",
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
  ALL = "all",
  MY = "my",
  MY_PROJECTS = "my_projects",
  MY_TEAMS = "my_teams",
  MY_SUBORDINATES = "my_subordinates";

const categories = {
  adminPages: "admin_pages",
  userPages: "user_pages",
  projectManagerPages: "project_manager_pages",
};

const pages = {
  client: "client",
  task: "task",
  nature: "nature",
  service: "service",
};
const checked = false;
const disabled = false;
const concat = (array) => {
  return array.join("_");
};
const concatLabel = (array) => {
  return array.join(" ");
};

const getLabel = (string) => {
  return string.split("_").join(" ");
};
export const permissions = [
  {
    category: categories.adminPages,
    pages: [
      {
        name: pages.client,
        permissionOptions: [
          {
            value: LIST,
            label: LIST,
            checked,
            disabled,
            subPermissions: [
              {
                value: concat([LIST, ALL]),
                label: ALL,
                checked: checked,
                disabled,
              },
              {
                value: concat([LIST, MY]),
                label: MY,
                checked: checked,
                disabled,
              },
              {
                value: concat([LIST, MY_PROJECTS]),
                label: getLabel(MY_PROJECTS),
                checked: checked,
                disabled,
              },
              {
                value: concat([LIST, MY_TEAMS]),
                label: getLabel(MY_TEAMS),
                checked: checked,
                disabled,
              },

              {
                value: concat([LIST, MY_SUBORDINATES]),
                label: getLabel(MY_SUBORDINATES),
                checked: checked,
                disabled,
              },
            ],
          },
          {
            value: ADD,
            label: ADD,
            checked: checked,
            disabled,
          },
          {
            value: EDIT,
            label: EDIT,
            checked: checked,
            disabled,
            subPermissions: [
              {
                value: concat([EDIT, MY_TEAMS]),
                label: getLabel(MY_TEAMS),
                checked: checked,
                disabled,
              },

              {
                value: concat([EDIT, MY_SUBORDINATES]),
                label: getLabel(MY_SUBORDINATES),
                checked: checked,
                disabled,
              },
            ],
          },
          {
            value: DELETE,
            label: DELETE,
            checked: checked,
            disabled,
          },
        ],
      },
      {
        name: pages.nature,
        permissionOptions: [
          {
            value: LIST,
            label: LIST,
            checked,
            disabled,
          },
          {
            value: ADD,
            label: ADD,
            checked,
            disabled,
          },
          {
            value: EDIT,
            label: EDIT,
            checked,
            disabled,
          },
          {
            value: DELETE,
            label: DELETE,
            checked,
            disabled,
          },
        ],
      },
      {
        name: pages.service,
        permissionOptions: [
          {
            value: LIST,
            label: LIST,
            checked,
            disabled,
          },
          {
            value: ADD,
            label: ADD,
            checked,
            disabled,
          },
          {
            value: EDIT,
            label: EDIT,
            checked,
            disabled,
          },
          {
            value: DELETE,
            label: DELETE,
            checked,
            disabled,
          },
        ],
      },
    ],
  },
  {
    category: categories.userPages,
    pages: [
      {
        name: pages.task,
        permissionOptions: [
          {
            value: LIST,
            label: LIST,
            checked,
            disabled,
          },
          {
            value: ADD,
            label: ADD,
            checked,
            disabled,
          },
          {
            value: EDIT,
            label: EDIT,
            checked,
            disabled,
          },
          {
            value: DELETE,
            label: DELETE,
            checked,
            disabled,
          },
        ],
      },
    ],
  },
  {
    category: categories.projectManagerPages,
    pages: [
      {
        name: "tasks",
        permissionOptions: [
          {
            value: LIST,
            label: LIST,
            checked,
            disabled,
          },
          {
            value: ADD,
            label: ADD,
            checked,
            disabled,
          },
          {
            value: EDIT,
            label: EDIT,
            checked,
            disabled,
          },
          {
            value: DELETE,
            label: DELETE,
            checked,
            disabled,
          },
        ],
      },
    ],
  },
];
