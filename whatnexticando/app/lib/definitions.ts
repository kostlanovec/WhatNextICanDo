// Nechci používat Prismu.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type activity = {
  id: string,
  name: string,
  categoryId: string
}

export type category = {
  id: string,
  name: string
}

export type userSelectedActivity = {
  userid: string,
  activityId: string
}